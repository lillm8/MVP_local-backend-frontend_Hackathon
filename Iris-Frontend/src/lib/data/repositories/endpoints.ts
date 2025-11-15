// API endpoint definitions

import { API_ENDPOINTS } from '@/constants';

export const endpoints = {
  // Authentication endpoints
  auth: {
    login: () => API_ENDPOINTS.AUTH.LOGIN,
    register: () => API_ENDPOINTS.AUTH.REGISTER,
    refresh: () => API_ENDPOINTS.AUTH.REFRESH,
    logout: () => API_ENDPOINTS.AUTH.LOGOUT,
    profile: () => API_ENDPOINTS.AUTH.PROFILE,
  },

  // Product endpoints
  products: {
    list: () => API_ENDPOINTS.PRODUCTS.LIST,
    detail: (id: string) => API_ENDPOINTS.PRODUCTS.DETAIL.replace(':id', id),
    create: () => API_ENDPOINTS.PRODUCTS.CREATE,
    update: (id: string) => API_ENDPOINTS.PRODUCTS.UPDATE.replace(':id', id),
    delete: (id: string) => API_ENDPOINTS.PRODUCTS.DELETE.replace(':id', id),
    search: () => API_ENDPOINTS.PRODUCTS.SEARCH,
    categories: () => API_ENDPOINTS.PRODUCTS.CATEGORIES,
  },

  // Supplier endpoints
  suppliers: {
    list: () => API_ENDPOINTS.SUPPLIERS.LIST,
    detail: (id: string) => API_ENDPOINTS.SUPPLIERS.DETAIL.replace(':id', id),
    products: (id: string) =>
      API_ENDPOINTS.SUPPLIERS.PRODUCTS.replace(':id', id),
    reviews: (id: string) => API_ENDPOINTS.SUPPLIERS.REVIEWS.replace(':id', id),
    contact: (id: string) => API_ENDPOINTS.SUPPLIERS.CONTACT.replace(':id', id),
  },

  // Restaurant endpoints
  restaurants: {
    list: () => API_ENDPOINTS.RESTAURANTS.LIST,
    detail: (id: string) => API_ENDPOINTS.RESTAURANTS.DETAIL.replace(':id', id),
    profile: () => API_ENDPOINTS.RESTAURANTS.PROFILE,
    update: () => API_ENDPOINTS.RESTAURANTS.UPDATE,
  },

  // Order endpoints
  orders: {
    list: () => API_ENDPOINTS.ORDERS.LIST,
    detail: (id: string) => API_ENDPOINTS.ORDERS.DETAIL.replace(':id', id),
    create: () => API_ENDPOINTS.ORDERS.CREATE,
    update: (id: string) => API_ENDPOINTS.ORDERS.UPDATE.replace(':id', id),
    cancel: (id: string) => API_ENDPOINTS.ORDERS.CANCEL.replace(':id', id),
  },

  // Cart endpoints
  cart: {
    get: () => API_ENDPOINTS.CART.GET,
    addItem: () => API_ENDPOINTS.CART.ADD_ITEM,
    updateItem: (id: string) =>
      API_ENDPOINTS.CART.UPDATE_ITEM.replace(':id', id),
    removeItem: (id: string) =>
      API_ENDPOINTS.CART.REMOVE_ITEM.replace(':id', id),
    clear: () => API_ENDPOINTS.CART.CLEAR,
  },

  // Message endpoints
  messages: {
    list: () => API_ENDPOINTS.MESSAGES.LIST,
    send: () => API_ENDPOINTS.MESSAGES.SEND,
    markRead: (id: string) =>
      API_ENDPOINTS.MESSAGES.MARK_READ.replace(':id', id),
  },
} as const;
