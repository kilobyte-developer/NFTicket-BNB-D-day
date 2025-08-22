"use client";

import React, { useState, useEffect, useRef, ReactElement } from "react";
import { Shield, Ban, Eye, Star, Lock, DollarSign } from "lucide-react";

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
  direction: "left" | "right" | "top" | "bottom";
}

interface CardProps {
  title: string;
  icon: ReactElement;
  description: string;
  direction: "left" | "right" | "top" | "bottom";
  isVisible: boolean;
  index: number;
}

const Benefits: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const benefits: Benefit[] = [
    {
      icon: Shield,
      title: "Authenticity and Fraud Prevention",
      description:
        "Blockchain-verified tickets ensure authenticity and prevent duplication or counterfeiting through transparent ownership records.",
      direction: "left",
    },
    {
      icon: Ban,
      title: "Elimination of Scalping",
      description:
        "Smart contracts enforce resale rules and price caps, preventing scalpers from inflating ticket prices.",
      direction: "top",
    },
    {
      icon: Eye,
      title: "Transparency and Trust",
      description:
        "Immutable blockchain ledger ensures transparent transactions, building trust among buyers, sellers, and organizers.",
      direction: "right",
    },
    {
      icon: Star,
      title: "Enhanced Fan Experience",
      description:
        "NFT tickets include exclusive perks, VIP access, and digital collectibles that enhance value.",
      direction: "right",
    },
    {
      icon: Lock,
      title: "Secure Transactions",
      description:
        "Blockchain eliminates intermediaries, reducing fees while ensuring secure, direct transactions with cryptographic protection.",
      direction: "bottom",
    },
    {
      icon: DollarSign,
      title: "Revenue Sharing",
      description:
        "Organizers set resale rules and earn royalties on secondary sales while ensuring fair pricing.",
      direction: "left",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasAnimated(true);
        } else if (hasAnimated) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div
      ref={sectionRef}
      className="py-24 px-6 relative overflow-hidden bg-[#080510]"
    >
      {/* Backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07030f] via-[#080510] to-[#090313] opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7c4dff] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#64e7ff] opacity-5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1200 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-medium bg-gradient-to-r from-[#7c4dff] to-[#8a7dff] bg-clip-text text-transparent">
            Our Benefits
          </h2>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-white/70">
            Discover the robust security features and unparalleled benefits that
            make our platform the trusted choice for digital asset management.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              title={benefit.title}
              icon={<benefit.icon className="h-8 w-8 text-white" />}
              description={benefit.description}
              direction={benefit.direction}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Global CSS */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  title,
  icon,
  description,
  direction,
  isVisible,
  index,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getInitialTransform = (): string => {
    switch (direction) {
      case "left":
        return "translateX(-120px) translateY(20px)";
      case "right":
        return "translateX(120px) translateY(20px)";
      case "top":
        return "translateY(-120px) translateX(20px)";
      case "bottom":
        return "translateY(120px) translateX(20px)";
      default:
        return "translateY(80px)";
    }
  };

  return (
    <div
      className={`relative group h-full transition-all duration-1200 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transform: isVisible ? "translate(0, 0)" : getInitialTransform(),
        transitionDelay: isVisible
          ? `${index * 150}ms`
          : `${(5 - index) * 100}ms`,
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#7c4dff]/20 to-[#8a7dff]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-all duration-700"></div>

      {/* Card container */}
      <div className="relative h-full min-h-[280px] perspective-1000">
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="relative bg-gradient-to-br from-[#0a0718]/70 via-[#0d0920]/60 to-[#100b28]/70 p-8 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center h-full backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-6 bg-gradient-to-br from-[#7c4dff]/25 to-[#8a7dff]/25 p-4 rounded-full border border-[#7c4dff]/20 backdrop-blur-md shadow-lg">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold text-white/95 leading-tight">
                  {title}
                </h3>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="relative bg-gradient-to-br from-[#0a0718]/80 via-[#0d0920]/70 to-[#100b28]/80 p-8 rounded-2xl border border-white/8 flex flex-col items-center justify-center text-center h-full backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="relative z-10 flex flex-col items-center">
                <div className="mb-4 bg-gradient-to-br from-[#7c4dff]/30 to-[#8a7dff]/30 p-3 rounded-full border border-[#7c4dff]/25 backdrop-blur-md shadow-lg">
                  {React.cloneElement(icon, { className: "h-6 w-6 text-white" })}
                </div>
                <h3 className="text-lg font-semibold mb-4 text-white/95 leading-tight">
                  {title}
                </h3>
                <p className="text-sm font-light text-white/85 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
