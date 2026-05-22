'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Calendar, Flame, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservation', label: 'Reservation' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll height to swap between translucent glass and solid charcoal
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => {
        if (prev !== scrolled) return scrolled;
        return prev;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed z-40 mx-auto transition-all duration-300 font-sans ${
          isScrolled
            ? 'top-4 left-4 right-4 max-w-7xl rounded-2xl border border-white/10 bg-charcoal/90 py-2.5 shadow-xl shadow-black/30 backdrop-blur-xl'
            : 'top-0 left-0 right-0 w-full border-b border-transparent bg-transparent py-5 shadow-none'
        }`}
      >
        <div className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'px-4 sm:px-6 lg:px-8' : 'max-w-7xl px-4 sm:px-6 lg:px-8'
        }`}>
          {/* Brand Logo - Separate clean section */}
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-tomato to-warm-orange p-1 shadow-md shadow-tomato/20 transition-transform group-hover:scale-105">
              <Flame className="h-5.5 w-5.5 text-white fill-white/10 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-base font-extrabold tracking-widest text-white group-hover:text-warm-orange transition-colors">
                THE SIZZLING
              </span>
              <span className="font-mono text-[9px] tracking-widest text-golden font-bold uppercase -mt-1">
                Plate
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-xs font-bold tracking-wider transition-all duration-300 relative py-1.5 px-3.5 rounded-lg cursor-pointer ${
                    isActive
                      ? 'text-warm-orange bg-white/5'
                      : 'text-cream/80 hover:text-warm-orange hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Widgets */}
          <div className="flex items-center gap-2.5">
            {/* Map/Location Icon next to Book button */}
            <Link
              href="/contact"
              aria-label="View Location Map"
              className="relative overflow-hidden group flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-cream border border-white/5 transition-all cursor-pointer"
            >
              {/* Bottom to top sliding hover background */}
              <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <MapPin className="relative z-10 h-4.5 w-4.5 group-hover:text-white transition-colors duration-300" />
            </Link>

            {/* Cart Icon widget */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Order Cart"
              className="relative overflow-hidden group flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-cream border border-white/5 transition-all cursor-pointer"
            >
              {/* Bottom to top sliding hover background */}
              <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <ShoppingBag className="relative z-10 h-4.5 w-4.5 group-hover:text-white transition-colors duration-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-tomato font-mono text-[10px] font-bold text-white shadow-md shadow-tomato/20 animate-scale z-20">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Book Table Call-to-action button (fills from bottom to top on hover) */}
            <Link
              href="/reservation"
              className="hidden sm:inline-flex relative overflow-hidden group items-center gap-2 rounded-xl border border-tomato/30 bg-charcoal/30 px-4.5 py-2.5 font-sans text-xs font-bold text-white shadow-md shadow-tomato/5 transition-all duration-300 cursor-pointer"
            >
              {/* Slide layer */}
              <span className="absolute inset-0 bg-gradient-to-r from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              
              <span className="relative z-10 flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>Book Table</span>
              </span>
            </Link>

            {/* Mobile hamburger menu toggle with smooth lines animation */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              className="relative overflow-hidden group flex md:hidden h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-xl bg-white/5 text-cream border border-white/5 cursor-pointer transition-all z-50"
            >
              {/* Bottom to top sliding hover background */}
              <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
              <span className={`relative z-10 h-[2px] w-4.5 rounded bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[8px]' : ''
              }`} />
              <span className={`relative z-10 h-[2px] w-4.5 rounded bg-current transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''
              }`} />
              <span className={`relative z-10 h-[2px] w-4.5 rounded bg-current transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''
              }`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden bg-charcoal/95 backdrop-blur-2xl transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center px-8 gap-8">
          {NAV_LINKS.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{ transitionDelay: isMobileMenuOpen ? `${idx * 75}ms` : '0ms' }}
                className={`font-sans text-2xl font-bold tracking-widest uppercase transition-all duration-500 transform ${
                  isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                } ${
                  isActive ? 'text-warm-orange scale-105' : 'text-cream/70 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          
          <div
            className={`mt-6 flex flex-col w-full max-w-xs gap-4 transition-all duration-500 transform ${
              isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: isMobileMenuOpen ? `${NAV_LINKS.length * 75}ms` : '0ms' }}
          >
            <Link
              href="/reservation"
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-tomato to-warm-orange py-3.5 font-sans text-sm font-bold text-white shadow-lg shadow-tomato/20 active:scale-98 transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Table</span>
            </Link>
            
            <Link
              href="/contact"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3.5 font-sans text-sm font-bold text-cream active:scale-98 transition-all"
            >
              <MapPin className="h-4 w-4 text-golden" />
              <span>Find Our Location</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
