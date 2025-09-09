import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../ui/utils';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  placeholderSrc,
  ...props
}: ProgressiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    const currentRef = imgRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const lowResSrc = placeholderSrc || (src ? `${src.split('?')[0]}?w=20&q=10&blur=10` : '');

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.img
            src={lowResSrc}
            alt={alt}
            className={cn("absolute inset-0 w-full h-full object-cover filter blur-md scale-105", className)}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            {...props}
          />
        )}
      </AnimatePresence>
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onLoad={handleLoad}
          {...props}
        />
      )}
    </div>
  );
}
