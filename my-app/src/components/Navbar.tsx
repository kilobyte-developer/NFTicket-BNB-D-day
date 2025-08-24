"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import "./ButtonAnimations.css";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { title: "Explore", href: "/explore" },
  { title: "Events", href: "/events" },
  { title: "Buy Tickets", href: "/my-tickets" },
  { title: "Dashboard", href: "/dashboard" },
  { title: "FAQS", href: "/faqs" },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Refs
  const navbarRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLDivElement | null>(null);
  const ctaButtonRef = useRef<HTMLDivElement | null>(null);
  const desktopLinksRef = useRef<(HTMLDivElement | null)[]>([]);
  const glassOverlayRef = useRef<HTMLDivElement | null>(null);

  // Handle logo click → scroll to top if already on home
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navbarRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.6,
        }
      );

      gsap.fromTo(
        ctaButtonRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.8,
        }
      );

      gsap.fromTo(
        desktopLinksRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.9,
          ease: "power3.out",
        }
      );

      gsap.to(glassOverlayRef.current, {
        x: "200%",
        duration: 3,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 4,
      });

      ScrollTrigger.create({
        start: 50,
        end: "bottom bottom",
        onUpdate: (self) => {
          const newScrolled = self.scroll() > 50;
          setScrolled(newScrolled);
        },
      });
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  // Hover Effects
  const handleCTAHover = (isHover: boolean) => {
    gsap.to(ctaButtonRef.current, {
      scale: isHover ? 1.02 : 1,
      boxShadow: isHover
        ? "0 0 20px rgba(10, 203, 219, 0.15)"
        : "0 0 0px rgba(10, 203, 219, 0)",
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleNavLinkHover = (index: number, isHover: boolean) => {
    const link = desktopLinksRef.current[index];
    if (!link) return;

    const anchor = link.querySelector("a");
    if (!anchor) return;

    gsap.to(anchor, {
      textShadow: isHover
        ? "0 0 8px rgba(255, 255, 255, 0.4)"
        : "0 0 0px rgba(255, 255, 255, 0)",
      scale: isHover ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] w-full max-w-6xl px-4">
      <nav
        ref={navbarRef}
        className={`relative flex items-center justify-between px-8 py-4 rounded-2xl transition-all duration-500 overflow-hidden ${
          scrolled
            ? "bg-black/60 backdrop-blur-2xl border border-white/20 shadow-2xl"
            : "bg-black/30 backdrop-blur-xl border border-white/10"
        }`}
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(30,30,30,0.8) 50%, rgba(0,0,0,0.7) 100%)"
            : "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(20,20,20,0.5) 50%, rgba(0,0,0,0.4) 100%)",
        }}
      >
        {/* Glass shine overlay */}
        <div
          ref={glassOverlayRef}
          className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full"
        />

        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-purple-500/50 opacity-70">
          <div
            className={`w-full h-full rounded-2xl ${
              scrolled ? "bg-black/70" : "bg-black/40"
            }`}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {/* Logo */}
          <div ref={logoRef} className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-3"
              onClick={handleLogoClick}
            >
              <span
                className={`text-2xl font-bold transition-all duration-700 ease-out ${
                  !scrolled
                    ? "text-white"
                    : "bg-gradient-to-r from-purple-400 via-blue-400 to-purple-500 bg-clip-text text-transparent"
                }`}
              >
                NFTicket
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div
                key={link.title}
                ref={(el) => {
                  desktopLinksRef.current[index] = el;
                }}
                onMouseEnter={() => handleNavLinkHover(index, true)}
                onMouseLeave={() => handleNavLinkHover(index, false)}
                className="relative"
              >
                <Link
                  href={link.href}
                  className="relative text-white/90 hover:text-white text-sm font-semibold transition-all duration-300 px-4 py-2 rounded-xl block"
                >
                  {link.title}
                </Link>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            ref={ctaButtonRef}
            onMouseEnter={() => handleCTAHover(true)}
            onMouseLeave={() => handleCTAHover(false)}
          >
            <Link
              href="/login"
              className="animated-button animated-button-white px-6 py-2.5 text-sm text-white font-medium border border-white/20 rounded-xl flex items-center gap-2"
            >
              <span className="relative z-10">Login</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
