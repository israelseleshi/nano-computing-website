import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface AnimatedInteractionProps extends MotionProps {
  children: React.ReactNode;
}

const AnimatedInteraction: React.FC<AnimatedInteractionProps> = ({ children, ...props }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { AnimatedInteraction };
