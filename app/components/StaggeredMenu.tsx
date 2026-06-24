"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
  index: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Contact", href: "/contact", index: "01" },
  { label: "Become Distributor", href: "/distributor", index: "02" },
];

interface StaggeredMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StaggeredMenu({ isOpen, onClose }: StaggeredMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize hidden state on mount
  useEffect(() => {
    if (!overlayRef.current) return;

    gsap.set(itemsRef.current, {
      y: "110%",
      opacity: 0,
    });

    gsap.set(closeBtnRef.current, {
      opacity: 0,
    });

    gsap.set(footerRef.current, {
      opacity: 0,
    });
  }, []);

  // Keyboard ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const animateOpen = () => {
    const overlay = overlayRef.current!;
    overlay.style.pointerEvents = "auto";
    overlay.setAttribute("aria-hidden", "false");

    tlRef.current?.kill();
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(overlay, { opacity: 1, duration: 0.35, ease: "power2.out" })
      .to(
        closeBtnRef.current,
        { opacity: 1, duration: 0.3, ease: "power2.out" },
        0.25,
      )
      .to(
        itemsRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: "power4.out",
          stagger: { each: 0.12, from: "start" },
        },
        0.3,
      )
      .to(
        footerRef.current,
        { opacity: 1, duration: 0.4, ease: "power2.out" },
        0.7,
      );
  };

  const animateClose = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    tlRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.pointerEvents = "none";
        overlay.setAttribute("aria-hidden", "true");
        gsap.set(itemsRef.current, { y: "110%", opacity: 0 });
        gsap.set(closeBtnRef.current, { opacity: 0 });
        gsap.set(footerRef.current, { opacity: 0 });
        gsap.set(overlay, { opacity: 0 });
      },
    });
    tlRef.current = tl;

    tl.to(footerRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" })
      .to(
        itemsRef.current,
        {
          y: "110%",
          opacity: 0,
          duration: 0.4,
          ease: "power3.in",
          stagger: { each: 0.06, from: "end" },
        },
        0,
      )
      .to(closeBtnRef.current, { opacity: 0, duration: 0.2 }, 0.1)
      .to(overlay, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.3);
  };

  // React to isOpen changes driven by Header
  useEffect(() => {
    if (isOpen) {
      animateOpen();
    } else {
      animateClose();
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-label="Navigation menu"
      aria-modal="true"
      aria-hidden="true"
      style={{ opacity: 0, pointerEvents: "none" }}
      className="fixed inset-0 bg-[#0A0A0A] z-[100] flex flex-col justify-center px-12 overflow-hidden"
    >
      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        className="
          absolute top-7 right-9
          flex items-center gap-2
          bg-transparent border-none text-[#F0F0F0]
          text-xl tracking-[3px] cursor-pointer
          hover:text-[#E8FF00] transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8FF00]
        "
        aria-label="Close menu"
      >
        <span
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-xs tracking-[1px] text-[#444]"
        >
          ESC
        </span>
        CLOSE
      </button>

      {/* Nav items */}
      <nav aria-label="Main navigation">
        {NAV_LINKS.map((link, i) => (
          <div key={link.href} className="overflow-hidden my-1">
            <Link
              ref={(el) => {
                if (el)
                  itemsRef.current[i] = el as unknown as HTMLAnchorElement;
              }}
              href={link.href}
              onClick={onClose}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
              }}
              className="
                group
                flex items-center justify-between
                text-[#F0F0F0] no-underline leading-none
                py-2 border-b border-[#1E1E1E]
                transition-colors duration-300
                hover:text-primary-green
                focus:outline-none focus-visible:text-[#E8FF00]
                text-3xl
              "
            >
              <span className="flex items-baseline gap-5">
                <span
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  className="text-xs tracking-[3px] text-[#555] -translate-y-1.5"
                >
                  {link.index}
                </span>
                {link.label.toUpperCase()}
              </span>

              <span
                className="
                  text-4xl text-primary-green
                  translate-x-3 opacity-0
                  group-hover:translate-x-0 group-hover:opacity-100
                  transition-all duration-300 ease-out
                "
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div ref={footerRef} className="absolute bottom-7 left-12 right-12">
        <span
          style={{ fontFamily: "'Inter', sans-serif" }}
          className="text-[11px] tracking-[2px] text-[#333] uppercase"
        >
          Unleash Your Potential
        </span>
      </div>
    </div>
  );
}
