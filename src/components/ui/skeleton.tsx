import * as React from "react";
import { cn } from "./utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button'
  animate?: boolean
}

function Skeleton({
  className,
  variant = 'default',
  animate = true,
  ...props
}: SkeletonProps) {
  const baseClasses = "bg-muted/50 relative overflow-hidden"
  
  const animationClasses = animate ? "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent" : ""
  
  const variantClasses = {
    default: "rounded-md",
    card: "rounded-lg",
    text: "rounded h-4 w-full",
    avatar: "rounded-full",
    button: "rounded-md h-10 px-4"
  }

  return (
    <div
      data-slot="skeleton"
      className={cn(
        baseClasses,
        animationClasses,
        variantClasses[variant],
        "animate-pulse",
        className
      )}
      {...props}
    />
  );
}

// Specific skeleton components for common patterns
const SkeletonCard = ({ className }: { className?: string }) => (
  <div className={cn("space-y-4 p-6 border border-border/50 rounded-lg", className)}>
    <Skeleton className="h-48 w-full" />
    <div className="space-y-2">
      <Skeleton variant="text" className="h-6 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
    </div>
    <div className="flex justify-between items-center pt-4">
      <Skeleton variant="button" className="w-24" />
      <Skeleton className="h-6 w-16" />
    </div>
  </div>
)

const SkeletonProductCard = ({ className }: { className?: string }) => (
  <div className={cn("space-y-3", className)}>
    <Skeleton className="h-64 w-full rounded-lg" />
    <Skeleton variant="text" className="h-5 w-3/4" />
    <div className="flex justify-between items-center">
      <Skeleton variant="text" className="h-6 w-20" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  </div>
)

const SkeletonArticle = ({ className }: { className?: string }) => (
  <div className={cn("space-y-4", className)}>
    <Skeleton className="h-64 w-full rounded-lg" />
    <div className="space-y-3 p-6">
      <Skeleton variant="text" className="h-8 w-3/4" />
      <Skeleton variant="text" className="h-4 w-full" />
      <Skeleton variant="text" className="h-4 w-5/6" />
      <div className="flex items-center gap-3 pt-4">
        <Skeleton variant="avatar" className="h-10 w-10" />
        <div className="space-y-2 flex-1">
          <Skeleton variant="text" className="h-4 w-32" />
          <Skeleton variant="text" className="h-3 w-24" />
        </div>
      </div>
    </div>
  </div>
)

export { 
  Skeleton, 
  SkeletonCard, 
  SkeletonProductCard, 
  SkeletonArticle
};
