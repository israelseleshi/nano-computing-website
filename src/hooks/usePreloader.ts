import { useEffect, useCallback, useState } from 'react';

interface PreloadResource {
  url: string;
  type: 'image' | 'video' | 'font' | 'script' | 'style';
  priority?: 'high' | 'medium' | 'low';
}

interface UsePreloaderOptions {
  resources: PreloadResource[];
  onProgress?: (loaded: number, total: number) => void;
  onComplete?: () => void;
}

export function usePreloader({ resources, onProgress, onComplete }: UsePreloaderOptions) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  const preloadResource = useCallback((resource: PreloadResource): Promise<void> => {
    return new Promise((resolve, reject) => {
      switch (resource.type) {
        case 'image': {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${resource.url}`));
          img.src = resource.url;
          break;
        }
        
        case 'video': {
          const video = document.createElement('video');
          video.oncanplaythrough = () => resolve();
          video.onerror = () => reject(new Error(`Failed to load video: ${resource.url}`));
          video.src = resource.url;
          video.preload = 'metadata';
          break;
        }
        
        case 'font': {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'font';
          link.type = 'font/woff2';
          link.crossOrigin = 'anonymous';
          link.onload = () => resolve();
          link.onerror = () => reject(new Error(`Failed to load font: ${resource.url}`));
          link.href = resource.url;
          document.head.appendChild(link);
          break;
        }
        
        case 'script': {
          const script = document.createElement('script');
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${resource.url}`));
          script.src = resource.url;
          script.async = true;
          document.head.appendChild(script);
          break;
        }
        
        case 'style': {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.onload = () => resolve();
          link.onerror = () => reject(new Error(`Failed to load style: ${resource.url}`));
          link.href = resource.url;
          document.head.appendChild(link);
          break;
        }
        
        default:
          reject(new Error(`Unsupported resource type: ${resource.type}`));
      }
    });
  }, []);

  useEffect(() => {
    if (resources.length === 0) {
      setIsLoading(false);
      onComplete?.();
      return;
    }

    // Sort resources by priority
    const sortedResources = [...resources].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority || 'medium'] - priorityOrder[b.priority || 'medium'];
    });

    let completed = 0;
    const newErrors: string[] = [];

    const loadResource = async (resource: PreloadResource) => {
      try {
        await preloadResource(resource);
      } catch (error) {
        newErrors.push(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        completed++;
        setLoadedCount(completed);
        onProgress?.(completed, resources.length);
        
        if (completed === resources.length) {
          setErrors(newErrors);
          setIsLoading(false);
          onComplete?.();
        }
      }
    };

    // Load high priority resources first, then medium and low
    const highPriority = sortedResources.filter(r => r.priority === 'high');
    const mediumPriority = sortedResources.filter(r => r.priority === 'medium' || !r.priority);
    const lowPriority = sortedResources.filter(r => r.priority === 'low');

    // Load high priority resources immediately
    highPriority.forEach(loadResource);

    // Load medium priority after a small delay
    setTimeout(() => {
      mediumPriority.forEach(loadResource);
    }, 100);

    // Load low priority resources after high and medium are done
    setTimeout(() => {
      lowPriority.forEach(loadResource);
    }, 500);

  }, [resources, preloadResource, onProgress, onComplete]);

  return {
    isLoading,
    loadedCount,
    totalCount: resources.length,
    progress: resources.length > 0 ? (loadedCount / resources.length) * 100 : 100,
    errors,
  };
}

// Hook for critical resource preloading
export function useCriticalResourcePreloader() {
  const criticalResources: PreloadResource[] = [
    { url: '/nano-tech-office-display.mp4', type: 'video', priority: 'high' },
    { url: '/cctv-camera.png', type: 'image', priority: 'high' },
    { url: '/computer-network.png', type: 'image', priority: 'high' },
    { url: '/computer-repair.png', type: 'image', priority: 'high' },
    { url: '/partner-logos/apple-logo.png', type: 'image', priority: 'medium' },
    { url: '/partner-logos/cisco-logo.png', type: 'image', priority: 'medium' },
    { url: '/partner-logos/dahua-tech-logo.png', type: 'image', priority: 'medium' },
  ];

  return usePreloader({
    resources: criticalResources,
    onProgress: (loaded, total) => {
      console.log(`Preloaded ${loaded}/${total} critical resources`);
    },
    onComplete: () => {
      console.log('Critical resources preloading complete');
    },
  });
}
