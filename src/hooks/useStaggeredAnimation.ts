import { useEffect } from 'react';
import { useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

export const useStaggeredAnimation = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [controls, isInView]);

  return { ref, controls };
};
