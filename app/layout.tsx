import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../components/context/CartContext";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Preloader } from "../components/common/Preloader";
import { WhatsAppOrder } from "../components/common/WhatsAppOrder";
import { FloatingButtons } from "../components/common/FloatingButtons";
import { OrderNowButton } from "../components/common/OrderNowButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Sizzling Plate | Premium Casual Steakhouse & Gourmet Grill",
  description: "Indulge in flame-grilled ribeye sizzlers, fresh Atlantic salmon, hand-crafted pastas, and artisanal woodfired pizzas. Book your cozy dining table today.",
  keywords: ["steaks", "sizzler", "premium casual dining", "woodfired pizza", "garlic shrimp", "lava cake", "cocktails", "table booking", "gourmet food"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-charcoal text-cream selection:bg-tomato selection:text-white font-sans">
        <CartProvider>
          {/* Restaurant Loader overlay */}
          <Preloader />

          {/* Floating glassmorphism navbar */}
          <Navbar />

          {/* Main page content area (starts from y=0 at absolute top of viewport) */}
          <main className="flex-grow w-full">
            {children}
          </main>

          {/* Core Footer section */}
          <Footer />

          {/* Shopping cart drawer overlay */}
          <WhatsAppOrder />

          {/* Call & WhatsApp Quick Buttons */}
          <FloatingButtons />

          {/* Mobile Scroll-Sensitive Order Now Pill */}
          <OrderNowButton />
        </CartProvider>
      </body>
    </html>
  );
}



