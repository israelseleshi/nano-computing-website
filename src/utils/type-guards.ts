// ============================================================================
// TYPE GUARDS - Add runtime type checking functions
// ============================================================================

import {
  PageType,
  ThemeMode,
  ProductCategory,
  ServiceType,
  BadgeVariant,
  Product,
  Service,
  BlogPost,
  TeamMember,
  ContactForm,
  ApiResponse,
  FormFieldState,
  NotificationType,
  ProductId,
  ServiceId,
  BlogPostId,
  UserId,
  EmailAddress,
  Url,
  Price,
  Rating,
} from '../types';

// ============================================================================
// BRANDED TYPE GUARDS
// ============================================================================

export function isProductId(value: unknown): value is ProductId {
  return typeof value === 'string' && value.length > 0;
}

export function isServiceId(value: unknown): value is ServiceId {
  return typeof value === 'string' && value.length > 0;
}

export function isBlogPostId(value: unknown): value is BlogPostId {
  return typeof value === 'string' && value.length > 0;
}

export function isUserId(value: unknown): value is UserId {
  return typeof value === 'string' && value.length > 0;
}

export function isEmailAddress(value: unknown): value is EmailAddress {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof value === 'string' && emailRegex.test(value);
}

export function isPhoneNumber(value: unknown): value is string {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return typeof value === 'string' && phoneRegex.test(value);
}

export function isUrl(value: unknown): value is Url {
  try {
    new URL(value as string);
    return true;
  } catch {
    return false;
  }
}

export function isPrice(value: unknown): value is Price {
  return typeof value === 'number' && value >= 0 && Number.isFinite(value);
}

export function isRating(value: unknown): value is Rating {
  return typeof value === 'number' && value >= 0 && value <= 5 && Number.isFinite(value);
}

// ============================================================================
// ENUM TYPE GUARDS
// ============================================================================

export function isPageType(value: unknown): value is PageType {
  return typeof value === 'string' && Object.values(PageType).includes(value as PageType);
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return typeof value === 'string' && Object.values(ThemeMode).includes(value as ThemeMode);
}

export function isProductCategory(value: unknown): value is ProductCategory {
  return (
    typeof value === 'string' && Object.values(ProductCategory).includes(value as ProductCategory)
  );
}

export function isServiceType(value: unknown): value is ServiceType {
  return typeof value === 'string' && Object.values(ServiceType).includes(value as ServiceType);
}

export function isBadgeVariant(value: unknown): value is BadgeVariant {
  return typeof value === 'string' && Object.values(BadgeVariant).includes(value as BadgeVariant);
}

// ============================================================================
// OBJECT TYPE GUARDS
// ============================================================================

export function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    isProductId(obj['id']) &&
    typeof obj['name'] === 'string' &&
    typeof obj['description'] === 'string' &&
    isPrice(obj['price']) &&
    isRating(obj['rating']) &&
    typeof obj['reviewCount'] === 'number' &&
    isProductCategory(obj['category']) &&
    typeof obj['badgeColor'] === 'string' &&
    isUrl(obj['image']) &&
    Array.isArray(obj['features']) &&
    obj['features'].every((f: unknown) => typeof f === 'string') &&
    typeof obj['inStock'] === 'boolean' &&
    obj['createdAt'] instanceof Date &&
    obj['updatedAt'] instanceof Date
  );
}

export function isService(value: unknown): value is Service {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    isServiceId(obj['id']) &&
    typeof obj['title'] === 'string' &&
    typeof obj['description'] === 'string' &&
    typeof obj['shortDescription'] === 'string' &&
    isServiceType(obj['type']) &&
    Array.isArray(obj['features']) &&
    obj['features'].every((f: unknown) => typeof f === 'string') &&
    obj['createdAt'] instanceof Date &&
    obj['updatedAt'] instanceof Date
  );
}

export function isBlogPost(value: unknown): value is BlogPost {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    isBlogPostId(obj['id']) &&
    typeof obj['title'] === 'string' &&
    typeof obj['excerpt'] === 'string' &&
    typeof obj['content'] === 'string' &&
    typeof obj['author'] === 'string' &&
    isUserId(obj['author']) &&
    obj['publishedAt'] instanceof Date &&
    isUrl(obj['featuredImage']) &&
    Array.isArray(obj['tags']) &&
    obj['tags'].every((t: unknown) => typeof t === 'string') &&
    typeof obj['category'] === 'string' &&
    typeof obj['readTime'] === 'number' &&
    typeof obj['isPublished'] === 'boolean' &&
    typeof obj['slug'] === 'string' &&
    obj['createdAt'] instanceof Date &&
    obj['updatedAt'] instanceof Date
  );
}

