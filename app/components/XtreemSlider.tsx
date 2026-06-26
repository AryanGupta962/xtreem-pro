"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Image from "next/image";

// ─── Constants ────────────────────────────────────────────────────────────────
const DURATION_MS = 5000;
const ACID = "#B6F000";
const BLACK = "#080808";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Slide {
  src: string;
  alt: string;
  eyebrow: string;
  headlineParts: [string, string, string]; // [before, highlight, after]
  body: string;
  badge: string; // small pill label bottom-right
}

// ─── Slide data ───────────────────────────────────────────────────────────────
const SLIDES: Slide[] = [
  {
    src: "/images/xtreem/img-1.webp",
    alt: "Xtreem Pro towering over FC Barcelona's stadium",
    eyebrow: "Global Icon",
    headlineParts: ["Beyond the ", "Stadium", ""],
    body: "Fuel bigger than the game itself. XP Xtreem Pro towers over every pitch, powering every roar.",
    badge: "250ml · B-Vitamin Complex",
  },
  {
    src: "/images/xtreem/img-2.webp",
    alt: "Skydiver holding Xtreem Pro at altitude",
    eyebrow: "No Limits",
    headlineParts: ["Above ", "Everything", ""],
    body: "At 15,000 feet, only Xtreem Pro keeps you locked in. Skydive-tested. Earth-shattering energy.",
    badge: "Enhanced Endurance",
  },
  {
    src: "/images/xtreem/img-3.webp",
    alt: "Mountain biker performing aerial trick with Xtreem Pro",
    eyebrow: "Extreme Sports",
    headlineParts: ["Defy ", "Gravity", ""],
    body: "Mountain trails, massive air, zero hesitation. Xtreem Pro makes the impossible your warm-up.",
    badge: "Intense Energy",
  },
  {
    src: "/images/xtreem/img-4.webp",
    alt: "Skateboarder presenting Xtreem Pro in city",
    eyebrow: "Street Culture",
    headlineParts: ["Own the ", "Concrete", ""],
    body: "Cities are arenas. Charge through every street, every turn, with relentless urban energy.",
    badge: "High Caffeine",
  },
  {
    src: "/images/xtreem/img-5.webp",
    alt: "Footballer kicking ball with Xtreem Pro",
    eyebrow: "The Game",
    headlineParts: ["Unleash Your ", "Potential", ""],
    body: "B-Vitamin Complex. Enhanced Endurance. Intense Energy. One can. Ninety minutes of dominance.",
    badge: "B-Vitamin Complex",
  },
  {
    src: "/images/xtreem/img-6.webp",
    alt: "Xtreem Pro on wet Formula 1 track",
    eyebrow: "Formula Speed",
    headlineParts: ["Built for the ", "Fastest", ""],
    body: "On wet tarmac, milliseconds make legends. Xtreem Pro — precision energy for peak performance.",
    badge: "Taurine · Vitamins B",
  },
  {
    src: "/images/xtreem/img-7.webp",
    alt: "Xtreem Pro held in F1 pit lane",
    eyebrow: "Pit Lane Ready",
    headlineParts: ["Race Day ", "Fuel", ""],
    body: "250ml. Zero compromise. When your crew trusts Xtreem Pro, the podium is just the beginning.",
    badge: "High Caffeine",
  },
];

const TOTAL = SLIDES.length;

// ─── Sub-components (all memoised) ───────────────────────────────────────────

const ChevronLeft = memo(function ChevronLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
});

const ChevronRight = memo(function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polyline points="9 6 15 12 9 18" />
    </svg>
  );
});

// Split headline into [before | highlight | after]
const Headline = memo(function Headline({
  parts,
}: {
  parts: [string, string, string];
}) {
  const [before, highlight, after] = parts;
  return (
    <>
      {before}
      <em style={{ color: ACID, fontStyle: "normal" }}>{highlight}</em>
      {after}
    </>
  );
});

