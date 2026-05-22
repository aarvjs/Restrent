'use client';

import React from 'react';
import Image from 'next/image';
import { MessageSquare, Calendar } from 'lucide-react';
import Link from 'next/link';

const RESTAURANT_WHATSAPP = "91XXXXXXXXXX";

export const ReservationCTA: React.FC = () => {
  const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=Hello!%20I%20would%20like%20to%20reserve%20a%20table%20at%20The%20Sizzling%20Plate.`;

  return (
    <section className="relative flex h-[400px] w-full items-center justify-center overflow-hidden font-sans">
      {/* Background Image with slow parallax-like fit */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600"
          alt="Cozy restaurant interior"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark Warm Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-tomato/20 via-transparent to-golden/20" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <span className="font-mono text-xs font-semibold tracking-widest text-tomato uppercase">
          Skip the Wait
        </span>
        
        <h2 className="mt-3 font-sans text-3xl font-extrabold tracking-tight text-white md:text-5xl">
          Reserve Your Table Today
        </h2>
        
        <p className="mx-auto mt-4 max-w-xl text-base text-cream/80">
          Whether it's a cozy candlelit dinner, family get-together, or high-end business meeting, let us curate an unforgettable experience.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Direct WhatsApp Booking button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative overflow-hidden group flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-charcoal/40 px-8 py-4 font-sans text-sm font-bold text-white shadow-lg shadow-emerald-950/20 active:scale-98 transition-all cursor-pointer"
          >
            {/* Bottom to top sliding hover background */}
            <span className="absolute inset-0 bg-emerald-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            
            <span className="relative z-10 flex items-center gap-2">
              <MessageSquare className="h-4.5 w-4.5" />
              <span>Book on WhatsApp</span>
            </span>
          </a>

          {/* Direct reservation page redirect link */}
          <Link
            href="/reservation"
            className="relative overflow-hidden group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-sans text-sm font-bold text-cream backdrop-blur-sm active:scale-98 transition-all cursor-pointer"
          >
            {/* Bottom to top sliding hover background */}
            <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            
            <span className="relative z-10 flex items-center gap-2">
              <Calendar className="h-4.5 w-4.5 text-golden group-hover:text-white transition-colors duration-300" />
              <span>Custom Reservation</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};
