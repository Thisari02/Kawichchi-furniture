
import { Project, Stat } from './types';

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
