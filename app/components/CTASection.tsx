"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SPARKS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  duration: 2 + Math.random() * 3,
}));

export default function CTASection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [-500, 500]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-[#050505] px-6 py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        {SPARKS.map((spark) => (
          <motion.div
            key={spark.id}
            className="absolute h-2 w-2 rounded-full bg-[#B8FF00]"
            style={{
              left: spark.left,
              top: spark.top,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 1, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: spark.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="relative z-10 flex flex-col items-center">
        <motion.div style={{ x }} className="text-center">
          <h2 className="text-[5rem] font-black uppercase italic leading-none">
            <span className="pr-2 block bg-gradient-to-r from-[#B8FF00] to-[#F5FFE0] bg-clip-text text-transparent">
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
