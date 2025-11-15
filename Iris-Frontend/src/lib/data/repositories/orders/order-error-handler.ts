export class OrderServiceErrorHandler {
  static createError(message: string, originalError?: unknown): Error {
    console.error(message, originalError);
    return new Error(message);
  }

  static handleValidationError(validation: { errors: string[] }): Error {
    return this.createError(validation.errors.join(', '));
  }

  static handleServiceError(operation: string, originalError?: unknown): Error {
    return this.createError(`Failed to ${operation}`, originalError);
  }
}
