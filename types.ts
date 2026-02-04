
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
