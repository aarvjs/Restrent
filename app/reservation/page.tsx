'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Phone, 
  Calendar, 
  Clock, 
  Users, 
  ClipboardList, 
  CheckCircle2, 
  MessageSquare, 
  ShoppingBag, 
  MapPin, 
  Download, 
  Printer, 
  ArrowRight, 
  Search, 
  Plus, 
  Minus, 
  Check, 
  X, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { PageHero } from '../../components/common/PageHero';
import { SectionTitle } from '../../components/common/SectionTitle';
import { menuData } from '../../data/menu';

const RESERVATION_HERO_BG = "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=80&w=1600";
const RESTAURANT_WHATSAPP = "91XXXXXXXXXX";

export default function ReservationPage() {
  const [activeTab, setActiveTab] = useState<'table' | 'food'>('table');
  const [orderId, setOrderId] = useState('');
  
  // Table form state
  const [tableForm, setTableForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    specialRequest: '',
  });

  // Food form state
  const [foodForm, setFoodForm] = useState({
    name: '',
    phone: '',
    type: 'delivery', // 'delivery' | 'pickup'
    address: '',
    specialInstructions: '',
  });

  // Search and select items for ordering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[]>([]);
  const [showItemDropdown, setShowItemDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [toastMessage, setToastMessage] = useState('');

  // Generate a random stable order/booking ID on tab switch or mount
  useEffect(() => {
    const randomId = 'TSP-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(randomId);
  }, [activeTab]);

  // Click outside handler to close custom food dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowItemDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toast auto-clear
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Redirection handler on success submit
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showSuccessModal && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (showSuccessModal && countdown === 0) {
      // Build WhatsApp redirection payload
      let messageText = '';
      if (activeTab === 'table') {
        messageText = `--- THE SIZZLING PLATE - TABLE BOOKING ---
Booking ID: ${orderId}

Name: ${tableForm.name}
Phone: ${tableForm.phone}
Date: ${tableForm.date}
Time: ${tableForm.time}
Number of Guests: ${tableForm.guests}
Special Request: ${tableForm.specialRequest.trim() || 'None'}

Thank you!
----------------------------------------`;
      } else {
        const itemsList = selectedItems
          .map((item) => `- ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}`)
          .join('\n');
        const subtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const tax = subtotal * 0.08;
        const deliveryFee = foodForm.type === 'delivery' ? 5.00 : 0.00;
        const total = subtotal + tax + deliveryFee;

        messageText = `--- THE SIZZLING PLATE - FOOD ORDER ---
Order ID: ${orderId}

Name: ${foodForm.name}
Phone: ${foodForm.phone}
Option: ${foodForm.type.toUpperCase()}
${foodForm.type === 'delivery' ? `Address: ${foodForm.address}\n` : ''}
Items Ordered:
${itemsList}

Subtotal: $${subtotal.toFixed(2)}
Tax (8%): $${tax.toFixed(2)}
${foodForm.type === 'delivery' ? `Delivery Fee: $${deliveryFee.toFixed(2)}\n` : ''}Grand Total: $${total.toFixed(2)}

Special Instructions: ${foodForm.specialInstructions.trim() || 'None'}

Thank you!
----------------------------------------`;
      }

      const encodedText = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodedText}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Reset forms and modal
      setTableForm({
        name: '',
        phone: '',
        date: '',
        time: '',
        guests: '2',
        specialRequest: '',
      });
      setFoodForm({
        name: '',
        phone: '',
        type: 'delivery',
        address: '',
        specialInstructions: '',
      });
      setSelectedItems([]);
      setShowSuccessModal(false);
      setCountdown(3);
      setIsSubmitting(false);
    }
    return () => clearTimeout(timer);
  }, [showSuccessModal, countdown]);

  const handleTableChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTableForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFoodChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFoodForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add item helper for Food Ordering
  const addFoodItem = (item: typeof menuData[0]) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
    setToastMessage(`Added "${item.name}" to your order!`);
  };

  // Remove/Decrease quantity of item
  const updateQuantity = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as typeof selectedItems;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'table') {
      if (!tableForm.name || !tableForm.phone || !tableForm.date || !tableForm.time) return;
    } else {
      if (!foodForm.name || !foodForm.phone) return;
      if (selectedItems.length === 0) {
        setToastMessage('Please select at least one food item before placing order!');
        return;
      }
      if (foodForm.type === 'delivery' && !foodForm.address) {
        setToastMessage('Please enter a delivery address!');
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 1000);
  };

  // Custom receipt-only printer trigger
  const handlePrint = () => {
    const printContent = document.getElementById('receipt-card-body');
    if (!printContent) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt - The Sizzling Plate</title>
            <style>
              body { 
                font-family: 'Courier New', Courier, monospace; 
                background: white; 
                color: #111827; 
                padding: 30px; 
              }
              .receipt-container { 
                max-width: 400px; 
                margin: auto; 
                border: 2px dashed #111827; 
                padding: 24px; 
                border-radius: 8px;
              }
              .center { text-align: center; }
              .divider { border-top: 1px dashed #111827; margin: 12px 0; }
              .flex-row { display: flex; justify-content: space-between; margin-bottom: 6px; }
              .bold { font-weight: bold; }
              .text-sm { font-size: 14px; }
              .text-xs { font-size: 12px; }
              .barcode { letter-spacing: 4px; text-align: center; margin-top: 20px; font-size: 16px; }
            </style>
          </head>
          <body>
            <div class="receipt-container">
              ${printContent.innerHTML}
            </div>
            <script>
              window.onload = function() {
                window.print();
                window.close();
              }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Calculate order metrics
  const foodSubtotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const foodTax = foodSubtotal * 0.08;
  const foodDeliveryFee = foodForm.type === 'delivery' && foodSubtotal > 0 ? 5.00 : 0.00;
  const foodGrandTotal = foodSubtotal + foodTax + foodDeliveryFee;

  // Filter items in dropdown by search
  const filteredMenuItems = menuData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full bg-cream pb-24 font-sans text-charcoal relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-charcoal text-cream border border-tomato/20 shadow-2xl px-6 py-3.5 rounded-2xl flex items-center gap-3"
          >
            <Sparkles className="h-4.5 w-4.5 text-tomato animate-pulse" />
            <span className="text-xs font-semibold tracking-wide">{toastMessage}</span>
            <button onClick={() => setToastMessage('')} className="p-0.5 hover:bg-white/10 rounded-full transition-colors">
              <X className="h-3.5 w-3.5 text-cream/60" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header stays perfectly as configured */}
      <PageHero
        title="Reservations & Orders"
        backgroundImage={RESERVATION_HERO_BG}
        subtitle="Secure premium casual seating or pre-order sizzling plates instantly to your doorstep."
        currentPageName="Reservation"
      />

      {/* Intro Section Below Hero */}
      <div className="mx-auto max-w-7xl px-4 mt-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs font-bold tracking-widest text-tomato uppercase block">
              Concierge Services
            </span>
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl leading-tight">
              A Table Shared, <br className="hidden sm:inline" />
              A Feast Ordered Sizzling Hot
            </h2>
            <div className="h-0.5 w-16 bg-tomato" />
            <p className="text-base leading-relaxed text-charcoal/80">
              Welcome to the digital concierge at <strong>The Sizzling Plate</strong>. Whether you seek to immerse yourself in the warm ambiance of our dining hall or desire our chef-driven recipes delivered hot, our automated system ensures absolute convenience.
            </p>
            <p className="text-sm leading-relaxed text-charcoal/70">
              Fill out the interactive drafting console below. In real-time, we will compile your visual dining receipt. Submit to redirect directly to our live WhatsApp desk for final confirmation.
            </p>
          </div>

          {/* Visual Showcase (Grid of premium food images) */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-charcoal/10 shadow-lg group">
              <Image 
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600"
                alt="Ribeye steak platter"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-[9px] font-bold text-cream tracking-widest uppercase bg-tomato/90 px-2.5 py-1 rounded-md">
                Dine-In Luxury
              </span>
            </div>
            
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-charcoal/10 shadow-lg group mt-6 lg:mt-10">
              <Image 
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600"
                alt="Stonebaked pizza"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-mono text-[9px] font-bold text-cream tracking-widest uppercase bg-warm-orange/90 px-2.5 py-1 rounded-md">
                Hot Delivery
              </span>
            </div>
          </div>

        </div>

        {/* Tab Controls Switcher */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="flex rounded-2xl bg-charcoal/5 p-1.5 border border-charcoal/10">
            <button
              onClick={() => setActiveTab('table')}
              className={`relative px-8 py-3.5 rounded-xl font-sans text-xs font-bold tracking-wider transition-all uppercase flex items-center gap-2 cursor-pointer ${
                activeTab === 'table' 
                  ? 'bg-charcoal text-cream shadow-md' 
                  : 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
              }`}
            >
              <Calendar className="h-4 w-4" />
              Book a Table
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`relative px-8 py-3.5 rounded-xl font-sans text-xs font-bold tracking-wider transition-all uppercase flex items-center gap-2 cursor-pointer ${
                activeTab === 'food' 
                  ? 'bg-charcoal text-cream shadow-md' 
                  : 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
              }`}
            >
              <ShoppingBag className="h-4 w-4" />
              Order Food
            </button>
          </div>
        </div>

        {/* Main Grid Layout: Form (Left) & Live Receipt (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Tab Form Column */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-charcoal/5 p-6 sm:p-8 shadow-xl">
            
            {activeTab === 'table' ? (
              // Table Booking Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-charcoal/5 pb-4 mb-6">
                  <h3 className="font-sans text-lg font-bold text-charcoal">Dine-In Request</h3>
                  <p className="text-xs text-charcoal/60 mt-1">Book your spot at our 450°F sizzling tables.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        value={tableForm.name}
                        onChange={handleTableChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={tableForm.phone}
                        onChange={handleTableChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Date */}
                  <div className="flex flex-col">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Preferred Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <input
                        type="date"
                        name="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={tableForm.date}
                        onChange={handleTableChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex flex-col">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Preferred Time Slot
                    </label>
                    <div className="relative">
                      <Clock className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <input
                        type="time"
                        name="time"
                        required
                        value={tableForm.time}
                        onChange={handleTableChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="flex flex-col sm:col-span-2">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Number of Guests
                    </label>
                    <div className="relative">
                      <Users className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <select
                        name="guests"
                        value={tableForm.guests}
                        onChange={handleTableChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal focus:border-tomato/50 focus:bg-white focus:outline-none appearance-none cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                        <option value="10+">10+ Guests (Banquet Request)</option>
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="flex flex-col sm:col-span-2">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Special Requests / Dietary Notes
                    </label>
                    <div className="relative">
                      <ClipboardList className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <textarea
                        name="specialRequest"
                        placeholder="e.g. Birthday request, window booth booth seat, extreme peanut allergy, high-chair for toddler..."
                        rows={4}
                        value={tableForm.specialRequest}
                        onChange={handleTableChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden group/btn flex items-center justify-center gap-2 rounded-xl bg-charcoal py-4 font-sans text-sm font-bold text-white shadow-lg active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending Draft details...</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-4.5 w-4.5" />
                        <span>Book Table on WhatsApp</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            ) : (
              // Food Ordering Form
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="border-b border-charcoal/5 pb-4 mb-6">
                  <h3 className="font-sans text-lg font-bold text-charcoal">Gourmet Delivery & Pickup</h3>
                  <p className="text-xs text-charcoal/60 mt-1">Pre-order fresh dishes prepared sizzling hot.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your full name"
                        value={foodForm.name}
                        onChange={handleFoodChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={foodForm.phone}
                        onChange={handleFoodChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Option Toggle */}
                  <div className="flex flex-col sm:col-span-2">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Fullfillment Method
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFoodForm(prev => ({ ...prev, type: 'delivery' }))}
                        className={`py-3.5 rounded-xl border font-sans text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          foodForm.type === 'delivery' 
                            ? 'bg-charcoal text-cream border-charcoal shadow-sm' 
                            : 'bg-cream/10 text-charcoal/70 border-charcoal/10 hover:bg-cream/20'
                        }`}
                      >
                        <MapPin className="h-4 w-4" />
                        Home Delivery
                      </button>
                      <button
                        type="button"
                        onClick={() => setFoodForm(prev => ({ ...prev, type: 'pickup' }))}
                        className={`py-3.5 rounded-xl border font-sans text-xs font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                          foodForm.type === 'pickup' 
                            ? 'bg-charcoal text-cream border-charcoal shadow-sm' 
                            : 'bg-cream/10 text-charcoal/70 border-charcoal/10 hover:bg-cream/20'
                        }`}
                      >
                        <ShoppingBag className="h-4 w-4" />
                        Self Pickup
                      </button>
                    </div>
                  </div>

                  {/* Interactive Custom Menu Selection */}
                  <div className="flex flex-col sm:col-span-2 relative" ref={dropdownRef}>
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Select Food Items
                    </label>
                    <div className="relative">
                      <Search className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <input
                        type="text"
                        placeholder="Search signature dishes, pizzas, starters..."
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setShowItemDropdown(true);
                        }}
                        onFocus={() => setShowItemDropdown(true)}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>

                    {/* Menu dropdown selection panel */}
                    <AnimatePresence>
                      {showItemDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 5 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 top-full z-30 max-h-60 overflow-y-auto rounded-2xl border border-charcoal/15 bg-white shadow-2xl p-2 mt-1.5 scrollbar-thin"
                        >
                          {filteredMenuItems.length > 0 ? (
                            filteredMenuItems.map((item) => {
                              const isAdded = selectedItems.some((si) => si.id === item.id);
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => addFoodItem(item)}
                                  className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-cream/30 text-left transition-colors cursor-pointer group/item text-charcoal"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-charcoal/5">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                      />
                                    </div>
                                    <div>
                                      <h4 className="text-xs font-bold text-charcoal group-hover/item:text-tomato transition-colors">
                                        {item.name}
                                      </h4>
                                      <p className="text-[10px] text-charcoal/50 font-mono capitalize">
                                        {item.category} • ${item.price.toFixed(2)}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-charcoal/5 text-charcoal group-hover/item:bg-tomato group-hover/item:text-white transition-colors">
                                    {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                  </div>
                                </button>
                              );
                            })
                          ) : (
                            <div className="py-8 text-center text-xs text-charcoal/50">
                              No dishes found matching your search.
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Selected Dishes display badges list with quantity modify controls */}
                    {selectedItems.length > 0 && (
                      <div className="mt-4 space-y-3 bg-cream/10 border border-charcoal/5 rounded-2xl p-4">
                        <span className="text-[10px] font-mono font-bold tracking-wider text-charcoal/50 uppercase block border-b border-charcoal/5 pb-2">
                          Your Basket ({selectedItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
                        </span>
                        
                        {selectedItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs py-1">
                            <span className="font-bold text-charcoal pr-4 truncate">{item.name}</span>
                            <div className="flex items-center gap-3 shrink-0">
                              <span className="font-mono text-charcoal/60 font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                              <div className="flex items-center rounded-lg border border-charcoal/10 bg-white p-0.5 overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="h-6 w-6 flex items-center justify-center rounded hover:bg-cream/40 transition-colors text-charcoal/70"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="w-6 text-center font-bold font-mono text-[11px]">{item.quantity}</span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="h-6 w-6 flex items-center justify-center rounded hover:bg-cream/40 transition-colors text-charcoal/70"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Delivery Address (only if Delivery is selected) */}
                  {foodForm.type === 'delivery' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col sm:col-span-2 overflow-hidden"
                    >
                      <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                        Delivery Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                        <input
                          type="text"
                          name="address"
                          required
                          placeholder="House/Flat No, Street Name, Zip Code"
                          value={foodForm.address}
                          onChange={handleFoodChange}
                          className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Special Instructions */}
                  <div className="flex flex-col sm:col-span-2">
                    <label className="text-xs font-mono font-bold tracking-wider text-charcoal/70 uppercase mb-2">
                      Special Instructions
                    </label>
                    <div className="relative">
                      <ClipboardList className="absolute top-3.5 left-4 h-4.5 w-4.5 text-charcoal/40" />
                      <textarea
                        name="specialInstructions"
                        placeholder="e.g. Leave by door, dial ring 3 on lobby, spicy sauce on the side, no mushrooms please..."
                        rows={4}
                        value={foodForm.specialInstructions}
                        onChange={handleFoodChange}
                        className="w-full rounded-xl border border-charcoal/10 bg-cream/20 py-3.5 pl-11 pr-4 text-sm text-charcoal placeholder-charcoal/40 focus:border-tomato/50 focus:bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative overflow-hidden group/btn flex items-center justify-center gap-2 rounded-xl bg-charcoal py-4 font-sans text-sm font-bold text-white shadow-lg active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-t from-tomato to-warm-orange translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        <span>Sending Draft details...</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="h-4.5 w-4.5" />
                        <span>Order on WhatsApp</span>
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}

          </div>

          {/* Live Thermal Receipt Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div 
              id="receipt-card"
              className="bg-white rounded-3xl border border-charcoal/10 shadow-2xl p-6 relative overflow-hidden flex flex-col font-mono text-charcoal/80"
              style={{
                backgroundImage: 'radial-gradient(ellipse at top, #FFF7ED 0%, #ffffff 100%)'
              }}
            >
              
              {/* Thermal printer paper top jagged decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tomato via-warm-orange to-golden" />
              
              {/* Receipt Body Frame */}
              <div id="receipt-card-body" className="flex flex-col">
                
                {/* Header branding */}
                <div className="text-center py-4 border-b border-dashed border-charcoal/20">
                  <h3 className="text-sm font-extrabold tracking-wider text-charcoal">
                    THE SIZZLING PLATE
                  </h3>
                  <p className="text-[10px] text-charcoal/50 leading-normal mt-1">
                    123 Grillhouse Blvd, Gastronomy City <br />
                    Phone: +1 (555) 749-9537
                  </p>
                  <div className="mt-3 inline-block border border-charcoal text-[9px] px-2 py-0.5 rounded uppercase font-bold tracking-widest bg-charcoal text-cream">
                    {activeTab === 'table' ? 'Table Booking' : 'Food Order'}
                  </div>
                </div>

                {/* Meta details */}
                <div className="py-4 text-[10px] space-y-1.5 border-b border-dashed border-charcoal/20">
                  <div className="flex justify-between">
                    <span>RECEIPT NO:</span>
                    <span className="font-bold text-charcoal">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DATE:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TIME:</span>
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                {/* Dynamic Content */}
                <div className="py-4 text-xs space-y-4">
                  
                  {/* Name & Phone */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-charcoal/40 uppercase block">Customer Info:</span>
                    <div className="flex justify-between text-[11px]">
                      <span>Name:</span>
                      <span className="font-bold text-charcoal">
                        {activeTab === 'table' 
                          ? (tableForm.name || 'GUEST CUSTOMER') 
                          : (foodForm.name || 'GUEST CUSTOMER')}
                      </span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span>Phone:</span>
                      <span className="font-bold text-charcoal">
                        {activeTab === 'table' 
                          ? (tableForm.phone || 'NOT PROVIDED') 
                          : (foodForm.phone || 'NOT PROVIDED')}
                      </span>
                    </div>
                  </div>

                  {activeTab === 'table' ? (
                    /* Dine-In Receipt Details */
                    <div className="space-y-3 pt-2 border-t border-dotted border-charcoal/10">
                      <span className="text-[10px] text-charcoal/40 uppercase block">Booking Specs:</span>
                      
                      <div className="flex justify-between text-[11px]">
                        <span>Dine Date:</span>
                        <span className="font-bold text-charcoal">{tableForm.date || 'SELECT DATE'}</span>
                      </div>
                      
                      <div className="flex justify-between text-[11px]">
                        <span>Time Slot:</span>
                        <span className="font-bold text-charcoal">{tableForm.time || 'SELECT TIME'}</span>
                      </div>
                      
                      <div className="flex justify-between text-[11px]">
                        <span>Guests Count:</span>
                        <span className="font-bold text-charcoal">{tableForm.guests} Guests</span>
                      </div>

                      {tableForm.specialRequest && (
                        <div className="pt-2">
                          <span className="text-[10px] text-charcoal/40 uppercase block mb-1">Dietary / Notes:</span>
                          <p className="text-[10px] bg-charcoal/5 p-2 rounded leading-relaxed border border-charcoal/5 break-words">
                            {tableForm.specialRequest}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Food Order Receipt Details */
                    <div className="space-y-4 pt-2 border-t border-dotted border-charcoal/10">
                      <div className="flex justify-between text-[11px]">
                        <span>Fulfillment:</span>
                        <span className="font-bold text-charcoal capitalize">{foodForm.type}</span>
                      </div>

                      {foodForm.type === 'delivery' && foodForm.address && (
                        <div className="text-[10px]">
                          <span className="text-charcoal/40 uppercase block mb-1">Delivering To:</span>
                          <p className="leading-tight break-words bg-charcoal/5 p-2 rounded border border-charcoal/5">{foodForm.address}</p>
                        </div>
                      )}

                      {/* Items lists */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-charcoal/40 uppercase block border-b border-dotted border-charcoal/10 pb-1">
                          Items List:
                        </span>
                        {selectedItems.length > 0 ? (
                          <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                            {selectedItems.map((item) => (
                              <div key={item.id} className="flex justify-between text-[10px]">
                                <span className="truncate pr-2">{item.name} (x{item.quantity})</span>
                                <span className="shrink-0 font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center text-[10px] text-charcoal/40 py-2 border border-dashed border-charcoal/10 rounded-lg">
                            Basket Empty
                          </div>
                        )}
                      </div>

                      {/* Pricing outline */}
                      <div className="pt-2 border-t border-dashed border-charcoal/20 text-[10px] space-y-1">
                        <div className="flex justify-between">
                          <span>SUBTOTAL:</span>
                          <span>${foodSubtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>TAX (8%):</span>
                          <span>${foodTax.toFixed(2)}</span>
                        </div>
                        {foodForm.type === 'delivery' && (
                          <div className="flex justify-between">
                            <span>DELIVERY FEE:</span>
                            <span>${foodDeliveryFee.toFixed(2)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs font-bold text-charcoal border-t border-dotted border-charcoal/25 pt-1.5">
                          <span>GRAND TOTAL:</span>
                          <span>${foodGrandTotal.toFixed(2)}</span>
                        </div>
                      </div>

                      {foodForm.specialInstructions && (
                        <div>
                          <span className="text-[10px] text-charcoal/40 uppercase block mb-1">Instructions:</span>
                          <p className="text-[10px] bg-charcoal/5 p-2 rounded leading-relaxed border border-charcoal/5 break-words">
                            {foodForm.specialInstructions}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mono barcode styling for reality check */}
                  <div className="text-center pt-4 border-t border-dashed border-charcoal/20">
                    <span className="text-[14px] font-bold text-charcoal tracking-[3px] block">
                      * {orderId} *
                    </span>
                    <span className="text-[8px] text-charcoal/40 uppercase tracking-[1px] mt-1 block">
                      Thank you for dining with us!
                    </span>
                  </div>

                </div>

              </div>

              {/* Action Print / Copy Receipt buttons */}
              <div className="mt-4 flex gap-3 border-t border-charcoal/5 pt-4 z-10">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-charcoal/15 bg-white py-3 font-sans text-xs font-bold text-charcoal shadow-sm hover:bg-cream/40 transition-colors cursor-pointer"
                >
                  <Printer className="h-3.5 w-3.5 text-tomato" />
                  Print Receipt
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const printContent = document.getElementById('receipt-card-body')?.innerText;
                    if (printContent) {
                      navigator.clipboard.writeText(printContent);
                      setToastMessage('Receipt text copied to clipboard!');
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-charcoal/15 bg-white py-3 font-sans text-xs font-bold text-charcoal shadow-sm hover:bg-cream/40 transition-colors cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-tomato" />
                  Save Draft
                </button>
              </div>

            </div>

            {/* Visual reassurance guidelines for payment */}
            <div className="bg-white rounded-3xl border border-charcoal/5 p-5 shadow-lg flex gap-4 items-start">
              <div className="h-9 w-9 bg-tomato/10 text-tomato rounded-xl flex items-center justify-center shrink-0">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-sans text-xs font-bold text-charcoal">
                  Direct WhatsApp Flow
                </h4>
                <p className="font-sans text-[11px] text-charcoal/60 leading-normal mt-1">
                  We currently use a safe direct connection. No credit card or upfront payments are captured here. You only finalize order/seating once verified by our staff over WhatsApp.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Call To Action Block */}
        <div className="mt-20 border border-charcoal/10 rounded-3xl bg-white p-8 text-center max-w-3xl mx-auto shadow-lg relative overflow-hidden">
          <div className="absolute -top-12 -right-12 h-24 w-24 rounded-full bg-tomato/5 blur-xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 h-24 w-24 rounded-full bg-golden/5 blur-xl pointer-events-none" />
          
          <h3 className="font-sans text-xl font-extrabold text-charcoal">
            Need Immediate Help?
          </h3>
          <p className="text-sm text-charcoal/70 mt-2 max-w-lg mx-auto">
            Our hosts are available daily from 11:00 AM to 11:00 PM to answer dietary queries, private party space requests, or custom catering needs.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center items-center gap-4.5">
            <a 
              href="tel:+15557499537"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-charcoal/10 font-sans text-xs font-bold text-charcoal bg-white shadow-sm hover:bg-cream/40 transition-colors"
            >
              <Phone className="h-4 w-4 text-tomato" />
              <span>Call Us: +1 (555) 749-9537</span>
            </a>
            <a 
              href={`https://wa.me/${RESTAURANT_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-charcoal font-sans text-xs font-bold text-white shadow-md hover:scale-102 active:scale-98 transition-all"
            >
              <MessageSquare className="h-4 w-4 text-golden" />
              <span>Concierge Chat</span>
            </a>
          </div>
        </div>

      </div>

      {/* SUCCESS OVERLAY MODAL */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 font-sans">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            />
            
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-md rounded-3xl border border-charcoal/10 bg-white p-8 text-center shadow-2xl text-charcoal"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-tomato/10 text-tomato mb-5">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>
              
              <h3 className="text-xl font-bold text-charcoal">
                Draft Details Compiled!
              </h3>
              
              <p className="mt-3 text-sm text-charcoal/70 leading-relaxed">
                Thank you! Your {activeTab === 'table' ? 'seating request' : 'food order specs'} details have been generated successfully as <strong>{orderId}</strong>. 
                We are launching your WhatsApp concierge to complete the confirmation.
              </p>

              {/* Progress Countdowns */}
              <div className="mt-8 flex flex-col items-center justify-center">
                <span className="font-mono text-xs tracking-wider text-tomato font-bold uppercase mb-2">
                  Opening WhatsApp in {countdown}s
                </span>
                <div className="h-1.5 w-28 overflow-hidden rounded-full bg-cream border border-charcoal/5">
                  <motion.div
                    className="h-full bg-gradient-to-r from-tomato to-warm-orange"
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