export function isTeamMember(value: unknown): value is TeamMember {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    isUserId(obj['id']) &&
    typeof obj['name'] === 'string' &&
    typeof obj['position'] === 'string' &&
    typeof obj['bio'] === 'string' &&
    isUrl(obj['avatar']) &&
    Array.isArray(obj['skills']) &&
    obj['skills'].every((s: unknown) => typeof s === 'string') &&
    Array.isArray(obj['socialLinks']) &&
    obj['socialLinks'].every((link: unknown) => {
      if (typeof link !== 'object' || link === null) return false;
      const linkObj = link as Record<string, unknown>;
      return typeof linkObj['platform'] === 'string' && isUrl(linkObj['url']);
    }) &&
    obj['joinedAt'] instanceof Date
  );
}

export function isContactForm(value: unknown): value is ContactForm {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj['name'] === 'string' &&
    isEmailAddress(obj['email']) &&
    typeof obj['subject'] === 'string' &&
    typeof obj['message'] === 'string'
  );
}

// ============================================================================
// DISCRIMINATED UNION TYPE GUARDS
// ============================================================================

export function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj['status'] === 'string' && (obj['status'] === 'success' || obj['status'] === 'error')
  );
}

export function isSuccessResponse<T>(
  value: ApiResponse<T>
): value is Extract<ApiResponse<T>, { status: 'success' }> {
  return value.status === 'success';
}

export function isErrorResponse<T>(
  value: ApiResponse<T>
): value is Extract<ApiResponse<T>, { status: 'error' }> {
  return value.status === 'error';
}

export function isLoadingResponse<T>(
  value: ApiResponse<T>
): value is Extract<ApiResponse<T>, { status: 'loading' }> {
  return value.status === 'loading';
}

export function isFormFieldState(value: unknown): value is FormFieldState {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj['type'] === 'string' &&
    (obj['type'] === 'idle' ||
      obj['type'] === 'validating' ||
      obj['type'] === 'valid' ||
      obj['type'] === 'invalid') &&
    (obj['value'] === undefined || typeof obj['value'] === 'string')
  );
}

export function isNotification(value: unknown): value is Notification {
  if (typeof value !== 'object' || value === null) return false;

  const obj = value as Record<string, unknown>;

  return (
    typeof obj['type'] === 'string' &&
    (obj['type'] === 'success' ||
      obj['type'] === 'error' ||
      obj['type'] === 'warning' ||
      obj['type'] === 'info') &&
    typeof obj['message'] === 'string'
  );
}

// ============================================================================
// UTILITY TYPE GUARDS
// ============================================================================

export function isNonNullable<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function isArrayOf<T>(value: unknown, guard: (item: unknown) => item is T): value is T[] {
  return Array.isArray(value) && value.every(guard);
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function hasProperty<K extends string>(
  obj: Record<string, unknown>,
  key: K
): obj is Record<K, unknown> {
  return key in obj;
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date && !isNaN(value.getTime());
}

// ============================================================================
// ASSERTION FUNCTIONS
// ============================================================================

export function assertIsProduct(value: unknown): asserts value is Product {
  if (!isProduct(value)) {
    throw new Error('Value is not a valid Product');
  }
}

export function assertIsService(value: unknown): asserts value is Service {
  if (!isService(value)) {
    throw new Error('Value is not a valid Service');
  }
}

export function assertIsBlogPost(value: unknown): asserts value is BlogPost {
  if (!isBlogPost(value)) {
    throw new Error('Value is not a valid BlogPost');
  }
}

export function assertIsEmailAddress(value: unknown): asserts value is EmailAddress {
  if (!isEmailAddress(value)) {
    throw new Error('Value is not a valid EmailAddress');
  }
}

export function assertIsNonNullable<T>(value: T | null | undefined): asserts value is T {
  if (!isNonNullable(value)) {
    throw new Error('Value is null or undefined');
  }
}
