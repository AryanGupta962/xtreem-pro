"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SPARKS = Array.from({ length: 12 }, (_, i) => ({
  x: Number((Math.cos((i * Math.PI) / 6) * 25).toFixed(2)),
  y: Number((Math.sin((i * Math.PI) / 6) * 25).toFixed(2)),
}));

export default function EnergyCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isBrowser = typeof window !== "undefined";

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.4,
      ease: "power3.out",
    });

    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.4,
      ease: "power3.out",
    });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll("a, button");

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
          scale: 1.8,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        fixed
        left-0
        top-0
        z-[9999]
        pointer-events-none
        -translate-x-1/2
        -translate-y-1/2
      "
    >
      {/* Plasma Glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-12
          w-12
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#BCE040]
          blur-3xl
          animate-pulse
        "
      />

      {/* Energy Core */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-4
          w-4
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#BCE040]
          shadow-[0_0_15px_#22c55e,0_0_35px_#22c55e,0_0_70px_#22c55e]
        "
      />

      {/* Floating Sparks */}
      {SPARKS.map((spark, i) => (
        <span
          key={`spark-${i}`}
          className="
            absolute
            left-1/2
            top-1/2
            h-1
            w-1
            rounded-full
            bg-[#BCE040]
            animate-ping
          "
          style={{
            transform: `translate(${spark.x}px, ${spark.y}px)`,
            animationDelay: `${i * 0.15}s`,
            animationDuration: "1.5s",
          }}
        />
      ))}
    </div>
  );
}
