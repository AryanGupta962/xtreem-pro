"use client";

import React, { useRef, useEffect } from "react";
import { LuLeaf, LuTrendingDown } from "react-icons/lu";
import { TbLetterB } from "react-icons/tb";
import type { IconType } from "react-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// USP ICON TILE
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
// USP CARD
// opacity:0 set HERE in JSX so it is invisible on first paint —
// GSAP then animates it in. Never rely on gsap.set() for
// the initial hidden state because it runs after the first render.
// ─────────────────────────────────────────────
const UspCard: React.FC<{
  Icon: IconType;
  title: string;
}> = ({ Icon, title }) => (
  <div
    className="usp-card group relative flex flex-col items-center gap-4 rounded-xl
                bg-gradient-to-b from-white/[0.04] to-black/40 p-5
                backdrop-blur-sm transition-colors duration-300 hover:border-lime-400/60"
    // ↓ invisible + offset from the start — no flash possible
    style={{ opacity: 0, transform: "translateY(24px)" }}
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

      // ── Slides 2 & 3 are hidden at paint time via JSX style above.
      //    We only need to set slide 3 here since slide 2 already has
      //    opacity:0 from JSX. Add y:60 via gsap for the lift-in effect.
      gsap.set(s2, { y: 60 });   // opacity already 0 from JSX
      gsap.set(s3, { opacity: 0, y: 60 });

      // ── Master scrub timeline (300vh scroll = full 1.0 progress) ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,

          // onUpdate fires on every scroll tick — use progress to
          // drive video play/pause with no dead zones.
          onUpdate: (self) => {
            const p = self.progress;
            const tv = trackingRef.current;
            const hv = heroVidRef.current;

            // Slide 1 zone: 0 – 0.40
            if (p < 0.40) {
              tv?.paused && tv.play().catch(() => { });
              if (hv && !hv.paused) hv.pause();
            }
            // Slide 2 zone: 0.40 – 0.65 (no video)
            else if (p < 0.65) {
              if (tv && !tv.paused) tv.pause();
              if (hv && !hv.paused) hv.pause();
            }
            // Slide 3 zone: 0.65 – 1.0
            else {
              if (tv && !tv.paused) tv.pause();
              hv?.paused && hv.play().catch(() => { });
            }
          },
        },
      });

      // ── Transition 1 → 2  (tl position 0 … 0.45) ──
      tl.to(s1, { opacity: 0, y: -50, scale: 0.97, duration: 0.2, ease: "power2.in" }, 0)
        .to(s2, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.15)

        // ── Transition 2 → 3  (tl position 0.5 … 1.0) ──
        .to(s2, { opacity: 0, y: -50, scale: 0.97, duration: 0.2, ease: "power2.in" }, 0.5)
        .to(s3, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 0.65);

      // ── USP card stagger when slide 2 becomes visible ──
      const uspCards = s2.querySelectorAll<HTMLElement>(".usp-card");

      ScrollTrigger.create({
        trigger: wrapper,
        // fire when 35 % of the wrapper has scrolled past the top
        start: "35% top",
        end: "65% top",
        onEnter: () =>
          gsap.to(uspCards, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out",
          }),
        onLeaveBack: () =>
          gsap.set(uspCards, { opacity: 0, y: 24 }),
      });

    }, wrapperRef);

    // Play tracking video on mount (slide 1 is visible)
    trackingRef.current?.play().catch(() => { });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
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
        .animate-fadeInUp     { animation: fadeInUp 0.8s ease forwards; }
        .animate-scrollBounce { animation: scrollBounce 1.5s ease-in-out infinite; }

        .text-shimmer {
          background: linear-gradient(90deg, #c8ff00 20%, #ffffff 50%, #c8ff00 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      {/* 300 vh outer wrapper — content below starts after this */}
      <div
        ref={wrapperRef}
        className="relative bg-black"
        style={{ height: "300vh", zIndex: 10 }}
      >
        {/* Sticky viewport — stays fixed while user scrolls the 300 vh */}
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            width: "100%",
            overflow: "hidden",
          }}
        >

          {/* ── SLIDE 1 — Tracking video ── */}
          <div
            ref={slide1Ref}
            className="absolute inset-0 flex items-end justify-center pb-10 px-6"
            style={{ zIndex: 1 }}
          >
            <video
              ref={trackingRef}
              muted loop playsInline autoPlay preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/videos/tracking-2.mp4" type="video/mp4" />
            </video>

            {/* gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 40%, transparent 60%, rgba(0,0,0,0.2) 100%)",
              }}
            />

            {/* copy */}
            <div className="relative z-10 flex flex-col items-center">
              <div
                className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.35em] text-white/60 opacity-0 animate-fadeInUp"
                style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
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
                style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
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

          {/* ── SLIDE 2 — USP ── */}
          {/* opacity:0 is set in JSX here to prevent first-paint flash */}
          <div
            ref={slide2Ref}
            className="absolute inset-0 flex flex-col items-center justify-center px-6"
            style={{ zIndex: 2, opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(50,80,0,0.3) 0%, rgba(0,0,0,0.97) 100%)",
              }}
            />

            <div className="relative z-10 mb-10 text-center">
              <div className="text-lime-400/60 text-xs font-bold tracking-[0.5em] uppercase mb-6">
                The Science Behind the Surge
              </div>
              <div
                className="font-black text-white leading-none mb-4"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "-0.02em" }}
              >
                75mg <span className="text-lime-400">Natural Caffeine.</span>
                <br />
                <span className="text-white/40">18 Month Shelf Life.</span>
                <br />
                Zero Compromise.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 relative z-10">
              <UspCard Icon={TbLetterB} title="B-Vitamin Complex" />
              <UspCard Icon={LuLeaf} title="Natural Caffeine" />
              <UspCard Icon={LuTrendingDown} title="No Sugar Crash" />
            </div>
          </div>

          {/* ── SLIDE 3 — Hero video ── */}
          {/* opacity:0 set in JSX — same reason */}
          <div
            ref={slide3Ref}
            className="absolute inset-0"
            style={{ zIndex: 3, opacity: 0 }}
          >
            <video
              ref={heroVidRef}
              muted loop playsInline preload="none"
              className="absolute inset-0 h-full w-full object-fill object-center"
            >
              <source src="/videos/rr.webm" type="video/mp4" />
            </video>
          </div>

        </div>
      </div>
    </>
  );
}