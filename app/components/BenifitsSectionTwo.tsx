"use client";

import { ReactNode, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ElectricBorder from "./ElectricBorder";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
type Benefit = {
  threshold: number;
  spec: string;
  side: "left" | "right";
  title: string;
  desc: string;
  icon: ReactNode;
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

/* â”€â”€â”€ SVG arc helper â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
// Returns SVG arc path for a segment of a donut (cx, cy, r, startDeg, endDeg)
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x1 = (cx + r * Math.cos(toRad(startDeg))).toFixed(4);
  const y1 = (cy + r * Math.sin(toRad(startDeg))).toFixed(4);
  const x2 = (cx + r * Math.cos(toRad(endDeg))).toFixed(4);
  const y2 = (cy + r * Math.sin(toRad(endDeg))).toFixed(4);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

/* Precomputed particles */
const PARTICLES = [
  { x: "7%", y: "14%", s: 3 },
  { x: "93%", y: "9%", s: 2 },
  { x: "19%", y: "74%", s: 4 },
  { x: "81%", y: "67%", s: 2 },
  { x: "51%", y: "89%", s: 3 },
  { x: "5%", y: "48%", s: 2 },
  { x: "88%", y: "38%", s: 4 },
  { x: "37%", y: "6%", s: 2 },
  { x: "64%", y: "24%", s: 3 },
  { x: "29%", y: "92%", s: 2 },
  { x: "95%", y: "81%", s: 3 },
  { x: "3%", y: "29%", s: 2 },
  { x: "57%", y: "4%", s: 3 },
  { x: "44%", y: "58%", s: 2 },
  { x: "76%", y: "87%", s: 3 },
  { x: "13%", y: "39%", s: 2 },
];

/* â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function PowerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [chargePct, setChargePct] = useState(0);
  const prevIndexRef = useRef(0);

  useGSAP(
    () => {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;

      /* â”€â”€ ambient â”€â”€ */
      gsap.to(".arc-outer-ring", {
        rotate: 360,
        duration: 22,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".arc-inner-ring", {
        rotate: -360,
        duration: 14,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".can-img", {
        y: -14,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".particle-dot", {
        opacity: 0.07,
        scale: 0.3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.28, from: "random" },
      });

      /* â”€â”€ title entrance â”€â”€ */
      ScrollTrigger.create({
        trigger: ".ps-title",
        start: "top 82%",
        onEnter: () => {
          gsap.fromTo(
            ".ps-letter",
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "back.out(2)",
              stagger: 0.055,
            },
          );
        },
      });

      /* â”€â”€ initial states â”€â”€ */
      gsap.set(".can-img", {
        x: isMobile ? -28 : -90,
        rotate: isMobile ? -8 : -15,
      });
      gsap.set(".ing-card", { opacity: 0, x: -40 });
      gsap.set(".ing-card-0", { opacity: 1, x: 0 });
      gsap.set(".detail-panel", { opacity: 0, y: 30 });
      gsap.set(".detail-panel-0", { opacity: 1, y: 0 });
      gsap.set(".arc-seg", { strokeDashoffset: 300, opacity: 0 });
      gsap.set(".arc-seg-0", { strokeDashoffset: 0, opacity: 1 });
      gsap.set(".progress-fill", { height: "0%" });

      /* â”€â”€ main pinned timeline â”€â”€ */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=520" : "+=600",
          scrub: 0.6,
          pin: true,
          onUpdate: (self) => {
            const pct = Math.round(self.progress * 100);
            setChargePct(pct);

            // Drive active card state from charge thresholds.
            const idx = BENEFITS.reduce(
              (current, benefit, index) =>
                pct >= benefit.threshold ? index : current,
              0,
            );
            if (idx !== prevIndexRef.current) {
              prevIndexRef.current = idx;
              setActiveIndex(idx);
            }
          },
        },
      });

      tl.to(".progress-fill", { height: "100%", ease: "none", duration: 3 }, 0);

      const canPositions = isMobile
        ? [
            { x: -30, rotate: -9 },
            { x: -18, rotate: -5 },
            { x: -6, rotate: -2 },
            { x: 6, rotate: 2 },
            { x: 18, rotate: 5 },
            { x: 30, rotate: 9 },
          ]
        : [
            { x: -110, rotate: -16 },
            { x: -66, rotate: -10 },
            { x: -22, rotate: -4 },
            { x: 22, rotate: 4 },
            { x: 66, rotate: 10 },
            { x: 110, rotate: 16 },
          ];

      BENEFITS.forEach((_, i) => {
        const isFirst = i === 0;
        const isLast = i === BENEFITS.length - 1;

        /* card + detail slide in */
        if (!isFirst) {
          tl.to(`.ing-card-${i}`, { opacity: 1, x: 0, duration: 0.6 });
          tl.to(
            `.detail-panel-${i}`,
            { opacity: 1, y: 0, duration: 0.1 },
            "<0.1",
          );

          /* arc segment charges */
          tl.to(
            `.arc-seg-${i}`,
            { strokeDashoffset: 0, opacity: 1, duration: 0.7 },
            "<0.05",
          );

          /* can glow intensifies */
          /* can movement + glow */
          tl.to(
            ".can-img",
            {
              x: canPositions[i].x,
              rotate: canPositions[i].rotate,
              scale: isMobile ? 1 + i * 0.03 : 1 + i * 0.05,
              filter: `drop-shadow(0 0 ${50 + i * 22}px rgba(188,224,64,${0.35 + i * 0.1}))`,
              duration: 0.8,
              ease: "power3.inOut",
            },
            "<",
          );
        }

        /* hold */
        tl.to({}, { duration: isLast ? 0.3 : 0.6 });

        /* slide out previous */
        if (!isLast) {
          tl.to(`.ing-card-${i}`, { opacity: 0.28, duration: 0.4 });
          tl.to(
            `.detail-panel-${i}`,
            { opacity: 0, y: -28, duration: 0.45 },
            "<0.05",
          );
        }
      });

      /* final reveal */
      tl.to(".can-img", {
        x: 0,
        rotate: 0,
        scale: isMobile ? 1.08 : 1.2,
        filter: "drop-shadow(0 0 120px rgba(188,224,64,0.75))",
        duration: 1.3,
      });
      tl.to(".arc-outer-ring", { scale: 2.8, opacity: 0, duration: 1.2 }, "<");
      tl.to(
        ".arc-inner-ring",
        { scale: 3.5, opacity: 0, duration: 1.0 },
        "<0.15",
      );
      // .charge-complete element removed â€” animation target cleaned up
    },
    { scope: sectionRef },
  );

  const active = BENEFITS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] min-h-[600px] overflow-hidden bg-black select-none md:h-screen md:min-h-0"
    >
      {/* â”€â”€â”€ Deep BG glows â”€â”€â”€ */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#aafc1c]/[.07] blur-[220px]"
          style={{ width: "min(800px,100vw)", height: "min(800px,100vw)" }}
        />
        <div
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#aafc1c]/[.12] blur-[90px]"
          style={{ width: "min(280px,50vw)", height: "min(280px,50vw)" }}
        />
      </div>

      {/* â”€â”€â”€ Grid texture â”€â”€â”€ */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(188,224,64,1) 1px,transparent 1px),linear-gradient(90deg,rgba(188,224,64,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* â”€â”€â”€ Scanlines â”€â”€â”€ */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute h-px opacity-0"
          style={{
            top: `${12 + i * 11}%`,
            left: "-20%",
            width: "140%",
            background:
              "linear-gradient(90deg,transparent,rgba(188,224,64,0.07),transparent)",
            animation: `scan ${5 + i * 0.7}s linear ${i * 0.9}s infinite`,
          }}
        />
      ))}

      {/* â”€â”€â”€ Particles â”€â”€â”€ */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle-dot absolute rounded-full bg-[#aafc1c] opacity-40"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
          />
        ))}
      </div>

      {/* â”€â”€â”€ Corner brackets â”€â”€â”€ */}
      {[
        "top-5 left-5 border-t-2 border-l-2",
        "top-5 right-5 border-t-2 border-r-2",
        "bottom-5 left-5 border-b-2 border-l-2",
        "bottom-5 right-5 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div
          key={i}
          className={`max-md:hidden pointer-events-none absolute w-8 h-8 md:w-10 md:h-10 border-[#aafc1c]/25 ${cls}`}
        />
      ))}

      {/* â”€â”€â”€ HUD top bar â”€â”€â”€ */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-start justify-between px-4 pt-4 md:px-10 md:pt-7">
        {/* Left: section label */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#aafc1c] animate-pulse" />
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#aafc1c]/50 font-medium">
            Formula Breakdown
          </span>
        </div>

        {/* Center: title */}
        <h2
          className="ps-title absolute left-1/2 top-17 -translate-x-1/2 whitespace-nowrap font-black uppercase tracking-tight text-[#aafc1c]
          text-[clamp(2.5rem,16vw,4.8rem)] leading-none md:top-24 md:text-5xl lg:top-28 lg:text-8xl"
        >
          {"Benefits".split("").map((ch, i) =>
            ch === " " ? (
              <span
                key={i}
                className="ps-letter inline-block w-3 md:w-4 opacity-0"
              >
                &nbsp;
              </span>
            ) : (
              <span
                key={i}
                className={`ps-letter inline-block opacity-0 ${i < 4 && "text-white"}`}
              >
                {ch}
              </span>
            ),
          )}
        </h2>

        {/* Right: live charge indicator */}
        <div className="hidden md:flex items-center gap-2">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/20">
            Charge
          </span>
          <div className="flex gap-1">
            {BENEFITS.map((_, i) => (
              <div
                key={i}
                className="h-3 w-1.5 rounded-sm transition-all duration-500"
                style={{
                  background:
                    i <= activeIndex ? "#aafc1c" : "rgba(188,224,64,0.12)",
                  boxShadow:
                    i <= activeIndex ? "0 0 6px rgba(188,224,64,0.7)" : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
          MAIN 3-COLUMN LAYOUT
      â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="absolute inset-0 flex flex-col items-stretch pt-[8.5rem] pb-[10.75rem] sm:pb-[11.75rem] md:flex-row md:pt-16 md:pb-0">
        {/* â•â• COL 1 â€” Ingredient cards (left) â•â• */}

        <div
          className="
          relative z-30
          hidden md:flex md:flex-col justify-start md:justify-center
          gap-2 md:gap-3
          px-4 md:px-0 md:pl-10 lg:pl-16
          md:w-[30%] lg:w-[28%]
          overflow-x-auto md:overflow-visible
          pb-3 md:pb-0
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
        "
        >
          {/* Vertical progress rail (desktop) */}
          <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 h-48 w-px bg-white/8">
            <div
              className="progress-fill absolute bottom-0 w-full bg-[#aafc1c]"
              style={{ boxShadow: "0 0 8px rgba(188,224,64,0.8)" }}
            />
          </div>

          {BENEFITS.map((benefit, i) => (
            <ElectricBorder
              key={benefit.title}
              color="#BCE040"
              speed={1.1}
              chaos={0.07}
              borderRadius={8}
              className="w-full"
            >
              <BenefitUnlockCard
                benefit={benefit}
                index={i}
                active={i === activeIndex}
              />
            </ElectricBorder>
          ))}
        </div>

        {/* â•â• COL 2 â€” Can + charging ring (center) â•â• */}
        <div
          className="
          relative z-20
          flex items-center justify-center
          flex-1
          md:w-[40%]
          min-h-0
          my-auto
        "
        >
          {/* SVG charging arc ring */}
          <div
            className="absolute"
            style={{
              width: "clamp(250px,76vw,420px)",
              height: "clamp(250px,76vw,420px)",
            }}
          >
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full"
              style={{ transform: "rotate(-90deg)" }}
            >
              {/* Track ring */}
              <circle
                cx="100"
                cy="100"
                r="88"
                fill="none"
                stroke="rgba(188,224,64,0.06)"
                strokeWidth="1"
              />
              {/* Benefit charge segments */}
              {BENEFITS.map((_, i) => {
                const slice = 360 / BENEFITS.length;
                const gapDeg = 7;
                const segDeg = slice - gapDeg;
                const start = i * slice + gapDeg / 2;
                const end = start + segDeg;
                return (
                  <path
                    key={i}
                    className={`arc-seg arc-seg-${i}`}
                    d={arcPath(100, 100, 88, start, end)}
                    fill="none"
                    stroke="#aafc1c"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="300"
                    style={{
                      filter: "drop-shadow(0 0 6px rgba(188,224,64,0.8))",
                    }}
                  />
                );
              })}
              {/* Tick marks */}
              {[...Array(40)].map((_, i) => {
                const angle = (i / 40) * 360;
                const rad = ((angle - 90) * Math.PI) / 180;
                const r1 = 94,
                  r2 = 97;
                const x1 = (100 + r1 * Math.cos(rad)).toFixed(4);
                const y1 = (100 + r1 * Math.sin(rad)).toFixed(4);
                const x2 = (100 + r2 * Math.cos(rad)).toFixed(4);
                const y2 = (100 + r2 * Math.sin(rad)).toFixed(4);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(188,224,64,0.12)"
                    strokeWidth="0.5"
                  />
                );
              })}
            </svg>
          </div>

          {/* Outer ambient spinning ring */}
          <div
            className="arc-outer-ring absolute rounded-full"
            style={{
              width: "clamp(300px,88vw,480px)",
              height: "clamp(300px,88vw,480px)",
              background:
                "conic-gradient(from 0deg,#aafc1c,transparent 38%,#aafc1c 62%,transparent)",
              filter: "blur(30px)",
              opacity: 0.45,
            }}
          />

          {/* Inner counter-spin ring */}
          <div
            className="arc-inner-ring absolute rounded-full"
            style={{
              width: "clamp(180px,54vw,280px)",
              height: "clamp(180px,54vw,280px)",
              background:
                "conic-gradient(from 120deg,transparent,#aafc1c 30%,transparent 58%)",
              filter: "blur(16px)",
              opacity: 0.35,
            }}
          />

          {/* Static dashed orbit */}
          <div
            className="absolute rounded-full border border-dashed border-[#aafc1c]/10 pointer-events-none"
            style={{
              width: "clamp(220px,66vw,360px)",
              height: "clamp(220px,66vw,360px)",
            }}
          />

          {/* The Can */}
          {/* <Image
            src="/images/can.png"
            alt="XTREEM Pro XP Energy Drink"
            width={600}
            height={600}
            priority
            className="can-img relative z-10 object-contain"
            style={{
              height: "clamp(180px, 32vw, 300px)",
              width: "auto",
              filter: "drop-shadow(0 0 55px rgba(188,224,64,0.38))",
            }}
          /> */}

          {/* <ProductCan /> */}
          <Image
            src="/images/can.png"
            alt="XTREEM Pro XP Energy Drink"
            width={600}
            height={600}
            priority
            sizes="(max-width: 768px) 270px, 340px"
            className="can-img relative z-10 object-contain will-change-transform"
            style={{
              height: "clamp(280px, 30vw, 400px)",
              width: "auto",
              filter: "drop-shadow(0 0 55px rgba(188,224,64,0.38))",
            }}
          />

          {/* Mobile mini tags row */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-30">
            {[active.spec, `${active.threshold}%`, active.side].map((t) => (
              <span
                key={t}
                className="px-2 py-1 tracking-[0.1em] uppercase font-bold text-[#aafc1c] border border-[#aafc1c]/50 rounded-sm whitespace-nowrap text-[10px] shadow-md"
                style={{ background: "rgba(188,224,64,0.07)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* â•â• COL 3 â€” Detail panels (right) â•â• */}
        <div
          className="
          relative z-30
          hidden md:flex flex-col justify-center
          md:w-[30%] lg:w-[32%]
          md:pr-10 lg:pr-16
        "
        >
          {BENEFITS.map((ing, i) => (
            <div
              key={ing.title}
              className={`detail-panel detail-panel-${i} absolute inset-0 flex flex-col justify-center pr-10 lg:pr-16`}
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {/* Subtitle ghost word */}
              <div
                className="font-black uppercase leading-none pointer-events-none mb-2"
                style={{
                  fontSize: "clamp(52px,8vw,90px)",
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(188,224,64,0.09)",
                  letterSpacing: "-0.04em",
                }}
              >
                {ing.spec}
              </div>

              {/* Green rule */}
              <div
                className="mb-5 h-[3px] w-16 lg:w-24 bg-[#aafc1c] rounded-full"
                style={{ boxShadow: "0 0 12px rgba(188,224,64,0.7)" }}
              />

              {/* Ingredient name */}
              <h3
                className="font-black uppercase leading-none tracking-tight text-white"
                style={{ fontSize: "clamp(36px,5vw,56px)" }}
              >
                {ing.title}
              </h3>

              {/* Label pill */}
              <div className="mt-3 inline-flex items-center gap-2 self-start">
                <div className="h-px w-5 bg-[#aafc1c]/50" />
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#aafc1c]/65 font-semibold">
                  {ing.side === "left" ? "left channel" : "right channel"} / unlock {ing.threshold}%
                </span>
              </div>

              {/* Stat */}
              <div className="mt-5 flex items-baseline gap-3">
                <span
                  className="font-black text-[#aafc1c] leading-none"
                  style={{
                    fontSize:
                      ing.spec.length > 5
                        ? "clamp(40px,6vw,72px)"
                        : "clamp(56px,8vw,96px)",
                    textShadow: "0 0 40px rgba(188,224,64,0.45)",
                  }}
                >
                  {ing.spec}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase text-white/30 font-medium">
                  charge {ing.threshold}%
                </span>
              </div>

              {/* Description */}
              <p className="mt-5 text-sm lg:text-base text-zinc-400 leading-relaxed max-w-[280px]">
                {ing.desc}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {[ing.spec, `${ing.threshold}%`, ing.side].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-bold text-[#aafc1c] rounded-sm"
                    style={{
                      background: "rgba(188,224,64,0.07)",
                      border: "1px solid rgba(188,224,64,0.22)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Decorative hex trio */}
              <div className="mt-7 flex gap-3 items-center">
                {[1, 0.5, 0.22].map((op, j) => (
                  <div
                    key={j}
                    style={{
                      width: 18 - j * 3,
                      height: 18 - j * 3,
                      clipPath:
                        "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
                      background: `rgba(188,224,64,${op * 0.14})`,
                      border: `1px solid rgba(188,224,64,${op * 0.32})`,
                    }}
                  />
                ))}
                <span className="text-[8px] tracking-[0.4em] uppercase text-white/15 ml-1">
                  Xtreem Pro XP
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€â”€ Mobile detail strip (bottom) â”€â”€â”€ */}
      <div className="absolute bottom-0 left-0 right-0 z-30 md:hidden px-4 pb-5 sm:px-5">
        {BENEFITS.map((ing, i) => (
          <div
            key={ing.title}
            className={`detail-panel detail-panel-${i} absolute inset-x-4 bottom-5 rounded-xl border border-[#aafc1c]/15 bg-black/55 shadow-[0_0_30px_rgba(170,252,28,0.08)] backdrop-blur-sm sm:inset-x-5`}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <ElectricBorder
              key={ing.title}
              color="#BCE040"
              speed={1.2}
              chaos={0.08}
              borderRadius={1}
              className="w-full p-4"
            >
              <div className="flex items-end justify-between">
                <div>
                  <div
                    className="mb-2 h-[2px] w-12 bg-[#aafc1c] rounded-full"
                    style={{ boxShadow: "0 0 8px rgba(188,224,64,0.7)" }}
                  />
                  <h3 className="font-black uppercase text-white text-xl leading-none sm:text-2xl">
                    {ing.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 max-w-[230px] text-[13px] leading-relaxed text-zinc-400 sm:text-xs">
                    {ing.desc}
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div
                    className="font-black text-[#aafc1c] leading-none text-4xl"
                    style={{ textShadow: "0 0 30px rgba(188,224,64,0.5)" }}
                  >
                    {ing.spec}
                  </div>
                  <div className="text-[9px] tracking-[0.2em] uppercase text-white/25 mt-1">
                    {ing.threshold}% unlock
                  </div>
                </div>
              </div>
            </ElectricBorder>
          </div>
        ))}
      </div>

      {/* â”€â”€â”€ Bottom strip: product claim â”€â”€â”€ */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#aafc1c]/10 z-40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 pb-3 hidden md:block">
        <p className="text-[9px] tracking-[0.45em] uppercase text-white/15 text-center">
          High Caffeine Â· Taurine Â· Vitamins B Â· Natural Source Â· â‚¹60 Â· 250ml
        </p>
      </div>

      {/* â”€â”€â”€ Inline keyframe for scan animation â”€â”€â”€ */}
      <style>{`
        @keyframes scan {
          0%   { transform: translateX(-120%); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(120%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}

function BenefitUnlockCard({
  benefit,
  index,
  active,
}: {
  benefit: Benefit;
  index: number;
  active: boolean;
}) {
  return (
    <div
      className={`ing-card ing-card-${index} group relative min-w-[180px] overflow-hidden px-4 py-3 transition-all duration-300 md:min-w-0 ${
        active ? "text-white" : "text-white/45"
      }`}
      style={{
        filter: active
          ? "drop-shadow(0 0 18px rgba(170,252,28,0.24))"
          : "none",
      }}
    >
      {/* <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 320 118"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`benefit-card-fill-${index}`} x1="0" x2="1">
            <stop offset="0" stopColor="rgba(170,252,28,0.14)" />
            <stop offset="0.48" stopColor="rgba(255,255,255,0.045)" />
            <stop offset="1" stopColor="rgba(170,252,28,0.08)" />
          </linearGradient>
          <linearGradient id={`benefit-card-stroke-${index}`} x1="0" x2="1">
            <stop offset="0" stopColor="rgba(170,252,28,0.9)" />
            <stop offset="0.5" stopColor="rgba(170,252,28,0.16)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.38)" />
          </linearGradient>
          <filter id={`benefit-card-glow-${index}`} x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M14 1 H270 L319 50 V104 L305 117 H1 V16 Z"
          fill={`url(#benefit-card-fill-${index})`}
          opacity={active ? "1" : "0.52"}
        />
        <path
          d="M14 1 H270 L319 50 V104 L305 117 H1 V16 Z"
          fill="none"
          stroke={`url(#benefit-card-stroke-${index})`}
          strokeWidth={active ? "2" : "1"}
          filter={active ? `url(#benefit-card-glow-${index})` : undefined}
        />
        <path
          d="M18 101 H116 M284 18 H305 M302 77 H318"
          stroke="#aafc1c"
          strokeOpacity={active ? "0.9" : "0.25"}
          strokeWidth="1.5"
        />
      </svg> */}

      <div className="relative z-10 flex items-center gap-3">
        <div
          className={`grid h-11 w-11 flex-none place-items-center border transition-all duration-300 ${
            active
              ? "border-[#aafc1c]/80 bg-[#aafc1c]/15 text-[#aafc1c] shadow-[0_0_20px_rgba(170,252,28,0.24)]"
              : "border-white/10 bg-white/[0.03] text-[#aafc1c]/45"
          }`}
          style={{
            clipPath:
              "polygon(25% 0,75% 0,100% 25%,100% 75%,75% 100%,25% 100%,0 75%,0 25%)",
          }}
        >
          <div className="h-6 w-6">{benefit.icon}</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={`text-[9px] font-black uppercase tracking-[0.22em] ${
                active ? "text-[#aafc1c]" : "text-[#aafc1c]/35"
              }`}
            >
              {benefit.spec}
            </span>
            <span className="h-px flex-1 bg-[#aafc1c]/15" />
            <span className="text-[9px] font-black text-white/15">
              {benefit.threshold}%
            </span>
          </div>
          <h3 className="whitespace-pre-line text-sm font-black uppercase leading-[1.05] sm:text-base">
            {benefit.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-zinc-400">
            {benefit.desc}
          </p>
        </div>

        <span
          className={`font-black leading-none transition-colors duration-300 ${
            active ? "text-[#aafc1c]/45" : "text-white/[0.06]"
          }`}
        >
          0{index + 1}
        </span>
      </div>
    </div>
  );
}



