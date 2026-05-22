'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero } from '../../components/common/PageHero';
import { SectionTitle } from '../../components/common/SectionTitle';
import { FoodCard } from '../../components/common/FoodCard';
import { menuData } from '../../data/menu';

const MENU_HERO_BG = "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1600";

const CATEGORIES = [
  { id: 'all', label: 'Full Menu' },
  { id: 'starters', label: 'Starters' },
  { id: 'mains', label: 'Main Courses' },
  { id: 'pizza', label: 'Artisanal Pizzas' },
  { id: 'drinks', label: 'Signature Drinks' },
  { id: 'desserts', label: 'Fine Desserts' },
] as const;

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]['id']>('all');

  const filteredItems = menuData.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  return (
    <div className="flex flex-col w-full bg-charcoal pb-24 font-sans">
      {/* Banner Header */}
      <PageHero
        title="Our Gourmet Menu"
        subtitle="Explore our selection of premium sizzlers, fire-roasted specialties, and hand-crafted desserts."
        backgroundImage={MENU_HERO_BG}
        currentPageName="Menu"
      />

      <div className="mx-auto max-w-7xl px-4 mt-20 sm:px-6 lg:px-8">
        {/* Descriptive intro title */}
        <SectionTitle
          subtitle="Gastronomy"
          title="Curated Culinary Offerings"
          description="Crafted with pure culinary passion. Select individual starters, steaks, or desserts to add them to your draft order drawer, then checkout directly to WhatsApp."
        />

        {/* Tab Filters bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`relative rounded-xl px-5 py-3 text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'text-white'
                  : 'text-cream/60 hover:text-white bg-white/3'
              }`}
            >
              {activeCategory === tab.id && (
                <motion.span
                  layoutId="activeMenuTab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-tomato to-warm-orange"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Items Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <FoodCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Small operational notice */}
        <div className="mt-20 rounded-2xl border border-white/5 bg-white/2 p-6 text-center text-xs text-cream/50 max-w-2xl mx-auto leading-relaxed">
          <p>
            *Please note: Ingredients can be customized based on dietary requirements. Inform us of any food allergies in your checkout notes before submitting order drafts to WhatsApp.*
          </p>
        </div>

      </div>
    </div>
  );
}
