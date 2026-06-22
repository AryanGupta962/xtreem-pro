"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { LuZap, LuActivity, LuLeaf, LuTrendingDown } from "react-icons/lu";
import { FaRunning, FaLemon } from "react-icons/fa";
import { TbLetterB } from "react-icons/tb";
import type { IconType } from "react-icons";
import Image from "next/image";

// ─────────────────────────────────────────────
// LIGHTNING COMPONENT
// ─────────────────────────────────────────────
interface LightningProps {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
  className?: string;
}

const Lightning: React.FC<LightningProps> = ({
  hue = 80,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
    });
    if (!gl) return;

    const vert = `
      attribute vec2 aPosition;
      void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
    `;

    const frag = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;
      #define OCTAVE_COUNT 10
      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);
        return c.z * mix(vec3(1.0), rgb, c.y);
      }
      float hash11(float p) {
        p = fract(p*.1031); p *= p+33.33; p *= p+p; return fract(p);
      }
      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx)*.1031);
        p3 += dot(p3, p3.yzx+33.33);
        return fract((p3.x+p3.y)*p3.z);
      }
      mat2 rotate2d(float t) {
        float c=cos(t),s=sin(t); return mat2(c,-s,s,c);
      }
      float noise(vec2 p) {
        vec2 ip=floor(p), fp=fract(p);
        float a=hash12(ip),b=hash12(ip+vec2(1,0)),
              c=hash12(ip+vec2(0,1)),d=hash12(ip+vec2(1,1));
        vec2 t=smoothstep(0.0,1.0,fp);
        return mix(mix(a,b,t.x),mix(c,d,t.x),t.y);
      }
      float fbm(vec2 p) {
        float v=0.0,a=0.5;
        for(int i=0;i<OCTAVE_COUNT;++i){
          v+=a*noise(p); p*=rotate2d(0.45); p*=2.0; a*=0.5;
        }
        return v;
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        uv = 2.0*uv-1.0;
        uv.x *= iResolution.x/iResolution.y;
        uv.x += uXOffset;
        uv += 2.0*fbm(uv*uSize+0.8*iTime*uSpeed)-1.0;
        float dist = abs(uv.x);
        vec3 base = hsv2rgb(vec3(uHue/360.0,0.7,0.8));
        vec3 col = base * pow(mix(0.0,0.07,hash11(iTime*uSpeed))/dist,1.0)*uIntensity;
        float a = clamp(max(col.r,max(col.g,col.b)),0.0,1.0);
        gl_FragColor = vec4(col,a);
      }
    `;

    const compile = (src: string, type: number) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(vert, gl.VERTEX_SHADER));
    gl.attachShader(prog, compile(frag, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, "aPosition");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "iResolution");
    const uTime = gl.getUniformLocation(prog, "iTime");
    const uHueLoc = gl.getUniformLocation(prog, "uHue");
    const uX = gl.getUniformLocation(prog, "uXOffset");
    const uSpd = gl.getUniformLocation(prog, "uSpeed");
    const uInt = gl.getUniformLocation(prog, "uIntensity");
    const uSz = gl.getUniformLocation(prog, "uSize");

    const t0 = performance.now();
    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform1f(uHueLoc, hue);
      gl.uniform1f(uX, xOffset);
      gl.uniform1f(uSpd, speed);
      gl.uniform1f(uInt, intensity);
      gl.uniform1f(uSz, size);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
};

// ─────────────────────────────────────────────
// LIGHT RAYS COMPONENT
// ─────────────────────────────────────────────
type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "right"
  | "left"
  | "bottom-center"
  | "bottom-right"
  | "bottom-left";

interface LightRaysProps {
  raysOrigin?: RaysOrigin;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  pulsating?: boolean;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
  className?: string;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m
    ? [
        parseInt(m[1], 16) / 255,
        parseInt(m[2], 16) / 255,
        parseInt(m[3], 16) / 255,
      ]
    : [1, 1, 1];
};

const getAnchorAndDir = (
  origin: RaysOrigin,
  w: number,
  h: number,
): { anchor: [number, number]; dir: [number, number] } => {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [0, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [0, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [0.5 * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [w, (1 + outside) * h], dir: [0, -1] };
    default:
      return { anchor: [0.5 * w, -outside * h], dir: [0, 1] };
  }
};

const LightRays: React.FC<LightRaysProps> = ({
  raysOrigin = "top-center",
  raysColor = "#c8ff00",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  pulsating = false,
  fadeDistance = 1.0,
  saturation = 1.0,
  followMouse = true,
  mouseInfluence = 0.08,
  noiseAmount = 0.0,
  distortion = 0.0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniformsRef = useRef<Record<string, { value: unknown }> | null>(null);
  const rendererRef = useRef<unknown>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const smoothMouseRef = useRef({ x: 0.5, y: 0.5 });
  const animIdRef = useRef<number | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.1 },
    );
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || !containerRef.current) return;
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    let cancelled = false;

    const init = async () => {
      if (!containerRef.current) return;
      await new Promise((r) => setTimeout(r, 10));
      if (cancelled || !containerRef.current) return;

      // Dynamically import OGL to avoid SSR issues
      const { Renderer, Program, Triangle, Mesh } = await import("ogl");

      const renderer = new Renderer({
        dpr: Math.min(window.devicePixelRatio, 2),
        alpha: true,
      });
      rendererRef.current = renderer;
      const gl = renderer.gl;
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      while (containerRef.current!.firstChild)
        containerRef.current!.removeChild(containerRef.current!.firstChild);
      containerRef.current!.appendChild(gl.canvas);

      const vert = `
        attribute vec2 position;
        varying vec2 vUv;
        void main(){vUv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}
      `;

      const frag = `precision highp float;
        uniform float iTime;uniform vec2 iResolution;uniform vec2 rayPos;uniform vec2 rayDir;
        uniform vec3 raysColor;uniform float raysSpeed;uniform float lightSpread;
        uniform float rayLength;uniform float pulsating;uniform float fadeDistance;
        uniform float saturation;uniform vec2 mousePos;uniform float mouseInfluence;
        uniform float noiseAmount;uniform float distortion;
        varying vec2 vUv;
        float noise(vec2 st){return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);}
        float rayStrength(vec2 src,vec2 refDir,vec2 coord,float sA,float sB,float spd){
          vec2 toC=coord-src;vec2 dn=normalize(toC);float ca=dot(dn,refDir);
          float da=ca+distortion*sin(iTime*2.0+length(toC)*0.01)*0.2;
          float sf=pow(max(da,0.0),1.0/max(lightSpread,0.001));
          float dist=length(toC);float mD=iResolution.x*rayLength;
          float lf=clamp((mD-dist)/mD,0.0,1.0);
          float ff=clamp((iResolution.x*fadeDistance-dist)/(iResolution.x*fadeDistance),0.5,1.0);
          float pulse=pulsating>0.5?(0.8+0.2*sin(iTime*spd*3.0)):1.0;
          float bs=clamp((0.45+0.15*sin(da*sA+iTime*spd))+(0.3+0.2*cos(-da*sB+iTime*spd)),0.0,1.0);
          return bs*lf*ff*sf*pulse;
        }
        void main(){
          vec2 coord=vec2(gl_FragCoord.x,iResolution.y-gl_FragCoord.y);
          vec2 frd=rayDir;
          if(mouseInfluence>0.0){
            vec2 msp=mousePos*iResolution.xy;
            vec2 md=normalize(msp-rayPos);
            frd=normalize(mix(rayDir,md,mouseInfluence));
          }
          vec4 r1=vec4(1.0)*rayStrength(rayPos,frd,coord,36.2214,21.11349,1.5*raysSpeed);
          vec4 r2=vec4(1.0)*rayStrength(rayPos,frd,coord,22.3991,18.0234,1.1*raysSpeed);
          vec4 fc=r1*0.5+r2*0.4;
          if(noiseAmount>0.0){float n=noise(coord*0.01+iTime*0.1);fc.rgb*=(1.0-noiseAmount+noiseAmount*n);}
          float bright=1.0-(coord.y/iResolution.y);
          fc.x*=0.1+bright*0.8;fc.y*=0.3+bright*0.6;fc.z*=0.5+bright*0.5;
          if(saturation!=1.0){float g=dot(fc.rgb,vec3(0.299,0.587,0.114));fc.rgb=mix(vec3(g),fc.rgb,saturation);}
          fc.rgb*=raysColor;
          gl_FragColor=fc;
        }
      `;

      const uniforms = {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] as [number, number] },
        rayPos: { value: [0, 0] as [number, number] },
        rayDir: { value: [0, 1] as [number, number] },
        raysColor: { value: hexToRgb(raysColor) as [number, number, number] },
        raysSpeed: { value: raysSpeed },
        lightSpread: { value: lightSpread },
        rayLength: { value: rayLength },
        pulsating: { value: pulsating ? 1.0 : 0.0 },
        fadeDistance: { value: fadeDistance },
        saturation: { value: saturation },
        mousePos: { value: [0.5, 0.5] as [number, number] },
        mouseInfluence: { value: mouseInfluence },
        noiseAmount: { value: noiseAmount },
        distortion: { value: distortion },
      };
      uniformsRef.current = uniforms;

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms,
      });
      const mesh = new Mesh(gl, { geometry, program });

      const updatePlacement = () => {
        if (!containerRef.current) return;
        renderer.dpr = Math.min(window.devicePixelRatio, 2);
        const { clientWidth: wCSS, clientHeight: hCSS } = containerRef.current;
        renderer.setSize(wCSS, hCSS);
        const dpr = renderer.dpr;
        const w = wCSS * dpr,
          h = hCSS * dpr;
        uniforms.iResolution.value = [w, h];
        const { anchor, dir } = getAnchorAndDir(raysOrigin, w, h);
        uniforms.rayPos.value = anchor;
        uniforms.rayDir.value = dir;
      };

      const loop = (t: number) => {
        if (cancelled) return;
        uniforms.iTime.value = t * 0.001;
        if (followMouse && mouseInfluence > 0) {
          const sm = 0.92;
          smoothMouseRef.current.x =
            smoothMouseRef.current.x * sm + mouseRef.current.x * (1 - sm);
          smoothMouseRef.current.y =
            smoothMouseRef.current.y * sm + mouseRef.current.y * (1 - sm);
          uniforms.mousePos.value = [
            smoothMouseRef.current.x,
            smoothMouseRef.current.y,
          ];
        }
        try {
          renderer.render({ scene: mesh });
        } catch {
          return;
        }
        animIdRef.current = requestAnimationFrame(loop);
      };

      window.addEventListener("resize", updatePlacement);
      updatePlacement();
      animIdRef.current = requestAnimationFrame(loop);

      cleanupRef.current = () => {
        cancelled = true;
        if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
        window.removeEventListener("resize", updatePlacement);
        try {
          const loseExt = gl.getExtension("WEBGL_lose_context");
          if (loseExt) loseExt.loseContext();
        } catch {
          /* ignore */
        }
      };
    };

    init();
    return () => {
      cancelled = true;
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [
    visible,
    raysOrigin,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    pulsating,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      };
    };
    if (followMouse) {
      window.addEventListener("mousemove", onMove);
      return () => window.removeEventListener("mousemove", onMove);
    }
  }, [followMouse]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full pointer-events-none overflow-hidden relative ${className}`}
    />
  );
};

