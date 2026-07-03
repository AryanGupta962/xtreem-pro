"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { FiMenu } from "react-icons/fi";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import StaggeredMenu from "./StaggeredMenu";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ENERGY", href: "#energy" },
  { label: "BENEFITS", href: "#benefits" },
  { label: "BRAND EXPERIENCE", href: "#experience" },
  { label: "DISTRIBUTOR", href: "#distributor" },
];

function AnimatedText({ text }: { text: string }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="relative inline-block overflow-hidden"
          style={{ width: char === " " ? "0.35em" : "auto" }}
        >
          <span
            className="block transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${index * 18}ms` }}
          >
            {char}
          </span>

          <span
            className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${index * 18}ms` }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(navItems[0].label);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible?.target.id) return;
        const match = navItems.find(
          (item) => item.href === `#${visible.target.id}`,
        );
        if (match) setActiveLink(match.label);
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed left-0 right-0 top-3 z-50 px-3 sm:px-5 lg:px-8">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="
            relative mx-auto flex h-[55px] max-w-[1920px] items-center
            justify-between overflow-hidden rounded-[28px]
            border border-white/10 bg-black/55 backdrop-blur-md px-4
            shadow-[0_0_45px_rgba(0,0,0,0.65)]
            backdrop-blur-2xl
            sm:h-[62px] sm:px-6
          "
        >
          {/* Logo */}
          <Link href="/" className="relative z-10 shrink-0">
            <div className="relative h-[34px] w-[110px] sm:h-[38px] sm:w-[130px] lg:w-[148px]">
              <Image
                src="/images/logo.webp"
                alt="XTREEM PRO Logo"
                fill
                priority
                sizes="148px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Center Nav */}
          <nav className="absolute left-[45%] 2xl:left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 xl:flex">
            {navItems.map((item) => {
              const isActive = item.label === activeLink;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`
                    group relative block font-semibold overflow-visible text-[12px]
                    uppercase tracking-[0.16em]
                    transition-colors duration-300
                    ${
                      isActive
                        ? "text-[#C8FF00]"
                        : "text-white/85 hover:text-white"
                    }
                  `}
                >
                  <AnimatedText text={item.label} />

                  {isActive && (
                    <span className="absolute -bottom-[3px] left-1/2 h-[2px] w-[80px] -translate-x-1/2 rounded-full bg-[#C8FF00] shadow-[0_0_12px_rgba(200,255,0,0.9)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="relative z-10 hidden items-center gap-3 md:flex">
            <Link
              href="#distributor"
              className="
                group relative flex h-9 items-center justify-center
                overflow-hidden rounded-[8px] border border-[#C8FF00]/70
                bg-[#C8FF00] px-4 text-[10px] font-bold uppercase
                tracking-[0.12em] text-black shadow-[0_0_24px_rgba(200,255,0,0.35)]
                transition-all duration-300 hover:scale-[1.02]
                hover:shadow-[0_0_38px_rgba(200,255,0,0.55)]
                lg:px-5 lg:text-[12px]
              "
            >
              <AnimatedText text="BECOME DISTRIBUTOR" />
            </Link>

            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="
                flex h-11 w-11 items-center justify-center rounded-[8px]
                text-[#C8FF00] transition-all duration-300
                hover:bg-[#C8FF00]/10 hover:shadow-[0_0_22px_rgba(200,255,0,0.22)]
              "
            >
              <BsGrid3X3GapFill size={25} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="
              relative z-10 flex h-10 w-7 items-center justify-center
              rounded-full text-white
              transition md:hidden
            "
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            <FiMenu size={23} />
          </button>
        </motion.div>
      </header>

      <StaggeredMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
