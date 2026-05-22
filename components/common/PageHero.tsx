import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface PageHeroProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  currentPageName: string;
}

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  backgroundImage,
  currentPageName,
}) => {
  return (
    <div className="relative flex h-[350px] w-full items-center justify-center overflow-hidden md:h-[400px]">
      {/* Background Image with slight zoom animation */}
      <div className="absolute inset-0 z-0 scale-105 transition-transform duration-[10000ms] ease-out hover:scale-100">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark Warm Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-tomato/10 via-transparent to-golden/10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 flex items-center justify-center gap-2 font-mono text-xs tracking-wider text-cream/70 uppercase">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-warm-orange"
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </Link>
          <ChevronRight className="h-3 w-3 text-tomato" />
          <span className="text-golden font-semibold">{currentPageName}</span>
        </nav>

        {/* Title */}
        <h1 className="font-sans text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-base text-cream/80 md:text-lg">
          {subtitle}
        </p>

        {/* Dynamic visual touch: golden horizontal line beneath subtitle */}
        <div className="mx-auto mt-6 h-0.5 w-16 bg-golden" />
      </div>
    </div>
  );
};
