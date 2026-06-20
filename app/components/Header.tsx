"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <Navbar/>
  );
}

const navItems = [
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Become Distributor",
    href: "/become-distributor",
  },
];

function AnimatedText({ text }: { text: string }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="relative inline-block overflow-hidden"
          style={{
            width: char === " " ? "0.35em" : "auto",
          }}
        >
          <span
            className="
              block
              will-change-transform
              transition-transform
              duration-500
              ease-[cubic-bezier(0.83,0,0.17,1)]
              group-hover:-translate-y-full
            "
            style={{
              transitionDelay: `${index * 20}ms`,
            }}
          >
            {char}
          </span>

          <span
            className="
              absolute
              left-0
              top-full
              block
              will-change-transform
              transition-transform
              duration-500
              ease-[cubic-bezier(0.83,0,0.17,1)]
              group-hover:-translate-y-full
            "
            style={{
              transitionDelay: `${index * 20}ms`,
            }}
          >
            {char}
          </span>
        </span>
      ))}
    </span>
  );
}
function Navbar() {
  return (
    <header className="fixed top-3 left-0 right-0 z-50 px-4 md:px-8">
      <motion.div
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="
          relative
          mx-auto
          flex
          h-15
          max-w-375
          items-center
          justify-between
          overflow-hidden
          rounded-full
          border
          border-white/10
          bg-white/10
          px-6
          md:px-10
          backdrop-blur-2xl
          shadow-[0_0_50px_rgba(255,255,255,0.03)]
        "
      >
        {/* Glow */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-full
            bg-linear-to-r
            from-green-500/5
            via-transparent
            to-green-500/5
          "
        />

        {/* Logo */}
        <Link href="/">
          <div className="relative h-10 w-36 md:h-12 md:w-44">
            <Image
              src="/images/logo.webp"
              alt="Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-8 md:gap-12">
          {navItems.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                href={item.href}
                className="
                  group
                  relative
                  block
                  overflow-hidden
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-white
                  md:text-base
                "
              >
                <AnimatedText text={item.label} />

                {/* Underline */}
                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    h-px
                    w-0
                    bg-white
                    transition-all
                    duration-700
                    ease-[cubic-bezier(0.76,0,0.24,1)]
                    group-hover:w-full
                  "
                />
              </Link>
            </motion.div>
          ))}
        </nav>
      </motion.div>
    </header>
  );
}