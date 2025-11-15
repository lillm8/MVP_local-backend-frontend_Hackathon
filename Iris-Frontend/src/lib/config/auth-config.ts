// Authentication configuration

export const AUTH_CONFIG = {
  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  },

  // Session configuration
  session: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    updateAge: 24 * 60 * 60, // 1 day
  },

  // Role-based access
  roles: {
    restaurant: {
      level: 1,
      permissions: ['view_products', 'create_orders', 'view_orders'],
    },
    supplier: {
      level: 2,
      permissions: ['manage_products', 'view_orders', 'update_inventory'],
    },
    admin: {
      level: 3,
      permissions: ['manage_all', 'view_analytics', 'manage_users'],
    },
  },

  // Protected routes
  protectedRoutes: [
    '/dashboard',
    '/profile',
    '/settings',
    '/orders',
    '/products',
  ],

  // Public routes
  publicRoutes: ['/', '/auth/login', '/auth/register', '/auth/forgot-password'],
} as const;
