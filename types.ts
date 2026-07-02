
export type Category = string;
export type FilterCategory = Category | 'All';
export type Subcategory = string;

export interface Project {
  _id?: string;
  id: number;
  title: string;
  category: Category;
  subcategory?: Subcategory;
  subCategory?: string;
  subType?: string;
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
