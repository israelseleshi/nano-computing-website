import { useEffect } from 'react';

export const useScrollToTop = (dependency: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [dependency]);
};