// ─────────────────────────────────────────────
// PARTICLE SYSTEM
// ─────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  type: "spark" | "glow" | "dust";
}

const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticle = () => {
      const cx = canvas.width * 0.5;
      const cy = canvas.height * 0.55;
      const angle = Math.random() * Math.PI * 2;
      const radius = 80 + Math.random() * 120;
      const type: Particle["type"] =
        Math.random() < 0.4 ? "spark" : Math.random() < 0.6 ? "glow" : "dust";

      particles.current.push({
        x: cx + Math.cos(angle) * radius * (0.5 + Math.random() * 0.5),
        y: cy + Math.sin(angle) * radius * 0.4,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -(0.3 + Math.random() * 1.2),
        life: 0,
        maxLife: 60 + Math.random() * 120,
        size: type === "spark" ? 1 + Math.random() * 2 : 2 + Math.random() * 5,
        type,
      });
    };

    let frame = 0;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      if (frame % 3 === 0) spawnParticle();
      if (particles.current.length > 120)
        particles.current = particles.current.slice(-100);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005;
        p.vx *= 0.99;
        p.life++;
        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) continue;

        ctx.save();
        ctx.globalAlpha = alpha * 0.85;

        if (p.type === "spark") {
          ctx.strokeStyle = "#c8ff00";
          ctx.lineWidth = p.size * 0.5;
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#c8ff00";
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - p.vx * 5, p.y - p.vy * 5);
          ctx.stroke();
        } else if (p.type === "glow") {
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 3,
          );
          grad.addColorStop(0, "rgba(200,255,0,0.9)");
          grad.addColorStop(0.4, "rgba(150,255,0,0.3)");
          grad.addColorStop(1, "rgba(100,200,0,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "rgba(200,255,100,0.5)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      particles.current = particles.current.filter((p) => p.life < p.maxLife);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 4 }}
    />
  );
};