// ─── Main component ───────────────────────────────────────────────────────────
export default function XtreemSlider() {
  const [current, setCurrent] = useState(0);
  // progressKey is bumped on every slide change to retrigger the CSS animation
  const [progressKey, setProgressKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  // All timing lives in refs — never touched during SSR render
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);
  const pauseAtRef = useRef(0); // wall-clock ms when paused
  const resumeAtRef = useRef(0); // ms already elapsed before last resume
  const touchXRef = useRef<number | null>(null);
  const currentRef = useRef(0); // mirror of `current` readable inside closures

  // Keep ref in sync with state
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // ── Slide transition ────────────────────────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setCurrent(idx);
    setProgressKey((k) => k + 1); // retriggers CSS progress animation
    resumeAtRef.current = 0;

    timerRef.current = setTimeout(() => {
      goTo((idx + 1) % TOTAL);
    }, DURATION_MS);
  }, []);

  // ── Mount: start auto-play (safe — no performance.now() during render) ──────
  useEffect(() => {
    setMounted(true);
    timerRef.current = setTimeout(() => goTo(1), DURATION_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Pause on hover ──────────────────────────────────────────────────────────
  // We pause the CSS animation by storing the fraction elapsed, then on resume
  // we set animation-delay to a negative value to pick up mid-way.
  const handleMouseEnter = useCallback(() => {
    if (!mounted) return;
    pausedRef.current = true;
    pauseAtRef.current = Date.now();
    if (timerRef.current) clearTimeout(timerRef.current);
    // Freeze progress bar: we'll restart it from the right offset on leave
    const bar = document.getElementById("xt-progress-fill");
    if (bar) {
      const style = window.getComputedStyle(bar);
      const matrix = style.transform;
      // scaleX approximation from the running animation
      const scaleX =
        matrix && matrix !== "none"
          ? parseFloat(matrix.split(",")[0].replace("matrix(", ""))
          : parseFloat(style.width) / (bar.parentElement?.clientWidth ?? 1);
      bar.style.animationPlayState = "paused";
      bar.dataset.pausedAt = String(isNaN(scaleX) ? 0 : scaleX);
    }
  }, [mounted]);

  const handleMouseLeave = useCallback(() => {
    if (!mounted || !pausedRef.current) return;
    pausedRef.current = false;
    const elapsed = Date.now() - pauseAtRef.current;
    const remaining = DURATION_MS - elapsed;

    const bar = document.getElementById("xt-progress-fill");
    if (bar) bar.style.animationPlayState = "running";

    timerRef.current = setTimeout(
      () => {
        goTo((currentRef.current + 1) % TOTAL);
      },
      Math.max(remaining, 0),
    );
  }, [mounted, goTo]);

  // ── Keyboard nav ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo((currentRef.current - 1 + TOTAL) % TOTAL);
      if (e.key === "ArrowRight") goTo((currentRef.current + 1) % TOTAL);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, goTo]);

  // ── Touch swipe ─────────────────────────────────────────────────────────────
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchXRef.current = e.changedTouches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchXRef.current === null) return;
      const dx = e.changedTouches[0].clientX - touchXRef.current;
      if (Math.abs(dx) > 44)
        goTo(
          dx < 0
            ? (currentRef.current + 1) % TOTAL
            : (currentRef.current - 1 + TOTAL) % TOTAL,
        );
      touchXRef.current = null;
    },
    [goTo],
  );

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{GLOBAL_CSS}</style>

      <section
        className="xt-root"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Xtreem Pro — image carousel"
        aria-roledescription="carousel"
      >
        {/* ── Progress bar (CSS-driven, zero JS cost) ── */}
        <div className="xt-prog-track" aria-hidden>
          <div
            id="xt-progress-fill"
            className="xt-prog-fill"
            key={progressKey}
            style={{ animationDuration: `${DURATION_MS}ms` }}
          />
        </div>

        {/* ── Logo ── */}
        <div className="xt-logo" aria-label="XP Xtreem Pro">
          <span className="xt-logo-badge">XP</span>
          <span className="xt-logo-text">XTREEM PRO</span>
        </div>

        {/* ── Slide counter (mounted-guard: avoids hydration mismatch) ── */}
        <div className="xt-counter" aria-live="polite" aria-atomic>
          {mounted ? (
            <>
              <span className="xt-counter-num">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="xt-counter-sep"> / </span>
              {String(TOTAL).padStart(2, "0")}
            </>
          ) : (
            <>
              <span className="xt-counter-num">01</span>
              <span className="xt-counter-sep"> / </span>
              {String(TOTAL).padStart(2, "0")}
            </>
          )}
        </div>

        {/* ── Slides ── */}
        {SLIDES.map((slide, i) => {
          const isActive = i === current;
          return (
            <div
              key={slide.src}
              className={`xt-slide${isActive ? " xt-slide--active" : ""}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${TOTAL}: ${slide.eyebrow}`}
              aria-hidden={!isActive}
            >
              {/* Background image */}
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className={`xt-bg-img${isActive ? " xt-bg-img--active" : ""}`}
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />

              {/* Grain noise overlay */}
              <div className="xt-grain" aria-hidden />

              {/* Horizontal gradient */}
              <div className="xt-overlay-h" aria-hidden />

              {/* Bottom fog */}
              <div className="xt-overlay-v" aria-hidden />

              {/* Ghost slide number */}
              <div className="xt-ghost-num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Caption */}
              <div
                className={`xt-caption${isActive ? " xt-caption--active" : ""}`}
              >
                <p className="xt-eyebrow">{slide.eyebrow}</p>
                <h2 className="xt-headline">
                  <Headline parts={slide.headlineParts} />
                </h2>
                <p className="xt-body">{slide.body}</p>
                <div className="xt-pill">{slide.badge}</div>
              </div>
            </div>
          );
        })}

        {/* ── Dot track ── */}
        <div className="xt-dot-track" role="tablist" aria-label="Go to slide">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`xt-dot${i === current ? " xt-dot--active" : ""}`}
            />
          ))}
        </div>

        {/* ── Nav arrows ── */}
        <button
          className="xt-nav xt-nav--pre max-md:!size-10"
          onClick={() => goTo((current - 1 + TOTAL) % TOTAL)}
          aria-label="Previous slide"
        >
          <ChevronLeft />
        </button>
        <button
          className="xt-nav xt-nav--next max-md:!size-10"
          onClick={() => goTo((current + 1) % TOTAL)}
          aria-label="Next slide"
        >
          <ChevronRight />
        </button>

        {/* ── Thumbnail strip ── */}
        <div className="xt-thumbs" aria-label="Slide thumbnails">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.src}
              onClick={() => goTo(i)}
              aria-label={`Jump to slide ${i + 1}`}
              className={`xt-thumb${i === current ? " xt-thumb--active" : ""}`}
            >
              <Image
                src={slide.src}
                alt=""
                width={52}
                height={36}
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

