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

  // Keep live props in refs so the rAF closure always reads the latest values
  // without triggering a full WebGL teardown/rebuild on every prop change.
  const armCountRef = useRef(armCount);
  const speedRef = useRef(speed);
  const intensityRef = useRef(intensity);
  const visibleRef = useRef(visible);

  // Sync refs on every render — no extra effects needed.
  armCountRef.current = armCount;
  speedRef.current = speed;
  intensityRef.current = intensity;
  visibleRef.current = visible;

  // ── WebGL lifetime: runs once, never re-runs for prop changes ──────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── ResizeObserver writes directly to canvas dimensions ─────────────────
    // The render loop reads canvas.width/height each frame, so no extra
    // "dirty" flag is needed — just keep the backing store in sync.
    let canvasW = 0;
    let canvasH = 0;

    const syncSize = (): void => {
      const w = canvas.clientWidth | 0; // fast floor for integer pixels
      const h = canvas.clientHeight | 0;
      if (w !== canvasW || h !== canvasH) {
        canvas.width = w;
        canvas.height = h;
        canvasW = w;
        canvasH = h;
      }
    };
    syncSize();

    const ro = new ResizeObserver(syncSize);
    ro.observe(canvas);

    // ── WebGL context ────────────────────────────────────────────────────────
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      powerPreference: "high-performance",
      // Hint: we never need to read back pixels
      preserveDrawingBuffer: false,
    }) as WebGLRenderingContext | null;

    if (!gl) {
      ro.disconnect();
      return;
    }

    /* ── Vertex shader ────────────────────────────────────────────────────── */
    const vertSrc = `
      attribute vec2 aPos;
      void main(){ gl_Position = vec4(aPos,0.,1.); }
    `;

    /* ── Fragment shader (visuals unchanged) ─────────────────────────────── */
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

    // ── Shader compilation helper ────────────────────────────────────────────
    const makeShader = (src: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
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
    // Shaders can be detached + deleted immediately after linking
    gl.detachShader(prog, vs);
    gl.detachShader(prog, fs);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      gl.deleteProgram(prog);
      ro.disconnect();
      return;
    }
    gl.useProgram(prog);

    // ── Full-screen quad ─────────────────────────────────────────────────────
    const vbo = gl.createBuffer();
    if (!vbo) {
      gl.deleteProgram(prog);
      ro.disconnect();
      return;
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPosLoc = gl.getAttribLocation(prog, "aPos");
    if (aPosLoc < 0) {
      gl.deleteBuffer(vbo);
      gl.deleteProgram(prog);
      ro.disconnect();
      return;
    }
    gl.enableVertexAttribArray(aPosLoc);
    gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

    // Cache all uniform locations once — never look them up again
    const uRes = gl.getUniformLocation(prog, "iRes");
    const uTime = gl.getUniformLocation(prog, "iTime");
    const uArms = gl.getUniformLocation(prog, "uArmCount");
    const uSpd = gl.getUniformLocation(prog, "uSpeed");
    const uIntens = gl.getUniformLocation(prog, "uIntensity");

    // Blend state set once at init — never touched again in the hot path
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    // ── Page-visibility API — halts the loop when the tab is backgrounded ───
    // This is a separate concern from the `visible` prop (which controls
    // whether the element itself is on-screen) and costs nothing extra.
    let pageVisible = !document.hidden;
    const onVisChange = (): void => {
      pageVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisChange);

    // ── Cached viewport — only call gl.viewport when dimensions change ───────
    let vpW = 0;
    let vpH = 0;

    // ── Cached resolution uniform — only upload when dimensions change ───────
    let resW = 0;
    let resH = 0;

    const t0 = performance.now();
    let animId = 0;

    const render = (): void => {
      animId = requestAnimationFrame(render);

      // Bail out entirely when the tab is hidden or the component is invisible.
      // requestAnimationFrame still ticks (to stay queued), but we skip all
      // GL work — no uniform uploads, no draw calls, no driver round-trips.
      if (!pageVisible || !visibleRef.current) return;

      // Viewport update — only when the canvas backing store was resized
      const w = canvasW;
      const h = canvasH;
      if (w !== vpW || h !== vpH) {
        gl.viewport(0, 0, w, h);
        vpW = w;
        vpH = h;
      }

      // Resolution uniform — only when dimensions actually changed
      if (w !== resW || h !== resH) {
        gl.uniform2f(uRes, w, h);
        resW = w;
        resH = h;
      }

      // These three uniforms change every frame — upload them unconditionally
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform1f(uArms, armCountRef.current);
      gl.uniform1f(uSpd, speedRef.current);
      gl.uniform1f(uIntens, intensityRef.current);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener("visibilitychange", onVisChange);
      ro.disconnect();
      cancelAnimationFrame(animId);
      gl.useProgram(null);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      gl.deleteBuffer(vbo);
      gl.deleteProgram(prog);
    };
    // Intentionally empty dep array — all prop values flow through refs.
    // This prevents WebGL teardown/rebuild whenever armCount/speed/intensity
    // or visible changes, which was the original source of jank on prop updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block", background: "#000" }}
    />
  );
};

export default ElectricBlast;
