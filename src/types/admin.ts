// ============================================================================
// ADMIN SYSTEM TYPES - Premium Management Features
// ============================================================================

import { ProductId, UserId, ServiceId, BlogPostId, EmailAddress, Price, Rating } from '../types';

// ============================================================================
// BLOG/INSIGHTS MANAGEMENT
// ============================================================================

export interface BlogCategory {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly description?: string;
  readonly color?: string;
  readonly postCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface BlogTag {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly color?: string;
  readonly postCount: number;
  readonly createdAt: Date;
}

export interface SEOMetadata {
  readonly title: string;
  readonly description: string;
  readonly keywords: readonly string[];
  readonly ogImage?: string;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly canonicalUrl?: string;
  readonly noIndex?: boolean;
}

export interface BlogPostDraft {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly excerpt?: string;
  readonly categoryId?: string;
  readonly tags: readonly string[];
  readonly seoMetadata?: Partial<SEOMetadata>;
  readonly scheduledAt?: Date;
  readonly lastSaved: Date;
  readonly autoSaveEnabled: boolean;
}

export interface EnhancedBlogPost {
  readonly id: BlogPostId;
  readonly title: string;
  readonly slug: string;
  readonly excerpt: string;
  readonly content: string;
  readonly author: {
    readonly id: UserId;
    readonly name: string;
    readonly avatar?: string;
    readonly bio?: string;
  };
  readonly category: BlogCategory;
  readonly tags: readonly BlogTag[];
  readonly featuredImage: string;
  readonly seoMetadata: SEOMetadata;
  readonly status: 'draft' | 'scheduled' | 'published' | 'archived';
  readonly publishedAt?: Date;
  readonly scheduledAt?: Date;
  readonly readTime: number;
  readonly viewCount: number;
  readonly shareCount: number;
  readonly isPublished: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// ============================================================================
// HOMEPAGE CONTENT MANAGEMENT
// ============================================================================

export interface HeroSection {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly backgroundVideo?: string;
  readonly backgroundImage?: string;
  readonly ctaText: string;
  readonly ctaLink: string;
  readonly isActive: boolean;
  readonly version: number;
  readonly createdAt: Date;
}

export interface StatCounter {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly suffix: string;
  readonly icon: string;
  readonly color: string;
  readonly isVisible: boolean;
  readonly order: number;
}

export interface Testimonial {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly position: string;
  readonly company: string;
  readonly avatar?: string;
  readonly rating: Rating;
  readonly isVisible: boolean;
  readonly order: number;
  readonly createdAt: Date;
}

export interface FeaturedProduct {
  readonly productId: ProductId;
  readonly order: number;
  readonly customTitle?: string;
  readonly customDescription?: string;
  readonly isVisible: boolean;
  readonly startDate?: Date;
  readonly endDate?: Date;
}

// ============================================================================
// SERVICES MANAGEMENT
// ============================================================================

export interface ServicePricing {
  readonly id: string;
  readonly serviceId: ServiceId;
  readonly tier: string;
  readonly price: Price;
  readonly currency: string;
  readonly billingPeriod: 'one-time' | 'monthly' | 'yearly';
  readonly features: readonly string[];
  readonly isPopular: boolean;
  readonly isVisible: boolean;
}

export interface ServiceInquiry {
  readonly id: string;
  readonly serviceId: ServiceId;
  readonly customerName: string;
  readonly customerEmail: EmailAddress;
  readonly customerPhone?: string;
  readonly company?: string;
  readonly message: string;
  readonly status: 'new' | 'contacted' | 'quoted' | 'converted' | 'closed';
  readonly priority: 'low' | 'medium' | 'high';
  readonly assignedTo?: UserId;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ServiceAnalytics {
  readonly serviceId: ServiceId;
  readonly viewCount: number;
  readonly inquiryCount: number;
  readonly conversionRate: number;
  readonly averageResponseTime: number;
  readonly customerSatisfaction: Rating;
  readonly revenueGenerated: Price;
  readonly period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  readonly date: Date;
}

export interface EnhancedService {
  readonly id: ServiceId;
  readonly title: string;
  readonly description: string;
  readonly shortDescription: string;
  readonly icon: string;
  readonly type: string;
  readonly features: readonly string[];
  readonly pricing: readonly ServicePricing[];
  readonly image?: string;
  readonly gallery?: readonly string[];
  readonly isPopular: boolean;
  readonly isVisible: boolean;
  readonly seoMetadata: SEOMetadata;
  readonly analytics: ServiceAnalytics;
  readonly order: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// ============================================================================
// TEAM MANAGEMENT
// ============================================================================

export interface TeamMemberSkill {
  readonly id: string;
  readonly name: string;
  readonly level: 1 | 2 | 3 | 4 | 5;
  readonly category: string;
  readonly verified: boolean;
}

export interface TeamMemberPerformance {
  readonly memberId: UserId;
  readonly projectsCompleted: number;
  readonly clientSatisfaction: Rating;
  readonly responseTime: number;
  readonly expertise: readonly TeamMemberSkill[];
  readonly certifications: readonly string[];
  readonly lastReview: Date;
  readonly nextReview: Date;
}

export interface EnhancedTeamMember {
  readonly id: UserId;
  readonly name: string;
  readonly position: string;
  readonly department: string;
  readonly bio: string;
  readonly avatar: string;
  readonly email: EmailAddress;
  readonly phone?: string;
  readonly socialLinks: {
    readonly linkedin?: string;
    readonly twitter?: string;
    readonly github?: string;
    readonly website?: string;
  };
  readonly skills: readonly TeamMemberSkill[];
  readonly experience: number;
  readonly joinedAt: Date;
  readonly isVisible: boolean;
  readonly order: number;
  readonly performance: TeamMemberPerformance;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// ============================================================================
// MEDIA LIBRARY
// ============================================================================

export interface MediaAsset {
  readonly id: string;
  readonly filename: string;
  readonly originalName: string;
  readonly mimeType: string;
  readonly size: number;
  readonly width?: number;
  readonly height?: number;
  readonly url: string;
  readonly thumbnailUrl?: string;
  readonly optimizedUrl?: string;
  readonly alt: string;
  readonly caption?: string;
  readonly tags: readonly string[];
  readonly folder: string;
  readonly uploadedBy: UserId;
  readonly usageCount: number;
  readonly lastUsed?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface MediaFolder {
  readonly id: string;
  readonly name: string;
  readonly path: string;
  readonly parentId?: string;
  readonly assetCount: number;
  readonly createdAt: Date;
}

export interface MediaUsage {
  readonly assetId: string;
  readonly usedIn: 'blog' | 'product' | 'service' | 'team' | 'homepage';
  readonly entityId: string;
  readonly field: string;
  readonly usedAt: Date;
}

// ============================================================================
// E-COMMERCE & INVENTORY
// ============================================================================

export interface ProductVariant {
  readonly id: string;
  readonly productId: ProductId;
  readonly name: string;
  readonly sku: string;
  readonly price: Price;
  readonly compareAtPrice?: Price;
  readonly attributes: Record<string, string>;
  readonly inventory: ProductInventory;
  readonly isActive: boolean;
}

export interface ProductInventory {
  readonly sku: string;
  readonly quantity: number;
  readonly reservedQuantity: number;
  readonly availableQuantity: number;
  readonly reorderPoint: number;
  readonly reorderQuantity: number;
  readonly supplier: string;
  readonly supplierSku?: string;
  readonly cost: Price;
  readonly lastRestocked?: Date;
  readonly location?: string;
}

export interface Supplier {
  readonly id: string;
  readonly name: string;
  readonly contactPerson: string;
  readonly email: EmailAddress;
  readonly phone?: string;
  readonly address: string;
  readonly paymentTerms: string;
  readonly leadTime: number;
  readonly rating: Rating;
  readonly isActive: boolean;
  readonly createdAt: Date;
}

export interface Order {
  readonly id: string;
  readonly orderNumber: string;
  readonly customerId: UserId;
  readonly customerInfo: {
    readonly name: string;
    readonly email: EmailAddress;
    readonly phone?: string;
    readonly shippingAddress: Address;
    readonly billingAddress?: Address;
  };
  readonly items: readonly OrderItem[];
  readonly subtotal: Price;
  readonly tax: Price;
  readonly shipping: Price;
  readonly total: Price;
  readonly status: OrderStatus;
  readonly paymentStatus: PaymentStatus;
  readonly fulfillmentStatus: FulfillmentStatus;
  readonly notes?: string;
  readonly trackingNumber?: string;
  readonly estimatedDelivery?: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface OrderItem {
  readonly id: string;
  readonly productId: ProductId;
  readonly variantId?: string;
  readonly name: string;
  readonly sku: string;
  readonly quantity: number;
  readonly price: Price;
  readonly total: Price;
}

export interface Address {
  readonly street: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export enum FulfillmentStatus {
  UNFULFILLED = 'unfulfilled',
  PARTIAL = 'partial',
  FULFILLED = 'fulfilled',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered'
}

// ============================================================================
// CUSTOMER RELATIONSHIP MANAGEMENT
// ============================================================================

export interface Customer {
  readonly id: UserId;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: EmailAddress;
  readonly phone?: string;
  readonly company?: string;
  readonly addresses: readonly Address[];
  readonly tags: readonly string[];
  readonly totalSpent: Price;
  readonly orderCount: number;
  readonly averageOrderValue: Price;
  readonly lifetimeValue: Price;
  readonly acquisitionSource: string;
  readonly lastOrderAt?: Date;
  readonly lastContactAt?: Date;
  readonly notes?: string;
  readonly isVip: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface CustomerInteraction {
  readonly id: string;
  readonly customerId: UserId;
  readonly type: 'email' | 'phone' | 'meeting' | 'support' | 'sales';
  readonly subject: string;
  readonly description: string;
  readonly outcome?: string;
  readonly followUpRequired: boolean;
  readonly followUpDate?: Date;
  readonly assignedTo: UserId;
  readonly createdAt: Date;
}

export interface CustomerSegment {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly criteria: Record<string, any>;
  readonly customerCount: number;
  readonly averageValue: Price;
  readonly isActive: boolean;
  readonly createdAt: Date;
}

// ============================================================================
// ANALYTICS & REPORTING
// ============================================================================

export interface InventoryAlert {
  readonly id: string;
  readonly productId: ProductId;
  readonly type: 'low_stock' | 'out_of_stock' | 'overstock' | 'reorder';
  readonly message: string;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly threshold: number;
  readonly currentValue: number;
  readonly isResolved: boolean;
  readonly createdAt: Date;
  readonly resolvedAt?: Date;
}

export interface SalesAnalytics {
  readonly period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  readonly date: Date;
  readonly revenue: Price;
  readonly orderCount: number;
  readonly averageOrderValue: Price;
  readonly topProducts: readonly {
    readonly productId: ProductId;
    readonly name: string;
    readonly quantity: number;
    readonly revenue: Price;
  }[];
  readonly customerMetrics: {
    readonly newCustomers: number;
    readonly returningCustomers: number;
    readonly customerRetentionRate: number;
  };
}

export interface InventoryAnalytics {
  readonly productId: ProductId;
  readonly currentStock: number;
  readonly stockValue: Price;
  readonly turnoverRate: number;
  readonly daysOfSupply: number;
  readonly demandForecast: readonly {
    readonly date: Date;
    readonly predictedDemand: number;
    readonly confidence: number;
  }[];
  readonly seasonalTrends: readonly {
    readonly month: number;
    readonly averageDemand: number;
    readonly trend: 'increasing' | 'decreasing' | 'stable';
  }[];
  readonly supplierPerformance: {
    readonly supplierId: string;
    readonly onTimeDelivery: number;
    readonly qualityScore: Rating;
    readonly costEfficiency: number;
  };
}

// ============================================================================
// ADMIN DASHBOARD STATE
// ============================================================================

export interface AdminDashboardState {
  readonly currentSection: AdminSection;
  readonly isLoading: boolean;
  readonly error?: string;
  readonly notifications: readonly AdminNotification[];
  readonly quickStats: {
    readonly totalRevenue: Price;
    readonly totalOrders: number;
    readonly totalProducts: number;
    readonly totalCustomers: number;
    readonly lowStockAlerts: number;
    readonly pendingOrders: number;
  };
}

export enum AdminSection {
  OVERVIEW = 'overview',
  BLOG_MANAGEMENT = 'blog',
  HOMEPAGE_EDITOR = 'homepage',
  SERVICES_MANAGEMENT = 'services',
  TEAM_MANAGEMENT = 'team',
  MEDIA_LIBRARY = 'media',
  PRODUCT_MANAGEMENT = 'products',
  ORDER_MANAGEMENT = 'orders',
  CUSTOMER_MANAGEMENT = 'customers',
  INVENTORY_ANALYTICS = 'analytics'
}

export interface AdminNotification {
  readonly id: string;
  readonly type: 'info' | 'warning' | 'error' | 'success';
  readonly title: string;
  readonly message: string;
  readonly actionText?: string;
  readonly actionUrl?: string;
  readonly isRead: boolean;
  readonly createdAt: Date;
}

// ============================================================================
// FORM INTERFACES
// ============================================================================

export interface BlogPostForm {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: string;
  tags: string[];
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt?: Date;
}

export interface ProductForm {
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  inventory: {
    sku: string;
    quantity: number;
    reorderPoint: number;
    reorderQuantity: number;
    supplier: string;
    cost: number;
  };
  seoTitle: string;
  seoDescription: string;
  isActive: boolean;
}

export interface ServiceForm {
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  type: string;
  features: string[];
  image?: string;
  gallery: string[];
  pricing: Array<{
    tier: string;
    price: number;
    billingPeriod: string;
    features: string[];
    isPopular: boolean;
  }>;
  seoTitle: string;
  seoDescription: string;
  isPopular: boolean;
  isVisible: boolean;
}

export interface TeamMemberForm {
  name: string;
  position: string;
  department: string;
  bio: string;
  avatar: string;
  email: string;
  phone?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  skills: Array<{
    name: string;
    level: number;
    category: string;
  }>;
  experience: number;
  isVisible: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type AdminFormState<T> = {
  readonly data: T;
  readonly errors: Record<keyof T, string>;
  readonly touched: Record<keyof T, boolean>;
  readonly isValid: boolean;
  readonly isSubmitting: boolean;
};

export type AdminTableColumn<T> = {
  readonly key: keyof T;
  readonly label: string;
  readonly sortable?: boolean;
  readonly render?: (value: T[keyof T], item: T) => React.ReactNode;
  readonly width?: string;
};

export type AdminAction<T> = {
  readonly label: string;
  readonly icon?: string;
  readonly variant?: 'default' | 'destructive' | 'outline';
  readonly onClick: (item: T) => void;
  readonly disabled?: (item: T) => boolean;
};