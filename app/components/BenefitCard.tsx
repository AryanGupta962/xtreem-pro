import ElectricBorder from "./ElectricBorder";

interface BenefitCardProps {
  title: string;
  description: string;
}

export default function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <ElectricBorder
      color="#BCE040"
      speed={1.2}
      chaos={0.08}
      borderRadius={20}
      className="w-full"
    >
      <div className="relative overflow-hidden rounded-[20px] bg-black/70 backdrop-blur-md px-4 sm:pl-10 py-4">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-green/10 via-transparent to-primary-green/5" />

        {/* Extra Green Glow */}
        <div className="absolute -left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-primary-green/20 blur-3xl" />

        <div className="relative z-10">
          <h3 className="text-lg sm:text-[22px] md:text-[26px] font-black uppercase tracking-tight text-white">
            {title}
          </h3>

          <p className="max-w-[90%] text-zinc-300 leading-relaxed text-sm sm:text-base">
            {description}
          </p>
        </div>
      </div>
    </ElectricBorder>
  );
}
