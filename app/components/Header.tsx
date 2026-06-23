"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import StaggeredMenu from "./StaggeredMenu";

const navItems = [
  { label: "Contact", href: "/contact" },
  { label: "Become Distributor", href: "/become-distributor" },
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
            className="block will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${index * 20}ms` }}
          >
            {char}
          </span>
          <span
            className="absolute left-0 top-full block will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.83,0,0.17,1)] group-hover:-translate-y-full"
            style={{ transitionDelay: `${index * 20}ms` }}
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

  return (
    <>
      <header className="fixed top-3 left-0 right-0 z-50 px-4 md:px-8">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="
            relative mx-auto flex h-13 md:h-15 max-w-375
            items-center justify-between overflow-hidden
            rounded-full border border-white/10 bg-white/10
            px-4 md:px-6 backdrop-blur-2xl
            shadow-[0_0_50px_rgba(255,255,255,0.03)]
          "
        >
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-r from-green-500/5 via-transparent to-green-500/5" />

          {/* Logo */}
          <Link href="/">
            <div className="relative h-10 w-24 md:w-36">
              <Image
                src="/images/logo.webp"
                alt="Logo"
                fill
                priority
                sizes="144px"
                className="object-contain"
              />
            </div>
          </Link>

          {/* Hamburger — visible on mobile, triggers staggered menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
          >
            <FiMenu size={28} />
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href={item.href}
                  className="
                    group relative block overflow-hidden
                    text-xs font-semibold uppercase tracking-[0.15em] text-white
                  "
                >
                  <AnimatedText text={item.label} />
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>
        </motion.div>
      </header>

      {/* Staggered full-screen menu — controlled entirely from here */}
      <StaggeredMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
