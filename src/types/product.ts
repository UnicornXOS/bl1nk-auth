interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
  specifications: Record<string, string>;
  rating: number;
  reviews: Review[];
}

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type {Product, Review};
