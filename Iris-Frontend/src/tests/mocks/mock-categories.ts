// Mock categories for filtering
export const MOCK_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'meat', label: 'Meat' },
  { id: 'organic', label: 'Organic' },
  { id: 'seasonal', label: 'Seasonal' },
] as const;

// Mock regions for filtering
export const MOCK_REGIONS = ['Within 10km', '10-20km', '20-50km'] as const;

// Mock certifications
export const MOCK_CERTIFICATIONS = ['Organic', 'Local', 'Traceable'] as const;

export function getMockCategories() {
  return MOCK_CATEGORIES;
}

export function getMockRegions() {
  return MOCK_REGIONS;
}

export function getMockCertifications() {
  return MOCK_CERTIFICATIONS;
}