// ─────────────────────────────────────────────
// USP ICON TILE  (matches reference: hex-cut border, lime icon, dark glass fill)
// ─────────────────────────────────────────────
const UspIconTile: React.FC<{ Icon: IconType }> = ({ Icon }) => (
  <div
    className="relative flex h-14 w-14 shrink-0 items-center justify-center"
    style={{
      clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
      background:
        "linear-gradient(155deg, rgba(180,255,0,0.14) 0%, rgba(0,0,0,0.5) 60%)",
      border: "1px solid rgba(190,255,0,0.55)",
      boxShadow:
        "0 0 14px rgba(170,255,0,0.25), inset 0 0 10px rgba(170,255,0,0.08)",
    }}
  >
    <Icon className="h-6 w-6 text-lime-400 drop-shadow-[0_0_6px_rgba(190,255,0,0.8)]" />
  </div>
);

// ─────────────────────────────────────────────
// USP CARD  (Image 1 style: icon + title + description, bordered card)
// ─────────────────────────────────────────────
const UspCard: React.FC<{
  Icon: IconType;
  title: string;
  delay: number;
}> = ({ Icon, title, delay }) => (
  <div
    className="group relative flex flex-col items-center gap-4 rounded-xl  bg-gradient-to-b from-white/[0.04] to-black/40 p-5 opacity-0 backdrop-blur-sm transition-colors duration-300 animate-fadeInUp hover:border-lime-400/60"
    style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
  >
    <UspIconTile Icon={Icon} />
    <div className="min-w-0 pt-0.5">
      <h3 className="mb-1.5 text-sm font-black uppercase leading-tight tracking-wide text-white">
        {title}
      </h3>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// MAIN HERO SECTION
// ─────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const canFloatRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [videoReady, setVideoReady] = useState(false);

  // Scroll-driven animation using native scroll
  const onScroll = useCallback(() => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    setScrollY(y);

    if (y < vh * 0.3) setPhase(1);
    else if (y < vh * 1.2) setPhase(2);
    else setPhase(3);

    // Trigger video autoplay when entering phase 3
    if (y > vh * 1.1 && videoRef.current && !videoReady) {
      videoRef.current.play().catch(() => {});
      setVideoReady(true);
    }
  }, [videoReady]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // Smooth parallax values
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const phase1Progress = Math.min(scrollY / (vh * 0.8), 1);
  const phase2Progress = Math.max(
    0,
    Math.min((scrollY - vh * 0.8) / (vh * 0.6), 1),
  );

  const phase1Opacity = Math.max(0, 1 - phase1Progress * 1.5);
  const phase1Y = -phase1Progress * 120;
  const canScale = 1 + phase1Progress * 0.08;
  const canY = phase1Progress * -40;

  return (
    <>
      {/* ── KEYFRAME STYLES ── */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-18px) rotate(1deg); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.08); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(10px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes ringPulse {
          0%   { transform: translate(-50%, -50%) scale(0.75); opacity: 0.55; }
          100% { transform: translate(-50%, -50%) scale(1.7); opacity: 0; }
        }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-3px); }
        }
        .animate-float        { animation: float 4s ease-in-out infinite; }
        .animate-glowPulse    { animation: glowPulse 2.5s ease-in-out infinite; }
        .animate-fadeInUp     { animation: fadeInUp 0.8s ease forwards; }
        .animate-fadeIn       { animation: fadeIn 1s ease forwards; }
        .animate-scrollBounce { animation: scrollBounce 1.5s ease-in-out infinite; }
        .animate-badgeFloat   { animation: badgeFloat 3s ease-in-out infinite; }

        .text-shimmer {
          background: linear-gradient(90deg, #c8ff00 20%, #ffffff 50%, #c8ff00 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        .ring-pulse {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 280px;
          height: 280px;
          border-radius: 9999px;
          border: 1px solid rgba(190,255,0,0.5);
          animation: ringPulse 2.4s ease-out infinite;
        }
        .ring-pulse-delay {
          animation-delay: 1.2s;
        }

        /* Smooth scroll feel */
        html { scroll-behavior: smooth; }
      `}</style>

      {/* ── OUTER WRAPPER: scroll travel for hero + USP reveal ── */}
      <div style={{ height: "300vh" }} className="relative">
        {/* ── STICKY CONTAINER ── */}
        <section
          ref={sectionRef}
          className="sticky top-0 h-screen w-full overflow-hidden bg-black"
          style={{ zIndex: 10 }}
        >
          {/* ╔══════════════════════════════════════╗ */}
          {/* ║   PHASE 1: ENERGY REVEAL (WELCOME)   ║ */}
          {/* ╚══════════════════════════════════════╝ */}
          <div
            ref={phase1Ref}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: phase1Opacity,
              transform: `translateY(${phase1Y}px)`,
              transition: "opacity 0.05s linear",
              zIndex: 10,
              pointerEvents: phase === 1 ? "auto" : "none",
            }}
          >
            {/* Background texture */}
            <div className="absolute inset-0 bg-black" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(100,160,0,0.08) 0%, transparent 70%)",
              }}
            />

            {/* LIGHTNING — left bolt */}
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
              <Lightning
                hue={82}
                xOffset={-1.5}
                speed={0.6}
                intensity={1.3}
                size={2}
                className="opacity-75"
              />
            </div>

            {/* LIGHTNING — right bolt */}
            <div className="absolute inset-0" style={{ zIndex: 1 }}>
              <Lightning
                hue={82}
                xOffset={1.5}
                speed={1.1}
                intensity={1.4}
                size={2}
                className="opacity-65"
              />
            </div>

            {/* LIGHT RAYS */}
            <div className="absolute inset-0" style={{ zIndex: 2 }}>
              <LightRays
                raysOrigin="top-center"
                raysColor="#b8f000"
                raysSpeed={0.6}
                lightSpread={1.8}
                rayLength={2.2}
                pulsating
                fadeDistance={1.2}
                saturation={1.4}
                followMouse
                mouseInfluence={0.06}
                noiseAmount={0.05}
                distortion={0.15}
              />
            </div>

            {/* Particle system */}
            <ParticleCanvas />

            {/* PRODUCT CAN — focal point with pulsing energy ring behind it */}
            <div
              ref={canFloatRef}
              className="absolute flex justify-center left-1/2 pointer-events-none select-none"
              style={{
                top: "14%",
                zIndex: 6,
                transform: `translateX(-50%) translateY(${canY}px) scale(${canScale})`,
              }}
            >
              {/* Pulsing rings behind the can to draw the eye */}
              <div className="ring-pulse" />
              <div className="ring-pulse ring-pulse-delay" />
              <Image
                src="/images/can.png"
                alt="Xtreem Pro XP energy drink can"
                width={208}
                height={520}
                className="relative animate-float w-36 sm:w-44 md:w-52 h-auto drop-shadow-2xl"
                style={{
                  filter:
                    "drop-shadow(0 0 30px rgba(160,230,0,0.5)) drop-shadow(0 0 60px rgba(100,180,0,0.25))",
                }}
                priority
              />{" "}
            </div>

            {/* CONTENT OVERLAY */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6"
              style={{ zIndex: 8 }}
            >
              {/* Sub-label above headline */}
              <div
                className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-white/50 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "300ms",
                  animationFillMode: "forwards",
                }}
              >
                Charged. Clean. Unstoppable.
              </div>

              {/* Headline */}
              <h1
                className="text-center uppercase font-black leading-[0.95] mb-4 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "450ms",
                  animationFillMode: "forwards",
                  fontSize: "clamp(2.6rem, 9vw, 4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="text-shimmer">Premium Energy</span>
              </h1>


              {/* Scroll indicator */}
              <div
                className="flex flex-col items-center opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "800ms",
                  animationFillMode: "forwards",
                }}
              >
                <span className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                  Scroll to explore
                </span>
                <div className="h-9 w-5 rounded-full border border-lime-400/40 p-1">
                  <div className="h-1.5 w-1.5 animate-scrollBounce rounded-full bg-lime-400 shadow-[0_0_6px_rgba(190,255,0,0.9)]" />
                </div>
              </div>
            </div>
          </div>

          {/* ╔══════════════════════════════════════╗ */}
          {/* ║      PHASE 2: SCROLL TRANSITION      ║ */}
          {/* ╚══════════════════════════════════════╝ */}
          <div
            ref={phase2Ref}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center"
            style={{
              opacity: phase2Progress,
              transform: `translateY(${(1 - phase2Progress) * 60}px)`,
              zIndex: 9,
              pointerEvents: phase === 2 ? "auto" : "none",
            }}
          >
            {/* Dark overlay with energy pulse */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(50,80,0,0.3) 0%, rgba(0,0,0,0.95) 100%)",
              }}
            />

            {/* Cinematic text reveal */}
            <div className="relative z-10 mb-10 text-center px-6">
              <div
                className="text-lime-400/60 text-xs font-bold tracking-[0.5em] uppercase mb-6"
                style={{ opacity: phase2Progress }}
              >
                The Science Behind the Surge
              </div>
              <div
                className="font-black text-white leading-none mb-4"
                style={{
                  fontSize: "clamp(2rem, 6vw, 4.5rem)",
                  opacity: phase2Progress,
                  transform: `scale(${0.9 + phase2Progress * 0.1})`,
                  letterSpacing: "-0.02em",
                }}
              >
                75mg <span className="text-lime-400">Natural Caffeine.</span>
                <br />
                <span className="text-white/40">18 Month Shelf Life.</span>
                <br />
                Zero Compromise.
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <UspCard Icon={TbLetterB} title="B-Vitamin Complex" delay={240} />
              <UspCard Icon={LuLeaf} title="Natural Caffeine" delay={240} />
              <UspCard
                Icon={LuTrendingDown}
                title="No Sugar Crash"
                delay={360}
              />
            </div>
          </div>

          {/* ╔══════════════════════════════════════╗ */}
          {/* ║         PHASE 3: VIDEO REVEAL        ║ */}
          {/* ╚══════════════════════════════════════╝ */}
          <div
            ref={phase3Ref}
            className="absolute inset-0 w-full h-full"
            style={{
              opacity: Math.max(0, phase2Progress - 0.6) / 0.4,
              zIndex: phase2Progress > 0.6 ? 11 : 8,
              pointerEvents: phase === 3 ? "auto" : "none",
            }}
          >
            {/* Background video */}
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 h-full w-full object-fill object-center"
            >
              <source src="/videos/hero-3.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
      </div>
    </>
  );
}
