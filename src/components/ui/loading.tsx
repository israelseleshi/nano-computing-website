import React from 'react';
import { cn } from './utils';
import { Loader2, Sparkles } from 'lucide-react';

// Loading Spinner Component
interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'luxury' | 'minimal';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  variant = 'default',
  className 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const variantClasses = {
    default: 'text-primary',
    luxury: 'text-gradient',
    minimal: 'text-muted-foreground'
  };

  return (
    <Loader2 
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );
}

// Loading Skeleton Component
interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
  lines?: number;
}

export function LoadingSkeleton({ 
  className, 
  variant = 'default',
  lines = 1 
}: LoadingSkeletonProps) {
  const variantClasses = {
    default: 'h-4 bg-muted rounded',
    card: 'h-32 bg-muted rounded-lg',
    text: 'h-4 bg-muted rounded',
    avatar: 'h-12 w-12 bg-muted rounded-full',
    button: 'h-10 bg-muted rounded-lg'
  };

  if (lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'loading-skeleton',
              variantClasses[variant],
              i === lines - 1 && 'w-3/4', // Last line shorter
              className
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'loading-skeleton',
        variantClasses[variant],
        className
      )}
    />
  );
}

// Loading Dots Component
interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingDots({ size = 'md', className }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-primary rounded-full animate-pulse',
            sizeClasses[size]
          )}
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1s'
          }}
        />
      ))}
    </div>
  );
}

// Loading Overlay Component
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  variant?: 'default' | 'luxury';
  className?: string;
}

export function LoadingOverlay({ 
  isLoading, 
  children, 
  message = 'Loading...',
  variant = 'default',
  className 
}: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-lg">
          <div className="text-center space-y-4">
            {variant === 'luxury' ? (
              <div className="relative">
                <Sparkles className="w-8 h-8 text-primary animate-pulse mx-auto" />
                <div className="absolute inset-0 w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
              </div>
            ) : (
              <LoadingSpinner size="lg" />
            )}
            <p className="text-sm text-muted-foreground font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Loading Button Component
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'luxury';
  size?: 'xs' | 'sm' | 'default' | 'lg' | 'xl';
}

export function LoadingButton({ 
  isLoading = false,
  loadingText = 'Loading...',
  children,
  disabled,
  className,
  ...props 
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-normal',
        className
      )}
    >
      {isLoading && <LoadingSpinner size="sm" />}
      {isLoading ? loadingText : children}
    </button>
  );
}

// Loading Card Component
interface LoadingCardProps {
  className?: string;
  showAvatar?: boolean;
  lines?: number;
}

export function LoadingCard({ 
  className, 
  showAvatar = false, 
  lines = 3 
}: LoadingCardProps) {
  return (
    <div className={cn('card-base p-6 space-y-4', className)}>
      {showAvatar && (
        <div className="flex items-center space-x-4">
          <LoadingSkeleton variant="avatar" />
          <div className="space-y-2 flex-1">
            <LoadingSkeleton className="h-4 w-1/4" />
            <LoadingSkeleton className="h-3 w-1/3" />
          </div>
        </div>
      )}
      <LoadingSkeleton lines={lines} />
    </div>
  );
}

// Loading Grid Component
interface LoadingGridProps {
  items?: number;
  columns?: 1 | 2 | 3 | 4;
  showAvatar?: boolean;
  className?: string;
}

export function LoadingGrid({ 
  items = 6, 
  columns = 3, 
  showAvatar = false,
  className 
}: LoadingGridProps) {
  const gridClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={cn('grid gap-6', gridClasses[columns], className)}>
      {Array.from({ length: items }).map((_, i) => (
        <LoadingCard key={i} showAvatar={showAvatar} />
      ))}
    </div>
  );
}

// Loading Progress Component
interface LoadingProgressProps {
  progress?: number;
  className?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'luxury';
}

export function LoadingProgress({ 
  progress = 0, 
  className,
  showPercentage = false,
  variant = 'default'
}: LoadingProgressProps) {
  const variantClasses = {
    default: 'bg-primary',
    luxury: 'bg-gradient-to-r from-primary to-accent'
  };

  return (
    <div className={cn('space-y-2', className)}>
      {showPercentage && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-slow ease-out',
            variantClasses[variant]
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

// Loading States Hook
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = React.useState(initialState);

  const startLoading = React.useCallback(() => setIsLoading(true), []);
  const stopLoading = React.useCallback(() => setIsLoading(false), []);
  const toggleLoading = React.useCallback(() => setIsLoading(prev => !prev), []);

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    setIsLoading
  };
}

// Export all components
export {
  LoadingSpinner as Spinner,
  LoadingSkeleton as Skeleton,
  LoadingDots as Dots,
  LoadingOverlay as Overlay,
  LoadingButton as ButtonLoading,
  LoadingCard as CardLoading,
  LoadingGrid as GridLoading,
  LoadingProgress as Progress
};
