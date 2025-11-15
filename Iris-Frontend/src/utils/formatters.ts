// Data formatting utilities

export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatNumber = (num: number, decimals = 0): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

export const formatPercentage = (value: number, decimals = 1): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
};

export const formatDate = (
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-US', {
    ...defaultOptions,
    ...options,
  }).format(dateObj);
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatTime = (date: string | Date): string => {
  return formatDate(date, {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }

  return formatDate(dateObj);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }

  // Return original if not 10 digits
  return phone;
};

export const formatAddress = (address: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}): string => {
  return `${address.street}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
};

export const formatOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    preparing: 'Preparing',
    shipped: 'Shipped',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    returned: 'Returned',
  };

  return statusMap[status] || status;
};

export const formatProductCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    produce: 'Produce',
    meat: 'Meat',
    seafood: 'Seafood',
    dairy: 'Dairy',
    beverages: 'Beverages',
    pantry: 'Pantry',
    frozen: 'Frozen',
    bakery: 'Bakery',
    spices: 'Spices',
    other: 'Other',
  };

  return categoryMap[category] || category;
};

export const formatUserRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    restaurant: 'Restaurant',
    supplier: 'Supplier',
    admin: 'Administrator',
  };

  return roleMap[role] || role;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const formatInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

export const formatRating = (rating: number, maxRating = 5): string => {
  return `${rating.toFixed(1)}/${maxRating}`;
};

export const formatQuantity = (quantity: number, unit: string): string => {
  return `${quantity} ${unit}${quantity !== 1 ? 's' : ''}`;
};
