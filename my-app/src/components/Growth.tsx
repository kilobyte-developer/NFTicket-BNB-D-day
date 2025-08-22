"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import './ButtonAnimations.css';

export default function Growth() {
  const [activeTab, setActiveTab] = useState<string>('PAYMENTS');
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const tabs = ['PAYMENTS', 'GAMING', 'NFTS', 'DEFI', 'DAOS'];

  // Intersection Observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle tab changes with smooth transitions
  const handleTabChange = (tab: string) => {
    if (tab === activeTab || isTransitioning) return;
    
    setIsTransitioning(true);
    setHoverTab(tab);
    
    // Fade out current content
    if (contentRef.current) {
      contentRef.current.style.opacity = '0';
      contentRef.current.style.transform = 'translateY(20px)';
    }
    
    // After a short delay, update the active tab and fade in new content
    setTimeout(() => {
      setActiveTab(tab);
      setHoverTab(null);
      
      setTimeout(() => {
        if (contentRef.current) {
          contentRef.current.style.opacity = '1';
          contentRef.current.style.transform = 'translateY(0)';
        }
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  // Fixed hover handlers to properly manage hover state
  const handleMouseEnter = (tab: string) => {
    if (!isTransitioning) {
      setHoverTab(tab);
    }
  };

  const handleMouseLeave = () => {
    if (!isTransitioning) {
      setHoverTab(null);
    }
  };

  interface TabContent {
    title: string;
    subtitle?: string;
    link: string;
    mainImage: string;
    logos: string[];
    gradient: string;
    textGradient: string;
  }

  const content: Record<string, TabContent> = {
    PAYMENTS: {
      title: 'Binance Pay now available to millions of businesses as an approved app integration on Shopify. Binance Pay is built for immediate USDC transactions, fees that are fractions of a penny, and a net-zero environmental impact.',
      link: 'LEARN MORE ABOUT PAYMENTS ON BINANCE',
      mainImage: '/assets/imp1.png',
      logos: ['/assets/logo1.png', '/assets/logo2.png', '/assets/logo3.png', '/assets/logo4.png'],
      gradient: 'from-purple-500 to-blue-400',
      textGradient: 'from-white to-slate-300'
    },
    GAMING: {
      title: 'BLADERITE',
      subtitle: 'Play and own. Bladerite, a free-to-play melee battle royale game, uses Binance to power its in-game item ownership system.',
      link: 'LEARN MORE ABOUT GAMING ON BINANCE',
      mainImage: '/assets/imp2.png',
      logos: ['GBR19', 'MINI ROYALE NATIONS', 'STAR ATLAS', 'AURORY', 'MATCHDAY', 'Seed Labs', 'GENJU'],
      gradient: 'from-gray-600 to-gray-800',
      textGradient: 'from-gray-200 to-gray-100'
    },
    NFTS: {
      title: 'ANYBODIES',
      subtitle: "It's time to bridge the digital and physical. Anybodies helps established brands like Toys'R'Us connect real-life places and products with NFTs.",
      link: 'LEARN MORE ABOUT NFTS ON BINANCE',
      mainImage: '/assets/g3.webp',
      logos: ['CLAYNOSAURZ', '🐵', '🐺', 'OKAY'],
      gradient: 'from-blue-300 to-cyan-300',
      textGradient: 'from-blue-100 to-cyan-100'
    },
    DEFI: {
      title: 'OpenBook',
      subtitle: 'The Binance community came together to build an open-source order book which can power decentralized finance for everyone.',
      link: 'LEARN MORE ABOUT DEFI ON BINANCE',
      mainImage: '/assets/g4.webp',
      logos: ['Solend', 'Jupiter', 'KAMINO', 'ORCA'],
      gradient: 'from-purple-400 to-blue-500',
      textGradient: 'from-purple-100 to-blue-100'
    },
    DAOS: {
      title: 'MONKE DAO',
      subtitle: 'A decentralized organization made up of NFT holders, MonkeDAO has already started running a validator node to support the Binance network — and has big plans for the future.',
      link: 'LEARN MORE ABOUT DAOS ON BINANCE',
      mainImage: '/assets/g5.webp',
      logos: ['GRAPE', 'NATION', 'Realms'],
      gradient: 'from-yellow-500 to-green-500',
      textGradient: 'from-yellow-100 to-green-100'
    }
  };

  const currentContent = content[activeTab];
  const hoverContent = hoverTab ? content[hoverTab] : currentContent;

  // Fixed button styling logic
  const getButtonStyles = (tab: string) => {
    const isActive = activeTab === tab;
    const isHovered = hoverTab === tab;
    
    if (isActive && !isHovered) {
      // Active tab, not hovered - show active state
      return 'bg-gradient-to-r from-purple-600 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/25';
    } else if (isHovered && !isActive) {
      // Different tab being hovered
      return 'bg-gradient-to-r from-purple-500 to-blue-400 text-white border-transparent shadow-lg shadow-purple-400/20';
    } else if (isActive && isHovered) {
      // Active tab being hovered - enhanced active state
      return 'bg-gradient-to-r from-purple-500 to-blue-400 text-white border-transparent shadow-lg shadow-purple-400/30';
    } else {
      // Inactive, not hovered
      return 'text-gray-400 border-gray-500/20 hover:border-gray-400/40 hover:text-purple-300';
    }
  };

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen bg-[#080510] text-white py-24 px-6 flex items-center justify-center"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(50px) scale(0.98)',
        transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {/* Subtle background effects from Benefits component */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07030f] via-[#080510] to-[#090313] opacity-95" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwy.CAwIDAgMSwxIDU2LDBhMjgsMjggMCAxLDEgLTU2LDAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjIiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7c4dff] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#64e7ff] opacity-5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center p-8">
          <h1 className="text-5xl font-medium bg-gradient-to-r from-[#7c4dff] to-[#8a7dff] bg-clip-text text-transparent">
            Build for growth.
          </h1>
          
          {/* Navigation Tabs - Fixed hover logic */}
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                onMouseEnter={() => handleMouseEnter(tab)}
                onMouseLeave={handleMouseLeave}
                className={`px-6 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${getButtonStyles(tab)}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="p-8">
          <div className="relative group">
            <div 
              ref={contentRef}
              className="relative rounded-2xl border shadow-lg backdrop-blur-xl overflow-hidden transition-all duration-500 ease-out"
              style={{
                background: 'rgba(20, 20, 30, 0.7)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                opacity: 1,
                transform: 'translateY(0)'
              }}
            >
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Left Image */}
                <div className="md:w-1/2">
                  <Image 
                    ref={imageRef}
                    src={hoverContent.mainImage} 
                    alt={hoverTab ? hoverTab.toLowerCase() : activeTab.toLowerCase()}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-opacity duration-500"
                    unoptimized 
                  />
                </div>

                {/* Right Content */}
                <div 
                  ref={textRef}
                  className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6 transition-opacity duration-500"
                >
                  {hoverTab === 'PAYMENTS' || (activeTab === 'PAYMENTS' && !hoverTab) ? (
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-4xl font-medium">🛍️</div>
                      <div className="text-3xl font-medium text-purple-300">
                        SHOPIFY
                      </div>
                    </div>
                  ) : (
                    <h2 className="text-4xl font-medium text-purple-300">
                      {hoverContent.title}
                    </h2>
                  )}
                  
                  <p className="text-lg leading-relaxed" style={{ color: 'rgba(200, 200, 200, 0.9)' }}>
                    {hoverTab === 'PAYMENTS' || (activeTab === 'PAYMENTS' && !hoverTab) ? hoverContent.title : hoverContent.subtitle}
                  </p>
                  
                  {/* LEARN MORE button with purple color but no gradient */}
                  <button className="flex items-center space-x-2 transition-colors group">
                    <span className="text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                      {hoverContent.link}
                    </span>
                    <span className="text-purple-400 group-hover:text-purple-300 transition-colors">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Logos */}
          <div className="flex justify-between items-center mt-16 px-4">
            {hoverContent.logos.map((logo, index) => {
              const isString = typeof logo === 'string';
              const lower = isString ? logo.toLowerCase() : '';
              const looksLikeImage = isString && (
                lower.startsWith('/') ||
                lower.startsWith('data:') ||
                lower.startsWith('http') ||
                lower.endsWith('.png') ||
                lower.endsWith('.jpg') ||
                lower.endsWith('.jpeg') ||
                lower.endsWith('.webp') ||
                lower.endsWith('.svg')
              );
              return (
                <div 
                  key={index}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
                  }}
                >
                  {looksLikeImage ? (
                    <Image 
                      src={logo} 
                      alt={`logo-${index}`} 
                      width={100}
                      height={40}
                      className="h-8 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                  ) : isString ? (
                    <div className="font-medium text-lg text-gray-300">{logo}</div>
                  ) : (
                    <Image 
                      src={logo} 
                      alt={`logo-${index}`} 
                      width={100}
                      height={40}
                      className="h-8 opacity-80 hover:opacity-100 transition-opacity" 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        /* Smooth scrolling for the entire page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Prevent white flash during transitions */
        body {
          background-color: #000;
          transition: background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
}