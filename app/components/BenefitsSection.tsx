// "use client";

// import { useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useGSAP } from "@gsap/react";

// gsap.registerPlugin(ScrollTrigger);

// const benefits = [
//   {
//     title: "VITAMINS",
//     video: "/videos/vitamins.webm",
//   },
//   {
//     title: "TAURINE",
//     video: "/videos/taurine.webm",
//   },
//   {
//     title: "CAFFEINE",
//     video: "/videos/caffeine.webm",
//   },
//   {
//     title: "GINSENG",
//     video: "/videos/ginseng.webm",
//   },
// ];

// export default function BenefitsSection() {
//   const sectionRef = useRef<HTMLDivElement>(null);

//   useGSAP(
//     () => {
//       ScrollTrigger.create({
//   trigger: ".benefits-heading",
//   start: "top 80%",

//   onEnter: () => {
//     gsap.fromTo(
//       ".benefit-letter",
//       {
//         y: 150,
//         opacity: 0,
//         filter: "blur(10px)",
//       },
//       {
//         y: 0,
//         opacity: 1,
//         filter: "blur(0px)",
//         duration: 1.2,
//         stagger: 0.05,
//         ease: "expo.out",
//       }
//     );
//   },

//   onEnterBack: () => {
//     gsap.fromTo(
//       ".benefit-letter",
//       {
//         y: 150,
//         opacity: 0,
//         filter: "blur(10px)",
//       },
//       {
//         y: 0,
//         opacity: 1,
//         filter: "blur(0px)",
//         duration: 1.2,
//         stagger: 0.05,
//         ease: "expo.out",
//       }
//     );
//   },
// });

//       gsap.from(".benefit-card", {
//         y: 120,
//         opacity: 0,
//         duration: 1,
//         stagger: 0.15,
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: ".benefits-grid",
//           start: "top 80%",
//         },
//       });

//       gsap.from(".benefits-description", {
//         opacity: 0,
//         y: 60,
//         duration: 1,
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: ".benefits-description",
//           start: "top 85%",
//         },
//       });
//     },
//     { scope: sectionRef },
//   );

//   return (
//     <section
//       ref={sectionRef}
//       className="relative overflow-hidden bg-black py-24 md:py-32"
//     >
//       {/* Background Glow */}
//       <div className="absolute left-0 top-0 h-[500px] w-[500px] bg-[#BCE040]/10 blur-[180px]" />
//       <div className="absolute right-0 bottom-0 h-[500px] w-[500px] bg-[#BCE040]/10 blur-[180px]" />

//       <div className="relative z-10 container mx-auto px-6">
//         {/* Heading */}
//         <div className="benefits-heading text-center mb-20 overflow-hidden  drop-shadow-[0_0_20px_rgba(188,224,64,0.8)]">
//           <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight">
//             {"BENEFITS".split("").map((letter, index) => (
//               <span
//                 key={index}
//                 className="
//           benefit-letter
//           inline-block
//           text-[#BCE040]

//           will-change-transform
//         "
//               >
//                 {letter}
//               </span>
//             ))}
//           </h2>
//         </div>

//         {/* Benefits Grid */}
//         <div className="benefits-grid grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
//           {benefits.map((item) => (
//             <div
//               key={item.title}
//               className="benefit-card group flex flex-col items-center"
//             >
//               {/* Video Container */}
//               <div className="relative w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden shadow-[0_0_30px_rgba(188,224,64,0.15)] transition-all duration-500 group-hover:shadow-[0_0_50px_rgba(188, 224, 64,0.5)]">
//                 <video
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//                 >
//                   <source src={item.video} type="video/webm" />
//                 </video>

//                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
//               </div>

//               {/* Label */}
//               <div className="mt-8">
//                 <LiquidButton text={item.title} />
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Description */}
//         <div className="benefits-description max-w-4xl mx-auto mt-24 text-center">
//           <p className="text-zinc-300 text-base md:text-xl uppercase leading-relaxed tracking-wider">
//             Powered by essential vitamins, taurine, caffeine, and ginseng,
//             Extreem Pro delivers the energy, focus, and endurance you need to
//             push beyond limits and stay at your peak performance.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

// function LiquidButton({ text }: { text: string }) {
//   const [pos, setPos] = useState({ x: 0, y: 0 });

//   const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
//     const rect = e.currentTarget.getBoundingClientRect();

//     setPos({
//       x: e.clientX - rect.left,
//       y: e.clientY - rect.top,
//     });
//   };

//   return (
//     <button
//       onMouseMove={handleMove}
//       className="group relative overflow-hidden rounded-full border border-[#BCE040] px-10 py-3.5"
//     >
//       <span className="relative z-20 font-bold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-black">
//         {text}
//       </span>

//       <span
//         className="absolute h-4 w-4 rounded-full bg-[#BCE040] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:h-[350px] group-hover:w-[350px]"
//         style={{
//           left: pos.x,
//           top: pos.y,
//           transform: "translate(-50%, -50%)",
//         }}
//       />
//     </button>
//   );
// }

