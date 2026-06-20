"use client";

export default function DistributorForm() {
  return (
    <div className="relative">
      <div
        className="
        absolute
        -inset-4
        rounded-[40px]
        bg-primary-green/10
        blur-3xl
      "
      />

      <div
        className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#0A0A0A]/80
        p-6
        backdrop-blur-2xl
      "
      >
        <div
          className="
          absolute
          inset-0
          bg-gradient-to-br
          from-primary-green/5
          via-transparent
          to-transparent
        "
        />

        <div className="relative">
          <h3
            className="
            text-3xl
            font-black
            uppercase
            leading-none
            text-white
          "
          >
            Join The
            <span className="block text-primary-green">XTREEM Network</span>
          </h3>

          <p className="mt-3 text-sm text-zinc-400">
            Become an official distribution partner and grow with one of the
            fastest-growing energy drink brands.
          </p>

          <form className="mt-5 space-y-3">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Full Name"
                className="h-14 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 focus:border-primary-green"
              />

              <input
                placeholder="Company Name"
                className="h-14 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 focus:border-primary-green"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="Email Address"
                className="h-14 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 focus:border-primary-green"
              />

              <input
                placeholder="Mobile Number"
                className="h-14 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-white outline-none transition-all duration-300 focus:border-primary-green"
              />
            </div>

            <textarea
              rows={5}
              placeholder="Tell us about your distribution network..."
              className="resize-none w-full rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white outline-none transition-all duration-300 focus:border-primary-green"
            />

            <button
              className="
              group
              relative
              h-12
              w-full
              overflow-hidden
              rounded-xl
              bg-primary-green
              font-black
              uppercase
              
              text-black
              transition-all
              duration-300
              hover:scale-[1.02]
            "
            >
              <span className="relative z-10">Apply Now</span>

              <div
                className="
                absolute
                left-[-100%]
                top-0
                h-full
                w-[40%]
                skew-x-12
                bg-white/40
                transition-all
                duration-700
                group-hover:left-[140%]
              "
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
