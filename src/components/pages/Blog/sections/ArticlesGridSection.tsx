import React from 'react';
import { Eye, User, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from '@/utils/OptimizedImage';
import { Article } from '../types';

interface ArticlesGridSectionProps {
  articles: Article[];
}

export const ArticlesGridSection = ({ articles }: ArticlesGridSectionProps) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card
              key={article.id}
              className="glass-effect overflow-hidden border border-primary/20 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 group cursor-pointer h-full flex flex-col"
            >
              <div className="relative">
                <OptimizedImage
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
  );
};
