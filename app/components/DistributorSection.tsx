"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import DistributorForm from "./DistributorForm";
import BenefitCard from "./BenefitCard";

gsap.registerPlugin(ScrollTrigger);

export default function DistributorSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".heading", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".description", {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".benefit-card", {
        opacity: 0,
        x: -80,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(".form-container", {
        opacity: 0,
        x: 120,
        rotation: 4,
        scale: 0.95,
        duration: 1.2,
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
      id="distributor"
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-14 md:py-20"
    >
      {/* Background Branding */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-[18vw] font-black uppercase leading-none text-white/[0.03]">
          XTREEM
        </h2>
      </div>

      {/* Energy Glow */}
      <div className="absolute -left-20 top-0 h-[400px] w-[400px] rounded-full bg-primary-green/10 blur-[140px]" />

      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-primary-green/10 blur-[180px]" />

      {/* Radial Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,224,64,0.08),transparent_70%)]" />

  

     

      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="grid items-center gap-12 sm:gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT */}
          <div>
            <div className="heading">
              <h2 className="text-3xl sm:text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] md:text-5xl">
                <span className="block text-white">Become An</span>

                <span className="block bg-gradient-to-r from-primary-green via-[#D9FF69] to-primary-green bg-clip-text text-transparent">
                  XTREEM PARTNER
                </span>
              </h2>
            </div>

            <p className="description mt-4 sm:mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl">
              Bring a more thoughtful caffeinated beverage experience to your
              customers. We are building a partner community around clear
              communication, responsible serving information and memorable
              everyday moments.
            </p>

            <div className="mt-6 space-y-5">
              <div className="benefit-card">
                <BenefitCard
                  title="A brand people remember"
                  description="Distinctive creative, clear product communication and a warm point of view."
                />
              </div>

              <div className="benefit-card">
                <BenefitCard
                  title="Partner support"
                  description="Brand assets and practical support to help you introduce XTREEM PRO locally."
                />
              </div>

              <div className="benefit-card">
                <BenefitCard
                  title="Responsible growth"
                  description="Grow with a product story that keeps label awareness and consumer choice at the centre."
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="form-container relative">
            {/* Glow Behind Form */}
            <div className="absolute -inset-4 rounded-[40px] bg-primary-green/10 blur-3xl" />

            <div className="relative">
              <DistributorForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
