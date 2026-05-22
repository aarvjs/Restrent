export interface GalleryItem {
  id: string;
  title: string;
  category: 'dishes' | 'ambience' | 'kitchen';
  image: string;
}

export const galleryData: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Sizzling Ribeye Steak Plating',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=60&w=600',
  },
  {
    id: 'g2',
    title: 'Warm Candlelit Dining Area',
    category: 'ambience',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=60&w=600',
  },
  {
    id: 'g3',
    title: 'Chef Searing Steak with Flame',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=60&w=600',
  },
  {
    id: 'g4',
    title: 'Handcrafted Fettuccine Close-up',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=60&w=600',
  },
  {
    id: 'g5',
    title: 'Modern Cocktails at the Bar',
    category: 'dishes',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=60&w=600',
  },
  {
    id: 'g6',
    title: 'Cozy Leather Booth Seating',
    category: 'ambience',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&q=60&w=600',
  },
  {
    id: 'g7',
    title: 'Artisanal Neapolitan Pizza Oven',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=60&w=600',
  },
  {
    id: 'g8',
    title: 'Warm Bistro Exterior at Dusk',
    category: 'ambience',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=60&w=600',
  },
  {
    id: 'g9',
    title: 'Chef Plating Fresh Microgreens',
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&q=60&w=600',
  },
];
