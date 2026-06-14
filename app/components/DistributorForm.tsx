"use client";

export default function DistributorForm() {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/40 p-8 backdrop-blur-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#BCE040]/5 via-transparent to-[#BCE040]/5" />

      <div className="relative">
        <h3 className="mb-10 text-3xl font-black uppercase italic text-white">
          Distributor Application
        </h3>

        <form className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-500">
                Full Name
              </label>

              <input
                type="text"
                placeholder="John Doe"
                className="h-14 w-full border border-white/5 bg-black px-4 text-white outline-none transition-all duration-300 focus:border-[#BCE040]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-500">
                Company Name
              </label>

              <input
                type="text"
                placeholder="A1 Logistics"
                className="h-14 w-full border border-white/5 bg-black px-4 text-white outline-none transition-all duration-300 focus:border-[#BCE040]"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-500">
                Email Address
              </label>

              <input
                type="email"
                placeholder="partner@example.com"
                className="h-14 w-full border border-white/5 bg-black px-4 text-white outline-none transition-all duration-300 focus:border-[#BCE040]"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-500">
                Mobile Number
              </label>

              <input
                type="tel"
                placeholder="+91 9876543210"
                className="h-14 w-full border border-white/5 bg-black px-4 text-white outline-none transition-all duration-300 focus:border-[#BCE040]"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-zinc-500">
              Distribution Experience
            </label>

            <textarea
              rows={5}
              placeholder="Briefly describe your distribution network..."
              className="w-full border border-white/5 bg-black p-4 text-white outline-none transition-all duration-300 focus:border-[#BCE040]"
            />
          </div>

          <button
            type="submit"
            className="group relative w-full overflow-hidden bg-[#BCE040] py-5 font-black uppercase tracking-wider text-black"
          >
            <span className="relative z-10">Apply For Distributorship</span>

            <div className="absolute inset-0 bg-white scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </button>
        </form>
      </div>
    </div>
  );
}
