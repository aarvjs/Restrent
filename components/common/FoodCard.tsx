'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingBag, Utensils } from 'lucide-react';
import { MenuItem } from '../../data/menu';
import { useCart } from '../context/CartContext';

interface FoodCardProps {
  item: MenuItem;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-charcoal border border-white/5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-tomato/30 hover:shadow-2xl">
      {/* Visual background glow on hover */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-tomato/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Image Wrapper */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-charcoal-light">
        {imageError ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-charcoal border-b border-white/5 text-cream/35">
            <Utensils className="h-12 w-12 stroke-[1.5]" />
            <span className="mt-2 font-mono text-xs uppercase tracking-wider">The Sizzling Plate</span>
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}

        {/* Rating Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 rounded-full bg-charcoal/80 px-3 py-1 font-mono text-xs font-semibold text-golden backdrop-blur-sm border border-white/10">
          <Star className="h-3 w-3 fill-golden text-golden" />
          <span>{item.rating.toFixed(1)}</span>
        </div>

        {/* Price Badge */}
        <div className="absolute right-4 bottom-4 z-10 rounded-full bg-tomato px-4 py-1.5 font-mono text-sm font-bold text-white shadow-lg shadow-tomato/20">
          ${item.price.toFixed(2)}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-grow flex-col p-6">
        <h3 className="font-sans text-xl font-bold tracking-tight text-cream group-hover:text-warm-orange transition-colors">
          {item.name}
        </h3>
        
        <p className="mt-2 flex-grow text-sm leading-relaxed text-cream/70 line-clamp-2">
          {item.description}
        </p>

        {/* Add to Order CTA */}
        <button
          onClick={() => addToCart(item)}
          className="mt-6 relative overflow-hidden group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-tomato/30 bg-charcoal/30 px-4 py-3 font-sans text-sm font-semibold text-white shadow-md shadow-tomato/15 active:scale-98 transition-all duration-300 cursor-pointer"
        >
          {/* Bottom to top sliding hover background */}
          <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
          
          <span className="relative z-10 flex items-center justify-center gap-2">
            <ShoppingBag className="h-4.5 w-4.5" />
            <span>Add to Order</span>
          </span>
        </button>
      </div>
    </div>
  );
};
