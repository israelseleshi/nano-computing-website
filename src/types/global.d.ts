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
  import { FC, SVGProps } from 'react';
  
  export interface LucideProps extends Partial<Omit<SVGProps<SVGSVGElement>, 'ref'>> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  
  export type LucideIcon = FC<LucideProps>;
  
  // Export commonly used icons with proper typing
  export const ArrowRight: LucideIcon;
  export const ArrowLeft: LucideIcon;
  export const ChevronLeft: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Star: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const X: LucideIcon;
  export const Menu: LucideIcon;
  export const Sun: LucideIcon;
  export const Moon: LucideIcon;
  export const Eye: LucideIcon;
  export const Mail: LucideIcon;
  export const Phone: LucideIcon;
  export const MapPin: LucideIcon;
  export const Clock: LucideIcon;
  export const Calendar: LucideIcon;
  export const User: LucideIcon;
  export const Users: LucideIcon;
  export const Settings: LucideIcon;
  export const Search: LucideIcon;
  export const Filter: LucideIcon;
  export const Download: LucideIcon;
  export const Upload: LucideIcon;
  export const Edit: LucideIcon;
  export const Trash: LucideIcon;
  export const Plus: LucideIcon;
  export const Minus: LucideIcon;
  export const Home: LucideIcon;
  export const Server: LucideIcon;
  export const ShoppingCart: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Info: LucideIcon;
  export const Shield: LucideIcon;
  export const Database: LucideIcon;
  export const Globe2: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const Monitor: LucideIcon;
  export const Sparkles: LucideIcon;
}

// Tailwind CSS module augmentation
declare module 'tailwindcss/tailwind.css' {
  const content: any;
  export default content;
}

// Class Variance Authority
declare module 'class-variance-authority' {
  export interface VariantProps<T> {
    [key: string]: any;
  }
  
  export function cva(
    base: string,
    config?: {
      variants?: Record<string, Record<string, string>>;
      compoundVariants?: Array<Record<string, any>>;
      defaultVariants?: Record<string, string>;
    }
  ): any;
}

// Clsx
declare module 'clsx' {
  export type ClassValue = string | number | boolean | undefined | null | ClassArray | ClassDictionary;
  export interface ClassDictionary {
    [id: string]: any;
  }
  export interface ClassArray extends Array<ClassValue> {}
  
  export function clsx(...inputs: ClassValue[]): string;
  export default clsx;
}

// Tailwind Merge
declare module 'tailwind-merge' {
  export function twMerge(...inputs: string[]): string;
}

// React Hook Form
declare module 'react-hook-form' {
  export interface UseFormProps<T = any> {
    mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
    reValidateMode?: 'onChange' | 'onBlur' | 'onSubmit';
    defaultValues?: Partial<T>;
    resolver?: any;
    context?: any;
    criteriaMode?: 'firstError' | 'all';
    shouldFocusError?: boolean;
    shouldUnregister?: boolean;
    shouldUseNativeValidation?: boolean;
    delayError?: number;
  }
  
  export interface UseFormReturn<T = any> {
    register: any;
    handleSubmit: any;
    watch: any;
    formState: any;
    reset: any;
    setError: any;
    clearErrors: any;
    setValue: any;
    getValues: any;
    trigger: any;
    control: any;
  }
  
  export function useForm<T = any>(props?: UseFormProps<T>): UseFormReturn<T>;
}

// Next Themes
declare module 'next-themes' {
  export interface ThemeProviderProps {
    children: React.ReactNode;
    attribute?: string;
    defaultTheme?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
    storageKey?: string;
    themes?: string[];
    forcedTheme?: string;
    value?: Record<string, string>;
  }
  
  export interface UseThemeReturn {
    theme: string | undefined;
    setTheme: (theme: string) => void;
    forcedTheme: string | undefined;
    resolvedTheme: string | undefined;
    themes: string[];
    systemTheme: string | undefined;
  }
  
  export const ThemeProvider: React.FC<ThemeProviderProps>;
  export function useTheme(): UseThemeReturn;
}

// Radix UI
declare module '@radix-ui/react-slot' {
  export interface SlotProps extends React.HTMLAttributes<HTMLElement> {
    children?: React.ReactNode;
  }
  
  export const Slot: React.FC<SlotProps>;
}

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
