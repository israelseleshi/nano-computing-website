import { useState, useEffect } from 'react';

interface Ripple {
  key: number;
  x: number;
  y: number;
  size: number;
}

export function useRipple(ref: React.RefObject<HTMLButtonElement>) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const newRipple: Ripple = {
        key: Date.now(),
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
        size,
      };

      setRipples((prev) => [...prev, newRipple]);
    };

    element.addEventListener('click', handleClick);
    return () => {
      element.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return ripples;
}

