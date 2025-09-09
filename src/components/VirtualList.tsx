import React, { memo } from 'react';
import { useVirtualScroll } from '../hooks/useVirtualScroll';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  overscan?: number;
}

function VirtualListComponent<T>({
  items,
  itemHeight,
  height,
  renderItem,
  className = '',
  overscan = 5
}: VirtualListProps<T>): React.JSX.Element {
  const { visibleItems, totalHeight, scrollElementProps } = useVirtualScroll(items, {
    itemHeight,
    containerHeight: height,
    overscan
  });

  return (
    <div className={className} {...scrollElementProps}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ index, item, style }) => (
          <div key={index} style={style}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}

const VirtualList = memo(VirtualListComponent) as typeof VirtualListComponent & { displayName?: string };
VirtualList.displayName = 'VirtualList';

export default VirtualList;
