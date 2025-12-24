import React from 'react';
import { Category } from '../types';

interface CategoryFilterSectionProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryFilterSection = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterSectionProps) => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
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
  );
};
