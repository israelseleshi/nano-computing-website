import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../ui/utils";
import { useRipple } from "../../hooks/use-ripple";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-normal ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 touch-target",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-md hover:bg-destructive/90 hover:shadow-lg active:scale-[0.98]",
        outline:
          "border-2 border-border bg-background text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground hover:border-primary/50 active:scale-[0.98]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 hover:shadow-md active:scale-[0.98]",
        ghost:
          "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
        link: 
          "text-primary underline-offset-4 hover:underline active:scale-[0.98]",
        luxury:
          "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:bg-primary/90 active:scale-[0.98] relative overflow-hidden",
        success:
          "bg-success text-success-foreground shadow-md hover:bg-success/90 hover:shadow-lg active:scale-[0.98]",
        warning:
          "bg-warning text-warning-foreground shadow-md hover:bg-warning/90 hover:shadow-lg active:scale-[0.98]",
        info:
          "bg-info text-info-foreground shadow-md hover:bg-info/90 hover:shadow-lg active:scale-[0.98]",
      },
      size: {
        xs: "h-8 px-3 text-xs font-medium rounded-md",
        sm: "h-9 px-4 text-sm font-medium rounded-md",
        default: "h-10 px-5 text-base font-medium rounded-lg",
        lg: "h-12 px-6 text-lg font-semibold rounded-lg",
        xl: "h-14 px-8 text-xl font-semibold rounded-xl",
        icon: "size-10 rounded-lg",
        "icon-sm": "size-8 rounded-md",
        "icon-lg": "size-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
    asChild = false,
    children,
    ...props
  }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
    const Comp = asChild ? Slot : "button";
    const ref = React.useRef<HTMLButtonElement>(null);
    const rippleData = useRipple(ref as React.RefObject<HTMLButtonElement>);

    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size }), "relative overflow-hidden", className)}
        {...props}
      >
        {variant === "luxury" && (
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        <AnimatePresence>
          {rippleData.map((ripple) => (
            <motion.span
              key={ripple.key}
              className="absolute rounded-full bg-current opacity-25"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size
              }}
              initial={{ scale: 0, opacity: 0.3 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </Comp>
    );
  }

export { Button, buttonVariants };
