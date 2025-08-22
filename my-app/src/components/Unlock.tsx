"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
export default function Unlock() {
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);
  const leftCardRef = useRef(null);
  const rightTopCardRef = useRef(null);
  const rightBottomCardRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.3, 0.7, 1],
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;
        const element = entry.target;
        
        if (element.classList.contains('title-left')) {
          if (ratio > 0.3) {
            element.style.transform = `translateX(0)`;
            element.style.opacity = '1';
          } else {
            element.style.transform = `translateX(-50px)`;
            element.style.opacity = '0';
          }
        } else if (element.classList.contains('title-right')) {
          if (ratio > 0.3) {
            element.style.transform = `translateX(0)`;
            element.style.opacity = '1';
          } else {
            element.style.transform = `translateX(50px)`;
            element.style.opacity = '0';
          }
        } else if (element.classList.contains('card-left')) {
          if (ratio > 0.3) {
            element.style.transform = `translateX(0) scale(1)`;
            element.style.opacity = '1';
            
            // Trigger image spin animation
            const imageElement = element.querySelector('.nft-image');
            if (imageElement) {
              imageElement.style.transform = 'rotate(0deg)';
              imageElement.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s';
            }
          } else {
            element.style.transform = `translateX(-100px) scale(0.95)`;
            element.style.opacity = '0';
            
            // Reset image rotation
            const imageElement = element.querySelector('.nft-image');
            if (imageElement) {
              imageElement.style.transform = 'rotate(360deg)';
              imageElement.style.transition = 'transform 0.8s ease-out';
            }
          }
        } else if (element.classList.contains('card-right')) {
          if (ratio > 0.3) {
            element.style.transform = `translateX(0) scale(1)`;
            element.style.opacity = '1';
          } else {
            element.style.transform = `translateX(100px) scale(0.95)`;
            element.style.opacity = '0';
          }
        }
      });
    }, observerOptions);

    // Observe elements
    if (titleLeftRef.current) observer.observe(titleLeftRef.current);
    if (titleRightRef.current) observer.observe(titleRightRef.current);
    if (leftCardRef.current) observer.observe(leftCardRef.current);
    if (rightTopCardRef.current) observer.observe(rightTopCardRef.current);
    if (rightBottomCardRef.current) observer.observe(rightBottomCardRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 relative overflow-hidden bg-[#080510]">
      {/* Premium background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07030f] via-[#080510] to-[#090313] opacity-95" />
      
      {/* Subtle texture overlay for premium feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyLjAIDAgMSwxIDU2LDBhMjgsMjggMCAxLDEgLTU2LDAiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjIiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-10" />
      
      {/* Subtle glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7c4dff] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#64e7ff] opacity-5 rounded-full blur-3xl" />

      {/* Hero Section */}
      <div className="text-center mb-20 px-4 relative z-10">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-tight mb-8 overflow-hidden">
          <span 
            ref={titleLeftRef}
            className="title-left inline-block bg-clip-text text-transparent"
            style={{
              transform: 'translateX(-50px)',
              opacity: 0,
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
              backgroundSize: '300% 300%'
            }}
          >
            Unlock the true essence
          </span>
          <span className="inline-block mx-4"> </span>
          <span 
            ref={titleRightRef}
            className="title-right inline-block bg-clip-text text-transparent"
            style={{
              transform: 'translateX(50px)',
              opacity: 0,
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
              backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
              backgroundSize: '300% 300%'
            }}
          >
            of NFTs
          </span>
        </h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed relative z-10 text-gray-300">
          seamlessly collect rare digital masterpieces and effortlessly elevate your 
          art portfolio.
        </p>
      </div>

      {/* Three Card Layout */}
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-[800px]">
          {/* Left Large Card - Collect */}
          <div 
            ref={leftCardRef}
            className="card-left relative group h-full"
            style={{
              transform: 'translateX(-100px) scale(0.95)',
              opacity: 0,
              transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}
          >
            <div 
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-10 group-hover:opacity-20 transition-opacity duration-700"
            ></div>
            <div 
              className="relative rounded-2xl p-8 h-full border border-purple-500/20 group-hover:border-purple-500/25 transition-all duration-500 bg-black/40 backdrop-blur-sm"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-light mb-4 text-gray-200">
                  Collect rare and exclusive digital art
                </h2>
                <p className="text-lg leading-relaxed text-gray-300">
                  Collect rare, exclusive digital art, breathing life into 
                  the extraordinary realm.
                </p>
              </div>

              {/* NFT Card */}
              <div className="relative flex items-center justify-center h-3/4">
                <div className="rounded-2xl p-6 border border-purple-500/30 w-full max-w-md bg-black/60 backdrop-blur-sm">
                  {/* NFT Image */}
                  <div className="bg-black rounded-xl mb-4 h-80 flex items-center justify-center relative overflow-hidden">
                    <Image 
                      src="/assets/muc.jpeg"
                      alt="NFT Artwork"
                      width={400}
                      height={400}
                      className="nft-image w-full h-full object-cover" 
                      style={{
                        transform: 'rotate(360deg)',
                        transition: 'transform 0.8s ease-out'
                      }}
                    />
                  </div>

                  {/* NFT Info */}
                  <div className="rounded-lg p-4 flex justify-between items-center border border-purple-500/10 bg-purple-900/20 backdrop-blur-sm">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-gray-400">Minting</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm text-green-400">Now</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm mb-1 text-gray-400">Price</div>
                      <div className="font-medium text-gray-200">0.009 ETH</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Two Cards */}
          <div className="flex flex-col gap-8 h-full">
            {/* Top Right Card - Sell */}
            <div 
              ref={rightTopCardRef}
              className="card-right relative group flex-1"
              style={{
                transform: 'translateX(100px) scale(0.95)',
                opacity: 0,
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s'
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
              <div className="relative rounded-2xl p-8 h-full flex flex-col border border-purple-500/20 group-hover:border-purple-500/25 transition-all duration-500 bg-black/40 backdrop-blur-sm">
                <div className="mb-6">
                  <h2 className="text-3xl font-light mb-4 text-gray-200">
                    Sell your creations securely
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-300">
                    Turn creativity into currency with confidence in 
                    Sphere's secure marketplace.
                  </p>
                </div>

                {/* Progress Bars */}
                <div className="mb-6">
                  <div className="flex space-x-4 mb-4">
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-1/2 bg-purple-500 rounded-full"></div>
                    </div>
                    <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
                  </div>
                </div>

                {/* NFT Preview Card */}
                <div className="rounded-xl p-4 border border-purple-500/30 mb-4 bg-black/60 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm text-purple-400">Abstract</span>
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                      </div>
                      <div className="text-sm text-gray-400">Abstract #012</div>
                      <div className="font-medium mt-1 text-gray-200">0.044 ETH</div>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/30 rounded-full border-t-white animate-spin"></div>
                    </div>
                  </div>
                </div>

                {/* Upload Button */}
                <div className="text-right mt-auto">
                  <button className="bg-gray-700 px-6 py-3 rounded-lg text-gray-300 hover:bg-gray-600 transition-colors duration-300">
                    Tap to Upload
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Right Card - Blockchain Benefits */}
            <div 
              ref={rightBottomCardRef}
              className="card-right relative group flex-1"
              style={{
                transform: 'translateX(100px) scale(0.95)',
                opacity: 0,
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
              }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-10 group-hover:opacity-20 transition-opacity duration-700"></div>
              <div className="relative rounded-2xl p-8 h-full flex flex-col border border-purple-500/20 group-hover:border-purple-500/25 transition-all duration-500 bg-black/40 backdrop-blur-sm">
                <div className="mb-6">
                  <h3 className="text-2xl font-light mb-4 text-gray-200">
                    Embrace blockchain benefits for NFTs
                  </h3>
                  <p className="leading-relaxed text-gray-300">
                    Unlock digital ownership's future with 
                    transparency, security, and decentralized beauty.
                  </p>
                </div>

                {/* Globe Visualization */}
                <div className="relative h-48 bg-black rounded-xl overflow-hidden mt-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
                    <div className="w-40 h-40 border border-purple-500/30 rounded-full relative">
                      <div className="absolute inset-4 border border-purple-400/40 rounded-full">
                        <div className="absolute inset-4 border border-purple-300/50 rounded-full">
                          <div className="w-full h-full bg-gradient-to-t from-purple-600/20 to-transparent rounded-full"></div>
                        </div>
                      </div>
                      {/* Dots pattern */}
                      <div className="absolute inset-0">
                        {[...Array(15)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-1 h-1 bg-purple-400 rounded-full"
                            style={{
                              left: `${25 + (i % 4) * 12}%`,
                              top: `${35 + Math.floor(i / 4) * 8}%`,
                              opacity: 0.4 + (i % 3) * 0.2
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}