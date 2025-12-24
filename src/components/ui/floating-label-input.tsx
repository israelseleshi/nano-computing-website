import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';
import { Input } from './input';

interface FloatingLabelInputProps extends React.ComponentProps<'input'> {
  label: string;
}

export function FloatingLabelInput({
  label,
  id,
  className,
  value,
  ...props
}: FloatingLabelInputProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && String(value).length > 0;

  const labelVariants = {
    initial: {
      y: '50%',
      scale: 1,
      color: 'hsl(var(--muted-foreground))',
      opacity: 0.7,
    },
    toggled: {
      y: '-100%',
      scale: 0.85,
      color: 'hsl(var(--primary))',
      opacity: 1,
    },
  };

  return (
    <div className="relative pt-4">
      <motion.label
        htmlFor={inputId}
        className="absolute top-1/2 left-3 text-base pointer-events-none origin-left"
        variants={labelVariants}
        initial="initial"
        animate={isFocused || hasValue ? 'toggled' : 'initial'}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {label}
      </motion.label>
      <Input
        id={inputId}
        className={cn('peer', className)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        {...props}
      />
    </div>
  );
}
