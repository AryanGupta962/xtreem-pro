"use client";

/**
 * BenefitsSection.tsx
 * Xtreem Pro XP — "CHARGE SEQUENCE" Benefits section
 *
 * Concept: the can is a battery in a charging dock. A vertical current
 * meter runs the section's full height. As the user scrolls, charge
 * fills, electricity arcs up into the can, and each benefit unlocks as
 * a HUD readout exactly when the charge bar crosses its threshold.
 * At 100% charge the section flashes white-hot and locks in all six
 * stats simultaneously — the "moment of activation."
 *
 * Self-contained, single-file Next.js (App Router) client component.
 *
 * Requirements:
 *   npm install gsap
 *
 * Fonts (optional, add to root layout for full effect):
 *   Rajdhani (display) + JetBrains Mono or Space Mono (data readouts) + Inter (body)
 *   import { Rajdhani, JetBrains_Mono, Inter } from "next/font/google";
 *   Falls back to system fonts cleanly if omitted.
 *
 * Image:
 *   Place your product can image at /public/images/can.png
 *   (transparent background PNG, can isolated, recommended).
 */

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ============================================
   STATIC CONTENT
   threshold = % charge at which this stat locks in (0-100)
   ============================================ */
type Benefit = {
  threshold: number;
  spec: string;
  title: string;
  desc: string;
  side: "left" | "right";
  icon: React.ReactNode;
};

const BENEFITS: Benefit[] = [
  {
    threshold: 8,
    spec: "75MG",
    side: "left",
    title: "Precision Energy,\nZero Crash",
    desc: "Natural caffeine. Smooth boost, no jitters.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M26 4 10 28h10l-2 16 18-26H26l2-14Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    threshold: 24,
    spec: "B2·B3·B6·B12",
    side: "right",
    title: "The Ultimate\nPower Matrix",
    desc: "High-performance B-vitamin complex.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="4" fill="currentColor" />
        <circle cx="24" cy="8" r="3.5" fill="currentColor" />
        <circle cx="38" cy="16" r="3.5" fill="currentColor" />
        <circle cx="38" cy="32" r="3.5" fill="currentColor" />
        <circle cx="24" cy="40" r="3.5" fill="currentColor" />
        <circle cx="10" cy="32" r="3.5" fill="currentColor" />
        <circle cx="10" cy="16" r="3.5" fill="currentColor" />
        <path
          d="M24 24 24 8M24 24 38 16M24 24 38 32M24 24 24 40M24 24 10 32M24 24 10 16"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    threshold: 41,
    spec: "TAURINE+",
    side: "left",
    title: "Wired for\nPeak Endurance",
    desc: "Taurine-infused for sharper reflexes and stamina.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M8 38c8-2 10-10 10-16s4-12 10-14c-2 6 0 10 4 12s8 2 8 10-6 12-14 12-14-2-18-4Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    threshold: 58,
    spec: "0% SYNTH",
    side: "right",
    title: "100% Clean\nFormulation",
    desc: "Lab-certified. Zero synthetic colors.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M24 6 40 14v12c0 11-7 17-16 20-9-3-16-9-16-20V14l16-8Z"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M17 24l5 5 9-11"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    threshold: 75,
    spec: "REAL CARBS",
    side: "left",
    title: "Real Fuel,\nNo Fakes",
    desc: "Hard-hitting carbohydrate energy, nothing synthetic.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M10 30h28M10 30c0-8 6-18 14-18s14 10 14 18M10 30v4a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4v-4"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    threshold: 92,
    spec: "0PPM METALS",
    side: "right",
    title: "Certified\nPristine",
    desc: "Rigorously lab-tested. Zero heavy metals detected.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none">
        <path
          d="M24 4v6M24 38v6M4 24h6M38 24h6M9.5 9.5l4.2 4.2M34.3 34.3l4.2 4.2M9.5 38.5l4.2-4.2M34.3 13.7l4.2-4.2"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2.5" />
      </svg>
    ),
  },
];

type Bolt = { id: number; path: string; delay: number; dur: number };

