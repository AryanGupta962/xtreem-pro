import Image from "next/image";
import { SiInstagram } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1800px] mx-auto px-8 md:px-16 py-16">
        {/* Logo */}

        <Image
          src="/images/logo.webp"
          alt="Sting Energy"
          width={1200}
          height={300}
          className="w-full max-w-100 h-auto object-contain"
          priority
        />

        {/* Bottom Section */}
        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Left */}
          <div className="flex flex-col gap-6">
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

          {/* Right */}
          <div className="text-center md:text-right text-xs md:text-sm uppercase tracking-wider">
            © 2026 I Boostt Food & Beverages Pvt. Ltd. All Rights Reserved.
            Extreem Pro is a registered brand of I Boostt Food & Beverages Pvt.
            Ltd.
          </div>
        </div>
      </div>
    </footer>
  );
}
