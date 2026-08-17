const GUIDELINES = [
  {
    number: "01",
    title: "Product category",
    body: "Classify the product correctly as a caffeinated beverage. For carbonated caffeinated beverages, verify total caffeine against the applicable 145-300 mg per litre range and confirm all permitted ingredients.",
  },
  {
    number: "02",
    title: "Caffeine declaration",
    body: "Declare the actual caffeine quantity as mg per serving size. If caffeine is added, the ingredient list must identify it and the pack must carry the applicable caffeine declaration.",
  },
  {
    number: "03",
    title: "Mandatory caution",
    body: "Display prominently: Not recommended for children, pregnant or lactating women, and persons sensitive to caffeine. Consume not more than 500 ml per day.",
  },
  {
    number: "04",
    title: "Nutrition panel",
    body: "Show the approved nutrition information in the required units, including serving size and number of servings. Website values must match the final label and laboratory records.",
  },
  {
    number: "05",
    title: "Ingredients and additives",
    body: "List ingredients in the required order. Use permitted additive names and INS numbers where applicable, and declare allergens or other mandatory ingredient information relevant to the formulation.",
  },
  {
    number: "06",
    title: "Pack declarations",
    body: "The final pack must include the applicable product name, net quantity, batch or lot number, date marking, manufacturer or marketer details, FSSAI logo and licence number, and required package declarations.",
  },
  {
    number: "07",
    title: "Responsible communication",
    body: "Do not claim that the beverage improves health, focus, stamina, performance or recovery unless the claim is specifically permitted and substantiated under the applicable FSSAI claims requirements.",
  },
  {
    number: "08",
    title: "Final approval",
    body: "Before publishing or selling, verify the formulation, caffeine value, nutrition panel, ingredient order, packaging artwork and every advertising claim with the responsible regulatory and legal team.",
  },
];

export default function FssaiGuidelines() {
  return (
    <section
      id="fssai-guidelines"
      aria-labelledby="fssai-title"
      className="relative overflow-hidden bg-[#080808] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(170,252,28,0.1),transparent_30%),linear-gradient(180deg,#080808,#050505)]" />

      <div className="relative mx-auto w-full max-w-[1480px]">
        <header className="max-w-4xl">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-green">
            Caffeinated beverage / compliance
          </span>
          <h2
            id="fssai-title"
            className="mt-4 text-[clamp(2.2rem,5vw,4.8rem)] font-black uppercase leading-[0.88] tracking-[-0.05em]"
          >
            FSSAI
            <span className="block text-primary-green">essentials</span>
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-white/65 sm:text-lg sm:leading-8">
            The key label, warning and communication checks relevant to XTREEM
            PRO as a caffeinated beverage in India.
          </p>
        </header>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {GUIDELINES.map((guideline) => (
            <article
              key={guideline.number}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-colors hover:border-primary-green/45 sm:rounded-3xl sm:p-6"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs tracking-[0.2em] text-primary-green">
                  {guideline.number}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-primary-green/60 to-transparent" />
              </div>
              <h3 className="mt-8 text-lg font-black uppercase leading-tight tracking-[-0.02em] sm:text-xl">
                {guideline.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {guideline.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-primary-green/35 bg-primary-green/[0.08] p-5 text-sm leading-6 text-white/75 sm:rounded-3xl sm:p-7 sm:text-base sm:leading-7">
          <strong className="text-primary-green">Important:</strong> This is
          an informational website summary, not an FSSAI certificate. Current
          regulations, product classification, approved formulation, label
          artwork and all claims must be reviewed before launch.
        </div>

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs uppercase tracking-[0.14em] text-white/45">
          <a
            href="https://www.fssai.gov.in/upload/uploadfiles/files/Chapter%202_10_BEVERAGES_Other%20than%20Dairy%20and%20Fruits%20Vegetables%20based.pdf"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary-green"
          >
            FSSAI beverage standard ↗
          </a>
          <a
            href="https://fssai.gov.in/cms/Amendment-FSS-Labelling-Display.php"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary-green"
          >
            Labelling amendments ↗
          </a>
          <a
            href="https://fssai.gov.in/cms/Amendment-FSS-Advertising-Claims.php"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-primary-green"
          >
            Advertising and claims ↗
          </a>
        </div>
      </div>
    </section>
  );
}