/** Generate a jagged lightning-bolt SVG path between two points. */
function makeBoltPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  segments = 6,
  jitter = 14,
): string {
  const pts: [number, number][] = [[x1, y1]];
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const bx = x1 + (x2 - x1) * t + (Math.random() - 0.5) * jitter;
    const by = y1 + (y2 - y1) * t + (Math.random() - 0.5) * jitter;
    pts.push([bx, by]);
  }
  pts.push([x2, y2]);
  return pts
    .map(
      ([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`,
    )
    .join(" ");
}

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canWrapRef = useRef<HTMLDivElement>(null);
  const canImgRef = useRef<HTMLImageElement>(null);
  const meterFillRef = useRef<HTMLDivElement>(null);
  const meterPctRef = useRef<HTMLSpanElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const boltsGroupRef = useRef<SVGGElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tracePathRefs = useRef<(SVGPathElement | null)[]>([]);
  const lockedRef = useRef<boolean[]>(BENEFITS.map(() => false));
  const overloadFiredRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canWrap = canWrapRef.current;
    const meterFill = meterFillRef.current;
    const meterPct = meterPctRef.current;
    if (!section || !stage || !canWrap || !meterFill || !meterPct) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isMobile = () => window.innerWidth <= 1024;

    /* ---- dynamic trace paths: meter -> card nodes ---- */
    function updateTracePaths() {
      if (isMobile() || !stage) return;
      const stageRect = stage.getBoundingClientRect();

      cardRefs.current.forEach((card, i) => {
        const path = tracePathRefs.current[i];
        if (!path || !card || !canWrap) return;
        const cardRect = card.getBoundingClientRect();
        const canRect = canWrap.getBoundingClientRect();
        const isLeft = BENEFITS[i].side === "left";
        const startX = canRect.left + canRect.width / 2 - stageRect.left;
        const startY =
          canRect.top +
          canRect.height * (1 - BENEFITS[i].threshold / 100) -
          stageRect.top;
        const endX = isLeft
          ? cardRect.right - stageRect.left
          : cardRect.left - stageRect.left;
        const endY = cardRect.top + cardRect.height / 2 - stageRect.top;

        const scaleX = 1600 / stageRect.width;
        const scaleY = 1000 / stageRect.height;
        const sx = startX * scaleX,
          sy = startY * scaleY;
        const ex = endX * scaleX,
          ey = endY * scaleY;
        const midX = (sx + ex) / 2;
        path.setAttribute(
          "d",
          `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`,
        );
      });
    }

    /* ---- electric bolt spawner (around the can, intensifies with charge) ---- */
    let boltTimer: ReturnType<typeof setTimeout> | null = null;
    let currentCharge = 0;

    function spawnBolt() {
      const group = boltsGroupRef.current;
      if (!group || prefersReducedMotion) return;
      const intensity = currentCharge / 100;
      if (Math.random() > 0.25 + intensity * 0.5) {
        scheduleBolt();
        return;
      }
      const cx = 800,
        cy = 500;
      const angle = Math.random() * Math.PI * 2;
      const radius = 90 + Math.random() * 60;
      const x2 = cx + Math.cos(angle) * radius;
      const y2 = cy + Math.sin(angle) * radius * 1.3;
      const d = makeBoltPath(cx, cy - 60 + Math.random() * 120, x2, y2, 5, 18);

      const ns = "http://www.w3.org/2000/svg";
      const path = document.createElementNS(ns, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", "bx-bolt");
      path.setAttribute("stroke", Math.random() > 0.5 ? "#d4ff2e" : "#00f0ff");
      group.appendChild(path);

      gsap.fromTo(
        path,
        { opacity: 0, strokeDashoffset: 200 },
        {
          opacity: 1,
          strokeDashoffset: 0,
          duration: 0.12,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(path, {
              opacity: 0,
              duration: 0.18,
              delay: 0.04,
              onComplete: () => path.remove(),
            });
          },
        },
      );
      gsap.set(path, { strokeDasharray: 200 });

      scheduleBolt();
    }

    function scheduleBolt() {
      const intensity = currentCharge / 100;
      const delay = 900 - intensity * 700 + Math.random() * 400;
      boltTimer = setTimeout(spawnBolt, delay);
    }

    /* ---- GSAP scroll choreography ---- */
    const ctxGsap = gsap.context(() => {
      // Header entrance
      gsap.from(".bx-eyebrow", {
        scrollTrigger: { trigger: section, start: "top 80%" },
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".bx-title-line", {
        scrollTrigger: { trigger: section, start: "top 80%" },
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.9,
        ease: "power4.out",
      });

      // Can dock entrance
      gsap.from(canWrap, {
        scrollTrigger: { trigger: section, start: "top 75%" },
        opacity: 0,
        y: 70,
        scale: 0.85,
        duration: 1,
        ease: "power4.out",
      });

      // MASTER CHARGE TIMELINE — scroll-scrubbed across the whole section
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100);
            currentCharge = pct;
            if (meterPct) meterPct.textContent = String(pct);

            // unlock benefit cards at threshold crossings
            BENEFITS.forEach((b, i) => {
              const card = cardRefs.current[i];
              if (!card) return;
              if (pct >= b.threshold && !lockedRef.current[i]) {
                lockedRef.current[i] = true;
                gsap
                  .timeline()
                  .to(card, { opacity: 1, duration: 0.05 })
                  .fromTo(
                    card,
                    {
                      x: b.side === "left" ? -50 : 50,
                      scale: 0.88,
                      filter: "blur(5px)",
                    },
                    {
                      x: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      duration: 0.55,
                      ease: "back.out(1.7)",
                    },
                    0,
                  );
                const tag = card.querySelector(".bx-card-spec");
                if (tag) {
                  gsap.fromTo(
                    tag,
                    { opacity: 0.2 },
                    { opacity: 1, duration: 0.05, repeat: 4, yoyo: true },
                  );
                }
                const tracePath = tracePathRefs.current[i];
                if (tracePath && !isMobile()) {
                  let len = 500;
                  try {
                    len = tracePath.getTotalLength();
                  } catch {}
                  gsap.fromTo(
                    tracePath,
                    { strokeDasharray: len, strokeDashoffset: len, opacity: 0 },
                    {
                      strokeDashoffset: 0,
                      opacity: 1,
                      duration: 0.5,
                      ease: "power2.out",
                    },
                  );
                }
              } else if (pct < b.threshold && lockedRef.current[i]) {
                lockedRef.current[i] = false;
                gsap.to(card, { opacity: 0, duration: 0.2 });
                const tracePath = tracePathRefs.current[i];
                if (tracePath)
                  gsap.to(tracePath, { opacity: 0, duration: 0.2 });
              }
            });

            // 100% overload flash
            if (pct >= 99 && !overloadFiredRef.current) {
              overloadFiredRef.current = true;
              if (flashRef.current && !prefersReducedMotion) {
                gsap
                  .timeline()
                  .to(flashRef.current, {
                    opacity: 0.9,
                    duration: 0.08,
                    ease: "power1.in",
                  })
                  .to(flashRef.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out",
                  });
                gsap.to(canWrap, {
                  scale: 1.04,
                  duration: 0.1,
                  yoyo: true,
                  repeat: 3,
                  ease: "power1.inOut",
                });
              }
            } else if (pct < 95 && overloadFiredRef.current) {
              overloadFiredRef.current = false;
            }
          },
        },
      });

      // meter fill (height-based)
      master.fromTo(
        meterFill,
        { height: "0%" },
        { height: "100%", ease: "none" },
        0,
      );

      // can rises slightly + subtle rotation as it charges
      if (!prefersReducedMotion) {
        master.fromTo(
          canWrap,
          { y: 10, rotateZ: -1.5 },
          { y: -18, rotateZ: 1.5, ease: "none" },
          0,
        );
      }

      // can glow intensity tied to charge
      master.fromTo(
        ".bx-can-glow",
        { opacity: 0.25, scale: 0.85 },
        { opacity: 1, scale: 1.15, ease: "none" },
        0,
      );
      master.fromTo(
        ".bx-can-rim",
        { opacity: 0 },
        { opacity: 1, ease: "none" },
        0,
      );

      // frame brackets
      gsap.from(".bx-frame-corner", {
        scrollTrigger: { trigger: section, start: "top 70%" },
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        stagger: 0.06,
        ease: "back.out(2)",
      });

      ScrollTrigger.addEventListener("refresh", updateTracePaths);
      ScrollTrigger.refresh();
    }, section);

    /* ---- hover tilt on cards (desktop) ---- */
    const tiltCleanups: (() => void)[] = [];
    if (!prefersReducedMotion && !isMobile()) {
      cardRefs.current.forEach((card) => {
        if (!card) return;
        const onMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateX: py * -8,
            rotateY: px * 8,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 600,
          });
        };
        const onLeave = () =>
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.55,
            ease: "power3.out",
          });
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        tiltCleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    requestAnimationFrame(updateTracePaths);
    if (!prefersReducedMotion) scheduleBolt();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateTracePaths();
        ScrollTrigger.refresh();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (boltTimer) clearTimeout(boltTimer);
      tiltCleanups.forEach((fn) => fn());
      ctxGsap.revert();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        .bx-section{
          --void: #020503;
          --void-2: #000100;
          --panel: #0a0f0a;
          --lime: #d4ff2e;
          --cyan: #00f0ff;
          --red: #ff3d6e;
          --ink: #ffffff;
          --muted: #8a9a90;
          --muted-dim: #46524a;
          --font-display: 'Rajdhani', 'Arial Narrow', sans-serif;
          --font-mono: 'JetBrains Mono', 'Space Mono', monospace;
          position: relative;
          min-height: 100vh;
          max-height: 150vh;
          height: 145vh;
          background: var(--void);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          isolation: isolate;
          font-family: 'Inter', sans-serif;
          color: var(--ink);
        }
        @media (prefers-reduced-motion: reduce){
          .bx-section *{ animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }

        /* ---------- BACKGROUND ---------- */
        .bx-bg{ position:absolute; inset:0; z-index:0; pointer-events:none; }
        .bx-mesh{
          position:absolute; inset:-20%;
          background:
            radial-gradient(circle at 50% 30%, rgba(212,255,46,0.10) 0%, transparent 42%),
            radial-gradient(circle at 80% 75%, rgba(0,240,255,0.07) 0%, transparent 40%),
            radial-gradient(ellipse 80% 60% at 50% 40%, #07100a 0%, var(--void) 62%, var(--void-2) 100%);
          animation: bxMeshDrift 20s ease-in-out infinite alternate;
        }
        @keyframes bxMeshDrift{ 0%{ transform: translate(0,0) scale(1); } 100%{ transform: translate(-1.5%,1.5%) scale(1.04); } }
        .bx-hexgrid{
          position:absolute; inset:-10%;
          background-image:
            linear-gradient(60deg, rgba(212,255,46,0.035) 1px, transparent 1px),
            linear-gradient(-60deg, rgba(212,255,46,0.035) 1px, transparent 1px);
          background-size: 64px 110px;
          opacity:0.6;
          -webkit-mask-image: radial-gradient(ellipse 65% 60% at 50% 45%, black 0%, transparent 75%);
          mask-image: radial-gradient(ellipse 65% 60% at 50% 45%, black 0%, transparent 75%);
        }
        .bx-scanlines{
          position:absolute; inset:0;
          background: repeating-linear-gradient(to bottom, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px);
          opacity:0.5; mix-blend-mode: overlay;
        }
        .bx-vignette{
          position:absolute; inset:0;
          background:
            linear-gradient(to bottom, var(--void) 0%, transparent 14%, transparent 86%, var(--void) 100%),
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 36%, rgba(0,0,0,0.7) 100%);
        }
        .bx-flash{ position:absolute; inset:0; z-index:20; background:#fff; opacity:0; pointer-events:none; }

        /* ---------- HEADER ---------- */
        .bx-header{ position:relative; z-index:3; text-align:center; padding: clamp(2.2rem,5.5vh,4rem) 1.5rem 0; }
        .bx-eyebrow{
          font-family: var(--font-mono); font-size:0.78rem; font-weight:500; letter-spacing:0.38em;
          text-transform:uppercase; color:var(--lime); margin:0 0 0.85rem;
          text-shadow:0 0 14px rgba(212,255,46,0.6);
        }
        .bx-eyebrow::before{ content:'⚡ '; }
        .bx-title{ margin:0; font-family:var(--font-display); font-weight:700; line-height:0.9; text-transform:uppercase; }
        .bx-title-line{ display:block; font-size:clamp(2.4rem,6.8vw,5.2rem); font-style:italic; letter-spacing:0.005em; color:var(--ink); }
        .bx-title-line.accent{ color:var(--lime); text-shadow: 0 0 26px rgba(212,255,46,0.55), 0 0 64px rgba(212,255,46,0.22); }

        /* ---------- STAGE ---------- */
        .bx-stage{ position:relative; flex:1; z-index:2; display:flex; align-items:center; justify-content:center; padding:0.5rem 4vw 1.5rem; gap: clamp(1rem,3vw,3rem); }
        .bx-frame-corner{ position:absolute; width:34px; height:34px; z-index:3; pointer-events:none; border-color: rgba(212,255,46,0.45); opacity:0.85; }
        .bx-frame-corner.tl{ top:2%; left:2%; border-top:2px solid; border-left:2px solid; }
        .bx-frame-corner.tr{ top:2%; right:2%; border-top:2px solid; border-right:2px solid; }
        .bx-frame-corner.bl{ bottom:2%; left:2%; border-bottom:2px solid; border-left:2px solid; }
        .bx-frame-corner.br{ bottom:2%; right:2%; border-bottom:2px solid; border-right:2px solid; }

        .bx-traces{ position:absolute; inset:0; width:100%; height:100%; z-index:1; }
        .bx-trace-path{ fill:none; stroke:url(#bxTraceGrad); stroke-width:2; filter:url(#bxTraceGlow); stroke-linecap:round; opacity:0; }
        .bx-bolt{ fill:none; stroke-width: 1.6; filter: url(#bxBoltGlow); stroke-linecap:round; stroke-linejoin:round; }

        /* ---------- CHARGE METER ---------- */
        .bx-meter-col{ display:flex; flex-direction:column; align-items:center; gap:0.7rem; z-index:5; flex:none; }
        .bx-meter-label{ font-family:var(--font-mono); font-size:0.62rem; letter-spacing:0.18em; color:var(--muted); text-transform:uppercase; writing-mode: vertical-rl; transform:rotate(180deg); }
        .bx-meter-track{
          position:relative; width:14px; height: min(54vh, 480px);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
          border:1px solid rgba(212,255,46,0.25); border-radius:7px; overflow:hidden;
          box-shadow: inset 0 0 14px rgba(0,0,0,0.6);
        }
        .bx-meter-fill{
          position:absolute; bottom:0; left:0; width:100%; height:0%;
          background: linear-gradient(0deg, var(--lime) 0%, var(--cyan) 65%, #fff 100%);
          box-shadow: 0 0 16px 2px rgba(212,255,46,0.7), 0 0 30px 6px rgba(0,240,255,0.25);
        }
        .bx-meter-ticks{ position:absolute; inset:0; display:flex; flex-direction:column-reverse; justify-content:space-between; pointer-events:none; }
        .bx-meter-tick{ width:100%; height:1px; background: rgba(0,0,0,0.35); }
        .bx-meter-pct{ font-family:var(--font-mono); font-weight:700; font-size:1.1rem; color:var(--lime); text-shadow:0 0 10px rgba(212,255,46,0.7); }
        .bx-meter-pct::after{ content:'%'; font-size:0.7rem; opacity:0.7; margin-left:1px; }
        .bx-meter-status{ font-family:var(--font-mono); font-size:0.6rem; letter-spacing:0.12em; color:var(--muted-dim); text-transform:uppercase; }

        /* ---------- CAN DOCK ---------- */
        .bx-canwrap{
          position:relative; z-index:5; width:clamp(170px,17vw,270px); flex:none;
          display:flex; align-items:center; justify-content:center;
        }
        .bx-can-img-wrap{ position:relative; z-index:3; width:100%; }
        .bx-can-img{
          position:relative; z-index:3; width:100%; height:auto; display:block;
          filter:drop-shadow(0 30px 42px rgba(0,0,0,0.8));
          user-select:none; will-change:transform;
        }
        .bx-can-rim{
          position:absolute; inset:-2%; z-index:4; pointer-events:none; opacity:0;
          background: radial-gradient(ellipse 60% 90% at 50% 50%, transparent 55%, rgba(212,255,46,0.18) 75%, transparent 90%);
          mix-blend-mode: screen;
        }
        .bx-can-glow{
          position:absolute; inset:-45%; z-index:1; opacity:0.25;
          background: radial-gradient(circle, rgba(212,255,46,0.45) 0%, rgba(0,240,255,0.16) 42%, transparent 72%);
          filter:blur(24px);
        }
        .bx-can-dock{
          position:absolute; bottom:-6%; left:50%; width:78%; height:18px; transform:translateX(-50%);
          z-index:2; border-radius:50%;
          background: radial-gradient(ellipse, rgba(212,255,46,0.35) 0%, rgba(0,0,0,0.6) 70%);
          box-shadow: 0 0 22px 4px rgba(212,255,46,0.4);
        }
        .bx-can-shadow{
          position:absolute; bottom:-9%; left:50%; width:60%; height:12%; transform:translateX(-50%);
          background: radial-gradient(ellipse, rgba(0,0,0,0.75) 0%, transparent 70%); z-index:0; filter:blur(8px);
        }

        /* ---------- BENEFIT CARDS (HUD readouts, unlock by charge threshold) ---------- */
        .bx-cards{ position:absolute; inset:0; z-index:4; pointer-events:none; }
        .bx-card{
          position:absolute; width:clamp(205px,19vw,275px); padding:1.05rem 1.2rem 1.1rem;
          background: linear-gradient(160deg, rgba(10,15,10,0.94), rgba(4,7,5,0.88));
          border-radius:3px; backdrop-filter: blur(8px); pointer-events:auto; opacity:0;
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
        }
        .bx-card-border{
          position:absolute; inset:0; padding:1px; border-radius:3px;
          clip-path: polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px);
          background: linear-gradient(135deg, var(--lime), rgba(0,240,255,0.3) 45%, rgba(212,255,46,0.06) 70%, var(--cyan));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events:none; opacity:0.75;
        }
        .bx-card-node{
          position:absolute; top:50%; width:8px; height:8px; border-radius:50%; background:var(--lime);
          box-shadow:0 0 12px 3px rgba(212,255,46,0.85); transform:translateY(-50%);
        }
        .bx-card.left .bx-card-node{ right:-5px; }
        .bx-card.right .bx-card-node{ left:-5px; }
        .bx-card-top{ display:flex; align-items:flex-start; justify-content:space-between; gap:0.5rem; margin-bottom:0.65rem; }
        .bx-card-icon{ width:30px; height:30px; flex:none; color:var(--lime); filter:drop-shadow(0 0 7px rgba(212,255,46,0.6)); }
        .bx-card-icon svg{ width:100%; height:100%; display:block; }
        .bx-card-spec{
          font-family: var(--font-mono); font-weight:700; font-size:0.64rem; letter-spacing:0.04em;
          color:var(--void); background: var(--lime); padding:0.16rem 0.46rem; border-radius:2px;
          white-space:nowrap; box-shadow:0 0 10px rgba(212,255,46,0.5);
        }
        .bx-card-title{ font-family:var(--font-display); font-weight:700; font-size:1.12rem; line-height:1.08; text-transform:uppercase; margin:0 0 0.4rem; color:var(--ink); white-space:pre-line; }
        .bx-card-desc{ font-size:0.8rem; line-height:1.45; color:var(--muted); margin:0; }
        .bx-card-thresh{ position:absolute; top:-9px; left:12px; font-family:var(--font-mono); font-size:0.58rem; color:var(--cyan); background:var(--void); padding:0 0.35rem; letter-spacing:0.05em; }

        .bx-card.c0{ top:2%; left:1%; } .bx-card.c1{ top:0%; right:1%; }
        .bx-card.c2{ top:36%; left:-1.5%; } .bx-card.c3{ top:36%; right:-1.5%; }
        .bx-card.c4{ bottom:0%; left:3%; } .bx-card.c5{ bottom:0%; right:3%; }

        .bx-footnote{ position:relative; z-index:3; text-align:center; font-size:0.68rem; color:var(--muted-dim); padding:0 1.5rem 1.4rem; margin:0; font-family:var(--font-mono); }

        /* ---------- TABLET ---------- */
        @media (max-width:1024px){
          .bx-section{ height:auto; min-height:100vh; max-height:none; padding-bottom:2rem; }
          .bx-stage{ flex-direction:column; gap:1.4rem; padding-top:1rem; }
          .bx-meter-col{ flex-direction:row; }
          .bx-meter-label{ writing-mode: horizontal-tb; transform:none; }
          .bx-meter-track{ width: min(70vw,360px); height:14px; }
          .bx-meter-fill{ width:0%; height:100%; background: linear-gradient(90deg, var(--lime) 0%, var(--cyan) 65%, #fff 100%); }
          .bx-meter-ticks{ flex-direction:row; }
          .bx-meter-tick{ width:1px; height:100%; }
          .bx-canwrap{ position:relative; width:clamp(160px,30vw,210px); order:-1; }
          .bx-cards{ position:relative; inset:auto; display:flex; flex-direction:column; gap:1rem; align-items:center; }
          .bx-card{ position:relative !important; top:auto !important; left:auto !important; right:auto !important; bottom:auto !important; width:min(92vw,470px); opacity:1 !important; transform:none !important; }
          .bx-card-node{ display:none; }
          .bx-traces{ display:none; }
          .bx-frame-corner{ display:none; }
        }

        /* ---------- MOBILE ---------- */
        @media (max-width:600px){
          .bx-title-line{ font-size:clamp(2rem,9.5vw,2.6rem); }
          .bx-card{ padding:0.95rem 1.05rem 1.05rem; }
          .bx-card-title{ font-size:1.02rem; }
          .bx-card-desc{ font-size:0.78rem; }
          .bx-card-spec{ font-size:0.58rem; padding:0.14rem 0.38rem; }
          .bx-canwrap{ width:clamp(140px,38vw,180px); }
          .bx-meter-track{ width: min(78vw,300px); }
        }
      `}</style>

      <section className="bx-section pb-10" ref={sectionRef}>
        <div className="bx-bg">
          <div className="bx-mesh" />
          <div className="bx-hexgrid" />
          <div className="bx-scanlines" />
          <div className="bx-vignette" />
        </div>
        <div className="bx-flash" ref={flashRef} />

        <header className="bx-header">
          <p className="bx-eyebrow">Charge sequence initiated</p>
          <h2 className="bx-title">
            <span className="bx-title-line">UNLEASH THE</span>
            <span className="bx-title-line accent">FULL MATRIX</span>
          </h2>
        </header>

        <div className="bx-stage" ref={stageRef}>
          <span className="bx-frame-corner tl" />
          <span className="bx-frame-corner tr" />
          <span className="bx-frame-corner bl" />
          <span className="bx-frame-corner br" />

          <svg
            className="bx-traces"
            viewBox="0 0 1600 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="bxTraceGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#d4ff2e" stopOpacity="0" />
                <stop offset="50%" stopColor="#d4ff2e" stopOpacity="1" />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.6" />
              </linearGradient>
              <filter
                id="bxTraceGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter
                id="bxBoltGlow"
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
              >
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {BENEFITS.map((_, i) => (
              <path
                key={i}
                className="bx-trace-path"
                ref={(el) => {
                  tracePathRefs.current[i] = el;
                }}
                d=""
              />
            ))}
            <g ref={boltsGroupRef} />
          </svg>

          {/* Vertical charge meter */}
          <div className="bx-meter-col">
            <span className="bx-meter-pct" ref={meterPctRef}>
              0
            </span>
            <div className="bx-meter-track">
              <div className="bx-meter-fill" ref={meterFillRef} />
              <div className="bx-meter-ticks">
                {Array.from({ length: 9 }).map((_, i) => (
                  <span key={i} className="bx-meter-tick" />
                ))}
              </div>
            </div>
            <span className="bx-meter-label">CHARGE LEVEL</span>
          </div>

          {/* Can dock */}
          <div className="bx-canwrap" ref={canWrapRef}>
            {/* <div className="bx-can-glow" /> */}
            <div className="bx-can-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/can.png"
                alt="Xtreem Pro XP energy drink can"
                className="bx-can-img"
                ref={canImgRef}
                draggable={false}
              />
              {/* <div className="bx-can-rim" /> */}
            </div>
            <div className="bx-can-dock" />
            <div className="bx-can-shadow" />
          </div>

          {/* Benefit HUD cards — unlock at charge threshold */}
          <div className="bx-cards">
            {BENEFITS.map((b, i) => (
              <div
                key={i}
                className={`bx-card !overflow-visible c${i} ${b.side}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
              >
                <div className="bx-card-border" />
                <div className="bx-card-node" />
                <span className="bx-card-thresh">{b.threshold}% CHARGE</span>
                <div className="bx-card-top">
                  <div className="bx-card-icon">{b.icon}</div>
                  <span className="bx-card-spec">{b.spec}</span>
                </div>
                <h3 className="bx-card-title">{b.title}</h3>
                <p className="bx-card-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
