import { LucideIcon } from 'lucide-react';
import { ReactNode, ComponentProps } from 'react';
import * as React from 'react';

// ============================================================================
// BRANDED TYPES - Use branded types for IDs and specific values
// ============================================================================

declare const __brand: unique symbol;
type Brand<T, TBrand> = T & { [__brand]: TBrand };

export type ProductId = Brand<string, 'ProductId'>;
export type UserId = Brand<string, 'UserId'>;
export type ServiceId = Brand<string, 'ServiceId'>;
export type BlogPostId = Brand<string, 'BlogPostId'>;
export type EmailAddress = Brand<string, 'EmailAddress'>;
export type PhoneNumber = Brand<string, 'PhoneNumber'>;
export type Url = Brand<string, 'Url'>;
export type Price = Brand<number, 'Price'>;
export type Rating = Brand<number, 'Rating'>;

// ============================================================================
// ENUMS - Replace string literals with proper enums
// ============================================================================

export enum PageType {
  HOME = 'home',
  ABOUT = 'about',
  SERVICES = 'services',
  HARDWARE = 'hardware',
  BLOG = 'blog',
  CONTACT = 'contact',
  PRODUCT_DETAIL = 'product-detail',
  AUTH = 'auth',
  ADMIN = 'admin'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system'
}

export enum ProductCategory {
  NETWORKING = 'networking',
  STORAGE = 'storage',
  SECURITY = 'security',
  ACCESSORIES = 'accessories',
  SERVERS = 'servers',
  SOFTWARE = 'software'
}

export enum ServiceType {
  CONSULTATION = 'consultation',
  IMPLEMENTATION = 'implementation',
  MAINTENANCE = 'maintenance',
  SUPPORT = 'support'
}

export enum BadgeVariant {
  NEW_ARRIVAL = 'new-arrival',
  POPULAR = 'popular',
  BEST_SELLER = 'best-seller',
  HIGH_PERFORMANCE = 'high-performance',
  ENTERPRISE = 'enterprise',
  SECURITY = 'security'
}

export enum AnimationState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum FormFieldType {
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  RADIO = 'radio'
}

// ============================================================================
// DISCRIMINATED UNIONS - Use union types for better type safety
// ============================================================================

export type ApiResponse<T> = 
  | { status: 'success'; data: T; error?: never }
  | { status: 'error'; error: string; data?: never }
  | { status: 'loading'; data?: never; error?: never };

export type FormFieldState = 
  | { type: 'valid'; value: string; error?: never }
  | { type: 'invalid'; value: string; error: string }
  | { type: 'pristine'; value: string; error?: never };

export type NotificationType = 
  | { type: 'success'; message: string; duration?: number }
  | { type: 'error'; message: string; duration?: number }
  | { type: 'warning'; message: string; duration?: number }
  | { type: 'info'; message: string; duration?: number };

// ============================================================================
// CORE INTERFACES - Define interfaces for all data structures
// ============================================================================

