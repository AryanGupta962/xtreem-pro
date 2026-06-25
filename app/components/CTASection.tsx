"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Precomputed coordinates to prevent React hydration mismatch between server and client
const SPARKS = [
  { id: 0, left: "12%", top: "45%", duration: 2.8, delay: 0 },
  { id: 1, left: "78%", top: "15%", duration: 4.1, delay: 0.3 },
  { id: 2, left: "34%", top: "82%", duration: 3.2, delay: 0.6 },
  { id: 3, left: "62%", top: "71%", duration: 2.5, delay: 0.9 },
  { id: 4, left: "19%", top: "28%", duration: 4.7, delay: 0.2 },
  { id: 5, left: "89%", top: "63%", duration: 3.6, delay: 0.5 },
  { id: 6, left: "45%", top: "12%", duration: 4.3, delay: 0.8 },
  { id: 7, left: "55%", top: "88%", duration: 2.1, delay: 0.1 },
  { id: 8, left: "27%", top: "60%", duration: 3.9, delay: 0.4 },
  { id: 9, left: "91%", top: "35%", duration: 3.4, delay: 0.7 },
  { id: 10, left: "8%", top: "76%", duration: 4.8, delay: 1.0 },
  { id: 11, left: "70%", top: "49%", duration: 2.9, delay: 0.15 },
  { id: 12, left: "51%", top: "31%", duration: 3.7, delay: 0.45 },
  { id: 13, left: "38%", top: "93%", duration: 4.5, delay: 0.75 },
  { id: 14, left: "84%", top: "81%", duration: 2.3, delay: 0.05 },
  { id: 15, left: "15%", top: "18%", duration: 4.2, delay: 0.35 },
  { id: 16, left: "66%", top: "10%", duration: 3.1, delay: 0.65 },
  { id: 17, left: "95%", top: "90%", duration: 4.9, delay: 0.95 },
  { id: 18, left: "22%", top: "52%", duration: 2.7, delay: 0.25 },
  { id: 19, left: "75%", top: "75%", duration: 3.8, delay: 0.55 },
  { id: 20, left: "40%", top: "40%", duration: 4.6, delay: 0.85 },
  { id: 21, left: "60%", top: "58%", duration: 2.2, delay: 0.12 },
  { id: 22, left: "30%", top: "21%", duration: 3.5, delay: 0.42 },
  { id: 23, left: "82%", top: "39%", duration: 4.4, delay: 0.72 },
  { id: 24, left: "5%", top: "59%", duration: 2.6, delay: 0.02 },
  { id: 25, left: "48%", top: "68%", duration: 3.3, delay: 0.32 },
  { id: 26, left: "92%", top: "12%", duration: 4.0, delay: 0.62 },
  { id: 27, left: "17%", top: "85%", duration: 2.4, delay: 0.92 },
  { id: 28, left: "68%", top: "29%", duration: 3.0, delay: 0.22 },
  { id: 29, left: "53%", top: "79%", duration: 4.1, delay: 0.52 },
];

export default function CTASection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.5, 1], [-500, 0, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-[#050505] px-4 sm:px-6 py-20 sm:py-32"
    >
      {/* H2: CSS keyframe animation replaces 30 Framer Motion JS-driven animations.
          Same visual output, but runs on compositor thread with zero JS cost. */}
      <style>{`
        @keyframes sparkFloat {
          0%, 100% {
            transform: translateY(-20px) scale(0.5);
            opacity: 0.2;
          }
          50% {
            transform: translateY(20px) scale(1.5);
            opacity: 1;
          }
        }
      `}</style>
      <div className="absolute inset-0 pointer-events-none">
        {SPARKS.map((spark) => (
          <div
            key={spark.id}
            className="absolute h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-[#B8FF00] will-change-transform"
            style={{
              left: spark.left,
              top: spark.top,
              animation: `sparkFloat ${spark.duration}s ease-in-out ${spark.delay}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center w-full">
        <motion.div style={{ x }} className="text-center">
          <h2
            className="font-black uppercase italic leading-[0.95]"
            style={{ fontSize: "clamp(1.5rem, 9vw, 5rem)" }}
          >
            <span className="pr-2 block whitespace-nowrap bg-gradient-to-r from-[#B8FF00] to-[#F5FFE0] bg-clip-text text-transparent">
              READY TO UNLEASH
            </span>

            <span className="block bg-gradient-to-r from-[#B8FF00] to-[#F5FFE0] bg-clip-text text-transparent">
              YOUR POTENTIAL?
            </span>
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