"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    title: "VITAMINS",
    desc: "Essential vitamins that support recovery and energy metabolism.",
  },
  {
    title: "TAURINE",
    desc: "Enhances endurance and keeps performance levels elevated.",
  },
  {
    title: "CAFFEINE",
    desc: "Provides instant focus and explosive energy.",
  },
  {
    title: "GINSENG",
    desc: "Delivers sustained performance throughout the day.",
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".benefits-title",
        start: "top 80%",

        onEnter: () => {
          gsap.to(".benefit-letter", {
            keyframes: [{ y: -15 }, { y: 10 }, { y: -8 }, { y: 0 }],
            duration: 1,
            ease: "sine.inOut",
            stagger: 0.08,
          });

          gsap.fromTo(
            ".benefits-title",
            {
              textShadow: "0 0 0px rgba(188,224,64,0)",
            },
            {
              textShadow:
                "0 0 20px rgba(188,224,64,.2), 0 0 60px rgba(188,224,64,.2)",
              duration: 0.5,
              repeat: 1,
            },
          );
        },
      });

      gsap.set(".benefit-slide", {
        opacity: 0,
        y: 80,
      });

      gsap.set(".progress", {
        height: "0%",
      });

      gsap.to(".energy-ring", {
        rotate: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".can", {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=5000",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(
        ".progress",
        {
          height: "100%",
          ease: "none",
          duration: 4,
        },
        0,
      );

      benefits.forEach((_, index) => {
        tl.to(`.slide-${index}`, {
          opacity: 1,
          y: 0,
          duration: 1,
        });

        tl.to(".can", {
          scale: 1 + index * 0.08,
          rotate: index % 2 === 0 ? 6 : -6,
          duration: 1,
        });

        tl.to(`.slide-${index}`, {
          opacity: 0,
          y: -80,
          duration: 1,
        });
      });

      tl.to(".can", {
        scale: 1.4,
        rotate: 0,
        duration: 2,
      });

      tl.to(".energy-ring", {
        scale: 3,
        opacity: 0,
        duration: 2,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BCE040]/10 blur-[160px]" />
      </div>

      {/* Heading */}
      <div className="absolute top-25 left-1/2 z-30 -translate-x-1/2">
        <h2
          className="
    benefits-title
    text-5xl
    md:text-7xl
    lg:text-8xl
    font-black
    uppercase
    tracking-tight
    text-[#BCE040]
  "
        >
          {"BENEFITS".split("").map((letter, index) => (
            <span key={index} className="benefit-letter inline-block">
              {letter}
            </span>
          ))}
        </h2>
      </div>

      {/* Progress */}
      <div className="absolute left-8 top-1/2 z-30 h-64 -translate-y-1/2">
        <div className="relative h-full w-[2px] bg-white/10">
          <div className="progress absolute bottom-0 w-full bg-[#BCE040]" />
        </div>
      </div>

      {/* Center Product */}
      <div className="absolute top-40 inset-0 flex items-center justify-center">
        <div
          className="
          energy-ring
          absolute
          h-[500px]
          w-[500px]
          rounded-full
          opacity-60
        "
          style={{
            background: "conic-gradient(from 0deg,#BCE040,transparent,#BCE040)",
            filter: "blur(30px)",
          }}
        />

        <Image
          src="/images/can.png"
          alt="XTREEM Pro XP"
          width={600}
          height={600}
          className="
          can
          relative
          z-20
          h-[400px]
          w-auto
          object-contain
          drop-shadow-[0_0_80px_rgba(188,224,64,0.35)]
        "
        />
      </div>

      {/* Benefit Slides */}
      {benefits.map((benefit, index) => (
        <BenefitSlide
          key={benefit.title}
          index={index}
          title={benefit.title}
          desc={benefit.desc}
        />
      ))}
    </section>
  );
}

interface BenefitSlideProps {
  title: string;
  desc: string;
  index: number;
}

// function BenefitSlide({ title, desc, index }: BenefitSlideProps) {
//   const isLeft = index % 2 === 0;

//   return (
//     <div className={`benefit-slide slide-${index} absolute inset-0`}>
//       <div
//         className={`
//           absolute
//           top-1/2
//           -translate-y-1/2
//           max-w-[420px]
//           ${isLeft ? "left-16 lg:left-24" : "right-16 lg:right-24"}
//         `}
//       >
//         <div className="mb-6 h-[3px] w-24 bg-[#BCE040]" />

//         <div className="mb-4 text-6xl font-extrabold uppercase text-[#BCE040]">
//           0{index + 1}
//         </div>

//         <h3
//           className="
//           text-5xl
//           lg:text-7xl
//           font-black
//           uppercase
//           leading-none
//           text-white
//           "
//         >
//           {title}
//         </h3>

//         <p
//           className="
//           mt-6
//           text-lg
//           leading-relaxed
//           text-zinc-300
//           "
//         >
//           {desc}
//         </p>
//       </div>
//     </div>
//   );
// }

function BenefitSlide({ title, desc, index }: BenefitSlideProps) {
  return (
    <div
      className={`
        benefit-slide
        slide-${index}
        absolute
        inset-0
        flex
        items-center
        justify-between
        px-12
        lg:px-24
      `}
    >
      {/* Left */}
      <div className="max-w-md">
        <div className="mb-4 h-[2px] w-24 bg-[#BCE040]" />

        <h3
          className="
          text-5xl
          lg:text-7xl
          font-black
          uppercase
          text-white
          leading-none
          "
        >
          {title}
        </h3>

        <p
          className="
          mt-6
          text-lg
          lg:text-xl
          text-zinc-300
          leading-relaxed
          "
        >
          {desc}
        </p>
      </div>

      {/* Right Stat */}
      <div className="hidden lg:block text-right">
        <div className="text-8xl font-black text-[#BCE040]">0{index + 1}</div>

        <div className="mt-2 uppercase tracking-[0.3em] text-zinc-500">
          Ingredient
        </div>
      </div>
    </div>
  );
}
