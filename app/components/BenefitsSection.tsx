"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "VITAMINS",
    video: "/videos/vitamins.webm",
  },
  {
    title: "TAURINE",
    video: "/videos/taurine.webm",
  },
  {
    title: "CAFFEINE",
    video: "/videos/caffeine.webm",
  },
  {
    title: "GINSENG",
    video: "/videos/ginseng.webm",
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
  trigger: ".benefits-heading",
  start: "top 80%",

  onEnter: () => {
    gsap.fromTo(
      ".benefit-letter",
      {
        y: 150,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.05,
        ease: "expo.out",
      }
    );
  },

  onEnterBack: () => {
    gsap.fromTo(
      ".benefit-letter",
      {
        y: 150,
        opacity: 0,
        filter: "blur(10px)",
      },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.05,
        ease: "expo.out",
      }
    );
  },
});

      gsap.from(".benefit-card", {
        y: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".benefits-grid",
          start: "top 80%",
        },
      });

      gsap.from(".benefits-description", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".benefits-description",
          start: "top 85%",
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24 md:py-32"
    >
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] bg-[#BCE040]/10 blur-[180px]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] bg-[#BCE040]/10 blur-[180px]" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Heading */}
        <div className="benefits-heading text-center mb-20 overflow-hidden  drop-shadow-[0_0_20px_rgba(188,224,64,0.8)]">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight">
            {"BENEFITS".split("").map((letter, index) => (
              <span
                key={index}
                className="
          benefit-letter
          inline-block
          text-[#BCE040]
         
          will-change-transform
        "
              >
                {letter}
              </span>
            ))}
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="benefit-card group flex flex-col items-center"
            >
              {/* Video Container */}
              <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden shadow-[0_0_30px_rgba(188,224,64,0.15)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(188, 224, 64,0.5)]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                  <source src={item.video} type="video/webm" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
              </div>

              {/* Label */}
              <div className="mt-8">
                <LiquidButton text={item.title} />
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="benefits-description max-w-4xl mx-auto mt-24 text-center">
          <p className="text-zinc-300 text-base md:text-xl uppercase leading-relaxed tracking-wider">
            Powered by essential vitamins, taurine, caffeine, and ginseng,
            Extreem Pro delivers the energy, focus, and endurance you need to
            push beyond limits and stay at your peak performance.
          </p>
        </div>
      </div>
    </section>
  );
}

function LiquidButton({ text }: { text: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <button
      onMouseMove={handleMove}
      className="group relative overflow-hidden rounded-full border border-[#BCE040] px-10 py-3.5"
    >
      <span className="relative z-20 font-bold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-black">
        {text}
      </span>

      <span
        className="absolute h-4 w-4 rounded-full bg-[#BCE040] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-[350px] group-hover:w-[350px]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
      />
    </button>
  );
}
