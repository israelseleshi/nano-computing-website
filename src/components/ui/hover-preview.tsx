import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type MotionStyle } from 'framer-motion';
import { cn } from './utils';

interface HoverPreviewProps {
  children: React.ReactNode;
  preview: React.ReactNode;
  className?: string;
  previewClassName?: string;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right' | 'follow';
}

export function HoverPreview({
  children,
  preview,
  className,
  previewClassName,
  delay = 500,
  position = 'top'
}: HoverPreviewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (e: React.MouseEvent) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    if (position === 'follow') {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (position === 'follow' && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const getPositionStyles = (): MotionStyle | string => {
    if (position === 'follow') {
      return {
        left: mousePos.x + 10,
        top: mousePos.y - 10,
        transform: 'none'
      } as MotionStyle;
    }

    const positions = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    return positions[position];
  };

  return (
    <div 
      ref={containerRef}
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className={cn(
              "absolute z-50 pointer-events-none",
              position !== 'follow' && getPositionStyles(),
              previewClassName
            )}
            {...(position === 'follow' && { style: getPositionStyles() as MotionStyle })}
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="bg-background/95 backdrop-blur-lg border border-border/50 rounded-lg shadow-2xl p-4 min-w-[200px] max-w-[350px]">
              {preview}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Specialized preview for article cards
export function ArticleHoverPreview({ 
  title, 
  excerpt, 
  author, 
  readTime,
  image 
}: {
  title: string;
  excerpt: string;
  author?: string;
  readTime?: string;
  image?: string;
}) {
  return (
    <div className="space-y-3">
      {image && (
        <img 
          src={image} 
          alt={title}
          className="w-full h-32 object-cover rounded-md"
        />
      )}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm line-clamp-2">{title}</h4>
        <p className="text-xs text-muted-foreground line-clamp-3">{excerpt}</p>
        {(author || readTime) && (
          <div className="flex justify-between items-center text-xs text-muted-foreground pt-2 border-t border-border/50">
            {author && <span>{author}</span>}
            {readTime && <span>{readTime}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

// Specialized preview for product cards
export function ProductHoverPreview({
  name,
  description,
  price,
  features,
  inStock
}: {
  name: string;
  description: string;
  price: number;
  features?: string[];
  inStock?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-2">
        <h4 className="font-semibold text-sm">{name}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">ETB {price.toLocaleString()}</span>
          {inStock !== undefined && (
            <span className={cn(
              "text-xs px-2 py-1 rounded-full",
              inStock ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            )}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          )}
        </div>
      </div>
      {features && features.length > 0 && (
        <ul className="space-y-1 text-xs text-muted-foreground">
          {features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-1">
              <span className="text-primary mt-0.5">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
