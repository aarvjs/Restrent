'use client';

import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';

const RESTAURANT_PHONE = "+919999999999";
const RESTAURANT_WHATSAPP = "91XXXXXXXXXX";

export const FloatingButtons: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 font-sans">
      {/* Quick Phone Call Button */}
      <a
        href={`tel:${RESTAURANT_PHONE}`}
        aria-label="Call The Sizzling Plate"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-cream backdrop-blur-md border border-white/10 shadow-lg shadow-black/25 transition-all duration-300 hover:bg-tomato hover:text-white hover:scale-115 active:scale-95"
      >
        <Phone className="h-5 w-5 fill-none" />
      </a>

      {/* Quick WhatsApp Chat Button */}
      <a
        href={`https://wa.me/${RESTAURANT_WHATSAPP}?text=Hello!%20I%20would%20like%20to%20inquire%20about%20a%20booking%20at%20The%20Sizzling%20Plate.`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:bg-emerald-500 hover:scale-115 active:scale-95"
      >
        <MessageSquare className="h-5 w-5 fill-none" />
      </a>
    </div>
  );
};
