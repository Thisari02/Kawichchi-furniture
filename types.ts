
export type Category = 'Living Room' | 'Bedroom' | 'Office' | 'Dining';
export type FilterCategory = Category | 'All';

export type LivingRoomSubcategory = 'Sofa Collection' | 'Lounge Area' | 'Entertainment Wall';
export type BedroomSubcategory = 'Master Bedroom' | 'Guest Suite' | 'Dressing Room';
export type OfficeSubcategory = 'Executive Suite' | 'Creative Studio' | 'Conference Room';
export type DiningSubcategory = 'Formal Dining' | 'Breakfast Nook' | 'Banquet Table';
export type Subcategory = LivingRoomSubcategory | BedroomSubcategory | OfficeSubcategory | DiningSubcategory;

export interface Project {
  _id?: string;
  id: number;
  title: string;
  category: Category;
  subcategory: Subcategory;
  location: string;
  materials: string[];
  description: string;
  imageUrl: string;
  portfolio?: string[];
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

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface VideoShowcase {
  id: number;
  title: string;
  tag: string;
  thumbnail: string;
}
