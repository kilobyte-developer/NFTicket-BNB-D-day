"use client"
import React, { useEffect, useRef } from 'react';

// Global, cursor-following purple gradient spotlight overlay
// Renders a fixed, pointer-events-none layer covering the entire app.
// Updates CSS variables on :root for broad compatibility.
export default function GlobalSpotlight() {
  const rafRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const root = document.documentElement;

    const handleMove = (clientX, clientY) => {
      const x = clientX;
      const y = clientY;
      posRef.current.tx = x;
      posRef.current.ty = y;
      if (!rafRef.current) loop();
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      const t = e.touches && e.touches[0];
      if (t) handleMove(t.clientX, t.clientY);
    };

    const loop = () => {
      rafRef.current = requestAnimationFrame(loop);
      const p = posRef.current;
      // Lerp for smooth trailing effect
      p.x += (p.tx - p.x) * 0.18;
      p.y += (p.ty - p.y) * 0.18;
      root.style.setProperty('--gmx', p.x + 'px');
      root.style.setProperty('--gmy', p.y + 'px');
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .global-spotlight { opacity: 0.32; }
        }
      `}</style>
      <div
        aria-hidden
        className="global-spotlight pointer-events-none fixed inset-0 z-40 mix-blend-screen"
        style={{
          // Two-layered purple/violet spotlight following root vars --gmx/--gmy
          backgroundImage:
            'radial-gradient(160px 160px at var(--gmx, -200px) var(--gmy, -200px), rgba(124,58,237,0.22), rgba(88,28,135,0.14) 42%, rgba(0,0,0,0) 64%), ' +
            'radial-gradient(240px 180px at calc(var(--gmx, -200px) + 110px) calc(var(--gmy, -200px) + 70px), rgba(168,85,247,0.14), rgba(30,27,75,0.10) 55%, rgba(0,0,0,0) 78%)'
        }}
      />
    </>
  );
}
