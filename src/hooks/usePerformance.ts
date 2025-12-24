import { useCallback, useMemo, useRef } from 'react';

// Performance monitoring hook
export function usePerformance() {
  const performanceRef = useRef<{ [key: string]: number }>({});

  const startMeasure = useCallback((name: string) => {
    performanceRef.current[name] = performance.now();
  }, []);

  const endMeasure = useCallback((name: string) => {
    const startTime = performanceRef.current[name];
    if (startTime) {
      const duration = performance.now() - startTime;
      console.log(`Performance: ${name} took ${duration.toFixed(2)}ms`);
      delete performanceRef.current[name];
      return duration;
    }
    return 0;
  }, []);

  return { startMeasure, endMeasure };
}

// Debounce hook for expensive operations
export function useDebounce<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
}

// Throttle hook for scroll and resize events
export function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const lastCallRef = useRef<number>(0);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCallRef.current >= delay) {
        lastCallRef.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  ) as T;
}

// Memoized expensive calculations
export function useExpensiveCalculation<T>(
  calculate: () => T,
  dependencies: React.DependencyList
): T {
  return useMemo(() => {
    const start = performance.now();
    const result = calculate();
    const end = performance.now();

    if (end - start > 16) {
      // More than one frame
      console.warn(`Expensive calculation took ${(end - start).toFixed(2)}ms`);
    }

    return result;
  }, dependencies);
}
