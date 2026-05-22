'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Leaf, Award, Zap, Heart, ArrowRight } from 'lucide-react';
import { SectionTitle } from '../common/SectionTitle';

const STATS_CARDS = [
  {
    id: 1,
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'We source daily from local organic farms to ensure optimal crispness and nutrition.',
    color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    id: 2,
    icon: Award,
    title: 'Expert Chefs',
    description: 'Our culinary artists bring years of Michelin-starred training to your plate.',
    color: 'text-tomato bg-tomato/10 border-tomato/20',
  },
  {
    id: 3,
    icon: Zap,
    title: 'Fast Service',
    description: 'Your sizzling plates are served piping hot directly from grills within minutes.',
    color: 'text-warm-orange bg-warm-orange/10 border-warm-orange/20',
  },
  {
    id: 4,
    icon: Heart,
    title: 'Family Dining',
    description: 'A cozy, inviting space with customized seating perfect for unforgettable family moments.',
    color: 'text-golden bg-golden/10 border-golden/20',
  },
];

export const AboutPreview: React.FC = () => {
  return (
    <section className="bg-cream px-4 py-24 sm:px-6 lg:px-8 font-sans text-charcoal relative overflow-hidden">

      {/* Decorative organic background vector/blur elements */}
      <div className="absolute top-[-10%] right-[-10%] h-[350px] w-[350px] rounded-full bg-tomato/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] h-[350px] w-[350px] rounded-full bg-golden/5 blur-[80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">

          {/* Overlapping Image Stack Column (Non-boxy, magazine collage) */}
          <div className="relative h-[500px] w-full max-w-lg lg:max-w-none lg:col-span-6 flex items-center justify-center">

            {/* Background decorative frame (Dashed gold/tomato border) */}
            <div className="absolute top-[5%] left-[5%] bottom-[5%] right-[5%] rounded-3xl border-2 border-dashed border-tomato/15 pointer-events-none z-0" />

            {/* Backmost 4th Image Card (previously a dashed border decoration) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute top-[10%] left-[10%] bottom-[10%] right-[10%] z-0 overflow-hidden rounded-2xl border-4 border-white shadow-lg rotate-1 group cursor-pointer bg-white"
            >
              <Image
                src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600"
                alt="Sizzling steak plate"
                fill
                sizes="(max-width: 768px) 45vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Card 1: Chef grilling steak (Top left) */}
            <motion.div
              initial={{ opacity: 0, x: -30, y: -20, rotate: -6 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="absolute top-4 left-4 z-20 aspect-4/3 w-[65%] rounded-2xl border-4 border-white shadow-xl hover:rotate-0 hover:scale-102 transition-all duration-300 overflow-hidden group cursor-pointer bg-white"
            >
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
                alt="Chef grilling steak"
                fill
                sizes="(max-width: 768px) 45vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Card 2: Dining interior (Middle right) */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: -10, rotate: 10 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute right-2 top-[18%] z-10 aspect-square w-[48%] rounded-2xl border-4 border-white shadow-lg hover:rotate-0 hover:scale-102 transition-all duration-300 overflow-hidden group cursor-pointer bg-white"
            >
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
                alt="Dining interior"
                fill
                sizes="(max-width: 768px) 45vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

            {/* Card 3: Chef plating salad (Bottom left/center) */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute bottom-4 left-[16%] z-30 aspect-[16/10] w-[58%] rounded-2xl border-4 border-white shadow-2xl hover:rotate-0 hover:scale-102 transition-all duration-300 overflow-hidden group cursor-pointer bg-white"
            >
              <Image
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=80&w=600"
                alt="Chef preparing salad plate"
                fill
                sizes="(max-width: 768px) 45vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>

          </div>

          {/* Text Story Column (6 cols wide for spacing) */}
          <div className="flex flex-col items-start text-left lg:col-span-6 lg:pl-6">
            <SectionTitle
              subtitle="Our Narrative"
              title="A Sizzling Legacy of Pure Flavor"
              align="left"
              lightBackground={true}
            />

            <p className="mt-6 text-base leading-relaxed text-charcoal/80 font-medium">
              Founded on the belief that dining should be an immersive sensory feast, **The Sizzling Plate** merges premium aged cuts of meat, rustic cast-iron cooking, and modern casual comfort.
            </p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/70">
              Every single steak is served on scorching cast-iron platters heated to exactly **450°F** to seal in marinades and keep seasonings sizzling from the fires of our grill directly to your table. We celebrate bold flavor combinations, welcoming environments, and a shared culinary community.
            </p>

            {/* Link to About detail route */}
            <Link
              href="/about"
              className="mt-8 inline-flex relative overflow-hidden group items-center gap-2 rounded-xl bg-charcoal px-6.5 py-4 font-sans text-xs font-bold text-white shadow-xl hover:scale-103 active:scale-98 transition-all duration-300 cursor-pointer"
            >
              {/* Bottom to top sliding hover background */}
              <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />

              <span className="relative z-10 flex items-center gap-2">
                <span>Discover Our Story</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>

        </div>

        {/* 4 Highlights Stats Grid (Spacing polished) */}
        <div className="mt-28 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STATS_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: card.id * 0.1 }}
                className="flex flex-col rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${card.color}`}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <h3 className="mt-4 font-sans text-base font-bold text-charcoal tracking-wide">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-charcoal/75">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
