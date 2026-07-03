export interface Project {
  id?: number;
  _id?: string;
  title: string;
  category: string;
  subCategory: string;
  subType: string;
  location?: string;
  images: string[];
  description?: string;
  customizationNote?: string;
}
