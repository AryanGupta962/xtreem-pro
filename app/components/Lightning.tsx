"use client";

import { useRef, useEffect } from "react";

interface ElectricBlastProps {
  armCount?: number;
  speed?: number;
  intensity?: number;
  /** When false, the rAF loop is paused to save GPU. */
  visible?: boolean;
}

const ElectricBlast: React.FC<ElectricBlastProps> = ({
  armCount = 10,
  speed = 1,
  intensity = 1,
  visible = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const visibleRef = useRef(visible);

  // Keep ref in sync with prop so the rAF closure always reads the latest value
  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── resize: only triggers GPU realloc when size actually changes ──
    let lastW = 0;
    let lastH = 0;
    const resize = (): void => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w !== lastW || h !== lastH) {
        canvas.width = w;
        canvas.height = h;
        lastW = w;
        lastH = h;
      }
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── WebGL context — narrowed to non-null immediately ──
    const gl: WebGLRenderingContext | null = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "high-performance",
    });
    if (!gl) {
      ro.disconnect();
      return;
    }

    /* ── Vertex shader ── */
    const vertSrc = `
      attribute vec2 aPos;
      void main(){ gl_Position = vec4(aPos,0.,1.); }
    `;

    /* ── Fragment shader ── */
    const fragSrc = `
      precision mediump float;
      uniform vec2  iRes;
      uniform float iTime;
      uniform float uArmCount;
      uniform float uSpeed;
      uniform float uIntensity;

      #define TAU 6.28318530718

      float h(float n){ return fract(sin(n)*43758.5453); }
      float h2(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        vec2 u=f*f*(3.-2.*f);
        return mix(
          mix(h2(i),           h2(i+vec2(1,0)), u.x),
          mix(h2(i+vec2(0,1)), h2(i+vec2(1,1)), u.x), u.y);
      }

      float fbm(vec2 p){
        float v=0., a=.5;
        v+=a*noise(p); p=p*2.+vec2(1.7,9.2); a*=.5;
        v+=a*noise(p); p=p*2.+vec2(8.3,2.8); a*=.5;
        v+=a*noise(p);
        return v;
      }

      float armAngle(float i, float T){
        float base  = h(i*7.3+1.1)*TAU;
        float drift = h(i*3.7+0.5)*0.4-0.2;
        return base + drift*T;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / iRes.xy;
        uv = 2.*uv - 1.;
        uv.x *= iRes.x / iRes.y;

        float T   = iTime * uSpeed;
        vec3  col = vec3(0.);
        int   N   = int(uArmCount);

        for(int i = 0; i < 15; i++){
          if(i >= N) break;
          float fi = float(i);

          float angle  = armAngle(fi, T);
          float spawnR = 1.6 + h(fi*5.1)*0.7;
          vec2  origin = vec2(cos(angle), sin(angle)) * spawnR;

          vec2  dir    = normalize(-origin);
          vec2  perp2d = vec2(-dir.y, dir.x);
          vec2  rel    = uv - origin;
          float along  = dot(rel, dir);
          float perp   = dot(rel, perp2d);

          float flickerRate = 1.8 + h(fi*2.9)*2.5;
          float phase       = T * flickerRate + fi * 4.37;

          float nc    = along*3. - phase*2.5;
          float warp  = fbm(vec2(nc,        fi*3.1      ))*2.-1.;
          float warp2 = fbm(vec2(nc*1.6+4.1, fi*1.7+0.5))*2.-1.;
          float ep    = perp + warp*0.15 + warp2*0.06;

          float flicker = 0.5 + 0.5*sin(phase*7.3 + along*12.);
          float w       = 0.018 + 0.010*flicker;
          float bolt    = w            / (abs(ep)           + 0.003);
          float branch  = 0.009*flicker/ (abs(ep-warp*0.25) + 0.004);

          float cd    = length(uv);
          float reach = smoothstep(spawnR+0.05, 0.0, cd)
                      * smoothstep(-0.1, 0.3, along);

          float bright = 0.6 + 0.4*flicker;
          vec3  bcolor = mix(vec3(0.,0.9,0.05), vec3(0.5,1.,0.4), bright);

          col += bcolor * (bolt + branch*0.5) * reach * uIntensity * 0.16;
        }

        float cd = length(uv);

        float core  = 0.09 / (cd*cd + 0.006);
        col += vec3(0.6,1.0,0.4) * core * uIntensity * 0.6;

        float pulse = 0.5 + 0.5*sin(T*4.5);
        float glow  = exp(-cd*8.) * (0.8 + 0.5*pulse);
        col += vec3(0.05,1.,0.15) * glow * uIntensity;

        for(int r = 0; r < 3; r++){
          float offset = float(r)*0.33;
          float wave   = mod(T*0.85+offset, 1.);
          float radius = wave*1.6;
          float ring   = exp(-pow((cd-radius)*20., 2.)) * (1.-wave) * 1.8;
          col += vec3(0.,0.95,0.2) * ring * uIntensity;
        }

        float ambient = exp(-cd*3.) * (0.3 + 0.15*sin(T*2.8));
        col += vec3(0.,0.55,0.05) * ambient * uIntensity * 0.35;

        col = col / (col + 1.0);
        col = pow(col, vec3(0.8));

        float a = clamp(max(col.r, max(col.g, col.b)), 0., 1.);
        gl_FragColor = vec4(col, a);
      }
    `;

    // ── makeShader: gl is guaranteed non-null here via closure ──
    const makeShader = (src: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = makeShader(vertSrc, gl.VERTEX_SHADER);
    const fs = makeShader(fragSrc, gl.FRAGMENT_SHADER);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      ro.disconnect();
      return;
    }

    const prog = gl.createProgram();
    if (!prog) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      ro.disconnect();
      return;
    }

    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.detachShader(prog, vs);
    gl.detachShader(prog, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl.deleteProgram(prog);
      ro.disconnect();
      return;
    }
    gl.useProgram(prog);

    const vbo = gl.createBuffer();
    if (!vbo) {
      gl.deleteProgram(prog);
      ro.disconnect();
      return;
    }

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const aPosLoc = gl.getAttribLocation(prog, "aPos");
    if (aPosLoc < 0) {
      gl.deleteBuffer(vbo);
      gl.deleteProgram(prog);
      ro.disconnect();
      return;
    }
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "iRes");
    const uTime = gl.getUniformLocation(prog, "iTime");
    const uArms = gl.getUniformLocation(prog, "uArmCount");
    const uSpd = gl.getUniformLocation(prog, "uSpeed");
    const uIntens = gl.getUniformLocation(prog, "uIntensity");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const t0 = performance.now();
    let animId = 0;

    const render = (): void => {
      // Skip rendering entirely when not visible — saves all GPU work
      if (!visibleRef.current) {
        animId = requestAnimationFrame(render);
        return;
      }

      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform1f(uArms, armCount);
      gl.uniform1f(uSpd, speed);
      gl.uniform1f(uIntens, intensity);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(animId);
      gl.useProgram(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteBuffer(vbo);
      gl.deleteProgram(prog);
    };
  }, [armCount, speed, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block", background: "#000" }}
    />
  );
};

export default ElectricBlast;
