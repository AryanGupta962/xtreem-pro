// "use client";

// import Image from "next/image";
// import { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// const benefits = [
//   {
//     title: "VITAMINS",
//     keyword: "RECOVER",
//     desc: "Essential vitamins that support recovery and energy metabolism.",
//     stat: "B2 · B3 · B6 · B12",
//     accent: "Metabolism Boost",
//   },
//   {
//     title: "TAURINE",
//     keyword: "ENDURE",
//     desc: "Enhances endurance and keeps performance levels elevated all day.",
//     stat: "Enhanced",
//     accent: "Stamina & Focus",
//   },
//   {
//     title: "CAFFEINE",
//     keyword: "IGNITE",
//     desc: "Natural caffeine delivers instant focus and explosive energy.",
//     stat: "75mg",
//     accent: "Natural Source",
//   },
//   // {
//   //   title: "GINSENG",
//   //   keyword: "SUSTAIN",
//   //   desc: "Delivers sustained performance and mental clarity throughout the day.",
//   //   stat: "All Day",
//   //   accent: "Peak Performance",
//   // },
// ];

// // Particle positions - precomputed to avoid hydration mismatch
// const PARTICLES = [
//   { left: "15%", top: "20%", size: 3, delay: 0, dur: 4 },
//   { left: "80%", top: "15%", size: 5, delay: 0.5, dur: 5 },
//   { left: "25%", top: "70%", size: 4, delay: 1, dur: 3.5 },
//   { left: "70%", top: "65%", size: 2, delay: 1.5, dur: 6 },
//   { left: "50%", top: "85%", size: 3, delay: 0.8, dur: 4.5 },
//   { left: "10%", top: "50%", size: 5, delay: 2, dur: 5 },
//   { left: "88%", top: "45%", size: 4, delay: 0.3, dur: 3 },
//   { left: "40%", top: "10%", size: 2, delay: 1.2, dur: 6 },
//   { left: "60%", top: "30%", size: 3, delay: 0.7, dur: 4 },
//   { left: "35%", top: "88%", size: 2, delay: 1.8, dur: 5 },
//   { left: "92%", top: "75%", size: 3, delay: 0.4, dur: 3.5 },
//   { left: "5%", top: "35%", size: 2, delay: 2.2, dur: 4 },
// ];

// export default function BenefitsSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       // ── Title bounce animation on enter ──
//       ScrollTrigger.create({
//         trigger: ".benefits-title",
//         start: "top 80%",
//         onEnter: () => {
//           gsap.to(".benefit-letter", {
//             keyframes: [{ y: -20, scale: 1.1 }, { y: 10 }, { y: -8 }, { y: 0, scale: 1 }],
//             duration: 1.2,
//             ease: "sine.inOut",
//             stagger: 0.07,
//           });
//           gsap.fromTo(
//             ".benefits-title",
//             { textShadow: "0 0 0px rgba(188,224,64,0)" },
//             {
//               textShadow:
//                 "0 0 30px rgba(188,224,64,.5), 0 0 80px rgba(188,224,64,.3), 0 0 160px rgba(188,224,64,.1)",
//               duration: 0.6,
//               repeat: 1,
//               yoyo: true,
//             }
//           );
//         },
//       });

//       // ── Initial states ──
//       gsap.set(".benefit-slide", { opacity: 0, y: 80, filter: "blur(8px)" });
//       gsap.set(".progress", { height: "0%" });
//       gsap.set(".slide-keyword", { opacity: 0, x: -60 });
//       gsap.set(".slide-accent-tag", { opacity: 0, y: 20, scale: 0.8 });
//       gsap.set(".slide-stat", { opacity: 0, scale: 0.5 });
//       gsap.set(".slide-divider", { scaleX: 0, transformOrigin: "left center" });

//       // ── Ambient ring rotation ──
//       gsap.to(".energy-ring", {
//         rotate: 360,
//         duration: 18,
//         repeat: -1,
//         ease: "none",
//       });

//       gsap.to(".energy-ring-inner", {
//         rotate: -360,
//         duration: 12,
//         repeat: -1,
//         ease: "none",
//       });

//       // ── Can float ──
//       gsap.to(".can", {
//         y: -18,
//         duration: 2.2,
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//       });

//       // ── Particle twinkle ──
//       gsap.to(".particle", {
//         opacity: 0.1,
//         scale: 0.5,
//         duration: "random(2, 5)",
//         repeat: -1,
//         yoyo: true,
//         ease: "sine.inOut",
//         stagger: { each: 0.3, from: "random" },
//       });

