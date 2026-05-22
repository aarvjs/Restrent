'use client';

import React, { useState } from 'react';
import { PageHero } from '../../components/common/PageHero';
import { SectionTitle } from '../../components/common/SectionTitle';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_HERO_BG = "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=1600";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simulate brief network lag for sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      // Reset success status after a few seconds
      setTimeout(() => {
        setIsSent(false);
      }, 4000);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full bg-charcoal pb-24 font-sans text-cream">
      {/* Banner */}
      <PageHero
        title="Contact Concierge"
        backgroundImage={CONTACT_HERO_BG}
        subtitle="Connect with our administrative office. Inquire about catering, reservations, or private events."
        currentPageName="Contact"
      />

      <div className="mx-auto max-w-7xl px-4 mt-20 sm:px-6 lg:px-8">
        
        {/* Title */}
        <SectionTitle
          subtitle="Get in Touch"
          title="We Are at Your Service"
          description="Have questions regarding corporate hosting, menu ingredients, or reservations? Write to us, and our team will get back to you within 24 hours."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start mt-6">
          
          {/* Left Column: Coordinates details & Map placeholder (lg:span-5) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Info grid box */}
            <div className="rounded-3xl border border-white/5 bg-white/2 p-8 space-y-6">
              <h3 className="text-xl font-bold text-cream">Restaurant Coordinates</h3>
              
              <ul className="space-y-5 text-sm text-cream/70">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tomato/10 text-tomato">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xxs font-semibold tracking-wider text-tomato uppercase block mb-1">Our Location</span>
                    <span className="leading-relaxed text-cream/90">124 Gourmet Boulevard, Food District, NY 10013</span>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tomato/10 text-tomato">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xxs font-semibold tracking-wider text-tomato uppercase block mb-1">Phone Inquiries</span>
                    <span className="text-cream/90 font-semibold">+1 (555) 893-2391</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tomato/10 text-tomato">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xxs font-semibold tracking-wider text-tomato uppercase block mb-1">Email Connection</span>
                    <span className="text-cream/90">dining@thesizzlingplate.com</span>
                  </div>
                </li>

                <li className="flex items-start gap-4 pt-4 border-t border-white/5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-golden/10 text-golden">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-mono text-xxs font-semibold tracking-wider text-golden uppercase block mb-1">Operational Hours</span>
                    <div className="text-xs font-mono space-y-0.5 text-cream/90">
                      <p>Monday - Friday: 12:00 PM - 10:00 PM</p>
                      <p>Saturday - Sunday: 11:00 AM - 11:00 PM</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Google Map Mockup */}
            <div className="rounded-3xl border border-white/5 bg-white/2 p-4 h-[250px] relative overflow-hidden flex flex-col items-center justify-center group shadow-lg">
              {/* Static background visual grid resembling charcoal maps */}
              <div className="absolute inset-0 bg-charcoal bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-0" />
              
              {/* Centered locator icon */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-tomato text-white animate-bounce shadow-lg shadow-tomato/20 border border-white/10">
                  <MapPin className="h-6 w-6" />
                </div>
                <span className="font-sans text-sm font-bold text-cream">Google Map Visual Placeholder</span>
                <span className="font-mono text-xxs tracking-wider text-cream/40 uppercase">Latitude: 40.7128° N | Longitude: 74.0060° W</span>
              </div>
            </div>

          </div>

          {/* Right Column: Message Form (lg:span-7) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/5 bg-white/2 p-8 md:p-10 shadow-2xl relative">
            <h3 className="text-xl font-bold text-cream mb-6">Send Us an Inquiry</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Field 1: Name */}
                <div className="flex flex-col">
                  <label className="text-xs font-mono font-semibold tracking-wider text-cream/60 uppercase mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3.5 text-sm text-cream placeholder-cream/40 focus:border-tomato/50 focus:outline-none"
                  />
                </div>

                {/* Field 2: Email */}
                <div className="flex flex-col">
                  <label className="text-xs font-mono font-semibold tracking-wider text-cream/60 uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3.5 text-sm text-cream placeholder-cream/40 focus:border-tomato/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Field 3: Subject */}
              <div className="flex flex-col">
                <label className="text-xs font-mono font-semibold tracking-wider text-cream/60 uppercase mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="e.g. Private Catering, Feedback, General Inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3.5 text-sm text-cream placeholder-cream/40 focus:border-tomato/50 focus:outline-none"
                />
              </div>

              {/* Field 4: Message */}
              <div className="flex flex-col">
                <label className="text-xs font-mono font-semibold tracking-wider text-cream/60 uppercase mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Type your message details here..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/5 bg-white/3 p-4 text-sm text-cream placeholder-cream/40 focus:border-tomato/50 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden group/btn flex items-center justify-center gap-2 rounded-xl border border-tomato/30 bg-charcoal/30 py-4 font-sans text-sm font-bold text-white shadow-lg shadow-tomato/15 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
              >
                {/* Bottom to top sliding hover background */}
                <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
              </button>

            </form>

            {/* Stateful floating notification box when message is successfully sent */}
            <AnimatePresence>
              {isSent && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex items-center gap-3 rounded-2xl bg-emerald-600 px-5 py-3.5 text-white shadow-lg font-sans text-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <div>
                    <span className="font-bold">Inquiry Sent Successfully!</span>
                    <p className="text-xxs text-white/80 mt-0.5">We have received your message. Our concierge will follow up shortly.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}
