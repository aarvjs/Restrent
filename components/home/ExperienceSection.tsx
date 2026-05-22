'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Utensils, ShoppingBag, CalendarCheck, Users } from 'lucide-react';
import { SectionTitle } from '../common/SectionTitle';

const EXPERIENCE_CARDS = [
  {
    id: 1,
    icon: Utensils,
    title: 'Fine Dine-In',
    description: 'Immerse yourself in a cozy candlelit atmosphere with sizzling griddles, premium service, and live background music.',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 2,
    icon: ShoppingBag,
    title: 'Gourmet Takeaway',
    description: 'Craving sizzlers on the go? Order online and pick up fresh, piping hot, perfectly packaged meals at our quick-counter.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=600', // Swapped broken 1556910103-1c02745aae4d to working pizza oven/woodfired visual
  },
  {
    id: 3,
    icon: CalendarCheck,
    title: 'Easy Table Booking',
    description: 'Skip the queues and secure prime seating instantly. Build reservations on our automated booking flow in seconds.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 4,
    icon: Users,
    title: 'Cozy Family Space',
    description: 'Celebrate birthdays, anniversaries, and reunions in customized high-capacity leather booths and spacious halls.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600',
  },
];

export const ExperienceSection: React.FC = () => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  return (
    <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8 font-sans text-charcoal">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <SectionTitle
          subtitle="Our Offerings"
          title="The Sizzling Experience"
          description="We go beyond gourmet plates to deliver holistic hospitality. Explore our service pillars designed for absolute customer comfort."
          lightBackground={true}
        />

        {/* Experience Cards Grid (Staggered to break the boxy grid feel) */}
        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-12">
          {EXPERIENCE_CARDS.map((card) => {
            const Icon = card.icon;
            const staggerClass = card.id % 2 === 0 ? 'lg:translate-y-8' : 'lg:translate-y-0';
            const isBroken = imageErrors[card.id];

            return (
              <div
                key={card.id}
                className={`group relative h-[360px] w-full overflow-hidden rounded-2xl shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${staggerClass}`}
              >
                {/* Background Image or Fallback Gradient */}
                {isBroken ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-light flex items-center justify-center p-6" />
                ) : (
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={() => setImageErrors(prev => ({ ...prev, [card.id]: true }))}
                  />
                )}

                {/* Dark Vignette Layer */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/30 transition-colors duration-300 group-hover:from-tomato/90 group-hover:via-tomato/70 group-hover:to-tomato/40" />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white transition-transform duration-300">
                  {/* Floating Icon Pod */}
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-tomato text-white group-hover:bg-white group-hover:text-tomato transition-colors shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-sans text-xl font-bold tracking-tight">
                    {card.title}
                  </h3>

                  {/* Description (hides on rest, slide-reveals on card hover) */}
                  <p className="mt-2 text-xs leading-relaxed text-white/80 line-clamp-3 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
