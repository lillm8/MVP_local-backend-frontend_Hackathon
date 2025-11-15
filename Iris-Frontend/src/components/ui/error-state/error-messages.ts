// Error message utilities

export function getErrorMessage(error: any) {
  if (error?.status === 401) {
    return {
      title: 'Unauthorized',
      description: 'You need to log in to access this resource.',
    };
  }

  if (error?.status === 403) {
    return {
      title: 'Access Denied',
      description: "You don't have permission to access this resource.",
    };
  }

  if (error?.status === 404) {
    return {
      title: 'Not Found',
      description: 'The requested resource was not found.',
    };
  }

  if (error?.status === 500) {
    return {
      title: 'Server Error',
      description: 'Something went wrong on our end. Please try again later.',
    };
  }

  if (error?.status === 0 || !error?.status) {
    return {
      title: 'Network Error',
      description: 'Please check your internet connection and try again.',
    };
  }

  return {
    title: 'Error',
    description: error?.message || 'An unexpected error occurred.',
  };
}
