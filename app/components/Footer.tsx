import Image from "next/image";
import { SiInstagram } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-8 md:px-16 py-10 sm:py-16 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
        {/* Logo */}
        <Image
          src="/images/logo.webp"
          alt="XTREEM PRO Logo"
          width={1200}
          height={300}
          sizes="(max-width: 640px) 144px, 200px"
          className="w-full max-w-36 sm:max-w-50 h-auto object-contain"
        />

        {/* Bottom Section */}
        <div className="flex flex-col items-center sm:items-end gap-6 sm:gap-8">
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-80 transition">
              <SiInstagram size={28} className="text-white sm:w-8 sm:h-8" />
            </a>

            <a href="#" className="hover:opacity-80 transition">
              <FaFacebookSquare size={28} className="sm:w-8 sm:h-8" />
            </a>
          </div>

          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-8 text-xs sm:text-sm uppercase tracking-wider">
            <a href="#" className="hover:opacity-80">
              Term Of Use
            </a>

            <a href="#" className="hover:opacity-80">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="text-center flex justify-center px-4 py-4 md:text-right text-[9px] sm:text-[10px] uppercase tracking-wider text-white/60">
        © 2026 I Boostt Food & Beverages Pvt. Ltd. All Rights Reserved. Extreem
        Pro is a registered brand of I Boostt Food & Beverages Pvt. Ltd.
      </div>
    </footer>
  );
}
