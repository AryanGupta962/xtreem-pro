interface BenefitCardProps {
  title: string;
  description: string;
}

export default function BenefitCard({ title, description }: BenefitCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/50 px-8 py-5">
      {/* Left Green Accent */}
      <div className="absolute left-0 top-0 h-full w-[4px] bg-[#BCE040]" />

      {/* Subtle Glow */}
      <div className="absolute left-0 top-0 h-full w-24 bg-[#BCE040]/5 blur-xl" />

      <div className="relative">
        <h3 className="text-[26px] font-bold uppercase tracking-tight text-white">
          {title}
        </h3>

        <p className="mt-2 max-w-[90%] leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>
    </div>
  );
}
