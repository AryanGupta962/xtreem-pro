"use client";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Desktop Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Mobile Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover md:hidden"
      >
        <source src="/videos/mobile-hero-1.mp4" type="video/mp4" />
      </video>

      {/* Hero Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end px-6 pb-5 text-center">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-white/70">
          Charged. Clean. Unstoppable.
        </p>

        <h1
          className="mb-6 bg-gradient-to-r from-primary-green via-white to-primary-green bg-clip-text font-black uppercase text-transparent"
          style={{
            fontSize: "clamp(2.8rem, 6vw, 4rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
          }}
        >
          Premium Energy Drink
        </h1>

        <p className="max-w-xl text-lg text-white/80">
          Feel the power. Push every limit. Fuel every challenge.
        </p>

        {/* <div className="mt-12 flex flex-col items-center">
          <span className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
            Scroll to explore
          </span>

          <div className="flex h-10 w-6 justify-center rounded-full border border-lime-400/60 p-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-lime-400" />
          </div>
        </div> */}
      </div>
    </section>
  );
}
