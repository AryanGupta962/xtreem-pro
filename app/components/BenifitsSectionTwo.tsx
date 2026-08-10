"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Atom,
  BicepsFlexed,
  ShieldCheck,
  Leaf,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import BottomStats from "./BenifitNew/BottomStats";
import { HiBeaker } from "react-icons/hi2";
import { FaLeaf } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { IconType } from "react-icons";
import ElectricBorder from "./ElectricBorder";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Benefit = {
  id: string;
  threshold: number;
  spec: string;
  icon: LucideIcon | IconType;
  title: string;
  description: string;
  detailTitle: string;
  detailAccent: string;
  detailBody: string;
};

const BENEFITS: Benefit[] = [
  {
    id: "01",
    threshold: 8,
    spec: "250MG",
    icon: AiFillThunderbolt,
    title: "PRECISION ENERGY",
    description: "Clean, smooth energy that kicks in fast and lasts longer.",
    detailTitle: "Precision",
    detailAccent: "Energy",
    detailBody:
      "Fast-starting caffeine delivery for clean momentum without the heavy crash.",
  },
  {
    id: "02",
    threshold: 24,
    spec: "B-COMPLEX",
    icon: Atom,
    title: "ULTIMATE POWER MATRIX",
    description:
      "High-performance B-vitamins and key nutrients for peak output.",
    detailTitle: "Power",
    detailAccent: "Matrix",
    detailBody:
      "A focused B-vitamin stack supports energy metabolism when output matters.",
  },
  {
    id: "03",
    threshold: 41,
    spec: "TAURINE",
    icon: BicepsFlexed,
    title: "WIRED FOR ENDURANCE",
    description: "Taurine-infused to support stamina, focus and recovery.",
    detailTitle: "Endurance",
    detailAccent: "Wired",
    detailBody:
      "Taurine-backed support for sustained focus, stamina and sharper recovery.",
  },
  {
    id: "04",
    threshold: 58,
    spec: "CLEAN",
    icon: ShieldCheck,
    title: "100% CLEAN FORMULATION",
    description:
      "Lab-certified. Zero synthetic colors. No crash. Just performance.",
    detailTitle: "Clean",
    detailAccent: "Formula",
    detailBody:
      "No synthetic colors, no unnecessary drag, just performance-forward fuel.",
  },
  {
    id: "05",
    threshold: 75,
    spec: "REAL FUEL",
    icon: FaLeaf,
    title: "REAL FUEL. NO FAKES",
    description: "Made with real ingredients your body recognizes and absorbs.",
    detailTitle: "Real",
    detailAccent: "Fuel",
    detailBody:
      "Recognizable ingredients designed to hit clean and support active output.",
  },
];

const STATS = [
  { icon: HiBeaker, value: "92%", label: "RIGHT\nCHANNEL" },
  { icon: HiBeaker, value: "", label: "LAB\nTESTED" },
  { icon: ShieldCheck, value: "", label: "ZERO HEAVY\nMETALS" },
];

