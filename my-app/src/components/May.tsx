"use client"
import React, { useEffect, useState } from 'react';

export default function NFTicketHero() {
  const [showText, setShowText] = useState({
    where: false,
    hacks: false,
    and: false,
    breaches: false,
    hit: false,
    a: false,
    brick: false,
    wall: false,
    description: false
  });

  useEffect(() => {
    // Stagger the animations with delays
    const timers = [
      setTimeout(() => setShowText(prev => ({...prev, where: true})), 200),
      setTimeout(() => setShowText(prev => ({...prev, hacks: true})), 400),
      setTimeout(() => setShowText(prev => ({...prev, and: true})), 600),
      setTimeout(() => setShowText(prev => ({...prev, breaches: true})), 800),
      setTimeout(() => setShowText(prev => ({...prev, hit: true})), 1000),
      setTimeout(() => setShowText(prev => ({...prev, a: true})), 1200),
      setTimeout(() => setShowText(prev => ({...prev, brick: true})), 1400),
      setTimeout(() => setShowText(prev => ({...prev, wall: true})), 1600),
      setTimeout(() => setShowText(prev => ({...prev, description: true})), 2000),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <div className="relative w-full h-full bg-black text-white overflow-hidden py-24 px-6">
      {/* Animated Background Text - Left Side */}
      <div className="absolute inset-0 opacity-10 overflow-hidden">
        {/* Line 1: Left to Right */}
        <div className="absolute top-1/4 whitespace-nowrap text-4xl md:text-5xl font-light flex items-center h-20 animate-scroll-left">
          <div className="flex items-center gap-16">
            <span>Bank-Grade Security</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Built-in Compliance</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Zero-Trust Architecture</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Advanced Threat Detection</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Multi-Factor Authentication</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Real-Time Monitoring</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Bank-Grade Security</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Built-in Compliance</span>
          </div>
        </div>

        {/* Line 2: Right to Left */}
        <div className="absolute top-1/2 whitespace-nowrap text-4xl md:text-5xl font-light flex items-center h-20 animate-scroll-right">
          <div className="flex items-center gap-16">
            <span>Bulletproof Protection</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Quantum-Safe Keys</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Air-Tight Security</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Hacker Deterrence</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Vulnerability Assessment</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Incident Response</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Bulletproof Protection</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Quantum-Safe Keys</span>
          </div>
        </div>

        {/* Line 3: Left to Right */}
        <div className="absolute top-3/4 whitespace-nowrap text-4xl md:text-5xl font-light flex items-center h-20 animate-scroll-left-slow">
          <div className="flex items-center gap-16">
            <span>End-to-End Encryption</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Unrivaled Encryption</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Unbreakable Keys</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Data Protection</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Privacy Shield</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Secure Transmission</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>End-to-End Encryption</span>
            <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
            <span>Unrivaled Encryption</span>
          </div>
        </div>
      </div>

      {/* Main Content - Right Side */}
      <div className="relative z-10 h-full flex items-center justify-end pr-16 md:pr-24">
        <div className="text-right max-w-2xl">
          {/* Hero Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight">
              {/* "Where" - from left */}
              <span className={`inline-block ${showText.where ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'}`}>
                Where
              </span>
              {' '}
              {/* "Hacks" - from left */}
              <span className={`inline-block ${showText.hacks ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'}`}>
                Hacks
              </span>
              {' '}
              {/* "and" - from left */}
              <span className={`inline-block ${showText.and ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'}`}>
                and
              </span>
              <br />
              {/* "Breaches" - from right */}
              <span className={`inline-block ${showText.breaches ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-10'}`}>
                Breaches
              </span>
              {' '}
              {/* "Hit" - from right */}
              <span className={`inline-block ${showText.hit ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-10'}`}>
                Hit
              </span>
              {' '}
              {/* "a" - from right */}
              <span className={`inline-block ${showText.a ? 'animate-slide-in-right opacity-100' : 'opacity-0 translate-x-10'}`}>
                a
              </span>
              {' '}
              {/* "Brick" - from left */}
              <span className={`inline-block ${showText.brick ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'}`}>
                Brick
              </span>
              {' '}
              {/* "Wall." - from left */}
              <span className={`inline-block ${showText.wall ? 'animate-slide-in-left opacity-100' : 'opacity-0 -translate-x-10'}`}>
                Wall.
              </span>
            </h1>
            
            {/* Description - from bottom */}
            <p className={`text-lg md:text-xl font-light leading-relaxed opacity-80 max-w-lg ml-auto transition-all duration-700 ${showText.description ? 'animate-slide-in-bottom opacity-100' : 'opacity-0 translate-y-10'}`}>
              NFTicket leverages powerful encryption and blockchain technology 
              to provide industry-leading protection for your sensitive data.
            </p>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        @keyframes scroll-right {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes scroll-left-slow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100vw);
          }
        }

        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(30px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-bottom {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right 25s linear infinite;
        }

        .animate-scroll-left-slow {
          animation: scroll-left-slow 22s linear infinite;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .animate-slide-in-bottom {
          animation: slide-in-bottom 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}