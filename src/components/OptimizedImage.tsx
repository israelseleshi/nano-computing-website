import React, { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage = memo(({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  onLoad,
  onError 
}: OptimizedImageProps): React.JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>('');

  // Generate WebP and fallback sources
  const generateSources = useCallback((originalSrc: string) => {
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return {
      webp: webpSrc,
      original: originalSrc
    };
  }, []);

  const sources = generateSources(src);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (imageSrc === sources.webp) {
      // Fallback to original format
      setImageSrc(sources.original);
    } else {
      setHasError(true);
      onError?.();
    }
  }, [imageSrc, sources.webp, sources.original, onError]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry?.isIntersecting && !imageSrc) {
      // Start with WebP format
      setImageSrc(sources.webp);
    }
  }, [imageSrc, sources.webp]);

  // Lazy loading with Intersection Observer
  React.useEffect(() => {
    if (priority) {
      setImageSrc(sources.webp);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    const imageElement = document.querySelector(`[data-src="${src}"]`);
    if (imageElement) {
      observer.observe(imageElement);
    }

    return () => observer.disconnect();
  }, [priority, sources.webp, handleIntersection, src]);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} data-src={src}>
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {imageSrc && (
        <motion.picture
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <source srcSet={sources.webp} type="image/webp" />
          <img
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </motion.picture>
      )}
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

export default OptimizedImage;