//       // ── Main scroll timeline ──
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top top",
//           end: "+=5500",
//           scrub: 1.2,
//           pin: true,
//         },
//       });

//       // Progress bar fills over entire scroll
//       tl.to(".progress", { height: "100%", ease: "none", duration: 0 }, 0);

//       benefits.forEach((_, index) => {
//         // Slide in
//         tl.to(`.slide-${index}`, {
//           opacity: 1,
//           y: 0,
//           filter: "blur(0px)",
//           duration: 0.8,
//         });
//         tl.to(`.slide-${index} .slide-keyword`, {
//           opacity: 1,
//           x: 0,
//           duration: 0.5,
//         }, "<0.1");
//         tl.to(`.slide-${index} .slide-divider`, {
//           scaleX: 1,
//           duration: 0.4,
//         }, "<0.1");
//         tl.to(`.slide-${index} .slide-accent-tag`, {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.4,
//         }, "<0.2");
//         tl.to(`.slide-${index} .slide-stat`, {
//           opacity: 1,
//           scale: 1,
//           duration: 0.5,
//         }, "<0.1");

//         // Can transform per ingredient
//         tl.to(".can", {
//           scale: 1.05 + index * 0.07,
//           rotate: index % 2 === 0 ? 8 : -8,
//           filter: `drop-shadow(0 0 ${60 + index * 20}px rgba(188,224,64,${0.35 + index * 0.08}))`,
//           duration: 0.8,
//         }, "<");

//         // Pulse the ring on each ingredient
//         tl.to(".energy-ring", {
//           scale: 1.15,
//           opacity: 0.9,
//           duration: 0.3,
//         }, "<0.2");
//         tl.to(".energy-ring", {
//           scale: 1,
//           opacity: 0.6,
//           duration: 0.5,
//         });

//         // Slide out
//         tl.to(`.slide-${index}`, {
//           opacity: 0,
//           y: -80,
//           filter: "blur(6px)",
//           duration: 0.7,
//         }, "+=0.3");
//       });

//       // Final dramatic reveal
//       tl.to(".can", {
//         scale: 1.5,
//         rotate: 0,
//         filter: "drop-shadow(0 0 120px rgba(188,224,64,0.7))",
//         duration: 1.5,
//       });
//       tl.to(".energy-ring", { scale: 3.5, opacity: 0, duration: 1.5 }, "<");
//       tl.to(".energy-ring-inner", { scale: 4, opacity: 0, duration: 1.2 }, "<0.2");
//       tl.to(".final-reveal", { opacity: 1, y: 0, duration: 0.9 }, "<0.3");
//     },
//     { scope: sectionRef }
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="relative h-screen overflow-hidden bg-black"
//     >
//       {/* ── Background Glow ── */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-green/8 blur-[200px]" />
//         <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-green/15 blur-[80px]" />
//       </div>

//       {/* ── Floating Particles ── */}
//       <div className="absolute inset-0 pointer-events-none">
//         {PARTICLES.map((p, i) => (
//           <div
//             key={i}
//             className="particle absolute rounded-full bg-primary-green opacity-60"
//             style={{
//               left: p.left,
//               top: p.top,
//               width: p.size,
//               height: p.size,
//             }}
//           />
//         ))}
//       </div>

//       {/* ── Grid Lines (subtle) ── */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-[0.025]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(188,224,64,1) 1px, transparent 1px), linear-gradient(90deg, rgba(188,224,64,1) 1px, transparent 1px)",
//           backgroundSize: "80px 80px",
//         }}
//       />

//       {/* ── Section Heading ── */}
//       <div className="absolute top-10 left-1/2 z-30 -translate-x-1/2 text-center">
//         <p className="mb-2 text-[10px] tracking-[0.4em] uppercase text-primary-green/50">
//           What&apos;s Inside
//         </p>
//         <h2 className="benefits-title text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-primary-green">
//           {"BENEFITS".split("").map((letter, index) => (
//             <span key={index} className="benefit-letter inline-block">
//               {letter}
//             </span>
//           ))}
//         </h2>
//       </div>

