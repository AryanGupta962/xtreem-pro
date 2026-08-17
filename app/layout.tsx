import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "XTREEM PRO | Caffeinated Beverage",
    template: "%s | XTREEM PRO",
  },
  description:
    "Explore XTREEM PRO, a caffeinated beverage with label-focused nutrition information, caffeine guidance and FSSAI awareness for responsible choice.",
  keywords: [
    "XTREEM PRO",
    "caffeinated beverage India",
    "caffeine per serving",
    "nutrition information",
    "FSSAI caffeinated beverage guidelines",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "XTREEM PRO | Caffeinated Beverage",
    description:
      "Label-focused nutrition, caffeine guidance and FSSAI awareness for XTREEM PRO.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
