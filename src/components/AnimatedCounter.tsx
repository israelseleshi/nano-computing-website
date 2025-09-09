import React, { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, animate } from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({ 
  target, 
  suffix = '', 
  duration = 2,
  decimals = 0,
  className
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const rounded = useSpring(count, { 
    damping: 30,
    stiffness: 100,
    mass: 0.5
  });
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { 
        duration, 
        ease: 'easeOut' 
      });
      return () => controls.stop();
    }
  }, [isInView, count, target, duration]);
  
  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest.toFixed(decimals)}${suffix}`;
      }
    });
    return () => unsubscribe();
  }, [rounded, decimals, suffix]);

  return <span ref={ref} className={className} />;
}
