// API configuration

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  graphqlUrl:
    process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8000/graphql',

  // Endpoints
  endpoints: {
    auth: '/api/v1/auth',
    products: '/api/v1/products',
    orders: '/api/v1/orders',
    suppliers: '/api/v1/suppliers',
    users: '/api/v1/users',
    analytics: '/api/v1/analytics',
  },

  // Timeouts
  timeouts: {
    default: 10000, // 10 seconds
    upload: 30000, // 30 seconds
    download: 60000, // 60 seconds
  },

  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000, // 1 second
    backoff: 2,
  },
} as const;
