
import { Stat, Testimonial, InstagramPost, ProcessStep, VideoShowcase } from './types';

export const COLORS = {
  primary: '#2C2C2C',
  background: '#F5F1EA',
  accent: '#D4AF37',
  whatsapp: '#25D366',
  white: '#FFFFFF',
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 1,
    title: 'Design Consultation',
    description: 'We translate your vision into tailored spatial concepts and refined material palettes.',
    image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?q=80&w=1200&auto=format&fit=crop',
    icon: 'Compass',
  },
  {
    id: 2,
    title: 'Wood Selection',
    description: 'Every timber slab is personally curated for grain, tone, and structural integrity.',
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
    icon: 'Trees',
  },
  {
    id: 3,
    title: 'Master Production',
    description: 'Skilled artisans craft, assemble, and finish each detail with uncompromising precision.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    icon: 'Hammer',
  },
  {
    id: 4,
    title: 'White-Glove Delivery',
    description: 'Installation, styling, and care instructions delivered with luxury hospitality standards.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
    icon: 'Truck',
  },
];

export const VIDEO_SHOWCASE: VideoShowcase[] = [
  {
    id: 1,
    title: 'Workshop Tour: Craft in Motion',
    tag: 'Factory',
    thumbnail: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'From Timber to Masterpiece',
    tag: 'Craft',
    thumbnail: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Luxury Finishing Atelier',
    tag: 'Finishing',
    thumbnail: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop',
  },
];

export const STATS: Stat[] = [
  { label: 'Years of Experience', value: 20, suffix: '+' },
  { label: 'Projects Completed', value: 1500, suffix: '+' },
  { label: 'Happy Clients', value: 500, suffix: '' },
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
