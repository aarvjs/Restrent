'use client';

import React from 'react';
import { SectionTitle } from '../common/SectionTitle';
import { FoodCard } from '../common/FoodCard';
import { menuData } from '../../data/menu';

export const SpecialDishes: React.FC = () => {
  // Extract special highlighted dishes
  const specialDishes = menuData.filter((item) => item.isSpecial).slice(0, 3);

  return (
    <section className="bg-charcoal px-4 py-20 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-7xl">
        
        {/* Customized Section Header */}
        <SectionTitle
          subtitle="Chef Recommendations"
          title="Signature Sizzlers"
          description="Hand-selected by our executive chef, these signature dishes represent the absolute summit of sizzle, texture, and flavor."
        />

        {/* Responsive Grid */}
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {specialDishes.map((dish) => (
            <FoodCard key={dish.id} item={dish} />
          ))}
        </div>
        
      </div>
    </section>
  );
};
