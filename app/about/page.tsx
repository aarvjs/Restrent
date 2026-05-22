'use client';

import React from 'react';
import Image from 'next/image';
import { PageHero } from '../../components/common/PageHero';
import { SectionTitle } from '../../components/common/SectionTitle';
import { Award, ShieldCheck, HeartHandshake, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';

const ABOUT_HERO_BG = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1600";

const CORE_VALUES = [
  {
    icon: Sprout,
    title: 'Farm-to-Table Freshness',
    description: 'We believe premium food begins at the soil. Every vegetable and herb is hand-selected from certified sustainable organic farms.',
  },
  {
    icon: Award,
    title: 'Culinary Craftsmanship',
    description: 'Our dishes are products of meticulous engineering: custom dry-aging chambers, calibrated iron temperatures, and balanced recipes.',
  },
  {
    icon: ShieldCheck,
    title: 'Uncompromised Integrity',
    description: 'No preservatives, artificial coloring, or quick-cuts. We build flavors from raw, pristine ingredients, slow-simmering sauces for hours.',
  },
  {
    icon: HeartHandshake,
    title: 'Empathetic Hospitality',
    description: 'A premium casual experience means making every guest feel celebrated. We anticipate your dining preferences with sincere, warm hospitality.',
  },
];

const CHEFS = [
  {
    name: 'Executive Chef Marco Valieri',
    role: 'Co-Founder & Culinary Director',
    bio: 'Boasting 15+ years of flame-sear expertise in Florentine steakhouses and Parisian bistros, Marco directs the kitchen with a passion for high-temperature cast-iron sealing.',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Sous Chef Sofia Thorne',
    role: 'Chef de Cuisine',
    bio: 'An expert in risottos and handmade pasta, Sofia manages ingredient logistics and pastry creation. She focuses on infusing light, acidic, fresh notes into heavy sizzlers.',
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?auto=format&fit=crop&q=80&w=400',
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-charcoal pb-24 font-sans text-cream">
      {/* Banner */}
      <PageHero
        title="Our Brand Story"
        subtitle="Unveil the philosophy, values, and master chefs behind the searing cast-iron platters."
        backgroundImage={ABOUT_HERO_BG}
        currentPageName="About Us"
      />

      {/* Brand Narrative Block */}
      <div className="mx-auto max-w-7xl px-4 mt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 items-center">
          
          {/* Overlapping Content Text */}
          <div>
            <SectionTitle
              subtitle="The Sizzling Philosophy"
              title="Where Sear Meets Flavor"
              align="left"
            />
            <div className="space-y-6 text-base leading-relaxed text-cream/80">
              <p>
                **The Sizzling Plate** did not start as a business; it started as an obsession with heat conduction. Our founders realized that conventional ceramic plates allow premium cuts of meat to lose thermal integrity within minutes of plating.
              </p>
              <p>
                By engineering custom cast-iron platters heated to exactly **450°F (232°C)** before serving, we created a mechanism that continues to sear fats and seal juices *while* the guest eats. This ensures your last bite is just as hot, sizzling, and intensely flavorful as the very first.
              </p>
              <p>
                Matched with organic local greens, selected boutique wines, and a modern, rustic aesthetic, we offer a cozy sanctuary for culinary enthusiasts who respect raw technique and pure flavors.
              </p>
            </div>
          </div>

          {/* Dynamic Image Collage */}
          <div className="relative h-[380px] w-full rounded-2xl overflow-hidden border border-white/5 shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800"
              alt="Steak grilling flames close-up"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
          </div>

        </div>

        {/* 2. Core Values Grid */}
        <div className="mt-28">
          <SectionTitle
            subtitle="Operational Pillars"
            title="Our Core Values"
            description="We adhere to strict standards to ensure that every sizzler served is a masterclass in gastronomy."
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-white/2 p-6 transition-all duration-300 hover:border-tomato/30"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-tomato/10 text-tomato">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-cream">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/70">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Chefs Section Grid */}
        <div className="mt-28">
          <SectionTitle
            subtitle="The Kitchen Team"
            title="Meet the Culinary Masters"
            description="Our kitchen is directed by seasoned veterans dedicated to pushing the boundaries of taste, textures, and temperature."
          />

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 max-w-4xl mx-auto">
            {CHEFS.map((chef, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group flex flex-col items-center text-center bg-white/2 border border-white/5 rounded-3xl p-8 transition-all hover:border-tomato/20"
              >
                {/* Chef Photo */}
                <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-tomato/20 shadow-md">
                  <Image
                    src={chef.image}
                    alt={chef.name}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Name */}
                <h3 className="mt-6 font-sans text-xl font-bold tracking-tight text-cream">
                  {chef.name}
                </h3>
                
                {/* Role */}
                <span className="font-mono text-xxs font-semibold tracking-widest text-tomato uppercase mt-1">
                  {chef.role}
                </span>

                {/* Bio */}
                <p className="mt-4 text-sm leading-relaxed text-cream/70">
                  {chef.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
