import { useState, useMemo, useCallback } from 'react';

interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
}

interface VirtualScrollResult<T> {
  visibleItems: Array<{
    index: number;
    item: T;
    style: React.CSSProperties;
  }>;
  totalHeight: number;
  scrollElementProps: {
    onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
    style: React.CSSProperties;
  };
}

export function useVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions
): VirtualScrollResult<T> {
  const { itemHeight, containerHeight, overscan = 5 } = options;
  const [scrollTop, setScrollTop] = useState(0);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  const visibleRange = useMemo(() => {
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
      items.length - 1,
      Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    return { startIndex, endIndex };
  }, [scrollTop, itemHeight, containerHeight, overscan, items.length]);

  const visibleItems = useMemo(() => {
    const { startIndex, endIndex } = visibleRange;
    const visible: Array<{
      index: number;
      item: T;
      style: React.CSSProperties;
    }> = [];

    for (let i = startIndex; i <= endIndex; i++) {
      const item = items[i];
      if (item !== undefined) {
        visible.push({
          index: i,
          item,
          style: {
            position: 'absolute' as const,
            top: i * itemHeight,
            left: 0,
            right: 0,
            height: itemHeight,
          },
        });
      }
    }

    return visible;
  }, [visibleRange, items, itemHeight]);

  const totalHeight = useMemo(() => items.length * itemHeight, [items.length, itemHeight]);

  return {
    visibleItems,
    totalHeight,
    scrollElementProps: {
      onScroll: handleScroll,
      style: {
        height: containerHeight,
        overflow: 'auto',
        position: 'relative',
      },
    },
  };
}
