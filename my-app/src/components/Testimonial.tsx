"use client";

import React from "react";
import Image from "next/image";

// Types
interface TestimonialItem {
  img: string;
  name: string;
  title: string;
  quote: string;
}

const brandLogos: string[] = [
  "/assets/logo1.png",
  "/assets/logo2.png",
  "/assets/logo3.png",
  "/assets/logo4.png",
  "/assets/logo5.png",
  "/assets/logo6.png",
  "/assets/logo8.png",
];

const testimonials: TestimonialItem[] = [
  {
    img: "/assets/t1.png",
    name: "Emma Roberts",
    title: "Chief Marketing Officer",
    quote:
      "This platform is a game-changer. Seamless APIs, powerful dashboards, and unmatched insights every week.",
  },
  {
    img: "/assets/t2.png",
    name: "Liam Patel",
    title: "Head of Ops",
    quote:
      "Integration was smooth and fast. Our team saves countless hours while maintaining top-tier security.",
  },
  {
    img: "/assets/t3.png",
    name: "Sophia Lee",
    title: "Product Manager",
    quote:
      "Performance and reliability exceeded expectations. Insights helped us scale faster with confidence.",
  },
  {
    img: "/assets/t4.png",
    name: "Noah Chen",
    title: "Engineering Lead",
    quote:
      "Developer experience is stellar. Documentation, tooling, and support make shipping features effortless.",
  },
  {
    img: "/assets/t5.png",
    name: "Ava Martinez",
    title: "Growth Lead",
    quote:
      "Real-time visibility into metrics transformed our decision-making. The ROI was immediate for us.",
  },
  {
    img: "/assets/t6.png",
    name: "Ethan Walker",
    title: "CTO",
    quote:
      "Rock-solid architecture and secure by default. Easily the best choice for mission-critical apps.",
  },
  {
    img: "/assets/t7.png",
    name: "Olivia Davis",
    title: "Founder",
    quote:
      "From onboarding to scale, the experience has been exceptional. Highly recommend to any growing team.",
  },
];

const Testimonial: React.FC = () => {
  const items = testimonials.concat(testimonials); // duplicate for seamless loop

  return (
    <div className="bg-black py-24 px-6 relative">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192, 192, 192, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(192, 192, 192, 0.02) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <h2
          className="text-center text-4xl md:text-5xl font-medium leading-[1.2] pb-1 md:pb-1.5 mb-12"
          style={{
            fontFamily: "Poppins, sans-serif",
            background:
              "linear-gradient(135deg, #FFFFFF 0%, #C0C0C0 50%, #FFFFFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          What our users say
        </h2>

        <div className="relative overflow-hidden max-w-7xl mx-auto">
          {/* Edge fade overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

          {/* Marquee track */}
          <div className="whitespace-nowrap">
            <div className="testimonial-track inline-flex items-stretch gap-8 px-8">
              {items.map((t, i) => (
                <div
                  key={i}
                  className="relative group w-[360px] md:w-[460px] shrink-0"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-500"></div>
                  <div
                    className="relative w-full h-full rounded-2xl p-px"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(192, 132, 252, 0.1) 100%)",
                    }}
                  >
                    <div
                      className="h-full w-full rounded-[15px] p-8 backdrop-blur-sm whitespace-normal"
                      style={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        border: "1px solid rgba(192, 192, 192, 0.1)",
                        color: "#C0C0C0",
                      }}
                    >
                      <p
                        className="text-base md:text-lg leading-relaxed md:leading-7 mb-8 font-light"
                        style={{ color: "#FFFFFF" }}
                      >
                        “{t.quote}”
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={t.img}
                            alt={t.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-full object-cover"
                            loading="lazy"
                          />
                          <div>
                            <div
                              className="text-base md:text-lg font-normal"
                              style={{ color: "#FFFFFF" }}
                            >
                              {t.name}
                            </div>
                            <div
                              className="text-sm"
                              style={{ color: "rgba(192, 192, 192, 0.8)" }}
                            >
                              {t.title}
                            </div>
                          </div>
                        </div>
                        <Image
                          src={brandLogos[i % brandLogos.length]}
                          alt="brand logo"
                          width={80}
                          height={24}
                          className="h-6 w-auto opacity-80"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Styles */}
          <style jsx>{`
            @keyframes testimonial-rtl {
              0% {
                transform: translateX(0%);
              }
              100% {
                transform: translateX(-50%);
              }
            }
            .testimonial-track {
              animation: testimonial-rtl 60s linear infinite;
            }
            .testimonial-track:hover {
              animation-play-state: paused;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
