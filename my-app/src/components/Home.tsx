
"use client"
import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import { FlipWords } from '@/components/FlipWords';
import { Spotlight } from '@/components/Spotlight';
import Link from "next/link";   // ✅ correct 

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [textAnimationState, setTextAnimationState] = useState('initial');

  useEffect(() => {
    // Initial visibility animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Text pop-up animation sequence
    const textTimer = setTimeout(() => {
      setTextAnimationState('popup');
      setTimeout(() => {
        setTextAnimationState('settled');
      }, 800);
    }, 600);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(textTimer);
    };
  }, []);

  return (
    <section
      className="relative py-24 px-6 min-h-screen bg-black overflow-hidden"
      
    >
      {/* Enhanced keyframes for animations */}
      <style>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes float-diag {
          0% { transform: translate(-20%, 20%) scale(1); opacity: .0; }
          20% { opacity: .35; }
          100% { transform: translate(140%, -120%) scale(1.6); opacity: 0; }
        }
        @keyframes ripple {
          0% { transform: translate(-50%, -50%) scale(0.2); opacity: .35; }
          80% { opacity: .15; }
          100% { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
        }
        @keyframes aurora-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes textPopUp {
          0% { 
            transform: translateY(60px) scale(0.8); 
            opacity: 0; 
          }
          60% { 
            transform: translateY(-8px) scale(1.05); 
            opacity: 0.9; 
          }
          100% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
        }
        @keyframes subtitleSlideUp {
          0% { 
            transform: translateY(40px); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        @keyframes pillsFadeIn {
          0% { 
            transform: translateY(30px) scale(0.9); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0) scale(1); 
            opacity: 1; 
          }
        }
        @keyframes buttonSlideUp {
          0% { 
            transform: translateY(50px); 
            opacity: 0; 
          }
          100% { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes slideInFromLeft {
          0% { 
            transform: translateX(-100px);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInFromRight {
          0% { 
            transform: translateX(100px);
            opacity: 0;
          }
          100% { 
            transform: translateX(0);
            opacity: 0.95;
          }
        }
        @keyframes glassShine {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(300%) rotate(45deg); }
        }
      `}</style>
      
      {/* Background grid overlay */}
      <div className="absolute inset-0 z-0" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(75, 0, 130, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(75, 0, 130, 0.04) 1px, transparent 1px)', 
             backgroundSize: '60px 60px' 
           }}>
      </div>

      {/* Aurora color veil */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'linear-gradient(115deg, rgba(124,58,237,0.20), rgba(59,130,246,0.10), rgba(236,72,153,0.18), rgba(99,102,241,0.16))',
          backgroundSize: '200% 200%',
          mixBlendMode: 'screen',
          animation: 'aurora-pan 16s ease-in-out infinite'
        }}
      />

      {/* Background gradient with multi-hue accents */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage:
            'radial-gradient(60% 50% at 20% 85%, rgba(59,130,246,0.10) 0%, rgba(0,0,0,0) 55%), ' +
            'radial-gradient(55% 45% at 82% 18%, rgba(236,72,153,0.12) 0%, rgba(0,0,0,0) 50%), ' +
            'radial-gradient(50% 40% at 50% 12%, rgba(75,0,130,0.10) 0%, rgba(0,0,0,0) 60%), ' +
            'radial-gradient(45% 40% at 10% 20%, rgba(99,102,241,0.10) 0%, rgba(0,0,0,0) 55%), ' +
            'linear-gradient(135deg, #0a0a0c 0%, #000000 80%)'
        }}></div>
      </div>

      {/* Circle element - top left (moved more towards center) */}
      <div 
        className="circle-wrapper header-left absolute z-0" 
        style={{ 
          width: '40rem', 
          height: '40rem', 
          top: '-8%', 
          left: '-18%', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          animation: isVisible ? 'slideInFromLeft 1.2s ease-out 0.5s both' : 'none'
        }}
      >
        <div className="outer-circle" 
             style={{ 
               width: '100%', 
               height: '100%', 
               borderRadius: '100%', 
               display: 'flex', 
               justifyContent: 'center', 
               alignItems: 'center', 
               backgroundImage: 'linear-gradient(50deg, #3A0F6B, #000000)',
               border: '1px solid rgba(128,128,128,0.5)',
               position: 'relative',
               boxShadow: '0 24px 80px rgba(0,0,0,0.35)'
             }}>
          <div className="inner-circle" 
               style={{ 
                 width: '60%', 
                 height: '60%', 
                 backgroundColor: '#000', 
                 borderRadius: '100%',
                 border: '1px solid rgba(128,128,128,0.4)'
               }}>
          </div>
        </div>
      </div>
      
      {/* Circle element - bottom right (moved more towards center) */}
      <div 
        className="circle-wrapper header-right absolute z-0" 
        style={{ 
          width: '40rem', 
          height: '40rem', 
          bottom: '-8%', 
          right: '-18%', 
          display: 'flex',
          justifyContent: 'center', 
          alignItems: 'center',
          animation: isVisible ? 'slideInFromRight 1.2s ease-out 0.7s both' : 'none'
        }}
      >
        <div className="outer-circle" 
             style={{ 
               width: '100%', 
               height: '100%', 
               borderRadius: '100%', 
               display: 'flex', 
               justifyContent: 'center', 
               alignItems: 'center', 
               backgroundImage: 'linear-gradient(50deg, #3A0F6B, #000000)', 
               border: '1px solid rgba(128,128,128,0.5)',
               position: 'relative',
               boxShadow: '0 24px 80px rgba(0,0,0,0.35)'
             }}>
          <div className="inner-circle" 
               style={{ 
                 width: '60%', 
                 height: '60%', 
                 backgroundColor: '#000', 
                 borderRadius: '100%',
                 border: '1px solid rgba(128,128,128,0.35)'
               }}>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto relative z-10">
        {/* Hero Content */}
        <div className="text-center pt-20">
          {/* Main Heading with Pop-up Animation */}
          <div className={`transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="relative inline-block mb-2">
              {/* Spotlights from both sides */}
              <Spotlight className="left-0 top-0 opacity-100" fill="#4B0082" />
              <Spotlight className="right-0 top-0 opacity-100" fill="#808080" />
              
              <h1 
                className={`relative z-10 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl mb-1 leading-tight font-light tracking-tight text-white ${
                  textAnimationState === 'popup' ? 'animate-pulse' : ''
                }`}
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  animation: textAnimationState === 'popup' ? 'textPopUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' : 'none'
                }}
              >
                <div className="block">
                  <span
                    className="bg-clip-text text-transparent relative"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
                      backgroundSize: '300% 300%',
                      animation: textAnimationState === 'settled' ? 'gradientShift 6s ease-in-out infinite' : 'none'
                    }}
                  >
                    Empower Events with
                  </span>
                </div>
                <div className="block mt-3">
                  <span
                    className="bg-clip-text text-transparent relative"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
                      backgroundSize: '300% 300%',
                      animation: textAnimationState === 'settled' ? 'gradientShift 6s ease-in-out infinite' : 'none'
                    }}
                  >
                    NFTicketing
                  </span>
                </div>
              </h1>
            </div>
            
            {/* Subtitle with slide-up animation */}
            <div 
              className="mb-3"
              style={{
                animation: textAnimationState === 'popup' ? 'subtitleSlideUp 0.8s ease-out 0.3s both' : 'none'
              }}
            >
              <p className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-1 text-white">
                Own the{' '}
                <FlipWords 
                  words={["Moment", "Ticket", "Experience"]} 
                  duration={2500} 
                  className="font-medium text-white inline"
                />
              </p>
              <p 
                className="text-lg"
                style={{
                  background: 'linear-gradient(90deg, #A0A0A0 0%, #E0E0E0 50%, #909090 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Secure, Seamless, and Forever Yours.
              </p>
            </div>

            {/* Feature Pills with staggered fade-in */}
            <div 
              className="flex flex-wrap items-center justify-center gap-4 mb-5"
              style={{
                animation: textAnimationState === 'popup' ? 'pillsFadeIn 0.6s ease-out 0.6s both' : 'none'
              }}
            >
              <div className="flex items-center space-x-2 rounded-full px-4 py-2 border border-[#A0A0A0]/40" style={{ backgroundColor: 'rgba(75, 0, 130, 0.18)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#E6E6E6' }} />
                <span className="text-sm font-light" style={{ color: '#E6E6E6' }}>Real-time Protection</span>
              </div>
              <div className="flex items-center space-x-2 rounded-full px-4 py-2 border border-[#A0A0A0]/40" style={{ backgroundColor: 'rgba(75, 0, 130, 0.18)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#E6E6E6' }} />
                <span className="text-sm font-light" style={{ color: '#E6E6E6' }}>25+ Blockchains</span>
              </div>
              <div className="flex items-center space-x-2 rounded-full px-4 py-2 border border-[#A0A0A0]/40" style={{ backgroundColor: 'rgba(75, 0, 130, 0.18)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#E6E6E6' }} />
                <span className="text-sm font-light" style={{ color: '#E6E6E6' }}>Enterprise Security</span>
              </div>
              <div className="flex items-center space-x-2 rounded-full px-4 py-2 border border-[#A0A0A0]/40" style={{ backgroundColor: 'rgba(75, 0, 130, 0.18)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: '#E6E6E6' }} />
                <span className="text-sm font-light" style={{ color: '#E6E6E6' }}>Cancel Anytime</span>
              </div>
            </div>

            {/* CTA Buttons with slide-up animation */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-5"
              style={{
                animation: textAnimationState === 'popup' ? 'buttonSlideUp 0.7s ease-out 0.8s both' : 'none'
              }}
            >
              <Link 
                href="/dashboard" 
                className="group relative flex items-center space-x-3 px-8 py-4 rounded-xl transition-all duration-300 overflow-hidden font-light text-[#F0F0F0] hover:shadow-lg hover:shadow-purple-900/30 transform hover:scale-105"
                style={{ backgroundImage: 'linear-gradient(90deg, #7A33B7 0%, #4B0082 100%)' }}
              >
                <Sparkles className="w-5 h-5 relative z-10" style={{ color: '#F0F0F0' }} />
                <span className="relative z-10">Start Now</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" style={{ color: '#F0F0F0' }} />
              </Link>
              
              <Link 
                href="/contact" 
                className="group relative flex items-center space-x-3 px-8 py-4 rounded-xl overflow-hidden font-light border border-[#A0A0A0]/50 text-[#E6E6E6] transition-all duration-500 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-900/30 transform hover:scale-105 backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(30,27,75,0.2))',
                  backdropFilter: 'blur(10px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left; const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--x', x + 'px');
                  e.currentTarget.style.setProperty('--y', y + 'px');
                }}
                onClick={(e) => {
                  const ripple = document.createElement('span');
                  ripple.className = 'pointer-events-none absolute left-0 top-0 h-6 w-6 rounded-full bg-purple-400/25';
                  ripple.style.left = 'var(--x)';
                  ripple.style.top = 'var(--y)';
                  ripple.style.animation = 'ripple 700ms ease-out forwards';
                  e.currentTarget.appendChild(ripple);
                  setTimeout(() => ripple.remove(), 720);
                }}
              >
                {/* Gradient border ring (fades in on hover) */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-70"
                  style={{ padding: 1, background: 'conic-gradient(from 180deg, #7A33B7, #A0A0A0, #4B0082, #7A33B7)' }}
                />
                {/* Glass shine effect */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                    transform: 'translateX(-100%) rotate(45deg)',
                    animation: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.animation = 'glassShine 0.6s ease-out';
                  }}
                />
                {/* Gradient fill layer that appears on hover - FULL WIDTH */}
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#7A33B7] via-[#5E1C9A] to-[#4B0082] opacity-0 transition-all duration-500 group-hover:opacity-100"
                />
                {/* Mouse-follow glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'radial-gradient(140px at var(--x) var(--y), rgba(124,58,237,0.22), transparent 55%)' }}
                />
                {/* Diagonal shimmer */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 h-full w-1/3 -skew-x-12 bg-white/15 mix-blend-overlay opacity-0 -translate-x-[140%] transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-[220%]"
                />
                {/* Floating sparks */}
                <span aria-hidden className="pointer-events-none absolute -left-4 bottom-1 h-2 w-2 rounded-full bg-purple-300/50 blur-[1px] opacity-0 group-hover:opacity-100" style={{ animation: 'float-diag 1200ms ease-out 60ms forwards' }} />
                <span aria-hidden className="pointer-events-none absolute -left-3 bottom-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300/40 blur-[1px] opacity-0 group-hover:opacity-100" style={{ animation: 'float-diag 1400ms ease-out 120ms forwards' }} />
                {/* Content */}
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#F8F8F8]">Contact Us</span>
              </Link>
            </div>
            
            {/* Footer text with final fade-in */}
            <p 
              className="text-sm font-light"
              style={{
                color: '#888888',
                animation: textAnimationState === 'popup' ? 'subtitleSlideUp 0.6s ease-out 1s both' : 'none'
              }}
            >
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;