export default function BenefitsSectionTwo() {
  const sectionRef = useRef<HTMLElement>(null);
  const canRef = useRef<HTMLDivElement>(null);
  const meterRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);
  const prevActiveRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeBenefit = BENEFITS[activeIndex];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      gsap.from(".benefits-kicker", {
        scrollTrigger: { trigger: section, start: "top 78%" },
        opacity: 0,
        y: 18,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".benefits-title", {
        scrollTrigger: { trigger: section, start: "top 74%" },
        opacity: 0,
        y: 46,
        duration: 1,
        ease: "power4.out",
      });

      if (canRef.current && !prefersReducedMotion) {
        gsap.fromTo(
          canRef.current,
          { opacity: 0, y: 70, scale: 0.86, rotate: -2 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: section, start: "top 70%" },
          },
        );

        gsap.to(canRef.current, {
          y: -16,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 0.45,
        onUpdate: (self) => {
          const pct = Math.round(self.progress * 100);
          const nextIndex = BENEFITS.reduce(
            (current, benefit, index) =>
              pct >= benefit.threshold ? index : current,
            0,
          );

          if (meterRef.current) {
            gsap.to(meterRef.current, {
              width: `${Math.max(8, pct)}%`,
              duration: 0.15,
              ease: "none",
              overwrite: true,
            });
          }

          if (nextIndex === prevActiveRef.current) return;
          prevActiveRef.current = nextIndex;
          setActiveIndex(nextIndex);

          // const focusedCard = cardRefs.current[nextIndex];
          // if (focusedCard && !prefersReducedMotion) {
          //   gsap.fromTo(
          //     focusedCard,
          //     { x: -38, scale: 0.96, filter: "blur(3px)" },
          //     {
          //       x: 0,
          //       scale: 1,
          //       filter: "blur(0px)",
          //       duration: 0.5,
          //       ease: "back.out(1.7)",
          //       overwrite: true,
          //     },
          //   );
          // }

          if (detailRef.current && !prefersReducedMotion) {
            gsap.fromTo(
              detailRef.current,
              { opacity: 0, x: 34, filter: "blur(4px)" },
              {
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
                duration: 0.45,
                ease: "power3.out",
                overwrite: true,
              },
            );
          }
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="benefits"
      className="relative isolate w-full overflow-hidden bg-black px-2 pt-12 text-white sm:px-6 lg:min-h-screen lg:px-16 lg:pt-20"
    >
      <Image
        src="/images/benefits-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="max-lg:hidden pointer-events-none -z-20 object-cover object-center"
      />

      <Image
        src="/images/benefits-mobile-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="lg:hidden pointer-events-none -z-20 object-top object-contain lg:object-cover lg:object-center"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[1540px] flex-col">
        <header className="order-1 text-center">
          <h2 className="benefits-title bg-gradient-to-b from-white via-white to-lime-100 bg-clip-text text-[54px] font-black uppercase leading-[0.82] tracking-[-0.03em] text-transparent sm:text-[100px]">
            Bene<span className="text-[#C8FF00]">fits</span>
          </h2>
          <p className="mt-3 flex justify-center items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] text-neutral-300 sm:text-sm">
            <span className="max-sm:hidden h-px sm:w-8 bg-neutral-500" />
            FUEL YOUR <span className="text-lime-400">EDGE</span>. UNLEASH YOUR{" "}
            <span className="text-lime-400">POTENTIAL</span>.
            <span className="max-sm:hidden h-px w-8 bg-neutral-500" />
          </p>
        </header>

        <div className="order-2 grid items-center gap-7 pt-8 lg:grid-cols-[minmax(0,420px)_minmax(320px,1fr)_minmax(0,440px)] lg:gap-8 lg:pt-10">
          <div className="order-2 flex flex-col gap-3 lg:order-1">
            {BENEFITS.map((benefit, index) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                active={index === activeIndex}
                setRef={(el) => {
                  cardRefs.current[index] = el;
                }}
              />
            ))}
          </div>

          <div className="order-1 flex flex-col items-center justify-center lg:order-2">
            <div
              ref={canRef}
              className="relative grid h-[410px] w-full max-w-[330px] place-items-center sm:h-[500px] sm:max-w-[420px] lg:h-[590px]"
            >
              <Image
                src="/images/can.webp"
                alt="Xtreem Pro Energy Drink Can"
                width={520}
                height={760}
                priority
                sizes="(max-width: 1024px) 300px, 420px"
                className="relative z-10 h-[340px] w-auto object-contain drop-shadow-[0_0_58px_rgba(200,255,0,0.42)] sm:h-[430px] lg:h-[520px]"
              />
            </div>

            <div className="mt-3 h-2 w-full max-w-[360px] overflow-hidden rounded-full border border-[#C8FF00]/25 bg-white/10 lg:hidden">
              <div
                ref={meterRef}
                className="h-full w-[8%] rounded-full bg-gradient-to-r from-lime-600 to-[#C8FF00] shadow-[0_0_18px_rgba(200,255,0,0.55)]"
              />
            </div>
          </div>

          <aside className="order-3">
            <ElectricBorder
              color="#C8FF00"
              speed={1.15}
              chaos={0.065}
              borderRadius={12}
              className="rounded-xl"
            >
              <div
                ref={detailRef}
                className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-sm sm:p-6"
              >
                <span className="w-fit rounded-md border border-[#C8FF00]/50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C8FF00]">
                  {activeBenefit.spec}
                </span>

                <div>
                  <h3 className="text-4xl font-black uppercase leading-none text-white xl:text-[60px]">
                    {activeBenefit.detailTitle}
                  </h3>
                  <h3 className="text-4xl font-black uppercase leading-none text-[#C8FF00] xl:text-[60px]">
                    {activeBenefit.detailAccent}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-300">
                  <ShieldCheck size={20} className="text-[#C8FF00]" />
                  Channel unlock / {activeBenefit.threshold}% charge
                </div>

                <p className="text-sm leading-relaxed text-neutral-300">
                  {activeBenefit.detailBody}
                </p>

                <div className="grid grid-cols-3 gap-3">
                  {STATS.map(({ icon: Icon, value, label }) => (
                    <div
                      key={label}
                      className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2 py-4 text-center"
                    >
                      {value ? (
                        <span className="text-2xl font-black text-[#C8FF00]">
                          {value}
                        </span>
                      ) : (
                        <Icon size={30} className="text-white" />
                      )}
                      <span className="whitespace-pre-line text-[10px] font-semibold leading-tight tracking-wide text-neutral-400">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
                    <span>Charge level</span>
                    <span className="text-[#C8FF00] text-sm">
                      {activeBenefit.threshold}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-lime-600 to-[#C8FF00] transition-[width] duration-500"
                      style={{ width: `${activeBenefit.threshold}%` }}
                    />
                  </div>
                </div>

                <button className="mt-1 flex items-center justify-center gap-3 rounded-lg bg-[#C8FF00] py-3 text-xs font-bold uppercase tracking-widest text-black transition-colors hover:bg-lime-300">
                  Explore the edge
                  <ArrowRight size={14} />
                </button>
              </div>
            </ElectricBorder>
          </aside>
        </div>

        <div className="order-3 mt-7 lg:hidden">
          <BottomStats />
        </div>

        <div className="order-4 hidden lg:block">
          <BottomStats />
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  benefit,
  active,
  setRef,
}: {
  benefit: Benefit;
  active: boolean;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const Icon = benefit.icon;
  const card = (
    <div
      ref={setRef}
      className={`benefit-card-shell group flex items-center gap-4 rounded-xl border-2 px-4 py-4 transition-all duration-300 sm:px-5 ${
        active
          ? "border-[#C8FF00]/80 bg-[#C8FF00]/10 shadow-[0_0_24px_rgba(200,255,0,0.28)]"
          : "border-white/10 bg-black/45 hover:border-[#C8FF00]/35"
      }`}
    >
      <span className={`text-lg font-black ${"text-[#C8FF00]"}`}>
        {benefit.id}
      </span>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          <polygon
            points="50,3 94,25 94,75 50,97 6,75 6,25"
            className={"fill-transparent stroke-[#C8FF00]"}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </svg>
        <Icon size={24} className={"text-[#C8FF00]"} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <p
            className={`text-[13px] font-black uppercase tracking-wide ${"text-[#C8FF00]"}`}
          >
            {benefit.title}
          </p>
          {active ? (
            <span className="hidden rounded bg-[#C8FF00] px-1.5 py-0.5 text-[8px] font-black text-black sm:inline">
              {benefit.spec}
            </span>
          ) : null}
        </div>
        <p className="text-xs leading-snug text-neutral-400">
          {benefit.description}
        </p>
      </div>
      <ArrowRight
        size={16}
        className={`shrink-0 transition-transform group-hover:translate-x-1 ${
          active ? "text-[#C8FF00]" : "text-neutral-500"
        }`}
      />
    </div>
  );

  if (!active) return card;

  return (
    <ElectricBorder
      color="#C8FF00"
      speed={1.15}
      chaos={0.065}
      borderRadius={12}
      className="rounded-xl"
    >
      {card}
    </ElectricBorder>
  );
}