// ─── All CSS in one tagged-template string ────────────────────────────────────
// Kept here (not a separate .css file) so this is truly a single-file component.
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&display=swap');

/* ── Progress animation (CSS-only, no RAF) ── */
@keyframes xt-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes xt-ken-burns {
  from { transform: scale(1.07); }
  to   { transform: scale(1); }
}
@keyframes xt-fade-up {
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes xt-grain-shift {
  0%,100% { transform: translate(0,0); }
  25%      { transform: translate(-1%,-1%); }
  50%      { transform: translate(1%,0.5%); }
  75%      { transform: translate(-0.5%,1%); }
}

/* ── Root ── */
.xt-root {
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 520px;
  overflow: hidden;
  background: ${BLACK};
  font-family: 'Inter', sans-serif;
  color: #E8E8E8;
  user-select: none;
  -webkit-user-select: none;
}

/* ── Progress bar ── */
.xt-prog-track {
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: rgba(255,255,255,0.1);
  z-index: 30;
  overflow: hidden;
}
.xt-prog-fill {
  height: 100%;
  width: 100%;
  background: ${ACID};
  transform-origin: left center;
  transform: scaleX(0);
  animation: xt-progress linear forwards;
  will-change: transform;
}

/* ── Logo ── */
.xt-logo {
  position: absolute;
  top: 26px; left: 6%;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 9px;
}
.xt-logo-badge {
  background: ${ACID};
  color: #000;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1rem;
  letter-spacing: 0.08em;
  padding: 2px 9px 1px;
  border-radius: 3px;
}
.xt-logo-text {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.45rem;
  letter-spacing: 0.12em;
  color: #fff;
}

/* ── Counter ── */
.xt-counter {
  position: absolute;
  top: 30px; right: 6%;
  z-index: 30;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  color: rgba(232,232,232,0.5);
  font-weight: 300;
}
.xt-counter-num { color: ${ACID}; font-weight: 600; font-size: 0.82rem; }
.xt-counter-sep { color: rgba(232,232,232,0.3); }

/* ── Slides ── */
.xt-slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.9s cubic-bezier(.4,0,.2,1);
  will-change: opacity;
  pointer-events: none;
}
.xt-slide--active {
  opacity: 1;
  pointer-events: auto;
}

/* ── Background image ── */
.xt-bg-img { transition: opacity 0.9s ease; }
.xt-bg-img--active {
  animation: xt-ken-burns 1.2s cubic-bezier(.4,0,.2,1) forwards;
}

/* ── Grain noise (SVG inline via filter — no extra network req) ── */
.xt-grain {
  position: absolute;
  inset: -20%;
  z-index: 1;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
  animation: xt-grain-shift 0.18s steps(1) infinite;
  pointer-events: none;
}

/* ── Overlays ── */
.xt-overlay-h {
  position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(
    105deg,
    rgba(8,8,8,0.80) 0%,
    rgba(8,8,8,0.22) 50%,
    rgba(8,8,8,0.55) 100%
  );
}
.xt-overlay-v {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 55%;
  z-index: 2;
  background: linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0) 100%);
}

