import React from 'react';
import { cn } from '@/components/ui/utils';

interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  direction?: 'row' | 'col';
  gap?: number;
}

const Stack = React.forwardRef<
  HTMLDivElement,
  StackProps
>(({ as: Component = 'div', className, direction = 'col', gap = 4, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        'flex',
        {
          'flex-col': direction === 'col',
          'flex-row': direction === 'row',
        },
        `gap-${gap}`,
        className
      )}
      {...props}
    />
  );
});

Stack.displayName = 'Stack';

export { Stack };
