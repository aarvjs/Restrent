'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { UtensilsCrossed, ArrowRight } from 'lucide-react';
import { SectionTitle } from '../common/SectionTitle';
import { FoodCard } from '../common/FoodCard';
import { menuData } from '../../data/menu';

const TABS = [
  { id: 'all', label: 'All Select' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Mains' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'drinks', label: 'Drinks' },
  { id: 'desserts', label: 'Desserts' },
] as const;

export const MenuPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('all');

  // Filter menu items by active tab
  const filteredDishes = menuData
    .filter((item) => activeTab === 'all' || item.category === activeTab)
    .slice(0, 6); // Display up to 6 select items

  return (
    <section className="bg-charcoal px-4 py-20 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Title */}
        <SectionTitle
          subtitle="Gourmet Menu"
          title="Savor Our Masterpieces"
          description="Explore curated dishes from our kitchen. Tap to add items to your WhatsApp order draft and build your ideal meal."
        />

        {/* Categories Tab Selector Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative rounded-xl px-5 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-cream/60 hover:text-white bg-white/3'
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeHomeTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-tomato to-warm-orange"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Animated Menu Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <motion.div
                layout
                key={dish.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FoodCard item={dish} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer CTA to full Menu page */}
        <div className="mt-16 text-center">
          <Link
            href="/menu"
            className="inline-flex relative overflow-hidden group items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 font-sans text-sm font-bold text-cream active:scale-98 transition-all cursor-pointer"
          >
            {/* Bottom to top sliding hover background */}
            <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            
            <span className="relative z-10 flex items-center gap-2">
              <UtensilsCrossed className="h-4.5 w-4.5 text-tomato group-hover:text-white transition-colors duration-300 animate-spin-slow" />
              <span>View Full Menu</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};
