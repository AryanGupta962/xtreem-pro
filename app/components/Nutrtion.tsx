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
  ["01", "Serving size", "250 ml"],
  ["02", "Caffeine", "75 mg per serving"],
  ["03", "Pack guidance", "Read before consuming"],
];

export default function NutritionSection() {
  return (
    <section id="nutrition" aria-labelledby="nutrition-title" className="relative isolate overflow-hidden bg-[#060606] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(182,240,0,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(182,240,0,0.08)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-[460px] w-[460px] rounded-full bg-[#b6f000]/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-18rem] top-1/3 -z-10 h-[580px] w-[580px] rounded-full border border-[#b6f000]/15" />

      <div className="mx-auto max-w-[1440px]">
        <header className="relative mb-10 border-b border-white/10 pb-8 sm:mb-14 sm:pb-10">
          <div className="mb-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em] text-[#b6f000]">
            <span className="h-px w-10 bg-[#b6f000]" /> 03 / Label information
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 id="nutrition-title" className="max-w-4xl text-[clamp(2.5rem,5.5vw,5.5rem)] font-black uppercase leading-[0.78] tracking-[-0.075em]">
              Know what&apos;s<span className="block text-[#b6f000]">in the can.</span>
            </h2>
            <p className="max-w-xs border-l border-[#b6f000]/50 pl-4 text-sm leading-6 text-white/55">
              Declared nutrition information for one 250 ml serving. The final approved product pack remains the reference.
            </p>
          </div>
        </header>

        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-12">
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-8">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0e0e0e] shadow-[0_24px_90px_rgba(0,0,0,0.45)] sm:rounded-[36px]">
              <div className="flex flex-col gap-4 border-b border-white/10 bg-[linear-gradient(110deg,rgba(182,240,0,0.12),transparent_48%)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-7">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#b6f000]">Nutrition information</p>
                  <p className="mt-2 text-xs text-white/45">Values per 100 ml and per 250 ml serving</p>
                </div>
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <span className="h-2 w-2 rounded-full bg-[#b6f000] shadow-[0_0_16px_#b6f000]" />
                  <span className="rounded-full border border-[#b6f000]/40 bg-[#b6f000]/[0.07] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#d7ff53]">Serving / 250 ml</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse text-left">
                  <caption className="sr-only">XTREEM PRO nutrition information per 100 ml and per 250 ml serving</caption>
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-black/20 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                      <th className="px-5 py-4 sm:px-8">Nutrient</th><th className="px-4 py-4">Per 100 ml</th><th className="px-4 py-4 text-[#b6f000]">Per serving</th>
                    </tr>
                  </thead>
                  <tbody>
                    {NUTRITION_ROWS.map(([name, per100, serving], index) => (
                      <tr key={name} className={`group transition-colors hover:bg-[#b6f000]/[0.055] ${index !== NUTRITION_ROWS.length - 1 ? "border-b border-white/[0.065]" : ""}`}>
                        <th className="px-5 py-3.5 text-sm font-medium text-white/80 sm:px-8 sm:py-4"><span className="mr-3 inline-block font-mono text-[10px] text-white/20">{String(index + 1).padStart(2, "0")}</span>{name}</th>
                        <td className="px-4 py-3.5 font-mono text-xs text-white/45 sm:py-4">{per100}</td>
                        <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#cfff45] sm:py-4">{serving}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-3">
              {LABEL_NOTES.map(([index, label, value]) => (
                <div key={label} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition-colors hover:border-[#b6f000]/35 hover:bg-[#b6f000]/[0.045] sm:p-5">
                  <span className="font-mono text-[10px] text-[#b6f000]">{index}</span>
                  <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">{label}</p>
                  <p className="mt-1 text-sm font-medium text-white/75">{value}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-xs leading-5 text-white/35">Nutrition and ingredient information must match the approved product label and laboratory documentation. Values shown here are for website communication only.</p>
          </div>

          <aside className="order-1 lg:order-2 lg:col-span-4 lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[28px] border border-[#b6f000]/25 bg-[radial-gradient(circle_at_52%_30%,rgba(182,240,0,0.2),transparent_33%),linear-gradient(145deg,#171717,#0a0a0a_70%)] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.4)] sm:rounded-[36px] sm:p-7">
              <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/45 sm:left-7 sm:top-7"><span className="h-1.5 w-1.5 rounded-full bg-[#b6f000]" /> XP / 250 ml</div>
              <div className="absolute right-5 top-5 h-4 w-4 border-r border-t border-[#b6f000] sm:right-7 sm:top-7" />
              <div className="absolute bottom-5 left-5 h-4 w-4 border-b border-l border-[#b6f000]/50 sm:bottom-7 sm:left-7" />
              <Image src="/images/xtreem-pro-can-v2.png" alt="XTREEM PRO 250 ml caffeinated beverage can" width={520} height={760} priority sizes="(max-width: 1024px) 210px, 390px" className="relative mx-auto mt-9 h-auto w-full max-w-[180px] object-contain drop-shadow-[0_28px_32px_rgba(0,0,0,0.78)] sm:mt-10 sm:max-w-[285px]" />
              <div className="relative mt-3 flex items-end justify-between gap-4 border-t border-white/10 pt-4 sm:mt-5 sm:pt-5">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b6f000]">Caffeinated beverage</p><p className="mt-1 text-xs text-white/40">Best served chilled</p></div>
                <span className="font-mono text-xs text-white/55">250 ML</span>
              </div>
            </div>
            <div className="mt-4 rounded-[24px] border border-white/10 bg-white/[0.035] p-5 sm:rounded-[28px] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Caffeine guide</p><p className="mt-2 font-mono text-2xl font-bold tracking-tight text-[#b6f000]">75 <span className="text-sm">MG</span></p></div>
                <span className="rounded-full border border-[#b6f000]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#b6f000]">Per serving</span>
              </div>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-5 text-white/60">Not recommended for children, pregnant or lactating women, or persons sensitive to caffeine. Consume not more than 500 ml per day.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
