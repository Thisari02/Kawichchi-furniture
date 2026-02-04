
import { Project, Stat, Testimonial, InstagramPost } from './types';

export const COLORS = {
  primary: '#2C2C2C',
  background: '#F5F1EA',
  accent: '#BFA57A',
  whatsapp: '#25D366',
  white: '#FFFFFF',
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Elegant Living Space',
    category: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1583847268964-b28dc2f51ac9?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 2,
    title: 'Modern Minimal Bedroom',
    category: 'Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 3,
    title: 'Executive Office Suite',
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1470&auto=format&fit=crop'
  },
  {
    id: 4,
    title: 'Custom Teak Dining Set',
    category: 'Dining',
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-f8e167c4fa79?q=80&w=1632&auto=format&fit=crop'
  },
  {
    id: 5,
    title: 'Velvet Lounge Chair',
    category: 'Living Room',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1365&auto=format&fit=crop'
  },
  {
    id: 6,
    title: 'Master Suite Wardrobe',
    category: 'Bedroom',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef0486bc9af7?q=80&w=1287&auto=format&fit=crop'
  },
  {
    id: 7,
    title: 'Collaborative Workspace',
    category: 'Office',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1469&auto=format&fit=crop'
  },
  {
    id: 8,
    title: 'Artisan Breakfast Nook',
    category: 'Dining',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1469&auto=format&fit=crop'
  }
];

export const STATS: Stat[] = [
  { label: 'Years of Experience', value: 25, suffix: '+' },
  { label: 'Projects Completed', value: 1200, suffix: '+' },
  { label: 'Happy Clients', value: 850, suffix: '' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Amaya Perera',
    role: 'Private Residence, Colombo',
    quote: 'Every detail feels intentional. The craftsmanship and finish are stunning, and the space now feels truly bespoke.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Niroshan Silva',
    role: 'Boutique Hotel, Galle',
    quote: 'From concept to installation, the team was attentive and precise. Our guests constantly compliment the interiors.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Harini Jayawardena',
    role: 'Executive Office, Rajagiriya',
    quote: 'Premium materials, elegant lines, and flawless execution. The custom pieces elevated our brand experience.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Sahan Wickramasinghe',
    role: 'Penthouse Suite, Moratuwa',
    quote: 'The walnut and brass accents are exceptional. It feels like a luxury resort at home.',
    rating: 5,
  },
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200&auto=format&fit=crop',
    alt: 'Warm neutral living room',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop',
    alt: 'Elegant dining setting',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?q=80&w=1200&auto=format&fit=crop',
    alt: 'Minimal bedroom',
  },
  {
    id: 4,
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200&auto=format&fit=crop',
    alt: 'Statement lounge chair',
  },
  {
    id: 5,
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    alt: 'Bedroom with wood textures',
  },
  {
    id: 6,
    imageUrl: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1200&auto=format&fit=crop',
    alt: 'Bright office space',
  },
  {
    id: 7,
    imageUrl: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop',
    alt: 'Luxury living room',
  },
  {
    id: 8,
    imageUrl: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=1200&auto=format&fit=crop',
    alt: 'Dining table detail',
  },
  {
    id: 9,
    imageUrl: 'https://images.unsplash.com/photo-1505693314127-ec0a4e50c5e9?q=80&w=1200&auto=format&fit=crop',
    alt: 'Modern bedroom lighting',
  },
  {
    id: 10,
    imageUrl: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61?q=80&w=1200&auto=format&fit=crop',
    alt: 'Cozy dining setup',
  },
  {
    id: 11,
    imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
    alt: 'Refined living room detail',
  },
  {
    id: 12,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1200&auto=format&fit=crop',
    alt: 'Neutral bedroom palette',
  },
];
