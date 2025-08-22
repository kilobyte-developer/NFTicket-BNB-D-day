"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Insight() {
  const [isVisible, setIsVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          setTimeout(() => setCardsVisible([true, false, false]), 200);
          setTimeout(() => setCardsVisible([true, true, false]), 400);
          setTimeout(() => setCardsVisible([true, true, true]), 600);
        } else {
          setIsVisible(false);
          setCardsVisible([false, false, false]);
        }
      },
      { threshold: 0.3, rootMargin: "-50px 0px" }
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current && sectionRef.current) {
        observerRef.current.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen py-24 px-6 relative overflow-hidden bg-[#080510]"
    >
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07030f] via-[#080510] to-[#090313] opacity-95" />

      {/* Texture overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-10" />

      {/* Glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7c4dff] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#64e7ff] opacity-5 rounded-full blur-3xl" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 transition-all duration-1000 ease-out text-white ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
          }`}
        >
          Stay Update with <br />
          Latest in Web3
        </h1>
      </div>

      {/* Blog Cards */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div
            className={`bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-700 group ${
              cardsVisible[0]
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="h-64 relative overflow-hidden">
              <Image
                src="/assets/i1.webp"
                alt="Privacy Protection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-4 group-hover:text-blue-400 transition-colors duration-300 text-white">
                Secury&apos;s Vision for the Future of Privacy Protection
              </h3>
              <div className="text-sm text-gray-500 mb-4">27 Feb, 2024</div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Reduce costs, scale effortlessly, and make your business come
                alive.
              </p>
              <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300">
                <span>Read more</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={`bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-700 group ${
              cardsVisible[1]
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="h-64 relative overflow-hidden">
              <Image
                src="/assets/i2.webp"
                alt="AI Scammers"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-4 group-hover:text-blue-400 transition-colors duration-300 text-white">
                Outsmarting Online Scammers with AI
              </h3>
              <div className="text-sm text-gray-500 mb-4">27 Feb, 2024</div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Reduce costs, scale effortlessly, and make your business come
                alive.
              </p>
              <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300">
                <span>Read more</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className={`bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-700 group ${
              cardsVisible[2]
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-10"
            }`}
          >
            <div className="h-64 relative overflow-hidden">
              <Image
                src="/assets/i3.webp"
                alt="Blockchain Technology"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-medium mb-4 group-hover:text-blue-400 transition-colors duration-300 text-white">
                Power and Potential of Blockchain Technology
              </h3>
              <div className="text-sm text-gray-500 mb-4">27 Feb, 2024</div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Reduce costs, scale effortlessly, and make your business come
                alive.
              </p>
              <button className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-300">
                <span>Read more</span>
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
