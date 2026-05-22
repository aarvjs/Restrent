export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'mains' | 'pizza' | 'drinks' | 'desserts';
  price: number;
  rating: number;
  description: string;
  image: string;
  isSpecial?: boolean;
}

export const menuData: MenuItem[] = [
  // Starters
  {
    id: 's1',
    name: 'Sizzling Garlic Shrimp',
    category: 'starters',
    price: 16.99,
    rating: 4.9,
    description: 'Plump tail-on shrimp pan-seared in rich garlic butter, roasted chili flakes, and squeezed fresh lemon juice, served sizzling.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800',
    isSpecial: true,
  },
  {
    id: 's2',
    name: 'Crispy Calamari Fritti',
    category: 'starters',
    price: 14.50,
    rating: 4.7,
    description: 'Tender squid lightly dusted in seasoned flour, flash-fried to golden perfection, served with a zesty citrus-herb aioli.',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800',
  },
  {
    id: 's3',
    name: 'Roasted Truffle Bruschetta',
    category: 'starters',
    price: 12.99,
    rating: 4.8,
    description: 'Toasted artisanal sourdough rubbed with fresh garlic, topped with heirloom cherry tomatoes, fresh basil, and finished with white truffle glaze.',
    image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
  },

  // Main Course
  {
    id: 'm1',
    name: 'Signature Ribeye Sizzler',
    category: 'mains',
    price: 38.99,
    rating: 5.0,
    description: '14oz prime aged ribeye steak served on a scorching cast-iron skillet, smothered in rosemary butter, grilled asparagus, and garlic mash.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
  },
  {
    id: 'm2',
    name: 'Pan-Seared Atlantic Salmon',
    category: 'mains',
    price: 29.50,
    rating: 4.8,
    description: 'Crispy-skin salmon fillet rested on creamy wild mushroom risotto, drizzled with a bright lemon dill cream sauce.',
    image: 'https://images.unsplash.com/photo-1485962398705-ef6a13c41e8f?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
  },
  {
    id: 'm3',
    name: 'Gourmet Fettuccine Alfredo',
    category: 'mains',
    price: 24.99,
    rating: 4.6,
    description: 'Handcrafted fettuccine tossed in a velvet Parmigiano-Reggiano cream sauce, topped with slow-roasted chicken breast and fresh thyme.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
  },

  // Pizza
  {
    id: 'p1',
    name: 'The Sizzling Firehouse Pizza',
    category: 'pizza',
    price: 19.99,
    rating: 4.9,
    description: 'House tomato sauce, spicy calabrian salami, jalapeños, smoked mozzarella, fresh basil, and a hot honey drizzle.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
  },
  {
    id: 'p2',
    name: 'Truffle & Forest Mushroom',
    category: 'pizza',
    price: 21.50,
    rating: 4.8,
    description: 'Creamy white sauce base, roasted wild mushrooms, taleggio cheese, fresh arugula, and premium black truffle oil.',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'p3',
    name: 'Classic Margherita Royale',
    category: 'pizza',
    price: 17.99,
    rating: 4.7,
    description: 'Slow-simmered San Marzano tomatoes, creamy buffalo mozzarella, extra virgin olive oil, and fresh picked sweet basil leaves.',
    image: 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?auto=format&fit=crop&q=80&w=800',
  },

  // Drinks
  {
    id: 'd1',
    name: 'Smoked Orange Old Fashioned',
    category: 'drinks',
    price: 14.00,
    rating: 4.9,
    description: 'Premium rye bourbon, angostura bitters, house-made orange-demerara syrup, smoked tableside with cherry wood chips.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
  },
  {
    id: 'd2',
    name: 'Cucumber Basil Cooler',
    category: 'drinks',
    price: 8.50,
    rating: 4.6,
    description: 'A refreshing zero-proof mocktail of muddled english cucumber, sweet basil, fresh lime juice, and sparkling soda.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'd3',
    name: 'Hibiscus Blossom Mojito',
    category: 'drinks',
    price: 13.00,
    rating: 4.8,
    description: 'Silver rum, freshly squeezed lime, crushed garden mint, house hibiscus extract, capped with crushed ice and soda.',
    image: 'https://images.unsplash.com/photo-1575444758702-4a6b9222336e?auto=format&fit=crop&q=80&w=800',
  },

  // Desserts
  {
    id: 'de1',
    name: 'Sizzling Lava Fudge Cake',
    category: 'desserts',
    price: 12.99,
    rating: 4.9,
    description: 'Scorching hot decadent chocolate cake with a molten core, served with a scoop of premium vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800',
    isSpecial: true,
  },
  {
    id: 'de2',
    name: 'Madagascar Vanilla Crème Brûlée',
    category: 'desserts',
    price: 11.50,
    rating: 4.8,
    description: 'Creamy custard infused with real Madagascar vanilla beans, complete with a perfectly caramelized sugar shell.',
    image: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?auto=format&fit=crop&q=80&w=800',
  },
];
