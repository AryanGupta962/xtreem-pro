import Image from "next/image";
import { SiInstagram } from "react-icons/si";
import { FaFacebookSquare } from "react-icons/fa";
import { MapPin, Phone } from "lucide-react";

const ADDRESS =
  "Plot No. 75 B, Ground Floor, Block WZ, Todapur, Inderpuri, New Delhi, Central Delhi - 110012, Delhi";

const CONTACT_NUMBER = "8796733944";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex flex-col items-center justify-between gap-10 px-4 py-10 sm:px-8 md:px-12 lg:flex-row lg:items-start">
        {/* Logo */}
        <Image
          src="/images/logo.webp"
          alt="XTREEM PRO Logo"
          width={1200}
          height={300}
          loading="eager"
          sizes="(max-width: 640px) 144px, 200px"
          className="h-auto w-full max-w-36 object-contain sm:max-w-50"
        />

        {/* Right Section */}
        <div className="flex w-full max-w-md flex-col items-center gap-7 text-center lg:items-end lg:text-right">
          {/* Contact Information */}
          <div className="flex flex-col items-center gap-4 lg:items-end">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary-green sm:text-base">
              Contact Information
            </h3>

            <div className="flex flex-col items-center gap-3 text-xs leading-relaxed text-white/70 sm:text-sm lg:items-end">
              <a
                href={`tel:+91${CONTACT_NUMBER}`}
                aria-label={`Call us at ${CONTACT_NUMBER}`}
                className="flex items-center gap-3 transition-colors hover:text-primary-green"
              >
                <Phone className="size-4 shrink-0 text-primary-green" />
                <span>+91 {CONTACT_NUMBER}</span>
              </a>

              <address className="flex max-w-md items-start justify-center gap-3 not-italic lg:justify-end">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-green" />

                <span>{ADDRESS}</span>
              </address>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex gap-6">
            <a
              href="#"
              aria-label="Visit XTREEM PRO on Instagram"
              className="transition-colors hover:text-primary-green"
            >
              <SiInstagram className="size-7 sm:size-8" />
            </a>

            <a
              href="#"
              aria-label="Visit XTREEM PRO on Facebook"
              className="transition-colors hover:text-primary-green"
            >
              <FaFacebookSquare className="size-7 sm:size-8" />
            </a>
          </div>

          {/* Policy Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-wider sm:text-sm lg:justify-end lg:gap-x-8"
          >
            <a href="#" className="transition-colors hover:text-primary-green">
              Terms of Use
            </a>

            <a href="#" className="transition-colors hover:text-primary-green">
              Privacy Policy
            </a>
          </nav>
        </div>
      </div>

      {/* Copyright */}
      <div className="flex justify-center px-4 py-4 text-center text-[9px] uppercase tracking-wider text-white/60 sm:px-8 sm:text-[10px]">
        <p className="max-w-5xl">
          © 2026 I Boostt Food &amp; Beverages Pvt. Ltd. All Rights Reserved.
          XTREEM PRO is a registered brand of I Boostt Food &amp; Beverages
          Pvt. Ltd.
        </p>
      </div>

      {/* Caffeine Warning */}
      <div className="border border-black bg-primary-green px-4 py-2 text-center">
        <p className="mx-auto max-w-5xl text-[10px] font-bold uppercase leading-snug text-black sm:text-[11px]">
          High caffeine: 75 mg per serving. Contains caffeine. Not recommended for children,
          pregnant or lactating women and persons sensitive to caffeine. Consume
          not more than 500 ml per day.
        </p>
      </div>
    </footer>
  );
}
