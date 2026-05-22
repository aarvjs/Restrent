'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

export const OrderNowButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep it visible at the very top of the page
      if (currentScrollY <= 15) {
        setIsVisible((prev) => {
          if (prev !== true) return true;
          return prev;
        });
        lastScrollY.current = currentScrollY;
        return;
      }

      // Detect scroll direction and bail out if state is identical to avoid updates
      if (currentScrollY > lastScrollY.current) {
        setIsVisible((prev) => {
          if (prev !== false) return false;
          return prev;
        });
      } else {
        setIsVisible((prev) => {
          if (prev !== true) return true;
          return prev;
        });
      }

      lastScrollY.current = currentScrollY;
    };

    // Register active scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-[88px] z-40 md:hidden transition-all duration-500 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <Link
        href="/reservation"
        className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-tomato to-warm-orange text-white font-sans text-xs font-extrabold tracking-wider uppercase rounded-full border border-tomato/20 shadow-xl shadow-tomato/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
      >
        <Calendar className="h-4 w-4 text-white" />
        <span>Order Now</span>
      </Link>
    </div>
  );
};
