'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, ArrowRight } from 'lucide-react';
import { SectionTitle } from '../common/SectionTitle';
import { galleryData } from '../../data/gallery';

export const GalleryPreview: React.FC = () => {
  // Show first 5 curated gallery items for the homepage mockup
  const previewItems = galleryData.slice(0, 5);

  // Varying height profiles for authentic staggered masonry column layouts
  const heights = [
    'h-[420px]', // Item 1 (Tall steak sear)
    'h-[260px]', // Item 2 (Ambience)
    'h-[360px]', // Item 3 (Chef searing)
    'h-[280px]', // Item 4 (Fettuccine)
    'h-[390px]', // Item 5 (Cocktails bar)
  ];

  return (
    <section className="bg-charcoal px-4 py-24 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      
      {/* Subtle warm glow background accent */}
      <div className="absolute top-[30%] left-[-10%] h-[400px] w-[400px] rounded-full bg-tomato/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto w-full max-w-[94%] xl:max-w-[92%] px-2 sm:px-6">
        
        {/* Section Header */}
        <SectionTitle
          subtitle="Visual Feed"
          title="Captured Moments"
          description="A visual journey through our warm dining hall, busy searing grills, and handcrafted platters. Culinary art in its truest form."
        />

        {/* Dynamic True Masonry using CSS columns (natural heights, zero overlaps) */}
        <div className="mt-12 pb-10 columns-1 sm:columns-2 md:columns-3 gap-6">
          {previewItems.map((item, index) => {
            const cardHeight = heights[index] || 'h-[300px]';

            return (
              <div
                key={item.id}
                className={`break-inside-avoid relative overflow-hidden rounded-2xl border border-white/5 bg-white/2 shadow-[0_15px_30px_rgba(0,0,0,0.3)] mb-6 group cursor-pointer transition-all duration-500 hover:-translate-y-1 ${cardHeight}`}
              >
                {/* Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-112"
                />

                {/* Glassmorphic Overlay with details (Premium visual) */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center p-6 text-center text-white backdrop-blur-xs">
                  <div className="rounded-full bg-gradient-to-r from-tomato to-warm-orange p-3 text-white shadow-md transition-transform duration-300 scale-90 group-hover:scale-100">
                    <Eye className="h-5 w-5" />
                  </div>
                  <span className="font-sans text-sm font-bold tracking-wide mt-3 text-white">
                    {item.title}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-golden font-bold uppercase mt-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/5">
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA to Gallery */}
        <div className="mt-14 text-center">
          <Link
            href="/gallery"
            className="inline-flex relative overflow-hidden group items-center gap-2 rounded-xl border border-tomato/30 bg-charcoal/30 px-8 py-4 font-sans text-xs font-bold text-white shadow-lg shadow-tomato/15 active:scale-98 transition-all duration-300 cursor-pointer"
          >
            {/* Bottom to top sliding hover background */}
            <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            
            <span className="relative z-10 flex items-center gap-2">
              <span>Explore Full Gallery</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};
