import Image from "next/image";
import { SiInstagram } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 py-16 flex justify-between">
        {/* Logo */}
        <Image
          src="/images/logo.webp"
          alt="XTREEM PRO Logo"
          width={1200}
          height={300}
          className="w-full max-w-50 h-[80px] object-contain"
          priority
        />

        {/* Bottom Section */}
        <div className="flex flex-col justify-between items-end gap-8">
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-80 transition">
              <SiInstagram size={32} className="text-white" />
            </a>

            <a href="#" className="hover:opacity-80 transition">
              <FaFacebookSquare size={32} />
            </a>
          </div>

          <div className="flex flex-wrap gap-8 text-sm uppercase tracking-wider">
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
      <div className="text-center flex justify-center py-4 md:text-right text-[10px] uppercase tracking-wider">
        © 2026 I Boostt Food & Beverages Pvt. Ltd. All Rights Reserved. Extreem
        Pro is a registered brand of I Boostt Food & Beverages Pvt. Ltd.
      </div>
    </footer>
  );
}
