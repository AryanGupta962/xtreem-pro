import Image from "next/image";

const NUTRITION_ROWS = [
  ["Energy", "48.63 kcal", "121.58 kcal"],
  ["Carbohydrate", "11.85 g", "29.63 g"],
  ["Total sugars", "11.67 g", "29.18 g"],
  ["Added sugars", "11.46 g", "28.65 g"],
  ["Protein", "0 g", "0 g"],
  ["Total fat", "0 g", "0 g"],
  ["Sodium", "13.34 mg", "33.35 mg"],
  ["Vitamin B2", "1.95 mg", "4.88 mg"],
  ["Vitamin B3", "2.35 mg", "5.88 mg"],
  ["Vitamin B6", "0.37 mg", "0.93 mg"],
  ["Vitamin B12", "0.16 mcg", "0.40 mcg"],
  ["Caffeine", "30 mg", "75 mg"],
];

const LABEL_NOTES = [
  "Serving size: 250 ml",
  "Caffeine: 75 mg per serving",
  "Read the approved pack before consuming",
];

export default function NutritionSection() {
  return (
    <section
      id="nutrition"
      aria-labelledby="nutrition-title"
      className="relative overflow-hidden bg-[#070707] px-4 py-12 text-white sm:px-6 sm:py-16 lg:px-10"
    >
      <div className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-[#b6f000]/[0.07] blur-[120px]" />
      <div className="pointer-events-none absolute right-[-12%] top-[30%] h-[520px] w-[520px] rounded-full border border-[#b6f000]/10 opacity-60" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="mb-7 flex items-end justify-between gap-6 border-b border-white/10 pb-5 sm:mb-9 sm:pb-6">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b6f000]">
              <span className="h-px w-8 bg-[#b6f000]" />
              03 / Label information
            </div>
            <h2
              id="nutrition-title"
              className="max-w-3xl text-[clamp(2.25rem,5.4vw,5.5rem)] font-black uppercase leading-[0.84] tracking-[-0.06em]"
            >
              Complete nutrition
              <span className="block text-[#b6f000]">breakdown.</span>
            </h2>
          </div>

          <p className="hidden max-w-[230px] pb-1 text-right text-xs leading-5 text-white/45 sm:block">
            A clear view of the declared nutrition information for one 250 ml
            serving. The approved pack remains the final reference.
          </p>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(104px,0.42fr)] items-start gap-3 sm:gap-5 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)] lg:gap-10">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#101010] shadow-[0_20px_80px_rgba(0,0,0,0.35)] sm:rounded-[30px]">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-7 sm:py-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b6f000]">
                    Nutrition information
                  </p>
                  <p className="mt-1 text-[11px] text-white/40 sm:text-xs">
                    Values per 100 ml and per serving
                  </p>
                </div>
                <span className="rounded-full border border-[#b6f000]/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#b6f000] sm:px-3 sm:text-[10px]">
                  250 ml
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[410px] border-collapse text-left">
                  <caption className="sr-only">
                    XTREEM PRO nutrition information per 100 ml and per 250 ml
                    serving
                  </caption>
                  <thead>
                    <tr className="bg-white/[0.035] text-[9px] font-bold uppercase tracking-[0.16em] text-white/35 sm:text-[10px]">
                      <th className="px-4 py-3 sm:px-7 sm:py-4">Nutrient</th>
                      <th className="px-3 py-3 sm:px-4 sm:py-4">100 ml</th>
                      <th className="px-3 py-3 sm:px-4 sm:py-4">Serving</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NUTRITION_ROWS.map(([name, per100, serving], index) => (
                      <tr
                        key={name}
                        className={`group transition-colors hover:bg-[#b6f000]/[0.06] ${
                          index !== NUTRITION_ROWS.length - 1
                            ? "border-b border-white/[0.07]"
                            : ""
                        }`}
                      >
                        <th className="px-4 py-3 text-xs font-medium text-white/75 sm:px-7 sm:py-4 sm:text-sm">
                          {name}
                        </th>
                        <td className="px-3 py-3 font-mono text-[11px] text-white/45 sm:px-4 sm:py-4 sm:text-xs">
                          {per100}
                        </td>
                        <td className="px-3 py-3 font-mono text-[11px] font-bold text-[#b6f000] sm:px-4 sm:py-4 sm:text-xs">
                          {serving}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-3 grid gap-3 sm:mt-5 sm:grid-cols-3">
              {LABEL_NOTES.map((note, index) => (
                <div
                  key={note}
                  className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-5"
                >
                  <span className="font-mono text-[10px] text-[#b6f000]">
                    0{index + 1}
                  </span>
                  <p className="mt-4 text-xs leading-5 text-white/60">{note}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 max-w-2xl text-[11px] leading-5 text-white/35 sm:text-xs">
              Nutrition and ingredient information must match the approved
              product label and laboratory documentation. Values shown here are
              for website communication only.
            </p>
          </div>

          <aside className="relative min-w-0 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[22px] border border-[#b6f000]/25 bg-[radial-gradient(circle_at_50%_25%,rgba(182,240,0,0.18),transparent_42%),#0d0d0d] p-3 sm:rounded-[30px] sm:p-8">
              <div className="absolute left-3 top-3 font-mono text-[8px] uppercase tracking-[0.2em] text-white/35 sm:left-7 sm:top-7 sm:text-[10px]">
                XP / 250 ml
              </div>
              <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[#b6f000] sm:right-7 sm:top-7 sm:h-5 sm:w-5" />

              <Image
                src="/images/can.webp"
                alt="XTREEM PRO 250 ml caffeinated beverage can"
                width={520}
                height={760}
                priority
                sizes="(max-width: 640px) 110px, (max-width: 1024px) 240px, 380px"
                className="mx-auto mt-6 h-auto w-full max-w-[112px] object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.65)] sm:mt-8 sm:max-w-[300px]"
              />

              <div className="mt-2 border-t border-white/10 pt-3 sm:mt-5 sm:pt-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#b6f000] sm:text-[10px]">
                  Caffeinated beverage
                </p>
                <p className="mt-2 hidden text-xs leading-5 text-white/45 sm:block">
                  Please read the ingredient list, caffeine quantity and serving
                  guidance on the final pack before consuming.
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:mt-5 sm:rounded-3xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Caffeine guide
                </p>
                <span className="font-mono text-[10px] text-[#b6f000]">75 MG</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/60">
                Not recommended for children, pregnant or lactating women, or
                persons sensitive to caffeine. Consume not more than 500 ml per
                day.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
