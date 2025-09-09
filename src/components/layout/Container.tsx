import React from 'react';
import { cn } from '@/components/ui/utils';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

const Container = React.forwardRef<
  HTMLDivElement,
  ContainerProps
>(({ as: Component = 'div', className, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn('container mx-auto px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  );
});

Container.displayName = 'Container';

export { Container };
