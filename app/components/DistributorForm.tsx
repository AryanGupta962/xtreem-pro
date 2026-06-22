"use client";

import React, { useState } from "react";

export default function DistributorForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        mobile: "",
        message: "",
      });
    }, 1200);
  };

  return (
    <div className="relative">
      <div
        className="
        absolute
        -inset-2 sm:-inset-4
        rounded-[24px] sm:rounded-[40px]
        bg-primary-green/10
        blur-3xl
      "
      />

      <div
        className="
        relative
        overflow-hidden
        rounded-[20px] sm:rounded-[32px]
        border
        border-white/10
        bg-[#0A0A0A]/80
        p-4 sm:p-6
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
            text-2xl sm:text-3xl
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

          {submitted ? (
            <div className="mt-6 rounded-2xl border border-primary-green/30 bg-primary-green/5 p-6 text-center">
              <h4 className="text-xl font-bold uppercase text-[#aafc1c]">Application Received!</h4>
              <p className="mt-2 text-sm text-zinc-300">
                Thank you for applying. Our global distribution team will review your application and contact you within 24–48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-[#aafc1c] underline hover:text-white"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="sr-only">Full Name</label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    className="w-full h-12 sm:h-14 rounded-xl border border-white/10 bg-white/[0.03] px-4 sm:px-5 text-sm sm:text-base text-white outline-none transition-all duration-300 focus:border-primary-green"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="sr-only">Company Name</label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    autoComplete="organization"
                    className="w-full h-12 sm:h-14 rounded-xl border border-white/10 bg-white/[0.03] px-4 sm:px-5 text-sm sm:text-base text-white outline-none transition-all duration-300 focus:border-primary-green"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="w-full h-12 sm:h-14 rounded-xl border border-white/10 bg-white/[0.03] px-4 sm:px-5 text-sm sm:text-base text-white outline-none transition-all duration-300 focus:border-primary-green"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    autoComplete="tel"
                    className="w-full h-12 sm:h-14 rounded-xl border border-white/10 bg-white/[0.03] px-4 sm:px-5 text-sm sm:text-base text-white outline-none transition-all duration-300 focus:border-primary-green"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Tell us about your distribution network</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell us about your distribution network..."
                  value={formData.message}
                  onChange={handleChange}
                  className="resize-none w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 text-sm sm:text-base text-white outline-none transition-all duration-300 focus:border-primary-green"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
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
                disabled:opacity-70
                disabled:cursor-not-allowed
              "
              >
                <span className="relative z-10">
                  {loading ? "Submitting..." : "Apply Now"}
                </span>

                {!loading && (
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
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