//       {/* ── Progress Bar (left) ── */}
//       <div className="absolute left-8 top-1/2 z-30 h-64 -translate-y-1/2">
//         <div className="relative h-full w-[2px] bg-white/10 rounded-full">
//           <div className="progress absolute bottom-0 w-full bg-primary-green rounded-full shadow-[0_0_8px_rgba(188,224,64,0.8)]" />
//         </div>
//         {/* Step dots */}
//         {[0, 1, 2, 3].map((i) => (
//           <div
//             key={i}
//             className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] rounded-full border border-primary-green/30 bg-black"
//             style={{ bottom: `${(i / 3) * 100}%`, marginBottom: -3 }}
//           />
//         ))}
//       </div>

//       {/* ── Step Numbers (right side) ── */}
//       <div className="absolute right-8 top-1/2 z-30 -translate-y-1/2 hidden lg:flex flex-col gap-4">
//         {benefits.map((_, i) => (
//           <div
//             key={i}
//             className="text-[10px] tracking-[0.3em] uppercase text-white/20 text-right"
//           >
//             0{i + 1}
//           </div>
//         ))}
//       </div>

//       {/* ── Center Product ── */}
//       <div className="absolute inset-0 top-20 flex items-center justify-center">
//         {/* Outer spinning conic ring */}
//         <div
//           className="energy-ring absolute h-[520px] w-[520px] rounded-full opacity-60"
//           style={{
//             background: "conic-gradient(from 0deg, #aafc1c, transparent 40%, #aafc1c 60%, transparent)",
//             filter: "blur(28px)",
//           }}
//         />
//         {/* Inner counter-spinning ring */}
//         <div
//           className="energy-ring-inner absolute h-[320px] w-[320px] rounded-full opacity-40"
//           style={{
//             background: "conic-gradient(from 180deg, transparent, #aafc1c 30%, transparent 60%)",
//             filter: "blur(20px)",
//           }}
//         />

//         <Image
//           src="/images/can.png"
//           alt="XTREEM Pro XP"
//           width={600}
//           height={600}
//           className="can relative z-20 h-[380px] w-auto object-contain"
//           style={{ filter: "drop-shadow(0 0 60px rgba(188,224,64,0.35))" }}
//         />

//         {/* Final reveal text (hidden until end of scroll) */}
//         <div
//           className="final-reveal absolute z-30 text-center opacity-0"
//           style={{ transform: "translateY(40px)" }}
//         >
//           <p
//             className="text-3xl lg:text-5xl font-black uppercase tracking-widest text-primary-green"
//             style={{ textShadow: "0 0 40px rgba(188,224,64,0.6)" }}
//           >
//             Unleash <span className="text-white">Your Potential</span>
//           </p>
//         </div>
//       </div>

//       {/* ── Benefit Slides ── */}
//       {benefits.map((benefit, index) => (
//         <BenefitSlide
//           key={benefit.title}
//           index={index}
//           title={benefit.title}
//           keyword={benefit.keyword}
//           desc={benefit.desc}
//           stat={benefit.stat}
//           accent={benefit.accent}
//         />
//       ))}
//     </section>
//   );
// }

// interface BenefitSlideProps {
//   title: string;
//   keyword: string;
//   desc: string;
//   stat: string;
//   accent: string;
//   index: number;
// }

// function BenefitSlide({ title, keyword, desc, stat, accent, index }: BenefitSlideProps) {
//   return (
//     <div
//       className={`
//         benefit-slide slide-${index}
//         absolute inset-0
//         flex items-center justify-between
//         px-16 lg:px-28
//       `}
//       style={{ filter: "blur(8px)" }}
//     >
//       {/* ── Left: Main content ── */}
//       <div className="max-w-sm lg:max-w-md z-30">

//         {/* Ghost keyword behind title */}
//         <div
//           className="slide-keyword relative -mb-4 font-black uppercase text-[80px] lg:text-[110px] leading-none select-none pointer-events-none"
//           style={{
//             color: "transparent",
//             WebkitTextStroke: "1px rgba(188,224,64,0.12)",
//             letterSpacing: "-0.04em",
//           }}
//         >
//           {keyword}
//         </div>

//         {/* Green top divider */}
//         <div
//           className="slide-divider mb-4 mt-2 h-[3px] w-24 bg-primary-green origin-left"
//           style={{
//             boxShadow: "0 0 12px rgba(188,224,64,0.6)",
//           }}
//         />

//         {/* Ingredient title */}
//         <h3 className="text-6xl lg:text-8xl font-black uppercase text-white leading-none tracking-tight">
//           {title}
//         </h3>

