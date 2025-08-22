"use client";

import Image from "next/image";
import logo1 from "../assets/logo1.png";
import logo2 from "../assets/logo2.png";
import logo3 from "../assets/logo3.png";
import logo4 from "../assets/logo4.png";
import logo5 from "../assets/logo5.png";
import logo6 from "../assets/logo6.png";
import logo8 from "../assets/logo8.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo8];

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
