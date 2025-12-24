import React, { memo, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface OptimizedAnimationProps extends Omit<
  MotionProps,
  'initial' | 'animate' | 'exit' | 'transition'
> {
  children: React.ReactNode;
  animationType?: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  delay?: number;
  className?: string;
}

const OptimizedAnimation = memo(
  ({
    children,
    animationType = 'fade',
    direction = 'up',
    duration = 0.6,
    delay = 0,
    className = '',
    ...motionProps
  }: OptimizedAnimationProps): React.JSX.Element => {
    // Memoized animation variants for performance
    const variants = useMemo(() => {
      const baseTransition = {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as const, // Custom easing for smooth animations
      };

      switch (animationType) {
        case 'fade':
          return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: baseTransition,
          };

        case 'slide':
          const slideDistance = 50;
          const slideInitial = {
            opacity: 0,
            x: direction === 'left' ? -slideDistance : direction === 'right' ? slideDistance : 0,
            y: direction === 'up' ? slideDistance : direction === 'down' ? -slideDistance : 0,
          };
          return {
            initial: slideInitial,
            animate: { opacity: 1, x: 0, y: 0 },
            exit: slideInitial,
            transition: baseTransition,
          };

        case 'scale':
          return {
            initial: { opacity: 0, scale: 0.8 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.8 },
            transition: baseTransition,
          };

        case 'rotate':
          return {
            initial: { opacity: 0, rotate: -10 },
            animate: { opacity: 1, rotate: 0 },
            exit: { opacity: 0, rotate: 10 },
            transition: baseTransition,
          };

        case 'bounce':
          return {
            initial: { opacity: 0, y: -20 },
            animate: {
              opacity: 1,
              y: 0,
            },
            exit: { opacity: 0, y: -20 },
            transition: {
              ...baseTransition,
              type: 'spring' as const,
              stiffness: 300,
              damping: 20,
            },
          };

        default:
          return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            transition: baseTransition,
          };
      }
    }, [animationType, direction, duration, delay]);

    return (
      <motion.div
        className={className}
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={variants.transition}
        {...motionProps}
        // Use transform and opacity for hardware acceleration
        style={{
          willChange: 'transform, opacity',
          ...motionProps.style,
        }}
      >
        {children}
      </motion.div>
    );
  }
);

OptimizedAnimation.displayName = 'OptimizedAnimation';

export default OptimizedAnimation;
