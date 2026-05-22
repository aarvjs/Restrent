'use client';

import React, { useEffect, useState } from 'react';
import { Flame, UtensilsCrossed } from 'lucide-react';

export const Preloader: React.FC = () => {
  const [mounted, setMounted] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Simulate progress bar loading
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 80);

    // Fade out trigger
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1100);

    // Unmount trigger
    const removeTimer = setTimeout(() => {
      setMounted(false);
      document.body.style.overflow = '';
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-charcoal transition-opacity duration-500 ease-out ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm-orange/10 blur-[120px]" />

      <div className="relative flex flex-col items-center">
        {/* Flame and Utensils container */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-warm-orange/30 p-2 animate-[spin_20s_linear_infinite]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-charcoal border border-tomato/20 shadow-[0_0_15px_rgba(220,38,38,0.15)]">
            <UtensilsCrossed className="h-8 w-8 text-cream" />
          </div>
        </div>

        {/* Floating flame positioned on top */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-bounce">
          <Flame className="h-8 w-8 text-warm-orange fill-tomato animate-pulse" />
        </div>

        {/* Text logo */}
        <h2 className="font-sans text-2xl font-bold tracking-wider text-cream">
          THE <span className="text-tomato">SIZZLING</span> PLATE
        </h2>
        <p className="mt-1 font-mono text-xs tracking-widest text-golden/80 uppercase">
          Taste the Sizzle, Feel the Flavor
        </p>

        {/* Progress loading bar */}
        <div className="mt-8 h-[2px] w-48 overflow-hidden rounded-full bg-charcoal border border-white/5">
          <div
            className="h-full bg-gradient-to-r from-tomato via-warm-orange to-golden transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
