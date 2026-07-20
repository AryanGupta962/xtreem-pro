const ABOUT_PARAGRAPHS = [
  'XTREEM PRO is a carbonated caffeinated beverage crafted with natural caffeine, taurine, and B vitamins. Designed with a bold flavour profile, it is best served chilled and consumed responsibly as per the advisory mentioned on the pack.',
  'XTREEM PRO is a beverage brand by I BOOSTT Food & Beverages Pvt. Ltd., created for consumers who prefer bold, modern, and refreshing drink experiences.',
  'Our focus is to offer a carefully crafted carbonated caffeinated beverage with natural caffeine, taurine, and B vitamins while maintaining responsible product communication and transparent labelling.',
  'We believe in building products with a strong identity, clear information, and responsible consumption guidance. XTREEM PRO is best served chilled and should be consumed according to the advisory mentioned on the pack.',
];

const ADVISORY =
  'Contains caffeine. Not recommended for children, pregnant or lactating women, or persons sensitive to caffeine. Consume not more than 500 ml per day.';

const ADDRESS =
  'Plot No. 75 B, Ground Floor, Block WZ, Todapur, Inderpuri, New Delhi, Central Delhi - 110012, Delhi';

const CONTACT_NUMBER = '8796733944';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-black px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-10"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(170,252,28,0.05)_0%,transparent_18%,transparent_82%,rgba(170,252,28,0.06)_100%)]" />

      <div className="relative mx-auto grid w-full max-w-[1480px] gap-8 xl:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)]">
        <div className="rounded-[34px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)] p-6 backdrop-blur-2xl sm:p-8">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-primary-green">
            About XTREEM PRO
          </span>

          <h2 className="mt-4 text-[clamp(2.4rem,5vw,4.4rem)] font-black uppercase leading-[0.92] tracking-[-0.05em]">
            Built on bold
            <span className="block text-primary-green">brand identity</span>
          </h2>

          <div className="mt-8 space-y-4">
            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                Created By
              </p>

              <p className="mt-2 text-lg font-black uppercase tracking-[-0.03em] text-white sm:text-xl">
                I BOOSTT Food &amp; Beverages Pvt. Ltd.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/8 bg-white/[0.03] px-5 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                Contact Information
              </p>

              <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-green">
                    Address
                  </p>

                  <address className="mt-2 text-sm not-italic leading-6 text-white/75 sm:text-base">
                    {ADDRESS}
                  </address>
                </div>

                <div className="min-w-0 sm:border-l sm:border-white/10 sm:pl-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-green">
                    Contact
                  </p>

                  <a
                    href={`tel:${CONTACT_NUMBER}`}
                    className="mt-2 inline-block break-all text-base font-bold text-white transition-colors hover:text-primary-green sm:whitespace-nowrap sm:text-lg"
                  >
                    {CONTACT_NUMBER}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-primary-green/22 bg-primary-green/[0.06] px-5 py-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-primary-green">
                Responsible Advisory
              </p>

              <p className="mt-3 text-sm leading-6 text-white/78 sm:text-base">
                {ADVISORY}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[34px] border border-white/10 bg-[#090909] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.45)] sm:p-8">
          <div className="grid gap-5">
            {ABOUT_PARAGRAPHS.map((paragraph) => (
              <article
                key={paragraph}
                className="rounded-[26px] border border-white/8 bg-white/[0.03] px-5 py-5"
              >
                <p className="text-sm leading-7 text-white/72 sm:text-base">
                  {paragraph}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}