export interface Article {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  role: string;
  publishDate: string;
  readTime: string;
  views: string;
  featured: boolean;
  image: string;
  excerpt: string;
  tags: string[];
}

export interface Category {
  id: string;
  label: string;
  icon: any;
}
