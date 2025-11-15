// Data transformation and utility functions

export function transformApiResponse<T>(data: any): T {
  // Transform API response to match frontend expectations
  if (Array.isArray(data)) {
    return data.map(transformApiResponse) as T;
  }

  if (data && typeof data === 'object') {
    // Convert snake_case to camelCase
    const transformed: any = {};
    for (const [key, value] of Object.entries(data)) {
      const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      transformed[camelKey] = transformApiResponse(value);
    }
    return transformed;
  }

  return data;
}

export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  return searchParams.toString();
}

export function createCacheKey(
  prefix: string,
  params?: Record<string, any>
): string[] {
  const key = [prefix];
  if (params) {
    Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([k, v]) => key.push(`${k}:${v}`));
  }
  return key;
}

export function handleApiError(error: any): string {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'An unexpected error occurred';
}
