import React from 'react';
import { Hero } from '../components/home/Hero';
import { SpecialDishes } from '../components/home/SpecialDishes';
import { AboutPreview } from '../components/home/AboutPreview';
import { MenuPreview } from '../components/home/MenuPreview';
import { ExperienceSection } from '../components/home/ExperienceSection';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { Testimonials } from '../components/home/Testimonials';
import { ReservationCTA } from '../components/home/ReservationCTA';

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Immersive Ken Burns Hero block */}
      <Hero />

      {/* Brand legacy stack (About section placed immediately after Hero) */}
      <AboutPreview />

      {/* Featured Sizzling Plates */}
      <SpecialDishes />

      {/* Animated Menu previews and filters */}
      <MenuPreview />

      {/* Grid of dining pillars & features */}
      <ExperienceSection />

      {/* Asymmetric Gallery preview grids */}
      <GalleryPreview />

      {/* Quote testimonial review sliders */}
      <Testimonials />

      {/* Scorching Reservation final callouts */}
      <ReservationCTA />
    </div>
  );
}
