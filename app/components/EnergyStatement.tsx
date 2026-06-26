"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SPECS = [
  { key: "CAFFEINE", val: "80MG" },
  { key: "TAURINE", val: "1000MG" },
  { key: "B-VITAMINS", val: "COMPLEX" },
  { key: "VOLUME", val: "250ML" },
  { key: "SUGAR", val: "0G" },
];

const STATS = [
  { num: "3×", label: "Energy\nBoost" },
  { num: "5H", label: "Sustained\nFocus" },
  { num: "#1", label: "India's\nPro Drink" },
];

export default function EnergyShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".es2-video-frame", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(".es2-watermark", {
        xPercent: 8,
        opacity: 0,
        duration: 1.8,
        ease: "power4.out",
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
        delay: 0.5,
      });

      tl.from(".es2-index", {
        opacity: 0,
        y: 16,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          ".es2-eyebrow-line",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .from(
          ".es2-eyebrow-text",
          { opacity: 0, x: 10, duration: 0.45, ease: "power2.out" },
          "-=0.35",
        )
        .from(
          ".es2-word",
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.1,
            duration: 1.0,
            ease: "power4.out",
          },
          "-=0.25",
        )
        .from(
          ".es2-body",
          { y: 22, opacity: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5",
        )
        .from(
          ".es2-spec-cell",
          {
            y: 18,
            opacity: 0,
            stagger: 0.07,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          ".es2-stat",
          {
            y: 20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .from(
          ".es2-cta-row",
          { y: 14, opacity: 0, duration: 0.55, ease: "power2.out" },
          "-=0.3",
        );

      gsap.to(".es2-glow-orb", {
        scale: 1.2,
        opacity: 0.14,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".es2-video-inner", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="es2-section relative overflow-hidden bg-[#080808] text-[#F0F0F0] font-sans"
    >
      {/* Noise grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
        aria-hidden
      />

      {/* Ambient glow orb */}
      <div
        className="es2-glow-orb pointer-events-none absolute top-[10%] right-[5%] z-0 h-[55vw] w-[55vw] max-h-[700px] max-w-[700px] rounded-full opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle, rgba(182,240,0,0.18) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      {/* Watermark */}
      <div
        className="es2-watermark pointer-events-none absolute right-[-4vw] top-1/2 z-[2] -translate-y-1/2 select-none whitespace-nowrap leading-none"
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(6rem, 22vw, 22rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.04)",
          letterSpacing: "-0.02em",
        }}
        aria-hidden
      >
        XTREEM
      </div>

      {/* ── Outer grid: hidden index col on mobile, shown on desktop ── */}
      <div className="relative z-10 grid min-h-svh grid-cols-1 lg:grid-cols-[64px_1fr]">
        {/* Index col — hidden on mobile */}
        <aside
          className="es2-index hidden lg:flex items-center justify-center border-r border-white/[0.07] py-6"
          aria-hidden
        >
          <div
            className="flex flex-col items-center gap-3"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            <span
              className="text-[0.8rem] tracking-[0.12em]"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: "#B6F000",
              }}
            >
              02
            </span>
            <div
              className="w-px flex-1 min-h-[60px]"
              style={{
                background:
                  "linear-gradient(to top, rgba(255,255,255,0.07), #B6F000 50%, rgba(255,255,255,0.07))",
                transform: "rotate(180deg)",
              }}
            />
            <span className="text-[0.55rem] font-medium tracking-[0.3em] text-white/25">
              ENERGY
            </span>
          </div>
        </aside>

        {/* Main: video stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          {/* ── Video frame ── */}
          <div
            className="es2-video-frame relative overflow-hidden"
            style={{ height: "clamp(220px, 55vw, 360px)" }}
          >
            {/* Extra height for parallax */}
            <div
              className="es2-video-inner absolute inset-x-0"
              style={{ top: "-8%", bottom: "-8%" }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                className="h-full w-full object-cover object-top block"
              >
                <source src="/videos/side-hero.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Desktop: right-edge fade */}
            <div
              className="absolute inset-y-0 right-0 z-[2] hidden lg:block w-[45%]"
              style={{
                background: "linear-gradient(to right, transparent, #080808)",
              }}
              aria-hidden
            />

            {/* Mobile: bottom fade */}
            <div
              className="absolute inset-x-0 bottom-0 z-[2] h-2/5 lg:hidden"
              style={{
                background: "linear-gradient(to bottom, transparent, #080808)",
              }}
              aria-hidden
            />

            {/* Video bottom label */}
            <div
              className="absolute bottom-3 left-3 z-[4] flex items-center gap-2"
              aria-hidden
            >
              <span
                className="rounded-[2px] px-1.5 py-0.5 text-[0.7rem] tracking-[0.1em] text-black"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  background: "#B6F000",
                }}
              >
                XP
              </span>
              <span className="text-[0.55rem] font-medium tracking-[0.22em] text-white/40">
                XTREEM PRO · 250ML
              </span>
            </div>

            {/* Corner ticks */}
            {[
              "top-3 left-3",
              "top-3 right-3 scale-x-[-1]",
              "bottom-3 left-3 scale-y-[-1]",
              "bottom-3 right-3 scale-[-1]",
            ].map((pos, i) => (
              <div
                key={i}
                className={`absolute z-[3] h-3 w-3 ${pos}`}
                aria-hidden
              >
                <span
                  className="absolute top-0 left-0 h-px w-full block"
                  style={{ background: "#B6F000" }}
                />
                <span
                  className="absolute top-0 left-0 w-px h-full block"
                  style={{ background: "#B6F000" }}
                />
              </div>
            ))}

            {/* Desktop: full-height override */}
            <style>{`
              @media (min-width: 1024px) {
                .es2-video-frame { height: 100svh !important; }
              }
            `}</style>
          </div>

          {/* ── Content panel ── */}
          <div className="flex flex-col justify-center px-5 pt-5 pb-8 sm:px-8 lg:px-[8%] lg:py-16">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="es2-eyebrow-line block h-px w-7 shrink-0"
                style={{ background: "#B6F000" }}
              />
              <span
                className="es2-eyebrow-text text-[0.58rem] font-semibold tracking-[0.24em]"
                style={{ color: "#B6F000" }}
              >
                ENERGY · ENDURANCE · FOCUS
              </span>
            </div>

            {/* Headline */}
            <h2
              className="flex flex-col mb-3 leading-[0.88]"
              aria-label="Unleash Your Potential"
            >
              {[
                { text: "UNLEASH", accent: false },
                { text: "YOUR", accent: false },
                { text: "POTENTIAL", accent: true },
              ].map(({ text, accent }) => (
                <span key={text} className="overflow-hidden block">
                  <span
                    className="es2-word block will-change-transform"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(3rem, 11vw, 8.5rem)",
                      letterSpacing: "-0.01em",
                      color: accent ? "#B6F000" : "#F0F0F0",
                    }}
                  >
                    {text}
                  </span>
                </span>
              ))}
            </h2>

            {/* Body */}
            <p className="es2-body mb-4 max-w-[420px] text-[0.82rem] font-light leading-[1.7] text-white/50">
              Powered with Taurine, Caffeine and B&#8209;Vitamins — Xtreem Pro
              delivers intense energy, enhanced endurance and laser focus for
              those who refuse to settle for average.
            </p>

            {/* Spec strip */}
            <div
              className="mb-4 flex overflow-hidden rounded-[2px] border border-white/[0.07]"
              role="list"
              aria-label="Product specifications"
            >
              {SPECS.map((s) => (
                <div
                  key={s.key}
                  className="es2-spec-cell flex flex-1 flex-col items-start gap-0.5 border-r border-white/[0.07] px-2.5 py-2 last:border-r-0 transition-colors hover:bg-[rgba(182,240,0,0.04)]"
                  role="listitem"
                >
                  <span
                    className="text-[0.92rem] leading-none text-white"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.val}
                  </span>
                  <span className="text-[0.46rem] font-semibold uppercase tracking-[0.2em] text-white/30">
                    {s.key}
                  </span>
                </div>
              ))}
            </div>

            {/* Thin rule */}
            <div
              className="mb-4 h-px"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.07) 0%, transparent 80%)",
              }}
              aria-hidden
            />

            {/* Stats */}
            <div className="mb-5 flex items-start">
              {STATS.map((s) => (
                <div
                  key={s.num}
                  className="es2-stat flex items-baseline gap-2 border-r border-white/[0.07] pr-4 mr-4 last:border-r-0 last:mr-0 last:pr-0"
                >
                  <span
                    className="leading-none text-white"
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: "clamp(1.6rem, 5vw, 3rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {s.num}
                  </span>
                  <span className="text-[0.5rem] font-medium uppercase tracking-[0.14em] text-white/30 leading-[1.5]">
                    {s.label.split("\n").map((ln, i) => (
                      <span key={i} className="block">
                        {ln}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="es2-cta-row flex flex-wrap items-center gap-3">
              {/* Primary — Explore */}
              <button
                className="inline-flex items-center gap-2.5 rounded-[2px] border-0 px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-black transition-all duration-200 hover:brightness-110 hover:-translate-y-px active:translate-y-0"
                style={{ background: "#B6F000" }}
              >
                <span>Explore the Can</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              {/* Secondary — Buy Now (outlined) */}
              <button className="inline-flex items-center gap-2 rounded-[2px] border border-white/25 bg-transparent px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/80 transition-all duration-200 hover:border-[#B6F000] hover:text-[#B6F000] hover:bg-[rgba(182,240,0,0.04)]">
                Contact
              </button>
            </div>
          </div>
          {/* /content */}
        </div>
        {/* /main */}
      </div>
      {/* /outer */}
    </section>
  );
}
// "use client";

// /**
//  * EnergyShowcase — v4 "Fullbleed Cinematic"
//  *
//  * Mobile:  Video fills 100svh. Dark gradient overlay. Content sits at bottom.
//  *          Specs scroll horizontally. Stats are compact inline row.
//  * Tablet:  Same as mobile, slightly more vertical breathing room.
//  * Desktop: Split with a DIAGONAL clip-path divider — video on left, dark
//  *          content panel on right, sliced at ~55deg. Video parallax on scroll.
//  *
//  * GSAP animations trigger on scroll. Every element is visible on all sizes.
//  */

// import { useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// // ─── Data ─────────────────────────────────────────────────────────────────────
// const SPECS = [
//   { key: "CAFFEINE",   val: "80MG"    },
//   { key: "TAURINE",    val: "1000MG"  },
//   { key: "B-VITAMINS", val: "COMPLEX" },
//   { key: "VOLUME",     val: "250ML"   },
//   { key: "SUGAR",      val: "0G"      },
// ];

// const STATS = [
//   { num: "3×",  label: "Energy Boost"      },
//   { num: "5H",  label: "Sustained Focus"   },
//   { num: "#1",  label: "India's Pro Drink" },
// ];

// // ─── Component ────────────────────────────────────────────────────────────────
// export default function EnergyShowcase() {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useGSAP(() => {
//     const mm = gsap.matchMedia();

//     // ── SHARED: content reveal timeline (fires on all breakpoints) ───────────
//     const contentTL = gsap.timeline({
//       scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
//       delay: 0.2,
//     });

//     contentTL
//       .from(".es3-eyebrow", { opacity: 0, y: 12, duration: 0.55, ease: "power3.out" })
//       .from(".es3-word", {
//         yPercent: 108, opacity: 0,
//         stagger: 0.1, duration: 1.0, ease: "power4.out",
//       }, "-=0.3")
//       .from(".es3-body", { y: 20, opacity: 0, duration: 0.75, ease: "power3.out" }, "-=0.55")
//       .from(".es3-spec-item", {
//         y: 16, opacity: 0,
//         stagger: 0.06, duration: 0.5, ease: "power2.out",
//       }, "-=0.5")
//       .from(".es3-stat", {
//         y: 18, opacity: 0,
//         stagger: 0.08, duration: 0.6, ease: "power3.out",
//       }, "-=0.4")
//       .from(".es3-cta-row", { y: 14, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.35");

//     // ── Watermark drift ───────────────────────────────────────────────────────
//     gsap.from(".es3-watermark", {
//       x: "6%", opacity: 0, duration: 2, ease: "power4.out",
//       scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
//     });

//     // ── Ambient glow pulse (always) ───────────────────────────────────────────
//     gsap.to(".es3-glow", {
//       scale: 1.25, opacity: 0.22,
//       duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut",
//     });

//     // ── DESKTOP ONLY ──────────────────────────────────────────────────────────
//     mm.add("(min-width: 1024px)", () => {
//       // Video parallax
//       gsap.to(".es3-video-inner", {
//         yPercent: -10, ease: "none",
//         scrollTrigger: {
//           trigger: sectionRef.current,
//           start: "top bottom", end: "bottom top", scrub: true,
//         },
//       });

//       // Diagonal slice draws in
//       gsap.from(".es3-slice", {
//         xPercent: -100, opacity: 0, duration: 1.4, ease: "expo.out",
//         scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
//       });
//     });

//     // ── MOBILE ONLY ───────────────────────────────────────────────────────────
//     mm.add("(max-width: 1023px)", () => {
//       // Bottom gradient wipe-up reveal
//       gsap.from(".es3-mobile-overlay", {
//         yPercent: 6, opacity: 0, duration: 1, ease: "power3.out",
//         scrollTrigger: { trigger: sectionRef.current, start: "top 82%", once: true },
//       });
//     });

//     return () => mm.revert();
//   }, { scope: sectionRef });

//   return (
//     <section ref={sectionRef} className="es3-section">
//       <style>{CSS}</style>

//       {/* ══════════════════════════════════════════════════════════════════════
//           VIDEO LAYER — always fullbleed, always present
//       ══════════════════════════════════════════════════════════════════════ */}
//       <div className="es3-video-bg" aria-hidden>
//         <div className="es3-video-inner">
//           <video
//             autoPlay muted loop playsInline preload="metadata"
//             className="es3-video-el"
//           >
//             <source src="/videos/side-hero.mp4" type="video/mp4" />
//           </video>
//         </div>

//         {/* Corner ticks — visible on both mobile + desktop */}
//         {(["tl","tr","bl","br"] as const).map(p => (
//           <div key={p} className={`es3-tick es3-tick-${p}`} aria-hidden />
//         ))}
//       </div>

//       {/* ══════════════════════════════════════════════════════════════════════
//           DESKTOP: diagonal dark panel that clips over the right half
//       ══════════════════════════════════════════════════════════════════════ */}
//       <div className="es3-slice" aria-hidden />

//       {/* Ambient glow — inside the content zone */}
//       <div className="es3-glow" aria-hidden />

//       {/* Watermark */}
//       <div className="es3-watermark" aria-hidden>XTREEM</div>

//       {/* ══════════════════════════════════════════════════════════════════════
//           MOBILE: gradient overlay so text reads over the video
//       ══════════════════════════════════════════════════════════════════════ */}
//       <div className="es3-mobile-overlay" aria-hidden />

//       {/* ══════════════════════════════════════════════════════════════════════
//           CONTENT — positioned absolutely over video on mobile,
//           inside the right slice on desktop
//       ══════════════════════════════════════════════════════════════════════ */}
//       <div className="es3-content-wrap">
//         <div className="es3-content">

//           {/* Eyebrow */}
//           <div className="es3-eyebrow">
//             <span className="es3-eyebrow-line" />
//             <span className="es3-eyebrow-text">ENERGY · ENDURANCE · FOCUS</span>
//           </div>

//           {/* Headline */}
//           <h2 className="es3-headline" aria-label="Unleash Your Potential">
//             {[
//               { w: "UNLEASH",   accent: false },
//               { w: "YOUR",      accent: false },
//               { w: "POTENTIAL", accent: true  },
//             ].map(({ w, accent }) => (
//               <span key={w} className="es3-line-clip">
//                 <span className={`es3-word${accent ? " es3-word--green" : ""}`}>{w}</span>
//               </span>
//             ))}
//           </h2>

//           {/* Body */}
//           <p className="es3-body">
//             Powered with Taurine, Caffeine and B&#8209;Vitamins — Xtreem Pro
//             delivers intense energy, enhanced endurance and laser focus
//             for those who refuse to settle for average.
//           </p>

//           {/* Spec strip — horizontal scroll on mobile */}
//           <div className="es3-spec-strip" role="list" aria-label="Product specs">
//             {SPECS.map(s => (
//               <div key={s.key} className="es3-spec-item" role="listitem">
//                 <span className="es3-spec-val">{s.val}</span>
//                 <span className="es3-spec-key">{s.key}</span>
//               </div>
//             ))}
//           </div>

//           {/* Divider */}
//           <div className="es3-rule" aria-hidden />

//           {/* Stats */}
//           <div className="es3-stats">
//             {STATS.map(s => (
//               <div key={s.num} className="es3-stat">
//                 <span className="es3-stat-num">{s.num}</span>
//                 <span className="es3-stat-label">{s.label}</span>
//               </div>
//             ))}
//           </div>

//           {/* CTA */}
//           <div className="es3-cta-row">
//             <button className="es3-btn-primary">
//               <span>Explore the Can</span>
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                 stroke="currentColor" strokeWidth="2.2"
//                 strokeLinecap="round" strokeLinejoin="round" aria-hidden>
//                 <line x1="5" y1="12" x2="19" y2="12"/>
//                 <polyline points="12 5 19 12 12 19"/>
//               </svg>
//             </button>
//             <button className="es3-btn-ghost">
//               <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//                 stroke="currentColor" strokeWidth="2"
//                 strokeLinecap="round" strokeLinejoin="round" aria-hidden>
//                 <polygon points="5 3 19 12 5 21 5 3"/>
//               </svg>
//               Watch the Film
//             </button>
//           </div>

//         </div>
//       </div>

//       {/* Video badge — bottom-left, always visible */}
//       <div className="es3-video-badge" aria-hidden>
//         <span className="es3-badge-xp">XP</span>
//         <span className="es3-badge-text">XTREEM PRO · 250ML</span>
//       </div>

//       {/* Index strip — desktop only left edge */}
//       <div className="es3-index-strip" aria-hidden>
//         <span className="es3-index-num">02</span>
//         <div className="es3-index-bar" />
//         <span className="es3-index-label">ENERGY</span>
//       </div>

//     </section>
//   );
// }

// // ─── CSS ─────────────────────────────────────────────────────────────────────
// const CSS = `
// @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

// /* ── tokens ─────────────────────────────────────────────────────────────────── */
// .es3-section {
//   --acid:    #B6F000;
//   --black:   #080808;
//   --white:   #F2F2F2;
//   --dim:     rgba(242,242,242,0.42);
//   --rule:    rgba(255,255,255,0.08);
//   --fBebas:  'Bebas Neue', sans-serif;
//   --fInter:  'Inter', sans-serif;

//   position: relative;
//   width: 100%;
//   min-height: 100svh;
//   overflow: hidden;
//   background: var(--black);
//   font-family: var(--fInter);
//   color: var(--white);
// }

// /* grain */
// .es3-section::before {
//   content: '';
//   position: absolute; inset: 0; z-index: 30;
//   pointer-events: none;
//   opacity: 0.028;
//   background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
//   background-size: 180px;
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    VIDEO BG — z-index 1, always fullscreen
// ══════════════════════════════════════════════════════════════════════════════ */
// .es3-video-bg {
//   position: absolute;
//   inset: 0;
//   z-index: 1;
//   overflow: hidden;
// }
// .es3-video-inner {
//   position: absolute;
//   inset: -12% 0;
//   will-change: transform;
// }
// .es3-video-el {
//   width: 100%; height: 100%;
//   object-fit: cover;
//   object-position: center top;
//   display: block;
// }

// /* ── corner ticks ────────────────────────────────────────────────────────────  */
// .es3-tick {
//   position: absolute; width: 16px; height: 16px; z-index: 20;
// }
// .es3-tick::before, .es3-tick::after {
//   content: ''; position: absolute; background: var(--acid);
// }
// .es3-tick::before { width: 100%; height: 1.5px; top: 0; left: 0; }
// .es3-tick::after  { width: 1.5px; height: 100%; top: 0; left: 0; }
// .es3-tick-tl { top: 16px; left: 16px; }
// .es3-tick-tr { top: 16px; right: 16px; transform: scaleX(-1); }
// .es3-tick-bl { bottom: 16px; left: 16px; transform: scaleY(-1); }
// .es3-tick-br { bottom: 16px; right: 16px; transform: scale(-1); }

// /* ══════════════════════════════════════════════════════════════════════════════
//    MOBILE OVERLAY — gradient that sits over the video so content reads
//    Hidden on desktop (the slice panel takes over)
// ══════════════════════════════════════════════════════════════════════════════ */
// .es3-mobile-overlay {
//   position: absolute; inset: 0; z-index: 2;
//   background:
//     linear-gradient(
//       to top,
//       rgba(8,8,8,0.97) 0%,
//       rgba(8,8,8,0.82) 35%,
//       rgba(8,8,8,0.45) 60%,
//       rgba(8,8,8,0.15) 80%,
//       transparent 100%
//     );
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    DESKTOP: DIAGONAL SLICE — the dark right-half panel
//    A solid #080808 panel clipped with a diagonal clip-path.
//    This is the "one real risk" — a hard geometry cut instead of a gradient fade.
// ══════════════════════════════════════════════════════════════════════════════ */
// .es3-slice {
//   display: none;
//   position: absolute;
//   inset: 0;
//   z-index: 3;
//   /* diagonal cut from ~42% left at top to ~52% left at bottom */
//   clip-path: polygon(48% 0%, 100% 0%, 100% 100%, 38% 100%);
//   background: rgba(8,8,8,0.96);
//   /* subtle inner glow on the cut edge */
//   box-shadow: inset 8px 0 80px rgba(182,240,0,0.04);
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    AMBIENT GLOW — lives inside the content zone
// ══════════════════════════════════════════════════════════════════════════════ */
// .es3-glow {
//   display: none;
//   position: absolute;
//   top: -5%; right: -10%;
//   width: 70vw; height: 80vh;
//   z-index: 4;
//   pointer-events: none;
//   border-radius: 50%;
//   background: radial-gradient(circle at 30% 40%, rgba(182,240,0,0.14) 0%, transparent 60%);
//   filter: blur(50px);
//   opacity: 0.1;
//   will-change: transform, opacity;
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    WATERMARK
// ══════════════════════════════════════════════════════════════════════════════ */
// .es3-watermark {
//   display: none;
//   position: absolute;
//   right: -2vw; bottom: -4vh;
//   z-index: 5;
//   font-family: var(--fBebas);
//   font-size: clamp(9rem, 20vw, 20rem);
//   line-height: 1;
//   color: transparent;
//   -webkit-text-stroke: 1px rgba(255,255,255,0.035);
//   pointer-events: none;
//   user-select: none;
//   white-space: nowrap;
//   letter-spacing: -0.02em;
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    CONTENT WRAP + CONTENT
// ══════════════════════════════════════════════════════════════════════════════ */
// .es3-content-wrap {
//   position: relative;
//   z-index: 10;
//   display: flex;
//   align-items: flex-end;
//   min-height: 100svh;
//   padding: 0 20px 48px;
// }
// .es3-content {
//   width: 100%;
//   max-width: 480px;
// }

// /* ── EYEBROW ─────────────────────────────────────────────────────────────── */
// .es3-eyebrow {
//   display: flex; align-items: center; gap: 10px;
//   margin-bottom: 1.1rem;
// }
// .es3-eyebrow-line {
//   display: block; width: 28px; height: 1.5px;
//   background: var(--acid); flex-shrink: 0;
// }
// .es3-eyebrow-text {
//   font-size: 0.6rem; font-weight: 600;
//   letter-spacing: 0.26em; color: var(--acid);
//   text-transform: uppercase;
// }

// /* ── HEADLINE ────────────────────────────────────────────────────────────── */
// .es3-headline {
//   margin: 0 0 1.1rem;
//   line-height: 0.87;
//   display: flex; flex-direction: column;
// }
// .es3-line-clip { overflow: hidden; display: block; }
// .es3-word {
//   display: block;
//   font-family: var(--fBebas);
//   font-size: clamp(3.5rem, 14vw, 5rem);
//   letter-spacing: -0.01em;
//   color: var(--white);
//   will-change: transform;
//   line-height: 0.92;
// }
// .es3-word--green {
//   color: var(--acid);
//   filter: drop-shadow(0 0 24px rgba(182,240,0,0.4));
// }

// /* ── BODY ────────────────────────────────────────────────────────────────── */
// .es3-body {
//   margin: 0 0 1.5rem;
//   font-size: 0.82rem;
//   font-weight: 300;
//   line-height: 1.75;
//   color: rgba(242,242,242,0.52);
//   max-width: 360px;
// }

// /* ── SPEC STRIP — horizontally scrollable on mobile ─────────────────────── */
// .es3-spec-strip {
//   display: flex;
//   gap: 0;
//   margin-bottom: 1.4rem;
//   border: 1px solid var(--rule);
//   border-radius: 2px;
//   overflow-x: auto;
//   -webkit-overflow-scrolling: touch;
//   scrollbar-width: none;
// }
// .es3-spec-strip::-webkit-scrollbar { display: none; }

// .es3-spec-item {
//   flex: 0 0 auto;
//   display: flex; flex-direction: column;
//   padding: 0.6rem 0.9rem;
//   border-right: 1px solid var(--rule);
//   gap: 2px;
//   min-width: 64px;
//   transition: background 0.2s;
//   cursor: default;
// }
// .es3-spec-item:last-child { border-right: none; }
// .es3-spec-item:hover { background: rgba(182,240,0,0.05); }
// .es3-spec-val {
//   font-family: var(--fBebas);
//   font-size: 0.95rem; line-height: 1;
//   color: var(--white); letter-spacing: 0.04em;
// }
// .es3-spec-key {
//   font-size: 0.48rem; font-weight: 600;
//   letter-spacing: 0.2em; text-transform: uppercase;
//   color: rgba(242,242,242,0.28);
// }

// /* ── RULE ────────────────────────────────────────────────────────────────── */
// .es3-rule {
//   height: 1px; margin-bottom: 1.4rem;
//   background: linear-gradient(to right, var(--rule), transparent 75%);
// }

// /* ── STATS ───────────────────────────────────────────────────────────────── */
// .es3-stats {
//   display: flex; align-items: flex-start;
//   gap: 0; margin-bottom: 1.8rem;
//   flex-wrap: nowrap;
// }
// .es3-stat {
//   display: flex; align-items: baseline; gap: 7px;
//   padding-right: 1.4rem; margin-right: 1.4rem;
//   border-right: 1px solid var(--rule);
//   flex-shrink: 0;
// }
// .es3-stat:last-child { border-right: none; margin-right: 0; padding-right: 0; }
// .es3-stat-num {
//   font-family: var(--fBebas);
//   font-size: clamp(1.8rem, 6vw, 2.6rem);
//   line-height: 1; color: var(--white);
// }
// .es3-stat-label {
//   font-size: 0.54rem; font-weight: 500;
//   letter-spacing: 0.14em; text-transform: uppercase;
//   color: rgba(242,242,242,0.3);
//   line-height: 1.5; max-width: 52px;
// }

// /* ── CTA ROW ─────────────────────────────────────────────────────────────── */
// .es3-cta-row {
//   display: flex; align-items: center;
//   gap: 1rem; flex-wrap: wrap;
// }

// .es3-btn-primary {
//   display: inline-flex; align-items: center; gap: 9px;
//   background: var(--acid); color: #000;
//   font-family: var(--fInter);
//   font-size: 0.65rem; font-weight: 700;
//   letter-spacing: 0.18em; text-transform: uppercase;
//   padding: 13px 24px;
//   border: none; border-radius: 1px;
//   cursor: pointer;
//   transition: filter 0.22s, transform 0.18s;
//   white-space: nowrap;
// }
// .es3-btn-primary:hover { filter: brightness(1.08); transform: translateY(-1px); }
// .es3-btn-primary:active { transform: translateY(0); }

// .es3-btn-ghost {
//   display: inline-flex; align-items: center; gap: 7px;
//   background: none; border: none;
//   color: rgba(242,242,242,0.38);
//   font-family: var(--fInter);
//   font-size: 0.65rem; font-weight: 500;
//   letter-spacing: 0.18em; text-transform: uppercase;
//   padding: 13px 0; cursor: pointer;
//   transition: color 0.2s;
//   white-space: nowrap;
// }
// .es3-btn-ghost:hover { color: var(--white); }

// /* ── VIDEO BADGE — bottom-left, always ──────────────────────────────────── */
// .es3-video-badge {
//   position: absolute;
//   bottom: 20px; left: 20px;
//   z-index: 20;
//   display: flex; align-items: center; gap: 7px;
// }
// .es3-badge-xp {
//   background: var(--acid); color: #000;
//   font-family: var(--fBebas);
//   font-size: 0.72rem; letter-spacing: 0.1em;
//   padding: 2px 7px 1px; border-radius: 2px;
// }
// .es3-badge-text {
//   font-size: 0.56rem; font-weight: 500;
//   letter-spacing: 0.22em;
//   color: rgba(242,242,242,0.38);
// }

// /* ── INDEX STRIP — left edge, desktop only ───────────────────────────────── */
// .es3-index-strip {
//   display: none;
//   position: absolute;
//   left: 0; top: 0; bottom: 0;
//   width: 52px; z-index: 20;
//   border-right: 1px solid var(--rule);
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   padding: 2rem 0;
//   writing-mode: vertical-rl;
//   text-orientation: mixed;
//   transform: rotate(180deg);
// }
// .es3-index-num {
//   font-family: var(--fBebas);
//   font-size: 0.82rem; letter-spacing: 0.12em;
//   color: var(--acid);
//   transform: rotate(180deg);
// }
// .es3-index-bar {
//   width: 1px; flex: 1; min-height: 60px;
//   background: linear-gradient(to bottom, var(--rule), var(--acid) 50%, var(--rule));
// }
// .es3-index-label {
//   font-size: 0.56rem; font-weight: 500;
//   letter-spacing: 0.28em;
//   color: rgba(242,242,242,0.22);
//   transform: rotate(180deg);
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    TABLET — 640px+
// ══════════════════════════════════════════════════════════════════════════════ */
// @media (min-width: 640px) {
//   .es3-content-wrap {
//     padding: 0 40px 72px;
//   }
//   .es3-content { max-width: 520px; }
//   .es3-word { font-size: clamp(4rem, 10vw, 5.5rem); }
//   .es3-body { font-size: 0.88rem; }
//   .es3-spec-item { padding: 0.7rem 1.1rem; min-width: 72px; }
//   .es3-spec-val { font-size: 1rem; }
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    DESKTOP — 1024px+
//    Switches to diagonal split layout
// ══════════════════════════════════════════════════════════════════════════════ */
// @media (min-width: 1024px) {
//   /* show desktop-only elements */
//   .es3-slice         { display: block; }
//   .es3-glow          { display: block; }
//   .es3-watermark     { display: block; }
//   .es3-index-strip   { display: flex; }

//   /* hide mobile overlay — slice takes over */
//   .es3-mobile-overlay { display: none; }

//   /* content snaps to right zone, vertically centred */
//   .es3-content-wrap {
//     align-items: center;
//     justify-content: flex-end;
//     padding: 0 6% 0 0;
//     min-height: 100svh;
//   }
//   .es3-content {
//     max-width: 520px;
//     width: 46%;
//     padding-left: 4%;
//   }

//   /* headline larger on desktop */
//   .es3-word { font-size: clamp(4.5rem, 7.5vw, 8rem); }
//   .es3-body { font-size: 0.9rem; max-width: 400px; }

//   /* spec strip doesn't need to scroll on desktop */
//   .es3-spec-strip { overflow-x: visible; }
//   .es3-spec-item { flex: 1 1 0; }

//   /* badge moves away from the index strip */
//   .es3-video-badge { left: 72px; }
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    LARGE DESKTOP — 1280px+
// ══════════════════════════════════════════════════════════════════════════════ */
// @media (min-width: 1280px) {
//   .es3-content { max-width: 580px; }
//   .es3-word { font-size: clamp(5rem, 8vw, 9rem); }
//   .es3-stat-num { font-size: 2.8rem; }
// }

// /* ══════════════════════════════════════════════════════════════════════════════
//    REDUCED MOTION
// ══════════════════════════════════════════════════════════════════════════════ */
// @media (prefers-reduced-motion: reduce) {
//   .es3-glow { animation: none !important; opacity: 0.1 !important; }
//   .es3-video-inner { animation: none !important; }
// }
// `;
