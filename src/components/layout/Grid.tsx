import React from 'react';
import { cn } from '@/components/ui/utils';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  cols?: number;
  gap?: number;
}

const Grid = React.forwardRef<
  HTMLDivElement,
  GridProps
>(({ as: Component = 'div', className, cols = 2, gap = 4, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        'grid',
        `grid-cols-${cols}`,
        `gap-${gap}`,
        className
      )}
      {...props}
    />
  );
});

Grid.displayName = 'Grid';

export { Grid };
