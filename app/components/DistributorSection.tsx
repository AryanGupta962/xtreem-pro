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
      gsap.from(".left-content > *", {
        opacity: 0,
        y: 80,
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
      ref={sectionRef}
      className="relative overflow-hidden bg-black py-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(188,224,64,0.08),transparent_70%)]" />

      <div className="container mx-auto px-6">
        <div className="grid gap-20 lg:grid-cols-2">
          {/* LEFT */}
          <div className="left-content">
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">
              <span className="block text-white">Partner With</span>

              <span className="block text-[#BCE040]">XTREEM PRO XP</span>
            </h2>

            <p className="mt-8 max-w-xl text-xl text-zinc-300">
              Join the fastest growing energy drink network in the country. We
              provide the fuel; you drive the expansion.
            </p>

            <div className="mt-14 space-y-6">
              <BenefitCard
                title="Strong Retail Demand"
                description="High turn-over rates driven by premium branding and competitive pricing."
              />

              <BenefitCard
                title="Marketing Support"
                description="Full access to branding assets, POS materials and digital campaigns."
              />

              <BenefitCard
                title="Fast Growing Category"
                description="Secure your territory in the booming functional beverage market."
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="form-container">
            <DistributorForm />
          </div>
        </div>
      </div>
    </section>
  );
}
