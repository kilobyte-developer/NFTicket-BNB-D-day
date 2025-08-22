"use client"

import Image from 'next/image';
import React from 'react';
import { useEffect, useState, useRef } from 'react';

export default function Selection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);
  const [inViewport, setInViewport] = useState(false);
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);

  const eventData = [
    {
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=400&fit=crop&crop=center',
      collection: 'Stadium Tours',
      name: 'Coldplay Live #8',
      price: '1.85 BNB',
      highestBid: '2.30 BNB',
      verified: true,
      description: 'Experience Coldplay\'s spectacular world tour with stunning visuals and beloved hits'
    },
    {
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
      collection: 'Pop Icons',
      name: 'Swift Eras #13',
      price: '3.15 BNB',
      highestBid: '4.20 BNB',
      verified: true,
      description: 'A journey through Taylor Swift\'s musical eras in this record-breaking tour'
    },
    {
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop&crop=center',
      collection: 'Acoustic Sessions',
      name: 'Sheeran Live #22',
      price: '1.95 BNB',
      highestBid: '2.75 BNB',
      verified: true,
      description: 'Intimate acoustic performances of Ed Sheeran\'s biggest hits and new material'
    },
    {
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center',
      collection: 'Dark Pop',
      name: 'Eilish World #5',
      price: '2.40 BNB',
      highestBid: '3.10 BNB',
      verified: true,
      description: 'An immersive concert experience featuring Billie\'s haunting vocals and unique style'
    },
    {
      image: 'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=400&h=400&fit=crop&crop=center',
      collection: 'R&B Masters',
      name: 'Weeknd Show #17',
      price: '1.60 BNB',
      highestBid: '2.05 BNB',
      verified: true,
      description: 'A cinematic concert experience with The Weeknd\'s signature dark pop sound'
    },
    {
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&crop=center',
      collection: 'Rock Legends',
      name: 'Dragons Fire #31',
      price: '2.25 BNB',
      highestBid: '2.90 BNB',
      verified: true,
      description: 'High-energy rock anthems and explosive live performances'
    },
    {
      image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=400&fit=crop&crop=center',
      collection: 'Soul Funk',
      name: 'Mars Magic #19',
      price: '2.80 BNB',
      highestBid: '3.50 BNB',
      verified: true,
      description: 'Funk, soul, and pop perfection with Bruno Mars\' incredible showmanship'
    },
    {
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=400&fit=crop&crop=center',
      collection: 'Hip-Hop Elite',
      name: 'Drake Night #26',
      price: '2.65 BNB',
      highestBid: '3.35 BNB',
      verified: true,
      description: 'Premium hip-hop experience with chart-topping hits and exclusive performances'
    },
    {
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop&crop=center',
      collection: 'Electronic Dreams',
      name: 'Skrillex Bass #14',
      price: '1.75 BNB',
      highestBid: '2.25 BNB',
      verified: true,
      description: 'Mind-blowing electronic dance music with earth-shaking bass drops'
    },
    {
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
      collection: 'Country Roads',
      name: 'Morgan Show #42',
      price: '1.40 BNB',
      highestBid: '1.90 BNB',
      verified: true,
      description: 'Authentic country music experience with Morgan Wallen\'s powerful vocals'
    }
  ];

  useEffect(() => {
    function addAnimation() {
      if (containerRef.current && scrollerRef.current) {
        const scrollerContent = Array.from(scrollerRef.current.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          if (scrollerRef.current) {
            scrollerRef.current.appendChild(duplicatedItem);
          }
        });
        getDirection();
        getSpeed();
        setStart(true);
      }
    }

    // Intersection Observer to detect when section is in viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInViewport(true);
          addAnimation();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array since addAnimation is now inside useEffect

  const getDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-direction", "forwards");
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--animation-duration", "40s");
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen py-24 px-6 relative overflow-hidden bg-[#080510]">
      {/* Premium background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07030f] via-[#080510] to-[#090313] opacity-95" />
      
      {/* Subtle texture overlay for premium feel */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-10" />
      
      {/* Subtle glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7c4dff] opacity-5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#64e7ff] opacity-5 rounded-full blur-3xl" />

      <style jsx>{`
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 0.5rem));
          }
        }
        .animate-scroll {
          animation: scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite;
        }
        @keyframes slideInFromLeft {
          from {
            transform: translateX(-100vw);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideInFromRight {
          from {
            transform: translateX(100vw);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .slide-in-left {
          animation: slideInFromLeft 1s ease-out forwards;
        }
        .slide-in-right {
          animation: slideInFromRight 1s ease-out forwards;
        }
      `}</style>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 overflow-hidden">
          <h1 
            ref={headerRef}
            className={`text-5xl font-medium mb-6 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent ${inViewport ? 'slide-in-left' : 'opacity-0'}`}
          >
            Our selection of exclusive events
          </h1>
          <p 
            ref={paragraphRef}
            className={`text-lg max-w-2xl mx-auto ${inViewport ? 'slide-in-right' : 'opacity-0'}`}
            style={{ color: 'rgba(192, 192, 192, 0.9)' }}
          >
            Explore exclusive events with super convenience in collection discovery and curation.
          </p>
        </div>

        {/* Infinite Moving Cards */}
        <div
          ref={containerRef}
          className="relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]"
        >
          <div
            ref={scrollerRef}
            className={`flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4 ${
              start && "animate-scroll"
            } hover:[animation-play-state:paused]`}
          >
            {eventData.map((event, index) => (
              <div key={index} className="flex-shrink-0 w-80 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-gradient-to-br from-[#0a0718] via-purple-900/10 to-[#0a0718] rounded-2xl p-4 border border-purple-500/20 overflow-hidden backdrop-blur-sm">
                  {/* Event Image with hover effect */}
                  <div className="aspect-square bg-gray-700 rounded-lg mb-4 overflow-hidden relative">
                    <Image
                      src={event.image}
                      width={500}
                      height={500}
                      alt={event.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
                    />
                    {/* Description overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-4">
                      <p className="text-white text-center text-sm">{event.description}</p>
                    </div>
                  </div>

                  {/* Collection Info */}
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm" style={{ color: 'rgba(168, 85, 247, 0.8)' }}>{event.collection}</span>
                    {event.verified && (
                      <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  {/* Event Name */}
                  <h3 className="text-xl font-normal mb-4 text-gray-200">{event.name}</h3>

                  {/* Price Info */}
                  <div className="bg-gradient-to-r from-purple-800/20 to-gray-700/50 rounded-lg p-3 border border-purple-500/10">
                    <div className="flex justify-between">
                      <div>
                        <div className="text-xs mb-1" style={{ color: 'rgba(192, 192, 192, 0.7)' }}>Price</div>
                        <div className="font-medium" style={{ color: '#E5E7EB' }}>{event.price}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs mb-1" style={{ color: 'rgba(192, 192, 192, 0.7)' }}>Highest bid</div>
                        <div className="font-medium" style={{ color: '#E5E7EB' }}>{event.highestBid}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}