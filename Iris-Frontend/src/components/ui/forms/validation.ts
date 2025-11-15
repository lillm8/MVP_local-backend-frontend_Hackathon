// Form validation utilities

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateField(
  value: any,
  rules: ValidationRule,
  fieldName: string
): string | null {
  // Required validation
  if (rules.required && (!value || value.toString().trim() === '')) {
    return `${fieldName} is required`;
  }

  // Skip other validations if value is empty and not required
  if (!value || value.toString().trim() === '') {
    return null;
  }

  // Min length validation
  if (rules.minLength && value.toString().length < rules.minLength) {
    return `${fieldName} must be at least ${rules.minLength} characters`;
  }

  // Max length validation
  if (rules.maxLength && value.toString().length > rules.maxLength) {
    return `${fieldName} must be no more than ${rules.maxLength} characters`;
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value.toString())) {
    return `${fieldName} format is invalid`;
  }

  // Custom validation
  if (rules.custom) {
    return rules.custom(value);
  }

  return null;
}

export function validateForm(
  data: Record<string, any>,
  rules: Record<string, ValidationRule>
): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [fieldName, fieldRules] of Object.entries(rules)) {
    const error = validateField(data[fieldName], fieldRules, fieldName);
    if (error) {
      errors[fieldName] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Common validation rules
export const commonRules = {
  required: { required: true },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  description: {
    maxLength: 500,
  },
  price: {
    required: true,
    custom: (value: any) => {
      const num = parseFloat(value);
      if (isNaN(num) || num < 0) {
        return 'Price must be a valid positive number';
      }
      return null;
    },
  },
  quantity: {
    required: true,
    custom: (value: any) => {
      const num = parseInt(value);
      if (isNaN(num) || num < 1) {
        return 'Quantity must be a valid positive integer';
      }
      return null;
    },
  },
};
