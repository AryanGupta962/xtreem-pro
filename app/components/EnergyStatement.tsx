"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function EnergyShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".reveal-line", {
        yPercent: 120,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".content-wrapper",
          start: "top 75%",
        },
      });

      gsap.from(".energy-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".content-wrapper",
          start: "top 75%",
        },
      });

      gsap.from(".energy-description", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".content-wrapper",
          start: "top 75%",
        },
      });

      gsap.from(".energy-button", {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".content-wrapper",
          start: "top 75%",
        },
      });

      gsap.from(".video-container", {
        scale: 1.2,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".energy-divider", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] bg-[#BCE040]/10 blur-[180px]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] bg-[#BCE040]/10 blur-[180px]" />

      <div className="grid min-h-screen lg:grid-cols-[0.85fr_1.15fr]">
        {/* LEFT VIDEO */}
        <div className="video-container relative h-[50vh] lg:h-screen overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-contain"
          >
            <source src="/videos/hero-2.webm" />
          </video>

          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-[#BCE040]/10 mix-blend-screen" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="content-wrapper flex items-center px-8 py-20 md:px-14 lg:px-24">
          <div>
            <span className="energy-subtitle mb-8 block text-sm font-semibold uppercase tracking-[0.5em] text-[#BCE040]">
              EXTREEM PRO
            </span>

            <div className="space-y-2">
              <div className="overflow-hidden">
                <h2 className="reveal-line text-5xl font-black uppercase leading-none text-white md:text-7xl xl:text-8xl">
                  UNLEASH
                </h2>
              </div>

              <div className="overflow-hidden">
                <h2 className="reveal-line text-5xl font-black uppercase leading-none text-white md:text-7xl xl:text-8xl">
                  YOUR
                </h2>
              </div>

              <div className="overflow-hidden">
                <h2 className="reveal-line text-5xl font-black uppercase leading-none md:text-7xl xl:text-8xl text-[#BCE040]">
                  POTENTIAL
                </h2>
              </div>
            </div>

            <p className="energy-description mt-10 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
              Powered with Taurine, Caffeine, Ginseng and B-Vitamins. Extreem
              Pro delivers intense energy, enhanced endurance, sharper focus and
              long-lasting performance for those who refuse to settle for
              average.
            </p>

            {/* CTA */}
            <button className="energy-button group relative mt-12 overflow-hidden rounded-full border border-[#BCE040] px-8 py-4">
              <span className="relative z-20 text-sm font-semibold uppercase tracking-[0.25em] transition-colors duration-500 group-hover:text-black">
                Explore Product
              </span>

              <span className="absolute left-1/2 top-full h-4 w-4 -translate-x-1/2 rounded-full bg-[#BCE040] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-[350px] group-hover:w-[350px] group-hover:top-1/2 group-hover:-translate-y-1/2" />
            </button>

            {/* Features */}
            <div className="mt-16 flex flex-wrap gap-4">
              {["High Caffeine", "Taurine", "Ginseng", "B-Vitamins"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-full border border-[#BCE040]/30 px-5 py-2 text-sm uppercase tracking-wider text-[#BCE040]"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
