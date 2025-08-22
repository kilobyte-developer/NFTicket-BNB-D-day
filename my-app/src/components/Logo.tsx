"use client";

import Image from "next/image";

const logos: string[] = [
  "/assets/logo1.png",
  "/assets/logo2.png",
  "/assets/logo3.png",
  "/assets/logo4.png",
  "/assets/logo5.png",
  "/assets/logo6.png",
  "/assets/logo8.png",
];

const Logo: React.FC = () => {
  return (
    <div className="bg-black py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-center text-white/80 text-sm sm:text-xs tracking-widest uppercase mb-6">
          Trusted by Industry Leaders
        </h3>
      </div>

      <div className="relative overflow-hidden max-w-6xl mx-auto">
        {/* Edge fade overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Scrolling track - duplicate content for seamless loop */}
        <div className="whitespace-nowrap">
          <div className="marquee-track inline-flex items-center gap-16 py-12 px-8">
            {logos.concat(logos).map((src, idx) => (
              <Image
                key={idx}
                src={src}
                width={300}
                height={300}
                alt={`partner-logo-${idx % logos.length}`}
                className="h-10 sm:h-12 md:h-14 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Component-scoped styles for marquee */}
      <style jsx>{`
        @keyframes marquee-rtl {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee-track {
          animation: marquee-rtl 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Logo;
