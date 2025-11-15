// Input validation utilities

import { VALIDATION } from '@/constants';

export const validateEmail = (email: string): boolean => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return VALIDATION.PHONE_REGEX.test(phone);
};

export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    errors.push(
      `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters long`
    );
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    errors.push(
      'Password must contain at least one special character (@$!%*?&)'
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateName = (
  name: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (name.length < VALIDATION.NAME_MIN_LENGTH) {
    errors.push(
      `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters long`
    );
  }

  if (name.length > VALIDATION.NAME_MAX_LENGTH) {
    errors.push(
      `Name must be less than ${VALIDATION.NAME_MAX_LENGTH} characters long`
    );
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    errors.push('Name can only contain letters and spaces');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateRequired = (value: string | number | boolean): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (typeof value === 'number') {
    return !isNaN(value);
  }
  return Boolean(value);
};

export const validateMinLength = (
  value: string,
  minLength: number
): boolean => {
  return value.length >= minLength;
};

export const validateMaxLength = (
  value: string,
  maxLength: number
): boolean => {
  return value.length <= maxLength;
};

export const validateMinValue = (value: number, minValue: number): boolean => {
  return value >= minValue;
};

export const validateMaxValue = (value: number, maxValue: number): boolean => {
  return value <= maxValue;
};

export const validateRange = (
  value: number,
  min: number,
  max: number
): boolean => {
  return value >= min && value <= max;
};

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateZipCode = (zipCode: string): boolean => {
  // US ZIP code validation (5 digits or 5+4 format)
  return /^\d{5}(-\d{4})?$/.test(zipCode);
};

export const validateCreditCard = (cardNumber: string): boolean => {
  // Luhn algorithm for credit card validation
  const cleaned = cardNumber.replace(/\D/g, '');

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

export const validateExpiryDate = (month: string, year: string): boolean => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);

  if (expMonth < 1 || expMonth > 12) {
    return false;
  }

  if (expYear < currentYear) {
    return false;
  }

  if (expYear === currentYear && expMonth < currentMonth) {
    return false;
  }

  return true;
};

export const validateCvv = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv);
};

export const validateAddress = (address: {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};

  if (!validateRequired(address.street)) {
    errors.street = ['Street address is required'];
  }

  if (!validateRequired(address.city)) {
    errors.city = ['City is required'];
  }

  if (!validateRequired(address.state)) {
    errors.state = ['State is required'];
  }

  if (!validateRequired(address.zipCode)) {
    errors.zipCode = ['ZIP code is required'];
  } else if (!validateZipCode(address.zipCode)) {
    errors.zipCode = ['Please enter a valid ZIP code'];
  }

  if (!validateRequired(address.country)) {
    errors.country = ['Country is required'];
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateProductForm = (data: {
  name: string;
  description: string;
  price: number;
  category: string;
  unit: string;
  minimumOrderQuantity: number;
}): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};

  if (!validateRequired(data.name)) {
    errors.name = ['Product name is required'];
  } else if (!validateMinLength(data.name, 2)) {
    errors.name = ['Product name must be at least 2 characters long'];
  }

  if (!validateRequired(data.description)) {
    errors.description = ['Product description is required'];
  } else if (!validateMinLength(data.description, 10)) {
    errors.description = [
      'Product description must be at least 10 characters long',
    ];
  }

  if (!validateRequired(data.price)) {
    errors.price = ['Price is required'];
  } else if (!validateMinValue(data.price, 0.01)) {
    errors.price = ['Price must be greater than 0'];
  }

  if (!validateRequired(data.category)) {
    errors.category = ['Category is required'];
  }

  if (!validateRequired(data.unit)) {
    errors.unit = ['Unit is required'];
  }

  if (!validateRequired(data.minimumOrderQuantity)) {
    errors.minimumOrderQuantity = ['Minimum order quantity is required'];
  } else if (!validateMinValue(data.minimumOrderQuantity, 1)) {
    errors.minimumOrderQuantity = ['Minimum order quantity must be at least 1'];
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateOrderForm = (data: {
  supplierId: string;
  items: Array<{ productId: string; quantity: number }>;
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}): { isValid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};

  if (!validateRequired(data.supplierId)) {
    errors.supplierId = ['Supplier is required'];
  }

  if (!data.items || data.items.length === 0) {
    errors.items = ['At least one item is required'];
  } else {
    data.items.forEach((item, index) => {
      if (!validateRequired(item.productId)) {
        errors[`items.${index}.productId`] = ['Product is required'];
      }
      if (
        !validateRequired(item.quantity) ||
        !validateMinValue(item.quantity, 1)
      ) {
        errors[`items.${index}.quantity`] = ['Quantity must be at least 1'];
      }
    });
  }

  if (!validateRequired(data.deliveryDate)) {
    errors.deliveryDate = ['Delivery date is required'];
  } else {
    const deliveryDate = new Date(data.deliveryDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (deliveryDate < today) {
      errors.deliveryDate = ['Delivery date cannot be in the past'];
    }
  }

  if (!validateRequired(data.deliveryTime)) {
    errors.deliveryTime = ['Delivery time is required'];
  }

  const addressValidation = validateAddress(data.deliveryAddress);
  if (!addressValidation.isValid) {
    Object.assign(errors, addressValidation.errors);
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
