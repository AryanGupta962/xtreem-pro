// "use client";

// import React, { useRef, useEffect } from "react";
// import { LuLeaf, LuTrendingDown } from "react-icons/lu";
// import { TbLetterB } from "react-icons/tb";
// import type { IconType } from "react-icons";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// // ─────────────────────────────────────────────
// // USP ICON TILE
// // ─────────────────────────────────────────────
// const UspIconTile: React.FC<{ Icon: IconType }> = ({ Icon }) => (
//   <div
//     className="relative flex h-14 w-14 shrink-0 items-center justify-center"
//     style={{
//       clipPath: "polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)",
//       background:
//         "linear-gradient(155deg, rgba(180,255,0,0.14) 0%, rgba(0,0,0,0.5) 60%)",
//       border: "1px solid rgba(190,255,0,0.55)",
//       boxShadow:
//         "0 0 14px rgba(170,255,0,0.25), inset 0 0 10px rgba(170,255,0,0.08)",
//     }}
//   >
//     <Icon className="h-6 w-6 text-lime-400 drop-shadow-[0_0_6px_rgba(190,255,0,0.8)]" />
//   </div>
// );

// // ─────────────────────────────────────────────
// // USP CARD
// // opacity:0 set HERE in JSX so it is invisible on first paint —
// // GSAP then animates it in. Never rely on gsap.set() for
// // the initial hidden state because it runs after the first render.
// // ─────────────────────────────────────────────
// const UspCard: React.FC<{
//   Icon: IconType;
//   title: string;
// }> = ({ Icon, title }) => (
//   <div
//     className="usp-card group relative flex flex-col items-center gap-4 rounded-xl
//                 bg-gradient-to-b from-white/[0.04] to-black/40 p-5
//                 backdrop-blur-sm transition-colors duration-300 hover:border-lime-400/60"
//     // ↓ invisible + offset from the start — no flash possible
//     style={{ opacity: 0, transform: "translateY(24px)" }}
//   >
//     <UspIconTile Icon={Icon} />
//     <div className="min-w-0 pt-0.5">
//       <h3 className="mb-1.5 text-sm font-black uppercase leading-tight tracking-wide text-white">
//         {title}
//       </h3>
//     </div>
//   </div>
// );

// // ─────────────────────────────────────────────
// // MAIN HERO SECTION
// // ─────────────────────────────────────────────
// export default function HeroSection() {
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const slide1Ref = useRef<HTMLDivElement>(null);
//   const slide2Ref = useRef<HTMLDivElement>(null);
//   const slide3Ref = useRef<HTMLDivElement>(null);
//   const trackingRef = useRef<HTMLVideoElement>(null);
//   const heroVidRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const wrapper = wrapperRef.current;
//       const s1 = slide1Ref.current;
//       const s2 = slide2Ref.current;
//       const s3 = slide3Ref.current;
//       if (!wrapper || !s1 || !s2 || !s3) return;

//       // ── Slides 2 & 3 are hidden at paint time via JSX style above.
//       //    We only need to set slide 3 here since slide 2 already has
//       //    opacity:0 from JSX. Add y:60 via gsap for the lift-in effect.
//       gsap.set(s2, { y: 60 });   // opacity already 0 from JSX
//       gsap.set(s3, { opacity: 0, y: 60 });

//       // ── Master scrub timeline (300vh scroll = full 1.0 progress) ──
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: wrapper,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: 0.5,

//           // onUpdate fires on every scroll tick — use progress to
//           // drive video play/pause with no dead zones.
//           onUpdate: (self) => {
//             const p = self.progress;
//             const tv = trackingRef.current;
//             const hv = heroVidRef.current;

//             // Slide 1 zone: 0 – 0.40
//             if (p < 0.40) {
//               tv?.paused && tv.play().catch(() => { });
//               if (hv && !hv.paused) hv.pause();
//             }
//             // Slide 2 zone: 0.40 – 0.65 (no video)
//             else if (p < 0.65) {
//               if (tv && !tv.paused) tv.pause();
//               if (hv && !hv.paused) hv.pause();
//             }
//             // Slide 3 zone: 0.65 – 1.0
//             else {
//               if (tv && !tv.paused) tv.pause();
//               hv?.paused && hv.play().catch(() => { });
//             }
//           },
//         },
//       });

