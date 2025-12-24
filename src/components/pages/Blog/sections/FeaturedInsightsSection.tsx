import React from 'react';
import { TrendingUp, User, Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from '@/utils/OptimizedImage';
import { Article } from '../types';

interface FeaturedInsightsSectionProps {
  articles: Article[];
}

export const FeaturedInsightsSection = ({ articles }: FeaturedInsightsSectionProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (articles.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-h2 font-bold tracking-tight">Featured Insights</h2>
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="glass-effect overflow-hidden border border-primary/20 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
            >
              <div className="relative">
                <OptimizedImage
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
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-caption text-white dark:text-foreground"
                    >
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
  );
};
