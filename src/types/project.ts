export interface Project {
  id: number;
  title: string;
  category: string;
  subCategory: string;
  subType: string;
  images: string[];
  description?: string;
  customizationNote?: string;
}
