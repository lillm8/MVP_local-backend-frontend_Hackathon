// Mock authentication credentials for demo purposes
export const MOCK_AUTH_CREDENTIALS = {
  supplier: { username: 'supplier', password: 'supplier' },
  restaurant: { username: 'restaurant', password: 'restaurant' },
} as const;

export function getMockAuthCredentials() {
  return MOCK_AUTH_CREDENTIALS;
}
