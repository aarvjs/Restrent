export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  image: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    role: 'Food Critic, Culinary Daily',
    comment: 'The Signature Ribeye Sizzler was spectacular. Searing hot on the skillet, incredibly tender, and packed with flavor. The ambiance is warm, cozy, and perfectly premium casual.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=100',
  },
  {
    id: 't2',
    name: 'Marcus Sterling',
    role: 'Local Gourmet Guide',
    comment: 'Incredible experience! The interactive ordering cart made choosing our appetizers and pizzas effortless, and the WhatsApp checkout was incredibly fast. A absolute must-visit.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=100',
  },
  {
    id: 't3',
    name: 'Sofia Rodriguez',
    role: 'Gourmet Enthusiast',
    comment: 'Best lava cake I have ever had! The combination of scorching chocolate cake and premium vanilla bean ice cream is chef-d’œuvre. The service was polite, prompt, and top-tier.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=60&w=100',
  },
];
