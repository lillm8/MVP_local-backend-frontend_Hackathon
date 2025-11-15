// Application configuration

export const APP_CONFIG = {
  name: 'Iris Marketplace',
  version: '1.0.0',
  description: 'B2B marketplace for restaurants and suppliers',

  // Environment
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',

  // Features
  features: {
    aiInsights: process.env.NEXT_PUBLIC_ENABLE_AI_FEATURES === 'true',
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    realTimeUpdates: true,
  },

  // Performance
  performance: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retryAttempts: 3,
  },
} as const;
