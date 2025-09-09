import React, { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from './utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variants?: {
    hidden: object;
    visible: object;
  };
  staggerChildren?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function ScrollReveal({
  children,
  className,
  variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  },
  staggerChildren,
  delay = 0,
  threshold = 0.2,
  triggerOnce = true
}: ScrollRevealProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
          controls.start('visible');
          if (triggerOnce) {
            setHasAnimated(true);
          }
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [controls, threshold, triggerOnce, hasAnimated]);

  const transition = {
    staggerChildren,
    delayChildren: delay
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ ...transition, duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Specific variant for list items
export const StaggeredList = ({ 
  children, 
  className, 
  stagger = 0.1 
}: { 
  children: React.ReactNode, 
  className?: string, 
  stagger?: number
}) => {
  return (
    <ScrollReveal className={className} staggerChildren={stagger}>
      {children}
    </ScrollReveal>
  );
};

export const StaggeredListItem = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "circOut" } }
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