//       // ── Transition 1 → 2  (tl position 0 … 0.45) ──
//       tl.to(s1, { opacity: 0, y: -50, scale: 0.97, duration: 0.2, ease: "power2.in" }, 0)
//         .to(s2, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.15)

//         // ── Transition 2 → 3  (tl position 0.5 … 1.0) ──
//         .to(s2, { opacity: 0, y: -50, scale: 0.97, duration: 0.2, ease: "power2.in" }, 0.5)
//         .to(s3, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.65);

//       // ── USP card stagger when slide 2 becomes visible ──
//       const uspCards = s2.querySelectorAll<HTMLElement>(".usp-card");

//       ScrollTrigger.create({
//         trigger: wrapper,
//         // fire when 35 % of the wrapper has scrolled past the top
//         start: "35% top",
//         end: "65% top",
//         onEnter: () =>
//           gsap.to(uspCards, {
//             opacity: 1,
//             y: 0,
//             duration: 0.5,
//             stagger: 0.1,
//             ease: "power3.out",
//           }),
//         onLeaveBack: () =>
//           gsap.set(uspCards, { opacity: 0, y: 24 }),
//       });

//     }, wrapperRef);

//     // Play tracking video on mount (slide 1 is visible)
//     trackingRef.current?.play().catch(() => { });

//     return () => ctx.revert();
//   }, []);

//   return (
//     <>
//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(24px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes scrollBounce {
//           0%,100% { transform: translateY(0); }
//           50%     { transform: translateY(10px); }
//         }
//         @keyframes shimmer {
//           0%   { background-position: -200% center; }
//           100% { background-position:  200% center; }
//         }
//         .animate-fadeInUp     { animation: fadeInUp 0.8s ease forwards; }
//         .animate-scrollBounce { animation: scrollBounce 1.5s ease-in-out infinite; }

//         .text-shimmer {
//           background: linear-gradient(90deg, #c8ff00 20%, #ffffff 50%, #c8ff00 80%);
//           background-size: 200% auto;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//           animation: shimmer 3s linear infinite;
//         }
//       `}</style>

//       {/* 300 vh outer wrapper — content below starts after this */}
//       <div
//         ref={wrapperRef}
//         className="relative bg-black"
//         style={{ height: "300vh", zIndex: 10 }}
//       >
//         {/* Sticky viewport — stays fixed while user scrolls the 300 vh */}
//         <div
//           style={{
//             position: "sticky",
//             top: 0,
//             height: "100vh",
//             width: "100%",
//             overflow: "hidden",
//           }}
//         >

//           {/* ── SLIDE 1 — Tracking video ── */}
//           <div
//             ref={slide1Ref}
//             className="absolute inset-0 flex items-end justify-center pb-10 px-6"
//             style={{ zIndex: 1 }}
//           >
//             <video
//               ref={trackingRef}
//               muted loop playsInline autoPlay preload="auto"
//               className="absolute inset-0 h-full w-full object-cover"
//             >
//               <source src="/videos/tracking-2.mp4" type="video/mp4" />
//             </video>

//             {/* gradient overlay */}
//             <div
//               className="absolute inset-0 pointer-events-none"
//               style={{
//                 background:
//                   "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 40%, transparent 60%, rgba(0,0,0,0.2) 100%)",
//               }}
//             />

//             {/* copy */}
//             <div className="relative z-10 flex flex-col items-center">
//               <div
//                 className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-white/60 opacity-0 animate-fadeInUp"
//                 style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
//               >
//                 Charged. Clean. Unstoppable.
//               </div>

//               <h1
//                 className="text-center uppercase font-black leading-[0.95] mb-6 opacity-0 animate-fadeInUp"
//                 style={{
//                   animationDelay: "450ms",
//                   animationFillMode: "forwards",
//                   fontSize: "clamp(2.6rem, 9vw, 4rem)",
//                   letterSpacing: "-0.02em",
//                 }}
//               >
//                 <span className="text-shimmer">Premium Energy</span>
//               </h1>

