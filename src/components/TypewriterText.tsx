import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  texts: string[];
  className?: string;
  repeat?: boolean;
}

export function TypewriterText({ texts, className = '', repeat = true }: TypewriterTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopCount, setLoopCount] = useState(0);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseDuration = 1500;

    const handleTyping = () => {
      const currentFullText = texts[currentTextIndex];
      
      if (isDeleting) {
        // Deleting text
        setCurrentText(currentFullText.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        // Typing text
        setCurrentText(currentFullText.substring(0, currentText.length + 1));
        if (currentText === currentFullText) {
          // Finished typing, pause before deleting
          setTimeout(() => {
            if (repeat || loopCount < texts.length - 1) {
              setIsDeleting(true);
              setLoopCount((prev) => prev + 1);
            }
          }, pauseDuration);
        }
      }
    };

    const timer = setTimeout(handleTyping, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex, texts, repeat, loopCount]);

  return (
    <motion.h1 
      className={`text-3xl md:text-5xl font-bold tracking-tight text-white ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <motion.span 
        className="block"
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
      >
        {currentText}
        <motion.span 
          className="inline-block w-2 h-12 bg-white ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.span>
    </motion.h1>
  );
}
