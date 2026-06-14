"use client";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover object-center"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center text-white">
          <span className="mb-2 text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-10 w-6 rounded-full border border-white/40 p-1">
            <div className="h-2 w-2 animate-bounce rounded-full bg-lime-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
