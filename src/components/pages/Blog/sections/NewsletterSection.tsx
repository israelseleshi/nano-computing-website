import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const NewsletterSection = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <Card className="glass-effect p-12 border-0 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-h2 font-bold tracking-tight">Stay Ahead of Technology Trends</h2>
              <p className="text-body-lg text-muted-foreground">
                Subscribe to our insights newsletter and receive the latest technology analysis and
                strategic recommendations.
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
  );
};
