// ============================================================================
// TYPE UTILITY FUNCTIONS - Helper functions for type transformations
// ============================================================================

import {
  ProductId,
  ServiceId,
  BlogPostId,
  UserId,
  EmailAddress,
  Url,
  Price,
  Rating,
  Product,
  ProductSummary,
  ProductCard,
  ServiceSummary,
  BlogPostSummary,
  MakeRequired,
  Stringify,
  EventHandlers,
} from '../types';

// ============================================================================
// BRANDED TYPE CREATORS
// ============================================================================

export function createProductId(value: string): ProductId {
  if (!value || typeof value !== 'string') {
    throw new Error('Invalid ProductId: must be a non-empty string');
  }
  return value as ProductId;
}

export function createServiceId(value: string): ServiceId {
  if (!value || typeof value !== 'string') {
    throw new Error('Invalid ServiceId: must be a non-empty string');
  }
  return value as ServiceId;
}

export function createBlogPostId(value: string): BlogPostId {
  if (!value || typeof value !== 'string') {
    throw new Error('Invalid BlogPostId: must be a non-empty string');
  }
  return value as BlogPostId;
}

export function createUserId(value: string): UserId {
  if (!value || typeof value !== 'string') {
    throw new Error('Invalid UserId: must be a non-empty string');
  }
  return value as UserId;
}

export function createEmailAddress(value: string): EmailAddress {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw new Error('Invalid EmailAddress format');
  }
  return value as EmailAddress;
}

export function createPhoneNumber(value: string): string {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(value)) {
    throw new Error('Invalid PhoneNumber format');
  }
  return value;
}

export function createUrl(value: string): Url {
  try {
    new URL(value);
    return value as Url;
  } catch {
    throw new Error('Invalid URL format');
  }
}

export function createPrice(value: number): Price {
  if (typeof value !== 'number' || value < 0 || !Number.isFinite(value)) {
    throw new Error('Invalid Price: must be a non-negative finite number');
  }
  return value as Price;
}

export function createRating(value: number): Rating {
  if (typeof value !== 'number' || value < 0 || value > 5 || !Number.isFinite(value)) {
    throw new Error('Invalid Rating: must be a number between 0 and 5');
  }
  return value as Rating;
}

// ============================================================================
// TRANSFORMATION UTILITIES
// ============================================================================

export function toProductSummary(product: Product): ProductSummary {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    rating: product.rating,
  };
}

export function toProductCard(product: Product): ProductCard {
  const { specifications, images, stockQuantity, ...productCard } = product;
  return productCard;
}

export function toServiceSummary(service: any): ServiceSummary {
  return {
    id: service.id,
    title: service.title,
    shortDescription: service.shortDescription,
    icon: service.icon,
  };
}

export function toBlogPostSummary(blogPost: any): BlogPostSummary {
  return {
    id: blogPost.id,
    title: blogPost.title,
    excerpt: blogPost.excerpt,
    author: blogPost.author,
    publishedAt: blogPost.publishedAt,
    featuredImage: blogPost.featuredImage,
    readTime: blogPost.readTime,
  };
}

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export function validateRequired<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): obj is MakeRequired<T, K> {
  return keys.every((key) => obj[key] !== undefined && obj[key] !== null);
}

export function validateOptional<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  _keys: K[]
): boolean {
  // All properties are already optional in the MakeOptional type
  return typeof obj === 'object' && obj !== null;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validatePrice(price: number): boolean {
  return typeof price === 'number' && price >= 0 && Number.isFinite(price);
}

export function validateRating(rating: number): boolean {
  return typeof rating === 'number' && rating >= 0 && rating <= 5 && Number.isFinite(rating);
}

export function getNestedValue<T>(obj: Record<string, any>, path: string): T | undefined {
  return path.split('.').reduce((current, key) => {
    return current && typeof current === 'object' ? current[key] : undefined;
  }, obj) as T | undefined;
}

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

export function filterNonNullable<T>(array: (T | null | undefined)[]): T[] {
  return array.filter((item): item is T => item !== null && item !== undefined);
}

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce(
    (groups, item) => {
      const groupKey = String(item[key]);
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(item);
      return groups;
    },
    {} as Record<string, T[]>
  );
}

export function sortBy<T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export function uniqueBy<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    }
    seen.add(value);
    return true;
  });
}

// ============================================================================
// OBJECT UTILITIES
// ============================================================================

export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
}

export function omit<T, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
}

export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime()) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as T;
  }

  const cloned = {} as T;
  Object.keys(obj).forEach((key) => {
    (cloned as any)[key] = deepClone((obj as any)[key]);
  });

  return cloned;
}

export function merge<T extends Record<string, any>, U extends Record<string, any>>(
  target: T,
  source: U
): T & U {
  return { ...target, ...source };
}

export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  return { ...target, ...source };
}

export function setNestedValue<T>(obj: Record<string, any>, path: string, value: T): void {
  const keys = path.split('.');
  const lastKey = keys.pop();

  if (!lastKey) return;

  const target = keys.reduce((current, key) => {
    if (!current[key] || typeof current[key] !== 'object') {
      current[key] = {};
    }
    return current[key];
  }, obj);

  if (target && typeof target === 'object') {
    target[lastKey] = value;
  }
}

// ============================================================================
// STRING UTILITIES
// ============================================================================

export function stringify<T extends Record<string, any>>(obj: T): Stringify<T> {
  const result = {} as Stringify<T>;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    (result as any)[key] = value === null || value === undefined ? '' : String(value);
  });
  return result;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function camelCase(str: string): string {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

// ============================================================================
// EVENT HANDLER UTILITIES
// ============================================================================

export function createEventHandlers<T extends Record<string, any>>(
  obj: T,
  onChange: (key: keyof T, value: any) => void
): EventHandlers<T> {
  const handlers = {} as EventHandlers<T>;

  Object.keys(obj).forEach((key) => {
    const handlerKey = `on${capitalize(key)}` as keyof EventHandlers<T>;
    (handlers as any)[handlerKey] = (value: any) => onChange(key, value);
  });

  return handlers;
}

// ============================================================================
// FORM UTILITIES
// ============================================================================

export function createFormData(obj: Record<string, unknown>): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, String(item));
        });
      } else {
        formData.append(key, String(value));
      }
    }
  }

  return formData;
}

export function parseFormData<T extends Record<string, any>>(formData: FormData): Partial<T> {
  const obj = {} as Partial<T>;

  formData.forEach((value, key) => {
    if (key.includes('[') && key.includes(']')) {
      // Handle array fields
      const baseKey = key.split('[')[0];
      if (baseKey && !obj[baseKey as keyof T]) {
        (obj as any)[baseKey] = [];
      }
      if (baseKey) {
        (obj as any)[baseKey].push(value);
      }
    } else {
      (obj as any)[key] = value;
    }
  });

  return obj;
}

// ============================================================================
// ASYNC UTILITIES
// ============================================================================

export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
