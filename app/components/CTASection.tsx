"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-[#050505] px-6 py-32">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-full w-[30%] bg-gradient-to-r from-[#0B2A3B]/30 to-transparent" />
        <div className="absolute right-0 top-0 h-full w-[40%] bg-gradient-to-l from-[#140A2F]/30 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Heading */}
        <div className="overflow-hidden text-center">
          <h2
            className="
              text-[3.5rem]
              leading-[0.9]
              font-black
              uppercase
              italic
              tracking-tight
              md:text-[6rem]
              lg:text-[7rem]
            "
          >
            <span className="block bg-gradient-to-r from-[#B8FF00] to-[#F5FFE0] bg-clip-text text-transparent">
              READY TO UNLEASH
            </span>

            <span className="block bg-gradient-to-r from-[#B8FF00] to-[#F5FFE0] bg-clip-text text-transparent">
              YOUR POTENTIAL?
            </span>
          </h2>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{
            scale: 0.98,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className="
            mt-12
            bg-[#6D8D00]
            px-12
            py-5
            text-lg
            font-black
            uppercase
            tracking-wide
            text-black
            shadow-[6px_6px_0px_#000]
            transition-all
            duration-300
            hover:bg-[#B8FF00]
            hover:shadow-[8px_8px_0px_#000]
          "
        >
          GET STARTED NOW
        </motion.button>
      </div>
    </section>
  );
}
