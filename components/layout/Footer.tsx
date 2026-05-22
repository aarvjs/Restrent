'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Flame, Mail, Phone, MapPin, Clock } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About Us' },
  { href: '/reservation', label: 'Book Table' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative mt-auto border-t border-white/5 bg-black overflow-hidden font-sans text-cream">
      
      {/* Absolute Culinary Backdrop Image */}
      <div className="absolute inset-0 z-0 h-full w-full opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600"
          alt="Culinary backdrop"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Deep Charcoal Overlay for absolute legibility & premium contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/85 via-black/92 to-black/98 backdrop-blur-xs" />

      {/* Visual top border line with color gradient */}
      <div className="absolute top-0 left-0 right-0 z-20 h-0.5 bg-gradient-to-r from-tomato via-warm-orange to-golden" />

      <div className="relative z-20 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Brand Info & Social Icons */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 p-0.5 shadow-lg shadow-black/50 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/a-premium-restaurant-logo-design-featuri_ps2uJrphV8q28yQHLVU0EA_hub3NpQAQsW_GIaeGCSVLA_sd.jpeg"
                  alt="The Sizzling Plate Premium Logo"
                  width={56}
                  height={56}
                  className="object-cover rounded-lg"
                />
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
            
            <p className="text-xs leading-relaxed text-cream/65">
              Indulge in our exquisite flame-grilled specialties, crafted with premium farm-to-table ingredients by expert culinary artisans. Taste the sizzle today.
            </p>

            {/* Social Icons (Inline SVGs for compilation safety & premium vector scaling) */}
            <div className="flex items-center gap-3 pt-2">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-cream/70 hover:bg-gradient-to-br hover:from-tomato hover:to-warm-orange hover:text-white hover:border-transparent transition-all duration-300 shadow-md"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-cream/70 hover:bg-gradient-to-br hover:from-tomato hover:to-warm-orange hover:text-white hover:border-transparent transition-all duration-300 shadow-md"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-white/5 border border-white/5 text-cream/70 hover:bg-gradient-to-br hover:from-tomato hover:to-warm-orange hover:text-white hover:border-transparent transition-all duration-300 shadow-md"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Shortcuts */}
          <div>
            <h3 className="font-mono text-[10px] font-bold tracking-widest text-tomato uppercase mb-6">
              Explore Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/60 transition-colors hover:text-warm-orange font-semibold tracking-wide"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Hours */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-bold tracking-widest text-tomato uppercase mb-6">
              Restaurant Info
            </h3>
            <ul className="space-y-4 text-xs text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4.5 w-4.5 text-warm-orange shrink-0" />
                <span className="leading-relaxed">124 Gourmet Boulevard, Food District, NY 10013</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-warm-orange shrink-0" />
                <span>+1 (555) 893-2391</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-warm-orange shrink-0" />
                <span>dining@thesizzlingplate.com</span>
              </li>
              <li className="flex items-start gap-3 border-t border-white/5 pt-4">
                <Clock className="mt-0.5 h-4.5 w-4.5 text-golden shrink-0" />
                <div className="space-y-1 font-mono text-[10px]">
                  <p>Mon - Fri: 12:00 PM - 10:00 PM</p>
                  <p>Sat - Sun: 11:00 AM - 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h3 className="font-mono text-[10px] font-bold tracking-widest text-tomato uppercase mb-6">
              Join the VIP Club
            </h3>
            <p className="text-xs text-cream/65 leading-relaxed">
              Subscribe to unlock members-only sizzlers, chef table invites, and seasonal discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-2.5 pt-1">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3 text-xs text-cream placeholder-cream/40 focus:border-tomato/40 focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="relative overflow-hidden group rounded-xl border border-tomato/20 bg-charcoal/50 py-3 font-sans text-xs font-bold text-white shadow-md shadow-tomato/5 transition-all duration-300 cursor-pointer"
              >
                {/* Fill effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10">Subscribe</span>
              </button>
            </form>
          </div>

        </div>

        {/* Footer bottom metadata info */}
        <div className="mt-16 border-t border-white/5 pt-8 text-center text-[10px] text-cream/35 font-mono tracking-wider flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} The Sizzling Plate. All rights reserved.</p>
          <p className="hover:text-cream transition-colors duration-300">
            Created by A Cube Technology
          </p>
        </div>
      </div>
    </footer>
  );
};