//               <div
//                 className="flex flex-col items-center opacity-0 animate-fadeInUp"
//                 style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
//               >
//                 <span className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
//                   Scroll to explore
//                 </span>
//                 <div className="h-9 w-5 rounded-full border border-lime-400/40 p-1">
//                   <div className="h-1.5 w-1.5 animate-scrollBounce rounded-full bg-lime-400 shadow-[0_0_6px_rgba(190,255,0,0.9)]" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ── SLIDE 2 — USP ── */}
//           {/* opacity:0 is set in JSX here to prevent first-paint flash */}
//           <div
//             ref={slide2Ref}
//             className="absolute inset-0 flex flex-col items-center justify-center px-6"
//             style={{ zIndex: 2, opacity: 0 }}
//           >
//             <div
//               className="absolute inset-0"
//               style={{
//                 background:
//                   "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(50,80,0,0.3) 0%, rgba(0,0,0,0.97) 100%)",
//               }}
//             />

//             <div className="relative z-10 mb-10 text-center">
//               <div className="text-lime-400/60 text-xs font-bold tracking-[0.5em] uppercase mb-6">
//                 The Science Behind the Surge
//               </div>
//               <div
//                 className="font-black text-white leading-none mb-4"
//                 style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.02em" }}
//               >
//                 75mg <span className="text-lime-400">Natural Caffeine.</span>
//                 <br />
//                 <span className="text-white/40">18 Month Shelf Life.</span>
//                 <br />
//                 Zero Compromise.
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
//               <UspCard Icon={TbLetterB} title="B-Vitamin Complex" />
//               <UspCard Icon={LuLeaf} title="Natural Caffeine" />
//               <UspCard Icon={LuTrendingDown} title="No Sugar Crash" />
//             </div>
//           </div>

//           {/* ── SLIDE 3 — Hero video ── */}
//           {/* opacity:0 set in JSX — same reason */}
//           <div
//             ref={slide3Ref}
//             className="absolute inset-0"
//             style={{ zIndex: 3, opacity: 0 }}
//           >
//             <video
//               ref={heroVidRef}
//               muted loop playsInline preload="none"
//               className="absolute inset-0 h-full w-full object-fill object-center"
//             >
//               <source src="/videos/hero.mp4" type="video/mp4" />
//             </video>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }
"use client";

