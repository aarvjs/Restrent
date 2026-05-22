'use client';

import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, Send, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Standard WhatsApp restaurant contact placeholder
const RESTAURANT_WHATSAPP = "91XXXXXXXXXX";

export const WhatsAppOrder: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartTotal,
    clearCart,
  } = useCart();

  const [diningType, setDiningType] = useState<'dine-in' | 'takeaway' | 'delivery'>('dine-in');
  const [specialNote, setSpecialNote] = useState('');
  const [isCheckoutClicked, setIsCheckoutClicked] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setIsCheckoutClicked(true);

    // Format the items text
    const itemsText = cart
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} ($${(ci.item.price * ci.quantity).toFixed(2)})`
      )
      .join('\n');

    // Build the beautiful WhatsApp text message (without raw emojis to follow "no emoji" rules in UI, but standard professional formatting is fine. Let's use clean text symbols!)
    const message = `--- THE SIZZLING PLATE - NEW ORDER ---
Hello! I would like to place a new order from your website.

[ORDER DETAILS]
${itemsText}

----------------------------------------
Dining Preference: ${diningType.toUpperCase()}
Special Note: ${specialNote.trim() || 'None'}
----------------------------------------
Estimated Total: $${cartTotal.toFixed(2)}

Thank you!
----------------------------------------`;

    // Encode URL
    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodedText}`;

    // Small delay to show checkout modal confirmation before redirecting
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsCheckoutClicked(false);
      clearCart();
      setIsCartOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-charcoal border-l border-white/5 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-tomato" />
            <h2 className="text-lg font-bold text-cream">Your Order Draft</h2>
            <span className="rounded-full bg-tomato/20 px-2 py-0.5 text-xs font-semibold text-tomato">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="rounded-lg p-1.5 text-cream/60 transition-colors hover:bg-white/5 hover:text-cream cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-grow overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-full bg-white/5 p-4 text-cream/40 mb-4">
                <ShoppingBag className="h-8 w-8 stroke-[1.5]" />
              </div>
              <h3 className="text-base font-semibold text-cream">Your Cart is Empty</h3>
              <p className="mt-1 text-xs text-cream/50 max-w-[240px]">
                Browse our gourmet menu and add delicious sizzlers to compile your order draft!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((ci) => (
                <div
                  key={ci.item.id}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/3 p-3.5"
                >
                  {/* Info details */}
                  <div className="flex-grow">
                    <h4 className="text-sm font-semibold text-cream line-clamp-1">{ci.item.name}</h4>
                    <span className="mt-0.5 block font-mono text-xs font-medium text-tomato">
                      ${ci.item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2 rounded-lg bg-charcoal border border-white/5 px-2 py-1">
                    <button
                      onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                      className="text-cream/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-cream">{ci.quantity}</span>
                    <button
                      onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                      className="text-cream/60 hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(ci.item.id)}
                    className="text-cream/40 hover:text-tomato transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                </div>
              ))}

              {/* Order Settings Section */}
              <div className="mt-6 border-t border-white/5 pt-6 space-y-4">
                {/* Dining Type Selector */}
                <div>
                  <label className="block text-xs font-mono font-semibold tracking-wider text-cream/60 uppercase mb-2">
                    Dining Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['dine-in', 'takeaway', 'delivery'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setDiningType(type)}
                        className={`rounded-lg py-2 text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                          diningType === type
                            ? 'bg-tomato border-tomato text-white'
                            : 'border-white/5 bg-white/3 text-cream/70 hover:text-white hover:border-white/10'
                        }`}
                      >
                        {type.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Instructions Note */}
                <div>
                  <label className="block text-xs font-mono font-semibold tracking-wider text-cream/60 uppercase mb-2">
                    Special Notes
                  </label>
                  <div className="relative">
                    <textarea
                      placeholder="e.g. Rare beef steak, dressing on side, nut allergy details..."
                      value={specialNote}
                      onChange={(e) => setSpecialNote(e.target.value)}
                      className="w-full rounded-lg border border-white/5 bg-white/3 p-3 text-xs text-cream placeholder-cream/45 focus:border-tomato/50 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Billing & CTA */}
        {cart.length > 0 && (
          <div className="border-t border-white/5 bg-white/2 px-6 py-6 space-y-4">
            {/* Live Pricing Breakdown */}
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-cream/60">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream/60">
                <span>Tax & Service Charge</span>
                <span className="text-golden font-semibold">Calculated on checkout</span>
              </div>
              <div className="flex justify-between border-t border-white/5 pt-3 text-sm font-bold text-cream">
                <span>Estimated Total</span>
                <span className="text-base text-golden">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Check out CTA */}
            <button
              onClick={handleCheckout}
              disabled={isCheckoutClicked}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 py-4 font-sans text-sm font-bold text-white shadow-lg shadow-emerald-900/10 transition-all cursor-pointer"
            >
              {isCheckoutClicked ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Preparing Draft...</span>
                </>
              ) : (
                <>
                  <MessageSquare className="h-4.5 w-4.5" />
                  <span>Order on WhatsApp</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
