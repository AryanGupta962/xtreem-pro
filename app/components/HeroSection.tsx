import Link from "next/link";
import ProductCan from "./ProductCan";

const HIGHLIGHTS = [
  "Natural caffeine",
  "Taurine",
  "B-vitamins",
  "Best served chilled",
];

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#050505] px-3 pb-14 pt-24 text-white sm:px-6 sm:pb-20 sm:pt-32 lg:px-10 lg:pb-24"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(170,252,28,0.22),transparent_34%),radial-gradient(circle_at_78%_24%,rgba(170,252,28,0.18),transparent_28%),linear-gradient(135deg,#050505_0%,#0b0f08_52%,#050505_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-green/40 to-transparent" />
      <div className="absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-primary-green/18 blur-[110px]" />
      <div className="absolute bottom-0 right-[-5rem] h-80 w-80 rounded-full bg-primary-green/12 blur-[140px]" />

      <div className="relative mx-auto grid w-full max-w-[1480px] items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-16">
        <div className="max-w-2xl">
          <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/68 backdrop-blur-xl sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.28em]">
            <span className="h-2 w-2 rounded-full bg-primary-green shadow-[0_0_14px_rgba(170,252,28,0.85)]" />
            <span className="min-w-0 truncate">Carbonated Caffeinated Beverage</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.35rem,13vw,7rem)] font-black uppercase leading-[0.9] tracking-[-0.06em] text-white sm:mt-6 sm:leading-[0.88]">
            Bold
            <span className="block bg-[linear-gradient(180deg,#eff8d1_0%,#aafc1c_48%,#6f970f_100%)] bg-clip-text text-transparent">
              Chill-Ready
            </span>
            <span className="block">Refreshment</span>
          </h1>

          <p className="mt-5 max-w-xl text-[15px] leading-6 text-white/70 sm:mt-6 sm:text-lg sm:leading-8">
            XTREEM PRO is a carbonated caffeinated beverage crafted with
            natural caffeine, taurine, and B vitamins, made for a bold flavour
            profile and best enjoyed served chilled.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="#nutrition"
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary-green px-5 text-xs font-black uppercase tracking-[0.16em] text-black transition-transform duration-300 hover:scale-[1.02] hover:bg-[#c9ff55] sm:h-12 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.18em]"
            >
              Explore Nutrition
            </Link>

            <Link
              href="#about"
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-5 text-xs font-semibold uppercase tracking-[0.16em] text-white/84 backdrop-blur-xl transition-colors duration-300 hover:border-primary-green/50 hover:text-white sm:h-12 sm:w-auto sm:px-7 sm:text-sm sm:tracking-[0.18em]"
            >
              About XTREEM PRO
            </Link>
          </div>

          <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-3.5 py-3.5 backdrop-blur-xl sm:px-4 sm:py-4"
              >
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white/78 sm:text-sm sm:tracking-[0.16em]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute inset-x-[18%] inset-y-[18%] rounded-full bg-primary-green/16 blur-[90px]" />

          <div className="relative w-full max-w-[620px] rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)] p-4 shadow-[0_24px_120px_rgba(0,0,0,0.58)] backdrop-blur-2xl sm:rounded-[32px] sm:p-8">
            <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-primary-green/60 to-transparent sm:inset-x-8" />

            <div className="flex items-center justify-between gap-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/45 sm:text-xs sm:tracking-[0.24em]">
              <span>250ml Can</span>
              <span>Serve Chilled</span>
            </div>

            <div className="relative mt-4 overflow-hidden rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_50%_22%,rgba(170,252,28,0.18),transparent_45%),linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(7,7,7,0.65)_100%)] px-3 py-8 sm:mt-5 sm:rounded-[28px] sm:px-8 sm:py-10">
              <div className="absolute left-4 top-4 rounded-full border border-white/12 bg-black/30 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/65 sm:left-6 sm:top-6 sm:px-3 sm:text-[10px] sm:tracking-[0.2em]">
                XTREEM PRO
              </div>

              <ProductCan />

              {/* <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    Beverage Type
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/84">
                    Carbonated Caffeinated Beverage
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/24 p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45">
                    Advisory
                  </p>
                  <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/84">
                    Consume responsibly
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