//         {/* Accent tag */}
//         <div className="slide-accent-tag mt-4 inline-flex items-center gap-2">
//           <div className="h-[1px] w-6 bg-primary-green/50" />
//           <span className="text-[11px] tracking-[0.25em] uppercase text-primary-green/70">
//             {accent}
//           </span>
//         </div>

//         {/* Description */}
//         <p className="mt-5 text-base lg:text-lg text-zinc-400 leading-relaxed max-w-xs">
//           {desc}
//         </p>
//       </div>

//       {/* ── Right: Stat ── */}
//       <div className="hidden lg:flex flex-col items-end z-30 text-right">
//         {/* Big number / value */}
//         <div
//           className="slide-stat font-black text-primary-green leading-none"
//           style={{
//             fontSize: stat.length > 4 ? "52px" : "88px",
//             textShadow: "0 0 40px rgba(188,224,64,0.4)",
//           }}
//         >
//           {stat}
//         </div>
//         <div className="mt-3 font-black text-7xl lg:text-8xl text-white/5 -mt-2 select-none">
//           0{index + 1}
//         </div>
//         <div className="mt-1 text-[10px] tracking-[0.35em] uppercase text-zinc-600">
//           Ingredient
//         </div>

//         {/* Decorative hex shape */}
//         <div
//           className="mt-6 w-16 h-16 flex items-center justify-center"
//           style={{
//             clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
//             background: "rgba(188,224,64,0.08)",
//             border: "1px solid rgba(188,224,64,0.2)",
//           }}
//         >
//           <div
//             className="w-6 h-6"
//             style={{
//               clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
//               background: "rgba(188,224,64,0.4)",
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ElectricBorder from "./ElectricBorder";
import ProductCan from "./ProductCan";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────────────── */
const INGREDIENTS = [
  {
    id: 0,
    code: "B-VITS",
    title: "B-VITAMINS",
    subtitle: "RECOVER",
    label: "B2 · B3 · B6 · B12",
    stat: "4",
    statUnit: "Vitamins",
    desc: "The full B-complex fuels every cell's energy factory. From ATP synthesis to nerve signal speed — this is where recovery starts.",
    tags: ["Metabolism", "Recovery", "Cell Repair"],
    color: "#aafc1c",
  },
  {
    id: 1,
    code: "TAUR",
    title: "TAURINE",
    subtitle: "ENDURE",
    label: "Amino Acid",
    stat: "↑",
    statUnit: "Endurance",
    desc: "The most abundant amino acid in muscle tissue. Taurine delays fatigue, protects cells under stress, and keeps output high when others fade.",
    tags: ["Stamina", "Anti-Fatigue", "Muscle"],
    color: "#aafc1c",
  },
  {
    id: 2,
    code: "CAFF",
    title: "CAFFEINE",
    subtitle: "IGNITE",
    label: "Natural Source",
    stat: "75",
    statUnit: "mg / can",
    desc: "Not synthetic. Naturally sourced caffeine hits faster, burns cleaner, and exits without the wall-crash that synthetic alternatives cause.",
    tags: ["Natural", "Focus", "No Crash"],
    color: "#aafc1c",
  },
];

