// Application constants and configuration

export const APP_CONFIG = {
  name: 'Iris Marketplace',
  description: 'B2B Food Supply Platform',
  version: '1.0.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  graphqlUrl:
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql',
} as const;

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
  },
  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: '/products/:id',
    CREATE: '/products',
    UPDATE: '/products/:id',
    DELETE: '/products/:id',
    SEARCH: '/products/search',
    CATEGORIES: '/products/categories',
  },
  // Suppliers
  SUPPLIERS: {
    LIST: '/suppliers',
    DETAIL: '/suppliers/:id',
    PRODUCTS: '/suppliers/:id/products',
    REVIEWS: '/suppliers/:id/reviews',
    CONTACT: '/suppliers/:id/contact',
  },
  // Restaurants
  RESTAURANTS: {
    LIST: '/restaurants',
    DETAIL: '/restaurants/:id',
    PROFILE: '/restaurants/profile',
    UPDATE: '/restaurants/profile',
  },
  // Orders
  ORDERS: {
    LIST: '/orders',
    DETAIL: '/orders/:id',
    CREATE: '/orders',
    UPDATE: '/orders/:id',
    CANCEL: '/orders/:id/cancel',
  },
  // Cart
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart/items',
    UPDATE_ITEM: '/cart/items/:id',
    REMOVE_ITEM: '/cart/items/:id',
    CLEAR: '/cart/clear',
  },
  // Messages
  MESSAGES: {
    LIST: '/messages',
    SEND: '/messages',
    MARK_READ: '/messages/:id/read',
  },
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const CACHE_KEYS = {
  PRODUCTS: 'products',
  SUPPLIERS: 'suppliers',
  RESTAURANTS: 'restaurants',
  ORDERS: 'orders',
  CART: 'cart',
  USER: 'user',
  PROFILE: 'profile',
} as const;

export const QUERY_KEYS = {
  // Products
  PRODUCTS: [CACHE_KEYS.PRODUCTS],
  PRODUCT_DETAIL: (id: string) => [CACHE_KEYS.PRODUCTS, id],
  PRODUCT_CATEGORIES: [CACHE_KEYS.PRODUCTS, 'categories'],

  // Suppliers
  SUPPLIERS: [CACHE_KEYS.SUPPLIERS],
  SUPPLIER_DETAIL: (id: string) => [CACHE_KEYS.SUPPLIERS, id],
  SUPPLIER_PRODUCTS: (id: string) => [CACHE_KEYS.SUPPLIERS, id, 'products'],

  // Restaurants
  RESTAURANTS: [CACHE_KEYS.RESTAURANTS],
  RESTAURANT_DETAIL: (id: string) => [CACHE_KEYS.RESTAURANTS, id],

  // Orders
  ORDERS: [CACHE_KEYS.ORDERS],
  ORDER_DETAIL: (id: string) => [CACHE_KEYS.ORDERS, id],

  // Cart
  CART: [CACHE_KEYS.CART],

  // User
  USER: [CACHE_KEYS.USER],
  PROFILE: [CACHE_KEYS.PROFILE],
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/products',
  SUPPLIERS: '/suppliers',
  ORDERS: '/orders',
  CART: '/cart',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  MESSAGES: '/messages',
  FAVORITES: '/favorites',
} as const;

export const USER_ROLES = {
  RESTAURANT: 'restaurant',
  SUPPLIER: 'supplier',
  ADMIN: 'admin',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  RETURNED: 'returned',
} as const;

export const PRODUCT_CATEGORIES = {
  PRODUCE: 'produce',
  MEAT: 'meat',
  SEAFOOD: 'seafood',
  DAIRY: 'dairy',
  BEVERAGES: 'beverages',
  PANTRY: 'pantry',
  FROZEN: 'frozen',
  BAKERY: 'bakery',
  SPICES: 'spices',
  OTHER: 'other',
} as const;

export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
} as const;

export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters`,
  NAME_TOO_SHORT: `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`,
  NAME_TOO_LONG: `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters`,
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully',
  ORDER_CREATED: 'Order created successfully',
  ORDER_UPDATED: 'Order updated successfully',
  ITEM_ADDED_TO_CART: 'Item added to cart',
  ITEM_REMOVED_FROM_CART: 'Item removed from cart',
  CART_CLEARED: 'Cart cleared successfully',
  MESSAGE_SENT: 'Message sent successfully',
} as const;
