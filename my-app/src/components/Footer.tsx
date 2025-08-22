"use client"
import React, { useState } from "react";
import Link from "next/link";
const Footer = () => {
  const year = new Date().getFullYear();
  const [showSampleData, setShowSampleData] = useState(false);
  const [sampleData, setSampleData] = useState({});

  // Function to handle link clicks and show sample data
  interface SampleData {
    title: string;
    description: string;
    stats?: string;
    links?: string[];
    features?: string[];
  }

  interface DataMap {
    [key: string]: SampleData;
  }

  const handleLinkClick = (linkName: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Sample data for each link
    const dataMap: DataMap = {
      "nft-marketplace": {
        title: "NFT Marketplace",
        description: "Explore our digital art marketplace with over 10,000 unique NFTs",
        stats: "50K+ users, 2.5M+ in transactions",
        features: ["Zero commission", "Gas-free minting", "Multi-chain support"]
      },
      "defi": {
        title: "DeFi Platform",
        description: "Earn yield on your crypto assets with our decentralized finance platform",
        stats: "15% average APY, $100M+ TVL",
        features: ["Staking", "Liquidity pools", "Yield farming"]
      },
      "payments": {
        title: "Payment Solutions",
        description: "Seamless crypto payment processing for businesses",
        stats: "0.1% transaction fees, 100K+ transactions daily",
        features: ["Instant settlements", "Multi-currency support", "Fraud protection"]
      },
      "gaming": {
        title: "Gaming",
        description: "Play-to-earn gaming platform with NFT assets",
        stats: "25 games, 500K+ active players",
        features: ["True ownership", "Cross-game compatibility", "Tournaments"]
      },
      "daos": {
        title: "DAOs",
        description: "Decentralized Autonomous Organizations for community governance",
        stats: "150+ DAOs created, 1M+ proposals voted",
        features: ["Token-based voting", "Treasury management", "Plugin ecosystem"]
      },
      "blog": {
        title: "Blog",
        description: "Latest news and insights about blockchain technology",
        stats: "500+ articles, 2M+ monthly readers",
        features: ["Industry analysis", "Tutorials", "Expert opinions"]
      },
      "developers": {
        title: "Developers",
        description: "Resources and tools for Web3 developers",
        stats: "50+ SDKs, 10K+ developer community",
        features: ["API documentation", "Code samples", "Testing environments"]
      },
      "documentation": {
        title: "Documentation",
        description: "Comprehensive guides for using our platform",
        stats: "200+ pages, 15 languages supported",
        features: ["Step-by-step tutorials", "API references", "Best practices"]
      },
      "api": {
        title: "API",
        description: "Powerful API to integrate blockchain functionality",
        stats: "99.9% uptime, <100ms response time",
        features: ["RESTful endpoints", "WebSocket support", "Rate limiting"]
      },
      "blog-single": {
        title: "Blog Single",
        description: "Detailed article view with engagement features",
        stats: "5 min average read time, 70% engagement rate",
        features: ["Comments", "Social sharing", "Related content"]
      },
      "what-is-nft": {
        title: "What is NFT?",
        description: "Learn about Non-Fungible Tokens and digital ownership",
        stats: "Beginner level, 10 min read",
        features: ["Video explainers", "Examples", "Creation guide"]
      },
      "what-is-defi": {
        title: "What is DeFi?",
        description: "Understanding Decentralized Finance revolution",
        stats: "Intermediate level, 15 min read",
        features: ["Comparison tables", "Risk assessment", "Future outlook"]
      },
      "what-is-dao": {
        title: "What is DAO?",
        description: "Explore Decentralized Autonomous Organizations",
        stats: "Intermediate level, 12 min read",
        features: ["Case studies", "Governance models", "Setup guide"]
      },
      "crypto-basics": {
        title: "Crypto Basics",
        description: "Fundamentals of cryptocurrency and blockchain",
        stats: "Beginner level, 8 part series",
        features: ["Glossary", "Interactive exercises", "Progress tracking"]
      },
      "blockchain-guide": {
        title: "Blockchain Guide",
        description: "Complete reference for blockchain technology",
        stats: "All levels, 300+ pages",
        features: ["Technical deep dives", "Use cases", "Industry trends"]
      },
      "contact": {
        title: "Contact Us",
        description: "Get in touch with our team",
        stats: "24/7 support, <1 hour response time",
        features: ["Live chat", "Help center", "Priority support"]
      },
      "legal": {
        title: "Legal",
        description: "Legal information and compliance documents",
        stats: "Regularly updated, 50+ jurisdictions",
        features: ["Terms of service", "Privacy policy", "Compliance guides"]
      }
    };

    setSampleData(dataMap[linkName] || { title: linkName, description: "Sample data coming soon" });
    setShowSampleData(true);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setShowSampleData(false);
    }, 5000);
  };

  return (
    <>
      {/* Sample Data Modal */}
      {showSampleData && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0a24] border border-[#7c4dff]/30 rounded-xl max-w-md w-full p-6 relative shadow-xl">
            <button 
              onClick={() => setShowSampleData(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              ✕
            </button>
            
            <h3 className="text-xl font-medium mb-2 text-white">
              {sampleData.title}
            </h3>
            
            <p className="text-white/70 mb-4">
              {sampleData.description}
            </p>
            
            {sampleData.stats && (
              <div className="bg-[#070518] p-3 rounded-lg mb-4">
                <p className="text-sm text-[#7c4dff]">{sampleData.stats}</p>
              </div>
            )}
            
            {sampleData.features && (
              <div className="mb-4">
                <h4 className="text-white/80 text-sm font-medium mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {sampleData.features.map((feature, index) => (
                    <li key={index} className="text-white/60 text-sm flex items-center">
                      <span className="text-[#7c4dff] mr-2">•</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <button 
              onClick={() => setShowSampleData(false)}
              className="w-full bg-gradient-to-r from-[#7c4dff] to-[#5e3f9e] text-white py-2 rounded-lg hover:from-[#8d5fff] hover:to-[#6f4ab3] transition-all"
            >
              Explore More
            </button>
          </div>
        </div>
      )}

      <footer className="relative w-full bg-[#080510] text-white overflow-hidden">
        {/* Premium background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#07030f] via-[#080510] to-[#090313] opacity-95" />
        
        {/* Subtle texture overlay for premium feel */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0zMCAzMG0tMjggMGEyOCwyOCAwIDEsMSA1NiwwYTI4LDI4IDAgMSwxIC01NiwwIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMC4yIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjEiLz48L3N2Zz4=')] opacity-10" />
        
        {/* Subtle glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7c4dff] opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#64e7ff] opacity-5 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* Newsletter CTA */}
          <section className="max-w-6xl mx-auto px-6 pt-20 pb-12">
            <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight">
              Create Blockchain{" "}
              <span 
                className="bg-clip-text text-transparent relative"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
                  backgroundSize: '300% 300%',
                  animation: 'gradientShift 6s ease-in-out infinite'
                }}
              >
                Innovations
              </span>
            </h2>
            <p className="mt-4 text-center text-white/70 max-w-2xl mx-auto">
              Stay updated with NFTicket for the latest in Web3 development!
            </p>

            {/* Email input */}
            <div className="mt-8 flex justify-center">
              <div className="relative w-full max-w-xl">
                <div className="absolute inset-0 translate-y-1 translate-x-1 rounded-full bg-black/70 blur-[1px]" />
                <div className="relative flex items-center rounded-full bg-[#0a0718] ring-1 ring-white/5 shadow-[0_8px_0_0_rgba(0,0,0,0.6)]">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full bg-transparent text-white/90 placeholder-white/40 px-6 py-4 outline-none"
                  />
                  <button className="m-1 whitespace-nowrap rounded-full bg-gradient-to-r from-[#0a0718] to-[#0d0920] border border-white/10 px-5 py-2.5 text-sm font-normal text-white transition-all duration-300 hover:from-[#0d0920] hover:to-[#100b28] hover:shadow-[0_0_15px_rgba(124,77,255,0.3)]">
                    <span className="relative z-10">Get Started</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Main footer */}
          <section className="max-w-6xl mx-auto px-6 py-14">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {/* Brand */}
              <div className="md:col-span-1">
                <div className="flex items-center gap-2">
                  {/* Premium logo mark */}
                  <div className="h-7 w-7 rounded-md bg-gradient-to-br from-[#7c4dff] to-[#64e7ff] shadow-[0_0_10px_rgba(124,77,255,0.5)]" />
                  <span 
                    className="text-lg font-normal bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
                      backgroundSize: '300% 300%',
                      animation: 'gradientShift 6s ease-in-out infinite'
                    }}
                  >
                    NFTicket
                  </span>
                </div>
                <p className="mt-5 text-white/70 max-w-sm">
                  Trusted by companies worldwide, we prioritize innovation,
                  security, and ease of use to support your growth.
                </p>
              </div>

              {/* Products Column */}
              <div>
                <h4 
                  className="font-normal mb-4 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientShift 6s ease-in-out infinite'
                  }}
                >
                  Products
                </h4>
                <ul className="space-y-3 text-white/70">
                  <li>
                    <Link href="/nft-marketplace" onClick={(e) => handleLinkClick("nft-marketplace", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      NFT Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link href="/defi" onClick={(e) => handleLinkClick("defi", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      DeFi Platform
                    </Link>
                  </li>
                  <li>
                    <Link href="/payments" onClick={(e) => handleLinkClick("payments", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Payment Solutions
                    </Link>
                  </li>
                  <li>
                    <Link href="/gaming" onClick={(e) => handleLinkClick("gaming", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Gaming
                    </Link>
                  </li>
                  <li>
                    <Link href="/daos" onClick={(e) => handleLinkClick("daos", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      DAOs
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources Column */}
              <div>
                <h4 
                  className="font-normal mb-4 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientShift 6s ease-in-out infinite'
                  }}
                >
                  Resources
                </h4>
                <ul className="space-y-3 text-white/70">
                  <li>
                    <Link href="/blog" onClick={(e) => handleLinkClick("blog", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/developers" onClick={(e) => handleLinkClick("developers", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Developers
                    </Link>
                  </li>
                  <li>
                    <Link href="/documentation" onClick={(e) => handleLinkClick("documentation", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="/api" onClick={(e) => handleLinkClick("api", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      API
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog-single" onClick={(e) => handleLinkClick("blog-single", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Blog Single
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Learn Column */}
              <div>
                <h4 
                  className="font-normal mb-4 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #7A33B7 0%, #E0E0E0 15%, #FFFFFF 30%, #C0C0C0 45%, #F5F5F5 60%, #A0A0A0 75%, #5E1C9A 100%)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientShift 6s ease-in-out infinite'
                  }}
                >
                  Learn
                </h4>
                <ul className="space-y-3 text-white/70">
                  <li>
                    <Link href="/what-is-nft" onClick={(e) => handleLinkClick("what-is-nft", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      What is NFT?
                    </Link>
                  </li>
                  <li>
                    <Link href="/what-is-defi" onClick={(e) => handleLinkClick("what-is-defi", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      What is DeFi?
                    </Link>
                  </li>
                  <li>
                    <Link href="/what-is-dao" onClick={(e) => handleLinkClick("what-is-dao", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      What is DAO?
                    </Link>
                  </li>
                  <li>
                    <Link href="/crypto-basics" onClick={(e) => handleLinkClick("crypto-basics", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Crypto Basics
                    </Link>
                  </li>
                  <li>
                    <Link href="/blockchain-guide" onClick={(e) => handleLinkClick("blockchain-guide", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Blockchain Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" onClick={(e) => handleLinkClick("contact", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/legal" onClick={(e) => handleLinkClick("legal", e)} className="hover:text-white transition-colors duration-300 hover:pl-1 block">
                      Legal
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Bottom bar */}
          <div className="border-t border-white/5">
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/50">
                Copyright © {year} NFTicket. All rights reserved.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4 text-white/60">
                {/* X */}
                <a href="#" aria-label="X" className="hover:text-white transition-colors duration-300 p-2 rounded-md hover:bg-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H22l-7.5 8.6L23 22h-6.6l-5.2-6.8L5 22H2l8.2-9.4L1 2h6.7l4.7 6.2L18.9 2zm-1.2 18h2L8.4 4H6.4l11.3 16z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="hover:text-white transition-colors duration-300 p-2 rounded-md hover:bg-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.2V12h2.2V9.7c0-2.2 1.3-3.4 3.3-3.4.9 0 1.8.1 2.6.2v2.3h-1.5c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="hover:text-white transition-colors duration-300 p-2 rounded-md hover:bg-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 17.8 2.8 2.8 0 0 0 12 9.2zM18 6.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors duration-300 p-2 rounded-md hover:bg-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.56v-5.6c0-1.34-.02-3.06-1.87-3.06-1.88 0-2.17 1.46-2.17 2.96v5.7H9.29V9h3.41v1.56h.05c.48-.9 1.66-1.85 3.41-1.85 3.65 0 4.32 2.4 4.32 5.5v6.24zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z"/>
                  </svg>
                </a>
                {/* Discord */}
                <a href="#" aria-label="Discord" className="hover:text-white transition-colors duration-300 p-2 rounded-md hover:bg-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Add the gradientShift animation to the footer */}
        <style>
          {`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}
        </style>
      </footer>
    </>
  );
};

export default Footer;