import React, { useRef, useEffect } from "react";
import { LuLeaf, LuTrendingDown, LuFlame } from "react-icons/lu";
import { TbLetterB } from "react-icons/tb";
import type { IconType } from "react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lightning from "./Lightning";
import ElectricBlast from "./Lightning";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// USP ICON TILE — More premium version
// ─────────────────────────────────────────────
const UspIconTile: React.FC<{ Icon: IconType }> = ({ Icon }) => (
  <div
    className="relative flex h-16 w-16 shrink-0 items-center justify-center"
    style={{
      clipPath: "polygon(25% 8%, 75% 8%, 100% 50%, 75% 92%, 25% 92%, 0% 50%)",
      background:
        "linear-gradient(145deg, rgba(220,255,120,0.12) 0%, rgba(40,40,40,0.85) 45%, rgba(10,10,10,0.95) 100%)",
      border: "1px solid rgba(200,255,100,0.45)",
      boxShadow:
        "0 0 28px rgba(190,255,80,0.18), inset 0 0 18px rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.6)",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[inherit]" />
    <Icon className="h-8 w-8 text-lime-300 drop-shadow-[0_0_12px_rgba(220,255,120,0.9)]" />
  </div>
);

// ─────────────────────────────────────────────
// USP CARD — Premium & Classy redesign
// ─────────────────────────────────────────────
const UspCard: React.FC<{
  Icon: IconType;
  title: string;
  subtitle?: string;
}> = ({ Icon, title, subtitle }) => (
  <div
    className="usp-card group relative flex flex-col items-center gap-5 rounded-2xl
                bg-gradient-to-b from-white/[0.06] via-black/60 to-black/80 p-8
                backdrop-blur-xl border border-white/10 hover:border-lime-400/50
                transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-lime-400/10"
    style={{ opacity: 0, transform: "translateY(40px)" }}
  >
    <UspIconTile Icon={Icon} />

    <div className="text-center">
      <h3 className="mb-2 text-lg font-black uppercase tracking-[0.04em] text-white">
        {title}
      </h3>
      {subtitle && (
        <p className="text-sm leading-tight text-white/60 font-light tracking-wide">
          {subtitle}
        </p>
      )}
    </div>

    {/* Subtle bottom accent line */}
    <div className="absolute bottom-4 h-px w-12 bg-gradient-to-r from-transparent via-lime-400/60 to-transparent" />
  </div>
);

// ─────────────────────────────────────────────
// MAIN HERO SECTION
// ─────────────────────────────────────────────
export default function HeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const slide1Ref = useRef<HTMLDivElement>(null);
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const trackingRef = useRef<HTMLVideoElement>(null);
  const heroVidRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const s1 = slide1Ref.current;
      const s2 = slide2Ref.current;
      const s3 = slide3Ref.current;
      if (!wrapper || !s1 || !s2 || !s3) return;

      gsap.set(s2, { y: 60 });
      gsap.set(s3, { opacity: 0, y: 60 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            const tv = trackingRef.current;
            const hv = heroVidRef.current;

            if (p < 0.4) {
              tv?.paused && tv.play().catch(() => {});
              if (hv && !hv.paused) hv.pause();
            } else if (p < 0.65) {
              if (tv && !tv.paused) tv.pause();
              if (hv && !hv.paused) hv.pause();
            } else {
              if (tv && !tv.paused) tv.pause();
              hv?.paused && hv.play().catch(() => {});
            }
          },
        },
      });

      tl.to(
        s1,
        { opacity: 0, y: -50, scale: 0.97, duration: 0.2, ease: "power2.in" },
        0,
      )
        .to(s2, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.15)
        .to(
          s2,
          { opacity: 0, y: -50, scale: 0.97, duration: 0.2, ease: "power2.in" },
          0.5,
        )
        .to(s3, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.65);

      const uspCards = s2.querySelectorAll<HTMLElement>(".usp-card");

      ScrollTrigger.create({
        trigger: wrapper,
        start: "35% top",
        end: "65% top",
        onEnter: () =>
          gsap.to(uspCards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          }),
        onLeaveBack: () => gsap.set(uspCards, { opacity: 0, y: 40 }),
      });
    }, wrapperRef);

    trackingRef.current?.play().catch(() => {});

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollBounce {
          0%,100% { transform: translateY(0); }
          50%     { transform: translateY(10px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .animate-fadeInUp     { animation: fadeInUp 0.9s ease forwards; }
        .animate-scrollBounce { animation: scrollBounce 1.6s ease-in-out infinite; }

        .text-shimmer {
          background: linear-gradient(90deg, #d4ff4d 15%, #ffffff 50%, #d4ff4d 85%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3.5s linear infinite;
        }
      `}</style>

      <div
        ref={wrapperRef}
        className="relative bg-black"
        style={{ height: "300vh", zIndex: 10 }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {/* SLIDE 1 — unchanged */}
          <div
            ref={slide1Ref}
            className="absolute inset-0 flex items-end justify-center pb-10 px-6"
            style={{ zIndex: 1 }}
          >
            {/* ... existing slide 1 content ... */}
            <video
              ref={trackingRef}
              muted
              loop
              playsInline
              autoPlay
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/videos/tracking-2.mp4" type="video/mp4" />
            </video>

            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 40%, transparent 60%, rgba(0,0,0,0.25) 100%)",
              }}
            />

            <div className="relative z-10 flex flex-col items-center">
              <div
                className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-white/60 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "300ms",
                  animationFillMode: "forwards",
                }}
              >
                Charged. Clean. Unstoppable.
              </div>

              <h1
                className="text-center uppercase font-black leading-[0.95] mb-6 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "450ms",
                  animationFillMode: "forwards",
                  fontSize: "clamp(2.6rem, 9vw, 4rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                <span className="text-shimmer">Premium Energy</span>
              </h1>

              <div
                className="flex flex-col items-center opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: "800ms",
                  animationFillMode: "forwards",
                }}
              >
                <span className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
                  Scroll to explore
                </span>
                <div className="h-9 w-5 rounded-full border border-lime-400/40 p-1">
                  <div className="h-1.5 w-1.5 animate-scrollBounce rounded-full bg-lime-400 shadow-[0_0_6px_rgba(190,255,0,0.9)]" />
                </div>
              </div>
            </div>
          </div>

          {/* ── SLIDE 2 — ELECTRICITY CHARGING THE CAN ── */}
          <div
            ref={slide2Ref}
            className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
            style={{ zIndex: 2, opacity: 0 }}
          >
            {/* Background */}
            <div
              className="absolute inset-0"
              style={{
                background: `
        radial-gradient(circle at 50% 35%, rgba(100, 255, 70, 0.18) 0%, transparent 65%),
        linear-gradient(180deg, rgba(0,0,0,0.96) 0%, rgba(5,10,5,0.99) 100%)
      `,
              }}
            />

            {/* Lightning Effects */}
            <div className="absolute inset-0 pointer-events-none">
              <ElectricBlast armCount={15} speed={0.2} intensity={2} />
            </div>

            {/* Main Product Can */}
            <div className="relative z-20 flex justify-center flex-shrink-0">
              <div className="relative group">
                {/* Glow — clamped so it never bleeds on mobile */}
                <div
                  className="absolute rounded-full bg-lime-400/20 blur-[60px] sm:blur-[100px] animate-pulse"
                  style={{ inset: "-3rem" }}
                />
                <div
                  className="absolute rounded-full bg-lime-400/28 blur-2xl sm:blur-3xl animate-pulse"
                  style={{ inset: "-1rem", animationDuration: "2.4s" }}
                />

                {/* Can — fluid height that shrinks on small screens */}
                <div
                  className="relative w-[160px] sm:w-[190px] md:w-[220px]"
                  style={{ height: "clamp(260px, 48vh, 500px)" }}
                >
                  <Image
                    src="/images/can.png"
                    alt="Premium Energy Drink Can"
                    fill
                    priority
                    className="object-contain transition-all duration-1000 group-hover:scale-[1.04]"
                    style={{
                      filter: `
              drop-shadow(0 0 50px rgba(190, 255, 110, 0.85))
              drop-shadow(0 0 90px rgba(160, 255, 80, 0.55))
            `,
                    }}
                  />
                </div>

                {/* Core pulse */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-lime-400 rounded-full blur-xl animate-pulse" />
              </div>
            </div>

            {/* Text Content — gap scales with viewport so nothing overflows */}
            <div className="relative z-30 text-center mt-4 sm:mt-8 md:mt-12 px-2">
              <h2
                className="font-black text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(1.8rem, 6vw, 5rem)" }}
              >
                ENERGY DRINK
                <br />
                <span className="bg-gradient-to-r from-primary-green via-white to-primary-green bg-clip-text text-transparent">
                  WITH NATURAL CAFFEINE
                </span>
              </h2>

              <p className="mt-3 sm:mt-6 text-white/80 max-w-sm sm:max-w-md mx-auto text-sm sm:text-base md:text-lg leading-snug">
                75mg Pure Power • Zero Crash • 18 Months Shelf Life
              </p>
            </div>

            {/* Bottom Tagline — hidden on very short screens to avoid overlap */}
            <div className="absolute bottom-4 sm:bottom-8 md:bottom-12 hidden xs:block text-[10px] sm:text-xs uppercase tracking-[3px] text-white/50 font-medium z-30">
              ELECTRIC • CLEAN • UNSTOPPABLE
            </div>
          </div>

          {/* SLIDE 3 — unchanged */}
          <div
            ref={slide3Ref}
            className="absolute inset-0"
            style={{ zIndex: 3, opacity: 0 }}
          >
            <video
              ref={heroVidRef}
              muted
              loop
              playsInline
              preload="none"
              className="max-md:hidden absolute inset-0 h-full w-full object-fill object-center"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>

            <video
              ref={heroVidRef}
              muted
              loop
              playsInline
              preload="none"
              className="md:hidden absolute inset-0 h-full w-full object-fill object-center"
            >
              <source src="/videos/side-hero-2.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </>
  );
}
