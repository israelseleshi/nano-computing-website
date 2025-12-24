import { Home, Server, ShoppingCart, BookOpen, Info, Mail } from 'lucide-react';
type NavItem = { id: string; label: string; icon: any; path: string };

export const NAV_LINKS: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'services', label: 'Services', icon: Server, path: '/services' },
  { id: 'hardware', label: 'Shop', icon: ShoppingCart, path: '/shop' },
  { id: 'blog', label: 'Blog', icon: BookOpen, path: '/blog' },
  { id: 'about', label: 'About', icon: Info, path: '/about' },
  { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' },
];

export const FEATURED_POST = {
  title: 'The Quantum Leap in Data Processing',
  imageUrl: '/nano-tech-office-display.mp4',
};
