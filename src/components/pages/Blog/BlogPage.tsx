import React, { useState } from 'react';
import { BookOpen, Shield, Database, Globe, Zap } from 'lucide-react';
import { FeaturedInsightsSection } from './sections/FeaturedInsightsSection';
import { CategoryFilterSection } from './sections/CategoryFilterSection';
import { ArticlesGridSection } from './sections/ArticlesGridSection';
import { NewsletterSection } from './sections/NewsletterSection';
import { Article, Category } from './types';

interface InsightsPageProps {
  onPageChange: (page: string) => void;
}

export default function BlogPage({ onPageChange }: InsightsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories: Category[] = [
    { id: 'all', label: 'All Insights', icon: BookOpen },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield },
    { id: 'cloud', label: 'Cloud Computing', icon: Database },
    {
      id: 'digital-transformation',
      label: 'Digital Transformation',
      icon: Globe,
    },
    { id: 'emerging-tech', label: 'Emerging Technologies', icon: Zap },
  ];

  const articles: Article[] = [
    {
      id: 1,
      title: 'The Future of Cybersecurity in a Post-Quantum World',
      subtitle: 'How quantum computing will reshape enterprise security strategies',
      category: 'cybersecurity',
      author: 'Michael Chen',
      role: 'Chief Technology Officer',
      publishDate: '2025-01-15',
      readTime: '8 min read',
      views: '2,341',
      featured: true,
      image:
        'https://images.unsplash.com/photo-1695462131550-24be3156b25d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0aW5nJTIwZnV0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY4MTUxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt:
        'As quantum computing advances toward practical implementation, organizations must prepare for a fundamental shift in cryptographic security. This comprehensive analysis explores the timeline, challenges, and strategic preparations necessary for the quantum transition.',
      tags: ['Quantum Computing', 'Cryptography', 'Enterprise Security'],
    },
    {
      id: 2,
      title: 'AI-Driven Infrastructure: The Next Evolution in Data Center Management',
      subtitle: 'Leveraging artificial intelligence for predictive maintenance and optimization',
      category: 'emerging-tech',
      author: 'Sarah Rodriguez',
      role: 'Lead Security Architect',
      publishDate: '2025-01-12',
      readTime: '6 min read',
      views: '1,876',
      featured: true,
      image:
        'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YSUyMGFuYWx5c2lzfGVufDF8fHx8MTc1Njc2NzgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt:
        'Machine learning algorithms are revolutionizing how we manage enterprise infrastructure. From predicting hardware failures to optimizing energy consumption, AI is becoming the cornerstone of modern data center operations.',
      tags: ['Artificial Intelligence', 'Data Centers', 'Predictive Analytics'],
    },
    {
      id: 3,
      title: 'Multi-Cloud Strategy: Building Resilient Enterprise Architectures',
      subtitle: 'Best practices for implementing successful multi-cloud deployments',
      category: 'cloud',
      author: 'David Park',
      role: 'Infrastructure Director',
      publishDate: '2025-01-10',
      readTime: '10 min read',
      views: '3,102',
      featured: false,
      image:
        'https://images.unsplash.com/photo-1718630732291-3bc8de36b030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY4MTAwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt:
        'Multi-cloud architectures offer unprecedented flexibility and resilience, but they also introduce complexity. This guide provides a roadmap for designing and implementing multi-cloud strategies that deliver business value.',
      tags: ['Multi-Cloud', 'Enterprise Architecture', 'Cloud Strategy'],
    },
    {
      id: 4,
      title: 'Zero Trust Security: Implementation Roadmap for Enterprises',
      subtitle: 'A practical guide to transitioning from perimeter-based security',
      category: 'cybersecurity',
      author: 'Emily Watson',
      role: 'Development Manager',
      publishDate: '2025-01-08',
      readTime: '7 min read',
      views: '1,654',
      featured: false,
      image:
        'https://images.unsplash.com/photo-1695462131550-24be3156b25d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0aW5nJTIwZnV0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY4MTUxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt:
        'Zero Trust represents a fundamental shift in security thinking. This comprehensive implementation guide covers the technical, organizational, and strategic considerations for successful Zero Trust adoption.',
      tags: ['Zero Trust', 'Network Security', 'Identity Management'],
    },
    {
      id: 5,
      title: 'Edge Computing: Bringing Intelligence Closer to Data Sources',
      subtitle: 'The convergence of IoT, 5G, and edge computing technologies',
      category: 'emerging-tech',
      author: 'Michael Chen',
      role: 'Chief Technology Officer',
      publishDate: '2025-01-05',
      readTime: '9 min read',
      views: '2,789',
      featured: false,
      image:
        'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YSUyMGFuYWx5c2lzfGVufDF8fHx8MTc1Njc2NzgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt:
        'Edge computing is transforming how we process and analyze data. This analysis explores the technologies, use cases, and business implications of distributed computing architectures.',
      tags: ['Edge Computing', 'IoT', '5G Technology'],
    },
    {
      id: 6,
      title: 'Digital Transformation Metrics: Measuring Success in the Modern Enterprise',
      subtitle: 'Key performance indicators for digital transformation initiatives',
      category: 'digital-transformation',
      author: 'Sarah Rodriguez',
      role: 'Lead Security Architect',
      publishDate: '2025-01-03',
      readTime: '5 min read',
      views: '1,432',
      featured: false,
      image:
        'https://images.unsplash.com/photo-1718630732291-3bc8de36b030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY4MTAwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt:
        'Successful digital transformation requires measurable outcomes. This framework provides actionable metrics and KPIs to track progress and demonstrate business value.',
      tags: ['Digital Transformation', 'KPIs', 'Business Metrics'],
    },
  ];

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const featuredArticles = articles.filter((article) => article.featured);
  const regularArticles = filteredArticles.filter((article) => !article.featured);

  return (
    <div className="min-h-screen pt-20">
      {/* Featured Articles */}
      {selectedCategory === 'all' && <FeaturedInsightsSection articles={featuredArticles} />}

      {/* Category Filter */}
      <CategoryFilterSection
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Articles Grid */}
      <ArticlesGridSection
        articles={selectedCategory === 'all' ? regularArticles : filteredArticles}
      />

      {/* Newsletter Signup */}
      <NewsletterSection />
    </div>
  );
}