export interface BaseEntity {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface NavItem {
  readonly id: PageType;
  readonly label: string;
  readonly icon: LucideIcon;
  readonly path: string;
  readonly isExternal?: boolean;
  readonly badge?: string;
}

export interface Product extends BaseEntity {
  readonly id: ProductId;
  readonly name: string;
  readonly description: string;
  readonly price: Price;
  readonly originalPrice?: Price;
  readonly rating: Rating;
  readonly reviewCount: number;
  readonly category: ProductCategory;
  readonly badge?: BadgeVariant;
  readonly badgeColor: string;
  readonly image: Url;
  readonly images?: readonly Url[];
  readonly features: readonly string[];
  readonly specifications?: Record<string, string>;
  readonly inStock: boolean;
  readonly stockQuantity?: number;
  readonly tags?: readonly string[];
}

export interface Service extends BaseEntity {
  readonly id: ServiceId;
  readonly title: string;
  readonly description: string;
  readonly shortDescription: string;
  readonly icon: LucideIcon;
  readonly type: ServiceType;
  readonly features: readonly string[];
  readonly pricing?: {
    readonly startingPrice: Price;
    readonly currency: string;
    readonly billingPeriod?: string;
  };
  readonly image?: Url;
  readonly isPopular?: boolean;
}

export interface BlogPost extends BaseEntity {
  readonly id: BlogPostId;
  readonly title: string;
  readonly excerpt: string;
  readonly content: string;
  readonly author: {
    readonly name: string;
    readonly avatar?: Url;
    readonly bio?: string;
  };
  readonly publishedAt: Date;
  readonly featuredImage: Url;
  readonly tags: readonly string[];
  readonly category: string;
  readonly readTime: number;
  readonly isPublished: boolean;
  readonly slug: string;
}

export interface TeamMember extends BaseEntity {
  readonly id: UserId;
  readonly name: string;
  readonly position: string;
  readonly bio: string;
  readonly avatar: Url;
  readonly email?: EmailAddress;
  readonly phone?: PhoneNumber;
  readonly socialLinks?: {
    readonly linkedin?: Url;
    readonly twitter?: Url;
    readonly github?: Url;
  };
  readonly skills?: readonly string[];
  readonly experience?: number;
}

export interface ContactForm {
  readonly name: string;
  readonly email: EmailAddress;
  readonly phone?: PhoneNumber;
  readonly company?: string;
  readonly subject: string;
  readonly message: string;
  readonly serviceInterest?: ServiceType[];
  readonly preferredContact?: 'email' | 'phone';
}

// ============================================================================
// UTILITY TYPES - Add Pick, Omit, Partial utility types where needed
// ============================================================================

export type ProductSummary = Pick<Product, 'id' | 'name' | 'price' | 'image' | 'rating'>;
export type ProductCard = Omit<Product, 'specifications' | 'images' | 'stockQuantity'>;
export type ProductUpdate = Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>;

export type ServiceSummary = Pick<Service, 'id' | 'title' | 'shortDescription' | 'icon'>;
export type ServiceCard = Omit<Service, 'pricing' | 'image'>;

export type BlogPostSummary = Pick<BlogPost, 'id' | 'title' | 'excerpt' | 'author' | 'publishedAt' | 'featuredImage' | 'readTime'>;
export type BlogPostCard = Omit<BlogPost, 'content'>;

export type ContactFormData = Omit<ContactForm, 'serviceInterest'> & {
  serviceInterest?: string[];
};

// ============================================================================
// COMPONENT PROP TYPES - Generic type constraints for reusable components
// ============================================================================

export interface BaseComponentProps {
  readonly className?: string;
  readonly children?: ReactNode;
  readonly testId?: string;
}

export interface AnimatedComponentProps extends BaseComponentProps {
  readonly animate?: boolean;
  readonly delay?: number;
  readonly duration?: number;
}

export interface ClickableComponentProps extends BaseComponentProps {
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly loading?: boolean;
}

export interface FormComponentProps<T = unknown> extends BaseComponentProps {
  readonly value?: T;
  readonly onChange?: (value: T) => void;
  readonly error?: string;
  readonly required?: boolean;
  readonly disabled?: boolean;
}

// Generic component props with constraints
export interface GenericListProps<T extends { id: string }> extends BaseComponentProps {
  readonly items: readonly T[];
  readonly renderItem: (item: T, index: number) => ReactNode;
  readonly keyExtractor?: (item: T) => string;
  readonly loading?: boolean;
  readonly emptyMessage?: string;
}

export interface GenericCardProps<T> extends AnimatedComponentProps {
  readonly data: T;
  readonly variant?: 'default' | 'compact' | 'detailed';
  readonly interactive?: boolean;
}

// ============================================================================
// CONDITIONAL TYPES - Use conditional types for complex type logic
// ============================================================================

export type ComponentPropsWithRef<T extends keyof React.JSX.IntrinsicElements> = 
  ComponentProps<T> & BaseComponentProps;

export type ExtractArrayType<T> = T extends readonly (infer U)[] ? U : never;

export type NonNullable<T> = T extends null | undefined ? never : T;

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never;
}[keyof T];

// ============================================================================
// MAPPED TYPES - Create mapped types for transformations
// ============================================================================

export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type MakeRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

export type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

export type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// Transform all properties to strings (useful for form data)
export type Stringify<T> = {
  [P in keyof T]: string;
};

// Create a type with all properties as event handlers
export type EventHandlers<T> = {
  [P in keyof T as `on${Capitalize<string & P>}`]?: (value: T[P]) => void;
};

// ============================================================================
// API & RESPONSE TYPES
// ============================================================================

export interface PaginatedResponse<T> {
  readonly data: readonly T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
    readonly hasNext: boolean;
    readonly hasPrev: boolean;
  };
}

export interface SearchParams {
  readonly query?: string;
  readonly category?: ProductCategory;
  readonly minPrice?: Price;
  readonly maxPrice?: Price;
  readonly sortBy?: 'name' | 'price' | 'rating' | 'createdAt';
  readonly sortOrder?: 'asc' | 'desc';
  readonly page?: number;
  readonly limit?: number;
}

// ============================================================================
// THEME & UI TYPES
// ============================================================================

export interface ThemeConfig {
  readonly mode: ThemeMode;
  readonly primaryColor: string;
  readonly fontFamily: string;
  readonly borderRadius: string;
  readonly animations: boolean;
}

export interface BreakpointConfig {
  readonly xs: number;
  readonly sm: number;
  readonly md: number;
  readonly lg: number;
  readonly xl: number;
  readonly '2xl': number;
}

// ============================================================================
// ERROR TYPES
// ============================================================================

export interface AppError {
  readonly code: string;
  readonly message: string;
  readonly details?: Record<string, unknown>;
  readonly timestamp: Date;
}

export interface ValidationError extends AppError {
  readonly field: string;
  readonly value: unknown;
}

// ============================================================================
// EXPORT HELPER TYPES
// ============================================================================

export type { ComponentProps, ReactNode } from 'react';
