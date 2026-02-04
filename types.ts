
export type Category = 'All' | 'Living Room' | 'Bedroom' | 'Office' | 'Dining';

export interface Project {
  id: number;
  title: string;
  category: Category;
  imageUrl: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface InstagramPost {
  id: number;
  imageUrl: string;
  alt: string;
}
