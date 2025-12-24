import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  backgroundImage?: string;
  speed?: number;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  depth?: 'shallow' | 'medium' | 'deep';
  fadeIn?: boolean;
}

export function ParallaxSection({
  children,
  backgroundImage,
  speed = 0.5,
  className = '',
  overlay = true,
  overlayOpacity = 0.7,
  depth = 'medium',
  fadeIn = true,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Enhanced depth configurations
  const depthConfigs = {
    shallow: { yRange: 30, scale: 1.05, blur: 0 },
    medium: { yRange: 60, scale: 1.1, blur: 1 },
    deep: { yRange: 100, scale: 1.2, blur: 2 },
  };

  const config = depthConfigs[depth];

  // Create smooth parallax transforms
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${config.yRange * speed}px`, `${config.yRange * speed}px`]
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, config.scale, 1]);

  const opacity = fadeIn ? useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]) : 1;

  const blur = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, config.blur, 0]
  ) as MotionValue<number>;

  // Content parallax (slower than background)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -20 * speed]);

  return (
    <div ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      {backgroundImage && (
        <>
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              y,
              scale,
              opacity,
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: blur.get() > 0 ? `blur(${blur.get()}px)` : 'none',
            }}
          />
          {overlay && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80"
              style={{
                opacity: overlayOpacity,
              }}
            />
          )}
        </>
      )}

      <motion.div
        className="relative z-10"
        style={{
          y: contentY,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
