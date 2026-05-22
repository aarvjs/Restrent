import React from 'react';

interface SectionTitleProps {
  subtitle: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  lightBackground?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  description,
  align = 'center',
  lightBackground = false,
}) => {
  return (
    <div
      className={`mb-12 flex flex-col ${
        align === 'center' ? 'items-center text-center' : 'items-start text-left'
      }`}
    >
      <span className="font-mono text-xs font-semibold tracking-widest text-tomato uppercase">
        {subtitle}
      </span>
      
      <h2
        className={`mt-2 font-sans text-3xl font-bold tracking-tight md:text-4xl ${
          lightBackground ? 'text-charcoal' : 'text-cream'
        }`}
      >
        {title}
      </h2>

      {/* Gourmet styled accent divider line */}
      <div className={`mt-4 flex items-center gap-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <div className="h-[2px] w-8 bg-gradient-to-r from-transparent to-tomato" />
        <div className="h-1.5 w-1.5 rounded-full bg-golden" />
        <div className="h-[2px] w-8 bg-gradient-to-l from-transparent to-tomato" />
      </div>

      {description && (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed ${
            lightBackground ? 'text-charcoal/70' : 'text-cream/70'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
