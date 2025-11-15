// Authentication validation utilities

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];

  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateLoginCredentials(
  email: string,
  password: string
): ValidationResult {
  const emailValidation = validateEmail(email);
  const passwordValidation = validatePassword(password);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid,
    errors: [...emailValidation.errors, ...passwordValidation.errors],
  };
}
