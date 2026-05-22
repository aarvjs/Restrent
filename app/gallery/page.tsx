'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../../components/common/PageHero';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { galleryData } from '../../data/gallery';

const GALLERY_HERO_BG = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1600";

const FILTERS = [
  { id: 'all', label: 'All Photos' },
  { id: 'dishes', label: 'Gourmet Plates' },
  { id: 'ambience', label: 'Dining Ambience' },
  { id: 'kitchen', label: 'Kitchen & Chef' },
] as const;

// Deterministic item heights mapping to preserve beautiful magazine layout across filter tabs
const ITEM_HEIGHTS: Record<string, string> = {
  g1: 'h-[440px]', // Ribeye (Tall focus)
  g2: 'h-[280px]', // Dining room
  g3: 'h-[370px]', // Chef sear flames
  g4: 'h-[300px]', // Fettuccine Alfredo
  g5: 'h-[400px]', // Cocktails at bar
  g6: 'h-[290px]', // Leather booths
  g7: 'h-[380px]', // Pizza oven
  g8: 'h-[320px]', // Bistro exterior
  g9: 'h-[360px]', // Plating greens
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<typeof FILTERS[number]['id']>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Filter items
  const filteredGallery = galleryData.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => 
      prev === 0 ? filteredGallery.length - 1 : (prev as number) - 1
    );
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => 
      (prev as number) === filteredGallery.length - 1 ? 0 : (prev as number) + 1
    );
  };

  return (
    <div className="flex flex-col w-full bg-charcoal pb-24 font-sans text-cream">
      {/* Banner */}
      <PageHero
        title="Bespoke Gallery"
        subtitle="A visual feed illustrating our flame searing steaks, hand-crafted pastas, and atmospheric bistro dining room."
        backgroundImage={GALLERY_HERO_BG}
        currentPageName="Gallery"
      />

      <div className="mx-auto w-full max-w-[94%] xl:max-w-[92%] px-4 mt-20 sm:px-6 lg:px-8">
        
        {/* Title */}
        <SectionTitle
          subtitle="Captured Moments"
          title="Gastronomic Visual Feed"
          description="Take a stroll through our kitchen fires, chef plating details, and custom candlelit booth tables. Click on any frame to inspect details."
        />

        {/* Tab Filters bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {FILTERS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveFilter(tab.id);
                setSelectedImageIndex(null);
              }}
              className={`relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'text-white'
                  : 'text-cream/60 hover:text-white bg-white/3'
              }`}
            >
              {activeFilter === tab.id && (
                <motion.span
                  layoutId="activeGalleryTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-tomato to-warm-orange"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* True Masonry Layout using CSS Columns (natural flow, no overlaps) */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 md:columns-3 gap-6 pb-16 pt-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredGallery.map((item, index) => {
              const cardHeight = ITEM_HEIGHTS[item.id] || 'h-[320px]';

              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleOpenLightbox(index)}
                  className={`break-inside-avoid relative overflow-hidden rounded-2xl border border-white/5 bg-white/2 cursor-pointer shadow-lg mb-6 group transition-all duration-500 hover:-translate-y-1 ${cardHeight}`}
                >
                  {/* Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-112"
                  />

                  {/* Cover Overlay details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 p-6 text-center text-white backdrop-blur-xs">
                    <div className="rounded-full bg-gradient-to-r from-tomato to-warm-orange p-3 text-white shadow-md transition-transform duration-300 scale-90 group-hover:scale-100">
                      <Eye className="h-5 w-5" />
                    </div>
                    <h4 className="font-sans text-sm font-semibold tracking-wide mt-2">
                      {item.title}
                    </h4>
                    <span className="font-mono text-[9px] tracking-widest text-golden font-bold uppercase mt-1 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/5">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Interactive Carousel Modal Overlay */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 z-55 flex items-center justify-center px-4 font-sans">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            />

            {/* Lightbox Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-10 flex flex-col w-full max-w-4xl h-[70vh] items-center justify-center"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLightbox}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white border border-white/5 hover:bg-white/10 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Arrow */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-black/60 border border-white/5 text-white hover:bg-black/85 hover:border-white/10 cursor-pointer"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {/* Right Arrow */}
              <button
                onClick={handleNextImage}
                className="absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-xl bg-black/60 border border-white/5 text-white hover:bg-black/85 hover:border-white/10 cursor-pointer"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Primary High-res Frame */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src={filteredGallery[selectedImageIndex].image}
                  alt={filteredGallery[selectedImageIndex].title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Frame Label Footer */}
              <div className="mt-4 text-center">
                <h3 className="text-base font-bold text-white">
                  {filteredGallery[selectedImageIndex].title}
                </h3>
                <span className="font-mono text-[9px] tracking-widest text-golden uppercase mt-1 block">
                  {filteredGallery[selectedImageIndex].category} ({selectedImageIndex + 1} / {filteredGallery.length})
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
