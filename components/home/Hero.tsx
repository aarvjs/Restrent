'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Utensils, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1600',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=1600',
];

const FLOATING_FOODS = [
  {
    id: 1,
    name: 'Artisanal Pizza',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=300',
    className: 'top-[16%] left-[5%] w-24 h-24 lg:w-32 lg:h-32 -rotate-6 animate-float hidden md:block',
  },
  {
    id: 2,
    name: 'Truffle Pasta',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=300',
    className: 'top-[52%] left-[4%] w-22 h-22 lg:w-28 lg:h-28 rotate-6 animate-float-delayed hidden lg:block',
  },
  {
    id: 3,
    name: 'Gourmet Steak',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300',
    className: 'bottom-[16%] left-[6%] w-24 h-24 lg:w-30 lg:h-30 -rotate-3 animate-float hidden md:block',
  },
  {
    id: 4,
    name: 'Smoked Old Fashioned',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=300',
    className: 'top-[18%] right-[6%] w-26 h-26 lg:w-32 lg:h-32 rotate-12 animate-float-delayed hidden md:block',
  },
  {
    id: 5,
    name: 'Grill Platter',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=300',
    className: 'top-[48%] right-[5%] w-24 h-24 lg:w-30 lg:h-30 -rotate-12 animate-float hidden lg:block',
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [floatingErrors, setFloatingErrors] = useState<Record<number, boolean>>({});
  const [cardErrors, setCardErrors] = useState<Record<number, boolean>>({});

  // Auto transition slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center items-center overflow-hidden bg-charcoal pt-28 pb-16 font-sans">
      
      {/* Background Ken Burns Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={HERO_SLIDES[currentSlide]}
              alt="Culinary background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Charcoal & Warm overlay shadows */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/95 via-charcoal/70 to-charcoal/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-tomato/15 via-transparent to-golden/10" />
      </div>

      {/* Floating Gourmet Pods around center text (scattered beautifully, tilted like human placement) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {FLOATING_FOODS.map((food) => (
          <div
            key={food.id}
            className={`absolute p-1.5 bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.4)] rounded-2xl ${food.className}`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-charcoal/50">
              {floatingErrors[food.id] ? (
                <div className="flex h-full w-full flex-col items-center justify-center text-cream/40">
                  <Utensils className="h-6 w-6 stroke-[1.5]" />
                </div>
              ) : (
                <Image
                  src={food.image}
                  alt={food.name}
                  fill
                  sizes="150px"
                  className="object-cover"
                  onError={() => setFloatingErrors(prev => ({ ...prev, [food.id]: true }))}
                />
              )}
            </div>
            {/* Subtle glass name label tag */}
            <div className="absolute bottom-1 left-1.5 right-1.5 bg-black/75 border border-white/5 py-0.5 rounded-lg text-center">
              <span className="font-sans text-[9px] font-bold text-cream tracking-wide block truncate px-1">
                {food.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Core Content Container */}
      <div className="relative z-20 mx-auto max-w-5xl px-4 text-center mt-6">
        {/* Subtle upper micro-header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-tomato/30 bg-tomato/10 px-4.5 py-1.5 backdrop-blur-sm shadow-md"
        >
          <Utensils className="h-3.5 w-3.5 text-tomato" />
          <span className="font-mono text-[9px] font-bold tracking-widest text-cream uppercase">
            Sizzling Premium Casual Dining
          </span>
        </motion.div>

        {/* Large Brand Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1]"
        >
          Taste the <span className="bg-gradient-to-r from-tomato via-warm-orange to-golden bg-clip-text text-transparent">Sizzle</span>,
          <br />
          Feel the Flavor
        </motion.h1>

        {/* Subtitle with premium line height and text color */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-6 max-w-2xl text-sm sm:text-base text-cream/80 md:text-lg leading-relaxed font-medium"
        >
          Freshly prepared steaks and gourmet plates served sizzling hot on 450°F cast-iron platters. Experience high-end casual gastronomy at The Sizzling Plate.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* Link to Menu */}
          <Link
            href="/menu"
            className="relative overflow-hidden group flex items-center gap-2 rounded-xl border border-tomato/30 bg-charcoal/30 px-8 py-4 font-sans text-sm font-bold text-white shadow-lg shadow-tomato/15 active:scale-98 transition-all duration-300 cursor-pointer"
          >
            {/* Bottom to top sliding hover background */}
            <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            
            <span className="relative z-10 flex items-center gap-2">
              <span>View Menu</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Link to Book Table */}
          <Link
            href="/reservation"
            className="relative overflow-hidden group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-sans text-sm font-bold text-cream backdrop-blur-sm active:scale-98 transition-all duration-300 cursor-pointer"
          >
            {/* Bottom to top sliding hover background */}
            <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            
            <span className="relative z-10 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-golden group-hover:text-white transition-colors duration-300" />
              <span>Book Table</span>
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Hero Below Cards row (Added high fidelity food cards row to bridge Hero and About) */}
      <div className="mt-16 w-full max-w-6xl mx-auto z-20 relative px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: 'Scorching Steaks',
              desc: 'Prime cuts dry-aged for 28 days, seared at 450°F.',
              img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=300',
            },
            {
              title: 'Woodfired Pizza',
              desc: 'Neapolitan sourdough baked in artisanal stone ovens.',
              img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=300',
            },
            {
              title: 'Aromatic Grills',
              desc: 'Fresh rosemary, shrimp, and grills pan-seared daily.',
              img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=300',
            },
            {
              title: 'Sizzling Desserts',
              desc: 'Molten chocolate lava cake served with vanilla bean ice cream.',
              img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=300',
            },
          ].map((feat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 + idx * 0.15 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 p-4.5 backdrop-blur-md shadow-2xl text-left flex gap-4 items-center"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-charcoal/50 flex items-center justify-center">
                {cardErrors[idx] ? (
                  <Utensils className="h-6 w-6 text-cream/40 stroke-[1.5]" />
                ) : (
                  <Image
                    src={feat.img}
                    alt={feat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={() => setCardErrors(prev => ({ ...prev, [idx]: true }))}
                  />
                )}
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-white group-hover:text-warm-orange transition-colors">
                  {feat.title}
                </h4>
                <p className="font-sans text-[10px] text-cream/70 mt-1 leading-normal">
                  {feat.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative Warm Searing Bottom Shade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-charcoal to-transparent pointer-events-none" />
    </section>
  );
};
