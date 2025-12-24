import React from 'react';
import { Target, Shield, Zap, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

export const ValuesSection = () => {
  const values = [
    {
      icon: Target,
      title: 'Reliability',
      description:
        'Ensuring seamless operations and consistent performance for your critical ICT infrastructure.',
    },
    {
      icon: Shield,
      title: 'Security Excellence',
      description:
        'Implementing robust cybersecurity measures to safeguard your data and digital assets.',
    },
    {
      icon: Zap,
      title: 'Technological Advancement',
      description:
        'Leveraging the latest innovations to drive efficiency and competitive advantage.',
    },
    {
      icon: Users,
      title: 'Collaborative Partnership',
      description:
        'Working closely with you to understand your unique challenges and deliver tailored ICT solutions.',
    },
  ];

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-6 mb-20">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Our Core Values
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            The principles that guide every decision, every solution, and every partnership we form.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={index}
                className="glass-effect p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
