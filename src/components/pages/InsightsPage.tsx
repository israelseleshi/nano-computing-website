import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  BookOpen, 
  TrendingUp,
  Shield,
  Database,
  Globe,
  Zap,
  Eye,
  Share
} from 'lucide-react';

interface InsightsPageProps {
  onPageChange: (page: string) => void;
}

export function InsightsPage({ onPageChange }: InsightsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Insights', icon: BookOpen },
    { id: 'cybersecurity', label: 'Cybersecurity', icon: Shield },
    { id: 'cloud', label: 'Cloud Computing', icon: Database },
    { id: 'digital-transformation', label: 'Digital Transformation', icon: Globe },
    { id: 'emerging-tech', label: 'Emerging Technologies', icon: Zap },
  ];

  const articles = [
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
      image: 'https://images.unsplash.com/photo-1695462131550-24be3156b25d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0aW5nJTIwZnV0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY4MTUxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'As quantum computing advances toward practical implementation, organizations must prepare for a fundamental shift in cryptographic security. This comprehensive analysis explores the timeline, challenges, and strategic preparations necessary for the quantum transition.',
      tags: ['Quantum Computing', 'Cryptography', 'Enterprise Security']
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
      image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YSUyMGFuYWx5c2lzfGVufDF8fHx8MTc1Njc2NzgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'Machine learning algorithms are revolutionizing how we manage enterprise infrastructure. From predicting hardware failures to optimizing energy consumption, AI is becoming the cornerstone of modern data center operations.',
      tags: ['Artificial Intelligence', 'Data Centers', 'Predictive Analytics']
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
      image: 'https://images.unsplash.com/photo-1718630732291-3bc8de36b030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY4MTAwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'Multi-cloud architectures offer unprecedented flexibility and resilience, but they also introduce complexity. This guide provides a roadmap for designing and implementing multi-cloud strategies that deliver business value.',
      tags: ['Multi-Cloud', 'Enterprise Architecture', 'Cloud Strategy']
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
      image: 'https://images.unsplash.com/photo-1695462131550-24be3156b25d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdWFudHVtJTIwY29tcHV0aW5nJTIwZnV0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY4MTUxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'Zero Trust represents a fundamental shift in security thinking. This comprehensive implementation guide covers the technical, organizational, and strategic considerations for successful Zero Trust adoption.',
      tags: ['Zero Trust', 'Network Security', 'Identity Management']
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
      image: 'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YSUyMGFuYWx5c2lzfGVufDF8fHx8MTc1Njc2NzgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'Edge computing is transforming how we process and analyze data. This analysis explores the technologies, use cases, and business implications of distributed computing architectures.',
      tags: ['Edge Computing', 'IoT', '5G Technology']
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
      image: 'https://images.unsplash.com/photo-1718630732291-3bc8de36b030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY4MTAwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      excerpt: 'Successful digital transformation requires measurable outcomes. This framework provides actionable metrics and KPIs to track progress and demonstrate business value.',
      tags: ['Digital Transformation', 'KPIs', 'Business Metrics']
    }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen pt-20">

      {/* Featured Articles */}
      {selectedCategory === 'all' && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-h2 font-bold tracking-tight">Featured Insights</h2>
              <TrendingUp className="w-8 h-8 text-primary" />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="glass-effect overflow-hidden border border-primary/20 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 group cursor-pointer">
                  <div className="relative">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  </div>
                  
                  <div className="p-8 space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-h3 font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-body-lg text-primary font-medium">{article.subtitle}</p>
                      <p className="text-body text-muted-foreground leading-relaxed">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-caption text-white dark:text-foreground">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-body font-medium">{article.author}</div>
                          <div className="text-body-sm text-muted-foreground">{article.role}</div>
                        </div>
                      </div>
                      <div className="text-right text-body-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.publishDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-background hover:bg-muted text-foreground hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-body-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(selectedCategory === 'all' ? regularArticles : filteredArticles).map((article) => (
              <Card key={article.id} className="glass-effect overflow-hidden border border-primary/20 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full flex flex-col">
                <div className="relative">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 flex items-center space-x-1">
                    <Eye className="w-3 h-3 text-muted-foreground" />
                    <span className="text-caption text-muted-foreground">{article.views}</span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-h4 font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-body-sm text-primary font-medium">{article.subtitle}</p>
                    <p className="text-body-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-caption text-white dark:text-foreground">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-body-sm font-medium">{article.author}</div>
                      </div>
                    </div>
                    <div className="text-caption text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card className="glass-effect p-12 border-0 text-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-h2 font-bold tracking-tight">
                  Stay Ahead of Technology Trends
                </h2>
                <p className="text-body-lg text-muted-foreground">
                  Subscribe to our insights newsletter and receive the latest technology analysis and strategic recommendations.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button 
                  size="lg" 
                  className="px-8 py-3 bg-primary hover:bg-primary/90 transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-body text-muted-foreground">
                Weekly insights, case studies, and technology trends. Unsubscribe anytime.
              </p>
            </div>
          </Card>
        </div>
      </section>

    </div>
  );
}