/* ─── SVG arc helper ────────────────────────────────────────────────── */
// Returns SVG arc path for a segment of a donut (cx, cy, r, startDeg, endDeg)
function arcPath(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(toRad(startDeg));
  const y1 = cy + r * Math.sin(toRad(startDeg));
  const x2 = cx + r * Math.cos(toRad(endDeg));
  const y2 = cy + r * Math.sin(toRad(endDeg));
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

/* ─── Component ─────────────────────────────────────────────────────── */
export default function PowerSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      /* ── ambient ── */
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

      /* ── title entrance ── */
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

      /* ── initial states ── */
      gsap.set(".ing-card", { opacity: 0, x: -40 });
      gsap.set(".ing-card-0", { opacity: 1, x: 0 });
      gsap.set(".detail-panel", { opacity: 0, y: 30 });
      gsap.set(".detail-panel-0", { opacity: 1, y: 0 });
      gsap.set(".arc-seg", { strokeDashoffset: 300, opacity: 0 });
      gsap.set(".arc-seg-0", { strokeDashoffset: 0, opacity: 1 });
      gsap.set(".progress-fill", { height: "0%" });

      /* ── main pinned timeline ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5600",
          scrub: 1.3,
          pin: true,
          onUpdate: (self) => {
            // drive active card state from scroll progress
            const idx = Math.min(
              INGREDIENTS.length - 1,
              Math.floor(self.progress * INGREDIENTS.length),
            );
            setActiveIndex(idx);
          },
        },
      });

      tl.to(".progress-fill", { height: "100%", ease: "none", duration: 4 }, 0);

      INGREDIENTS.forEach((_, i) => {
        const isFirst = i === 0;
        const isLast = i === INGREDIENTS.length - 1;

        /* card + detail slide in */
        if (!isFirst) {
          tl.to(`.ing-card-${i}`, { opacity: 1, x: 0, duration: 0.6 });
          tl.to(
            `.detail-panel-${i}`,
            { opacity: 1, y: 0, duration: 0.7 },
            "<0.1",
          );

          /* arc segment charges */
          tl.to(
            `.arc-seg-${i}`,
            { strokeDashoffset: 0, opacity: 1, duration: 0.7 },
            "<0.05",
          );

          /* can glow intensifies */
          tl.to(
            ".can-img",
            {
              filter: `drop-shadow(0 0 ${50 + i * 22}px rgba(188,224,64,${0.35 + i * 0.1}))`,
              scale: 1 + i * 0.045,
              duration: 0.8,
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
        scale: 1.45,
        filter: "drop-shadow(0 0 120px rgba(188,224,64,0.75))",
        duration: 1.3,
      });
      tl.to(".arc-outer-ring", { scale: 2.8, opacity: 0, duration: 1.2 }, "<");
      tl.to(
        ".arc-inner-ring",
        { scale: 3.5, opacity: 0, duration: 1.0 },
        "<0.15",
      );
      tl.to(".charge-complete", { opacity: 1, y: 0, duration: 1.0 }, "<0.3");
    },
    { scope: sectionRef },
  );

  const active = INGREDIENTS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black select-none"
    >
      {/* ─── Deep BG glows ─── */}
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

      {/* ─── Grid texture ─── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(188,224,64,1) 1px,transparent 1px),linear-gradient(90deg,rgba(188,224,64,1) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* ─── Scanlines ─── */}
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

      {/* ─── Particles ─── */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className="particle-dot absolute rounded-full bg-[#aafc1c] opacity-40"
            style={{ left: p.x, top: p.y, width: p.s, height: p.s }}
          />
        ))}
      </div>

      {/* ─── Corner brackets ─── */}
      {[
        "top-5 left-5 border-t-2 border-l-2",
        "top-5 right-5 border-t-2 border-r-2",
        "bottom-5 left-5 border-b-2 border-l-2",
        "bottom-5 right-5 border-b-2 border-r-2",
      ].map((cls, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute w-8 h-8 md:w-10 md:h-10 border-[#aafc1c]/25 ${cls}`}
        />
      ))}

      {/* ─── HUD top bar ─── */}
      <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 md:px-10 pt-5 md:pt-7">
        {/* Left: section label */}
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#aafc1c] animate-pulse" />
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#aafc1c]/50 font-medium">
            Formula Breakdown
          </span>
        </div>

        {/* Center: title */}
        <h2
          className="pt-40 ps-title font-black uppercase tracking-tight text-[#aafc1c]
          text-3xl md:text-5xl lg:text-8xl absolute left-1/2 -translate-x-1/2"
        >
          {"Benifits".split("").map((ch, i) =>
            ch === " " ? (
              <span
                key={i}
                className="ps-letter inline-block w-3 md:w-4 opacity-0"
              >
                &nbsp;
              </span>
            ) : (
              <span key={i} className="ps-letter inline-block opacity-0">
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
            {INGREDIENTS.map((_, i) => (
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

      {/* ────────────────────────────────────────────────────────────────
          MAIN 3-COLUMN LAYOUT
      ──────────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-stretch pt-20 md:pt-16 pb-4 md:pb-0">
        {/* ══ COL 1 — Ingredient cards (left) ══ */}
        <div
          className="
          relative z-30
          flex md:flex-col justify-center md:justify-center
          gap-2 md:gap-3
          px-4 md:px-0 md:pl-10 lg:pl-16
          md:w-[30%] lg:w-[28%]
          overflow-x-auto md:overflow-visible
          pb-2 md:pb-0
        "
        >
          {/* Vertical progress rail (desktop) */}
          <div className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 h-48 w-px bg-white/8">
            <div
              className="progress-fill absolute bottom-0 w-full bg-[#aafc1c]"
              style={{ boxShadow: "0 0 8px rgba(188,224,64,0.8)" }}
            />
          </div>

          {INGREDIENTS.map((ing, i) => (
            <ElectricBorder
              key={ing.id}
              color="#BCE040"
              speed={1.2}
              chaos={0.08}
              borderRadius={1}
              className="w-full"
            >
              <div
                className={`ing-card ing-card-${i}
                relative flex-shrink-0
                flex md:flex items-center gap-3 md:gap-4
                px-4 md:px-5 py-3 md:py-4
                border transition-all duration-300 cursor-default
                min-w-[160px] md:min-w-0
              `}
                style={{
                  background:
                    i === activeIndex
                      ? "rgba(188,224,64,0.08)"
                      : "rgba(255,255,255,0.02)",
                  borderColor:
                    i === activeIndex
                      ? "rgba(188,224,64,0.4)"
                      : "rgba(255,255,255,0.06)",
                  boxShadow:
                    i === activeIndex
                      ? "inset 0 0 20px rgba(188,224,64,0.05), 0 0 20px rgba(188,224,64,0.08)"
                      : "none",
                }}
              >
                {/* Active indicator bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[3px] transition-all duration-500"
                  style={{
                    background: i === activeIndex ? "#aafc1c" : "transparent",
                    boxShadow:
                      i === activeIndex
                        ? "0 0 10px rgba(188,224,64,0.9)"
                        : "none",
                  }}
                />

                {/* Code */}
                <span
                  className="font-black text-[10px] md:text-[11px] tracking-[0.2em] uppercase w-10 md:w-12 flex-shrink-0"
                  style={{
                    color:
                      i === activeIndex ? "#aafc1c" : "rgba(188,224,64,0.25)",
                  }}
                >
                  {ing.code}
                </span>

                {/* Title + sub */}
                <div className="min-w-0">
                  <div
                    className="font-black uppercase text-sm md:text-base leading-none"
                    style={{
                      color:
                        i === activeIndex ? "#fff" : "rgba(255,255,255,0.22)",
                    }}
                  >
                    {ing.title}
                  </div>
                  <div
                    className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase mt-0.5"
                    style={{
                      color:
                        i === activeIndex
                          ? "rgba(188,224,64,0.6)"
                          : "rgba(255,255,255,0.15)",
                    }}
                  >
                    {ing.subtitle}
                  </div>
                </div>

                {/* Index */}
                <div
                  className="ml-auto font-black text-xl md:text-2xl leading-none flex-shrink-0"
                  style={{
                    color:
                      i === activeIndex
                        ? "rgba(188,224,64,0.2)"
                        : "rgba(255,255,255,0.05)",
                  }}
                >
                  {i + 1}
                </div>
              </div>
            </ElectricBorder>
          ))}
        </div>

        {/* ══ COL 2 — Can + charging ring (center) ══ */}
        <div
          className="
          relative z-20
          flex items-center justify-center
          flex-1
          md:w-[40%]
          my-auto
        "
        >
          {/* SVG charging arc ring */}
          <div
            className="absolute"
            style={{ width: "min(420px,76vw)", height: "min(420px,76vw)" }}
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
              {/* 4 arc segments, each ~80° with 10° gap */}
              {INGREDIENTS.map((_, i) => {
                const gapDeg = 9;
                const segDeg = 81;
                const start = i * 90 + gapDeg / 2;
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
                return (
                  <line
                    key={i}
                    x1={100 + r1 * Math.cos(rad)}
                    y1={100 + r1 * Math.sin(rad)}
                    x2={100 + r2 * Math.cos(rad)}
                    y2={100 + r2 * Math.sin(rad)}
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
              width: "min(480px,86vw)",
              height: "min(480px,86vw)",
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
              width: "min(280px,52vw)",
              height: "min(280px,52vw)",
              background:
                "conic-gradient(from 120deg,transparent,#aafc1c 30%,transparent 58%)",
              filter: "blur(16px)",
              opacity: 0.35,
            }}
          />

          {/* Static dashed orbit */}
          <div
            className="absolute rounded-full border border-dashed border-[#aafc1c]/10 pointer-events-none"
            style={{ width: "min(360px,66vw)", height: "min(360px,66vw)" }}
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
              height: "clamp(180px, 32vw, 340px)",
              width: "auto",
              filter: "drop-shadow(0 0 55px rgba(188,224,64,0.38))",
            }}
          /> */}
          <ProductCan />

          {/* Charge complete overlay */}
          <div
            className="charge-complete absolute z-20 text-center pointer-events-none"
            style={{ opacity: 0, transform: "translateY(28px)" }}
          >
            <div
              className="font-black uppercase leading-none text-[#c7df0d]"
              style={{
                fontSize: "clamp(22px,5vw,44px)",
                textShadow: "0 0 60px rgba(188,224,64,0.7)",
              }}
            >
              Unleash{" "}
              <span className="text-white">
                Your
                <br />
                Potential
              </span>
            </div>
          </div>

          {/* Mobile mini tags row */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-30">
            {active.tags.map((t) => (
              <span
                key={t}
                className="px-2 py-1 text-[9px] tracking-[0.1em] uppercase font-bold text-[#aafc1c] border border-[#aafc1c]/20 rounded-sm"
                style={{ background: "rgba(188,224,64,0.07)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ══ COL 3 — Detail panels (right) ══ */}
        <div
          className="
          relative z-30
          hidden md:flex flex-col justify-center
          md:w-[30%] lg:w-[32%]
          md:pr-10 lg:pr-16
        "
        >
          {INGREDIENTS.map((ing, i) => (
            <div
              key={ing.id}
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
                {ing.subtitle}
              </div>

              {/* Green rule */}
              <div
                className="mb-5 h-[3px] w-16 lg:w-24 bg-[#aafc1c] rounded-full"
                style={{ boxShadow: "0 0 12px rgba(188,224,64,0.7)" }}
              />

              {/* Ingredient name */}
              <h3
                className="font-black uppercase leading-none tracking-tight text-white"
                style={{ fontSize: "clamp(36px,5vw,68px)" }}
              >
                {ing.title}
              </h3>

              {/* Label pill */}
              <div className="mt-3 inline-flex items-center gap-2 self-start">
                <div className="h-px w-5 bg-[#aafc1c]/50" />
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#aafc1c]/65 font-semibold">
                  {ing.label}
                </span>
              </div>

              {/* Stat */}
              <div className="mt-5 flex items-baseline gap-3">
                <span
                  className="font-black text-[#aafc1c] leading-none"
                  style={{
                    fontSize:
                      ing.stat.length > 3
                        ? "clamp(40px,6vw,72px)"
                        : "clamp(56px,8vw,96px)",
                    textShadow: "0 0 40px rgba(188,224,64,0.45)",
                  }}
                >
                  {ing.stat}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase text-white/30 font-medium">
                  {ing.statUnit}
                </span>
              </div>

              {/* Description */}
              <p className="mt-5 text-sm lg:text-base text-zinc-400 leading-relaxed max-w-[280px]">
                {ing.desc}
              </p>

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {ing.tags.map((tag) => (
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

      {/* ─── Mobile detail strip (bottom) ─── */}
      <div className="absolute bottom-0 left-0 right-0 z-30 md:hidden px-5 pb-5">
        {INGREDIENTS.map((ing, i) => (
          <div
            key={ing.id}
            className={`detail-panel detail-panel-${i} absolute inset-x-5 bottom-5`}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className="flex items-end justify-between">
              <div>
                <div
                  className="mb-2 h-[2px] w-12 bg-[#aafc1c] rounded-full"
                  style={{ boxShadow: "0 0 8px rgba(188,224,64,0.7)" }}
                />
                <h3 className="font-black uppercase text-white text-2xl leading-none">
                  {ing.title}
                </h3>
                <p className="mt-2 text-xs text-zinc-500 leading-relaxed max-w-[220px]">
                  {ing.desc}
                </p>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div
                  className="font-black text-[#aafc1c] leading-none text-4xl"
                  style={{ textShadow: "0 0 30px rgba(188,224,64,0.5)" }}
                >
                  {ing.stat}
                </div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-white/25 mt-1">
                  {ing.statUnit}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Bottom strip: product claim ─── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#aafc1c]/10 z-40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-40 pb-3 hidden md:block">
        <p className="text-[9px] tracking-[0.45em] uppercase text-white/15 text-center">
          High Caffeine · Taurine · Vitamins B · Natural Source · ₹60 · 250ml
        </p>
      </div>

      {/* ─── Inline keyframe for scan animation ─── */}
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
