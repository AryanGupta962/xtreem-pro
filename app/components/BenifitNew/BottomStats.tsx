import { PiLightningFill } from "react-icons/pi";
import { GiMolecule } from "react-icons/gi";
import { IoCubeSharp } from "react-icons/io5";
import { TbHexagonLetterB } from "react-icons/tb";
import { MdGpsFixed } from "react-icons/md";
import type { IconType } from "react-icons";

type BottomStat = {
  icon: IconType;
  value: string;
  label: string;
};

const BOTTOM_STATS: BottomStat[] = [
  {
    icon: PiLightningFill,
    value: "CAFFEINE",
    label: "NATURAL CAFFEINE",
  },
  {
    icon: GiMolecule,
    value: "TAURINE",
    label: "TAURINE BLEND",
  },
  {
    icon: TbHexagonLetterB,
    value: "B-VITAMINS",
    label: "VITAMIN B COMPLEX",
  },
  {
    icon: IoCubeSharp,
    value: "0g",
    label: "SUGAR",
  },
  {
    icon: MdGpsFixed,
    value: "MADE FOR",
    label: "PEAK PERFORMERS",
  },
];

export default function BottomStats() {
  return (
    <div className="max-2xl:hidden relative my-4 2xl:mt-10 z-10 mx-auto w-full max-w-[1520px] px-4 sm:px-6 lg:px-10">
      <div
        className="
          relative overflow-hidden rounded-3xl border border-white/15
          bg-black/25 px-5 py-2 backdrop-blur-2xl
          shadow-[0_0_45px_rgba(180,255,0,0.08)]
          sm:px-4 sm:py-3
        
        "
      >
        <div
          className="
            relative grid grid-cols-1 gap-y-6
            sm:grid-cols-2 sm:gap-x-6
            lg:grid-cols-5 lg:gap-0
            divide-x divide-white/40
          "
        >
          {BOTTOM_STATS.map(({ icon: Icon, value, label }, index) => {
            const numberMatch = value.match(/^([\d.]+)([a-zA-Z%]*)$/);

            return (
              <div
                key={value}
                className="relative flex items-center justify-center lg:justify-start xl:pl-3 gap-2"
              >
                {/* icon hexagon */}
                <span
                  className="
                    relative flex h-[52px] w-[52px] shrink-0 items-center
                    justify-center text-[#C8FF00]
                    before:absolute before:inset-0 before:border before:border-[#C8FF00]/70
                    before:bg-[#C8FF00]/5 before:shadow-[0_0_18px_rgba(200,255,0,0.16)]
                  "
                  style={{
                    clipPath:
                      "polygon(50% 0%, 92% 25%, 92% 75%, 50% 100%, 8% 75%, 8% 25%)",
                  }}
                >
                  <Icon className="relative z-10 text-[25px]" />
                </span>

                <div className="min-w-0">
                  <p
                    className="
                      whitespace-nowrap font-semibold uppercase
                      leading-none tracking-[0.08em] text-white
                      text-[14px]
                    "
                  >
                    {numberMatch ? (
                      <>
                        <span className="text-[#C8FF00]">{numberMatch[1]}</span>
                        <span className="text-[#C8FF00]">{numberMatch[2]}</span>
                      </>
                    ) : value === "B-VITAMINS" ? (
                      <>
                        <span className="text-[#C8FF00]">B</span>
                        <span>-VITAMINS</span>
                      </>
                    ) : (
                      value
                    )}
                  </p>

                  <p
                    className="
                      mt-1 whitespace-nowrap text-[9.5px] font-medium uppercase
                      tracking-[0.18em] text-white/55
                    "
                  >
                    {label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