/* ── Ghost number ── */
.xt-ghost-num {
  position: absolute;
  right: -0.05em;
  bottom: -0.18em;
  z-index: 2;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(14rem, 36vw, 28rem);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,0.055);
  pointer-events: none;
  letter-spacing: -0.02em;
}

/* ── Caption ── */
.xt-caption {
  position: absolute;
  bottom: 12%;
  left: 6%;
  z-index: 10;
  max-width: 560px;
}

/* Stagger children via CSS animation-delay; opacity:0 default prevents flash */
.xt-caption > * { opacity: 0; }
.xt-caption--active .xt-eyebrow  { animation: xt-fade-up 0.48s ease 0.45s both; }
.xt-caption--active .xt-headline { animation: xt-fade-up 0.52s ease 0.62s both; }
.xt-caption--active .xt-body     { animation: xt-fade-up 0.48s ease 0.80s both; }
.xt-caption--active .xt-pill     { animation: xt-fade-up 0.42s ease 0.96s both; }

.xt-eyebrow {
  margin: 0 0 0.6rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${ACID};
  display: flex;
  align-items: center;
  gap: 8px;
}
.xt-eyebrow::before {
  content: '';
  display: inline-block;
  width: 24px; height: 1.5px;
  background: ${ACID};
  flex-shrink: 0;
}
.xt-headline {
  margin: 0 0 1rem;
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(2.6rem, 7vw, 5.4rem);
  line-height: 0.92;
  letter-spacing: 0.02em;
  color: #fff;
  text-shadow: 0 4px 40px rgba(0,0,0,0.55);
}
.xt-body {
  margin: 0 0 1.2rem;
  font-size: 0.9rem;
  font-weight: 300;
  line-height: 1.65;
  color: rgba(232,232,232,0.75);
  max-width: 360px;
}
.xt-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(182,240,0,0.10);
  border: 1px solid rgba(182,240,0,0.28);
  color: ${ACID};
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 5px 12px 4px;
  border-radius: 100px;
}

/* ── Dot track ── */
.xt-dot-track {
  position: absolute;
  left: 2.2%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.xt-dot {
  width: 4px;
  height: 4px;
  border-radius: 9999px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: rgba(255,255,255,0.25);
  transition: background 0.25s, height 0.3s cubic-bezier(.34,1.56,.64,1), border-radius 0.3s;
}
.xt-dot--active {
  background: ${ACID};
  height: 24px;
  border-radius: 2px;
}

/* ── Nav buttons ── */
.xt-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 30;
  width: 48px; height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(8,8,8,0.42);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.22s, background 0.22s, transform 0.22s;
}
.xt-nav:hover {
  border-color: ${ACID};
  background: rgba(182,240,0,0.10);
  transform: translateY(-50%) scale(1.08);
}
.xt-nav--prev { left: 3.5%; }
.xt-nav--next { right: 3.5%; }

/* ── Thumbnails ── */
.xt-thumbs {
  position: absolute;
  bottom: 3.8%;
  right: 6%;
  z-index: 30;
  display: flex;
  gap: 8px;
  align-items: center;
}
.xt-thumb {
  width: 54px; height: 38px;
  border-radius: 4px;
  overflow: hidden;
  border: 1.5px solid rgba(255,255,255,0.12);
  cursor: pointer;
  background: none;
  padding: 0;
  flex-shrink: 0;
  transition: border-color 0.22s, transform 0.22s, box-shadow 0.22s;
}
.xt-thumb--active {
  border-color: ${ACID};
  transform: scale(1.14);
  box-shadow: 0 0 12px rgba(182,240,0,0.35);
}
.xt-thumb:hover:not(.xt-thumb--active) {
  border-color: rgba(255,255,255,0.4);
}

/* ── Mobile ── */
@media (max-width: 600px) {
  .xt-thumbs { display: none; }
  .xt-nav--prev { left: 2%; }
  .xt-nav--next { right: 2%; }
  .xt-caption { left: 14%; bottom: 14%; max-width: 82vw; }
  .xt-dot-track { left: 10px; }
  .xt-ghost-num { font-size: clamp(10rem, 50vw, 16rem); }
}

/* ── Reduced motion ── */
@media (prefers-reduced-motion: reduce) {
  .xt-bg-img--active,
  .xt-caption--active .xt-eyebrow,
  .xt-caption--active .xt-headline,
  .xt-caption--active .xt-body,
  .xt-caption--active .xt-pill,
  .xt-grain {
    animation: none !important;
  }
  .xt-caption > * { opacity: 1 !important; transform: none !important; }
  .xt-prog-fill { animation: none !important; }
}
`;
