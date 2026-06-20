"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useSpring } from "motion/react";

export default function ProductCan() {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(0, {
    stiffness: 200,
    damping: 20,
  });

  const rotateY = useSpring(0, {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rotateY.set(((x - centerX) / centerX) * 12);
    rotateX.set(-((y - centerY) / centerY) * 12);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      className="flex items-center justify-center [perspective:1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      <motion.div
        ref={ref}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/images/can.png"
          alt="XTREEM Pro XP Energy Drink"
          width={600}
          height={600}
          priority
          className="can-img relative z-10 object-contain"
          style={{
            height: "clamp(180px, 32vw, 380px)",
            width: "auto",
            filter: "drop-shadow(0 0 55px rgba(188,224,64,0.38))",
          }}
        />
      </motion.div>
    </div>
  );
}
