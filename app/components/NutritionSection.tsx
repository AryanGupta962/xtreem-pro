const NUTRITION_ROWS = [
  {
    nutrient: "Energy (kcal)",
    per100ml: "48.63",
    perServing: "121.58",
    rda: "6.08",
  },
  {
    nutrient: "Energy (kJ)",
    per100ml: "203.47",
    perServing: "508.69",
    rda: "6.08",
  },
  {
    nutrient: "Carbohydrate (g)",
    per100ml: "11.85",
    perServing: "29.63",
    rda: "-",
  },
  {
    nutrient: "Total Sugars (g)",
    per100ml: "11.67",
    perServing: "29.18",
    rda: "-",
  },
  {
    nutrient: "Added Sugars (g)",
    per100ml: "11.46",
    perServing: "28.65",
    rda: "57.30",
  },
  {
    nutrient: "Protein (g)",
    per100ml: "0",
    perServing: "0",
    rda: "-",
  },
  {
    nutrient: "Total Fat (g)",
    per100ml: "0",
    perServing: "0",
    rda: "0.00",
  },
  {
    nutrient: "Sodium (mg)",
    per100ml: "13.34",
    perServing: "33.35",
    rda: "1.67",
  },
  {
    nutrient: "Vitamin B2 (mg)",
    per100ml: "1.95",
    perServing: "4.88",
    rda: "24.38",
  },
  {
    nutrient: "Vitamin B3 (mg)",
    per100ml: "2.35",
    perServing: "5.88",
    rda: "29.38",
  },
  {
    nutrient: "Vitamin B6 (mg)",
    per100ml: "0.37",
    perServing: "0.93",
    rda: "46.25",
  },
  {
    nutrient: "Vitamin B12 (mcg)",
    per100ml: "0.16",
    perServing: "0.40",
    rda: "40.00",
  },
  {
    nutrient: "Caffeine (mg)",
    per100ml: "30.00",
    perServing: "75.00",
    rda: "-",
  },
];

const INFO_POINTS = [
  "Per serve = 250ml. One serving in pack.",
  "% RDA calculated on the basis of a 2000 kcal energy diet.",
  "High caffeine: 75mg per serving (250ml).",
  "Not recommended for children, pregnant or lactating women, or persons sensitive to caffeine. Consume not more than 500ml per day.",
];

const INGREDIENTS =
  "Water, sugar, acidity regulator (INS 330), taurine, natural caffeine, flavour (N), class II preservative (INS 211), carbon dioxide (INS 290), vitamin B2, niacin, vitamin B6 and vitamin B12.";

export default function NutritionSection() {
  return (
    <section
      id="nutrition"
      className="relative overflow-hidden bg-[#060606] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(170,252,28,0.1),transparent_30%),radial-gradient(circle_at_85%_82%,rgba(170,252,28,0.08),transparent_26%)]" />

      <div className="relative mx-auto flex w-full max-w-[1480px] flex-col gap-10">
        <div className="flex flex-col gap-4 lg:max-w-[860px]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-green">
            Nutrition
          </span>
          <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
            Complete energy
            <span className="block text-primary-green">breakdown</span>
          </h2>
          <p className="max-w-3xl text-base leading-7 text-white/68 sm:text-lg">
            Full label information for the caffeinated beverage, including per
            100ml values, per serving values, and the declared percentage RDA
            per serving.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
          <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07)_0%,rgba(255,255,255,0.02)_100%)] backdrop-blur-xl">
            <div className="border-b border-white/10 px-5 py-5 sm:px-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary-green">
                Nutrition Information
              </p>
              <p className="mt-2 text-sm text-white/60">
                Caffeinated beverage label values
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.03]">
                    <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:px-8">
                      Nutrients
                    </th>
                    <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      Per 100ml
                    </th>
                    <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
                      Per serving
                      <span className="block normal-case tracking-normal text-white/40">
                        250ml
                      </span>
                    </th>
                    <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 sm:pr-8">
                      % RDA
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {NUTRITION_ROWS.map((row, index) => (
                    <tr
                      key={row.nutrient}
                      className={index === NUTRITION_ROWS.length - 1 ? "" : "border-b border-white/8"}
                    >
                      <td className="px-5 py-4 text-sm font-medium text-white/88 sm:px-8">
                        {row.nutrient}
                      </td>
                      <td className="px-5 py-4 text-sm text-white/72">{row.per100ml}</td>
                      <td className="px-5 py-4 text-sm text-white/72">{row.perServing}</td>
                      <td className="px-5 py-4 text-sm text-white/72 sm:pr-8">{row.rda}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-[32px] border border-white/10 bg-black/30 p-6 backdrop-blur-2xl sm:p-8">
            <div className="rounded-[24px] border border-primary-green/20 bg-[radial-gradient(circle_at_top,rgba(170,252,28,0.16),transparent_42%),rgba(255,255,255,0.02)] p-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-primary-green">
                Product Notes
              </p>
              <div className="mt-6 space-y-4">
                {INFO_POINTS.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4"
                  >
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-primary-green shadow-[0_0_14px_rgba(170,252,28,0.8)]" />
                    <p className="text-sm leading-6 text-white/72">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/8 bg-black/25 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/48">
                  Ingredients
                </p>
                <p className="mt-3 text-sm leading-6 text-white/68">
                  {INGREDIENTS}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
