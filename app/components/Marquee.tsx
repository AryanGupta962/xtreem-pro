"use client";

export default function EnergyMarquee() {
  const items = [
    "HIGH CAFFEINE",
    "TAURINE",
    "VITAMINS B",
    "ENHANCED ENDURANCE",
    "GINSENG",
    "INTENSE ENERGY",
  ];

  return (
    <section className="relative overflow-hidden bg-[#BCE040] py-3">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />

      <div className="marquee-container">
        <div className="marquee-track">
          {[...items, ...items, ...items].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-8 whitespace-nowrap"
            >
              <span className="text-black text-sm md:text-lg font-black uppercase tracking-[0.2em]">
                {item}
              </span>

              <span className="text-black text-xl md:text-2xl font-black">
                •
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }

        .marquee-track {
          display: flex;
          width: max-content;
          gap: 3rem;
          animation: marquee 25s linear infinite;
          transform: skewX(-8deg);
        }

        .marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0) skewX(-8deg);
          }

          to {
            transform: translateX(-33.333%) skewX(-8deg);
          }
        }

        .marquee-track span {
          text-shadow: 0 0 10px rgba(188, 224, 64, 0.3);
        }

        @media (max-width: 768px) {
          .marquee-track {
            gap: 2rem;
            animation-duration: 18s;
          }
        }
      `}</style>
    </section>
  );
}
