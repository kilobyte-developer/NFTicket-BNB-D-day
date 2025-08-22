"use client"

import { useEffect, useRef, useState } from 'react';

export default function SolanaStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [dappsCount, setDappsCount] = useState(0);
  const [nftCount, setNftCount] = useState(0);
  const [accountsCount, setAccountsCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Use much fewer, strategic updates for ultra-smooth animation
          animateCountUltraSmooth(24, 2000, setDappsCount, 0);
          setTimeout(() => animateCountUltraSmooth(32.1, 2500, setNftCount, 1), 200);
          setTimeout(() => animateCountUltraSmooth(15.2, 3000, setAccountsCount, 1), 400);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animateCountUltraSmooth = (
    target: number,
    duration: number,
    setValue: (value: number) => void,
    decimals: number = 0
  ): void => {
    let startTime: number | null = null;
    const totalSteps: number = Math.min(50, target * (decimals === 0 ? 1 : 10)); // Limit total steps
    let currentStep: number = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const elapsed: number = currentTime - startTime;
      const progress: number = Math.min(elapsed / duration, 1);

      // Smooth easing function
      const easeProgress: number = 1 - Math.pow(1 - progress, 4);

      // Calculate which step we should be on
      const targetStep: number = Math.floor(easeProgress * totalSteps);

      // Only update when we move to the next step (reduces updates dramatically)
      if (targetStep > currentStep || progress === 1) {
        currentStep = targetStep;

        const currentValue: number = target * easeProgress;

        // Smart rounding to prevent micro-changes
        let displayValue: number;
        if (decimals === 0) {
          displayValue = Math.floor(currentValue);
        } else {
          displayValue = Math.floor(currentValue * 10) / 10;
        }

        setValue(Math.min(displayValue, target));
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div ref={ref} className="bg-black text-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Left side text */}
          <div className="flex-1">
            <h2 
              className={`text-4xl font-light leading-tight transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{
                background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #C084FC 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Nothing great is<br />
              made alone
            </h2>
          </div>

          {/* Right side stats */}
          <div className="flex space-x-16">
            {/* Dapps Integrations */}
            <div className="text-center">
              <div 
                className="text-6xl font-light mb-2 text-gray-200 font-mono tracking-tight"
                style={{ 
                  transition: 'all 0.1s ease-out',
                  minWidth: '140px',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {dappsCount}+
              </div>
              <div className="text-sm whitespace-nowrap" style={{ color: 'rgba(168, 85, 247, 0.8)' }}>
                Dapps Integrations
              </div>
            </div>

            {/* NFT Minted */}
            <div className="text-center">
              <div 
                className="text-6xl font-light mb-2 text-gray-200 font-mono tracking-tight"
                style={{ 
                  transition: 'all 0.1s ease-out',
                  minWidth: '140px',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {nftCount}m
              </div>
              <div className="text-sm whitespace-nowrap" style={{ color: 'rgba(168, 85, 247, 0.8)' }}>
                NFT Minted
              </div>
            </div>

            {/* Active Accounts */}
            <div className="text-center">
              <div 
                className="text-6xl font-light mb-2 text-gray-200 font-mono tracking-tight"
                style={{ 
                  transition: 'all 0.1s ease-out',
                  minWidth: '140px',
                  fontVariantNumeric: 'tabular-nums'
                }}
              >
                {accountsCount}m
              </div>
              <div className="text-sm whitespace-nowrap" style={{ color: 'rgba(168, 85, 247, 0.8)' }}>
                Active Accounts
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}