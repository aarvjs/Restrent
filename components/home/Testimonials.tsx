'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { SectionTitle } from '../common/SectionTitle';
import { testimonialsData } from '../../data/testimonials';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const currentTestimonial = testimonialsData[activeIndex];

  return (
    <section className="bg-cream px-4 py-20 sm:px-6 lg:px-8 font-sans text-charcoal overflow-hidden">
      <div className="mx-auto max-w-4xl text-center">
        
        {/* Section Title */}
        <SectionTitle
          subtitle="Guest Reviews"
          title="What Our Diners Say"
          lightBackground={true}
        />

        <div className="relative mt-6 min-h-[300px]">
          {/* Decorative Quote Icon in background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 opacity-5 text-charcoal">
            <Quote className="h-28 w-28 stroke-[1.5]" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative z-10 flex flex-col items-center"
            >
              {/* Rating stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < currentTestimonial.rating
                        ? 'fill-golden text-golden'
                        : 'text-charcoal/20'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-lg md:text-xl font-medium leading-relaxed italic text-charcoal max-w-2xl">
                "{currentTestimonial.comment}"
              </blockquote>

              {/* Reviewer Details (Image + Credentials) */}
              <div className="mt-8 flex items-center gap-4 text-left">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-tomato shadow-md">
                  <Image
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    fill
                    sizes="60px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-sans text-base font-extrabold tracking-tight text-charcoal">
                    {currentTestimonial.name}
                  </h4>
                  <p className="font-mono text-xxs font-semibold tracking-wider text-tomato uppercase mt-0.5">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Control Buttons */}
        <div className="mt-12 flex justify-center gap-4">
          <button
            onClick={handlePrev}
            aria-label="Previous Review"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-cream shadow-md transition-transform hover:scale-105 hover:bg-charcoal/90 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNext}
            aria-label="Next Review"
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-cream shadow-md transition-transform hover:scale-105 hover:bg-charcoal/90 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
