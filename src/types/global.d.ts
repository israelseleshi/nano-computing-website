// ============================================================================
// MODULE DECLARATIONS - Declare types for third-party modules
// ============================================================================

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.mp4' {
  const content: string;
  export default content;
}

declare module '*.webm' {
  const content: string;
  export default content;
}

declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}

// Framer Motion module augmentation
declare module 'framer-motion' {
  export interface AnimationProps {
    animate?: any;
    initial?: any;
    exit?: any;
    transition?: any;
    variants?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    layoutId?: string;
  }
}

// Lucide React module augmentation
declare module 'lucide-react' {
  export interface LucideProps {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }

  export type LucideIcon = React.FC<LucideProps>;
}

// Tailwind CSS module augmentation
declare module 'tailwindcss/tailwind.css' {
  const content: any;
  export default content;
}

// Class Variance Authority - removed duplicate types

// Clsx - removed duplicate types

// Tailwind Merge - removed duplicate types

// React Hook Form - removed duplicate types

// Next Themes - removed duplicate types

// Radix UI - removed duplicate types

// Global Window extensions
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    analytics?: any;
  }

  // Custom CSS properties
  interface CSSStyleDeclaration {
    '--color-primary'?: string;
    '--color-secondary'?: string;
    '--color-accent'?: string;
    '--color-background'?: string;
    '--color-foreground'?: string;
    '--color-muted'?: string;
    '--color-border'?: string;
    '--radius'?: string;
  }

  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      VITE_API_URL?: string;
      VITE_APP_NAME?: string;
      VITE_APP_VERSION?: string;
      VITE_ANALYTICS_ID?: string;
      VITE_SENTRY_DSN?: string;
    }
  }
}

// Vite environment variables
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_ANALYTICS_ID: string;
  readonly VITE_SENTRY_DSN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
