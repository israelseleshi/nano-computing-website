import React from 'react';
import OptimizedImage from '@/utils/OptimizedImage';
import { Card } from '@/components/ui/card';

export const TeamSection = () => {
  const team = [
    {
      name: 'Abebe Tadesse',
      role: 'Chief Technology Officer',
      expertise: 'Enterprise Architecture & Cloud Solutions',
      experience: '15+ years',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Meron Haile',
      role: 'Lead Security Architect',
      expertise: 'Cybersecurity & Risk Management',
      experience: '12+ years',
      image:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Dawit Bekele',
      role: 'Infrastructure Director',
      expertise: 'Network Design & Data Center Operations',
      experience: '18+ years',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Hanan Mohammed',
      role: 'Development Manager',
      expertise: 'Custom Software & Web Applications',
      experience: '10+ years',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Samuel Kebede',
      role: 'Senior Network Engineer',
      expertise: 'Network Infrastructure & Cloud Integration',
      experience: '14+ years',
      image:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
    {
      name: 'Lensa Girma',
      role: 'Lead UX/UI Designer',
      expertise: 'User Experience & Interface Design',
      experience: '9+ years',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face&auto=format&q=80',
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            Meet Our Experts
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            A diverse team of seasoned professionals united by a passion for technological
            excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <Card
              key={index}
              className="glass-effect p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 group"
            >
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto overflow-hidden rounded-full bg-primary/10 border-2 border-primary/20 shadow-md">
                  <OptimizedImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="text-xs text-muted-foreground opacity-80">{member.expertise}</p>
                  <p className="text-xs text-muted-foreground font-medium">{member.experience}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
