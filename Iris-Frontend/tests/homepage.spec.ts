import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should load the homepage successfully', async ({ page }) => {
    await page.goto('/')
    
    // Check if the page loads
    await expect(page).toHaveTitle(/Iris Marketplace/)
    
    // Check for main heading
    await expect(page.getByRole('heading', { name: /Empowering local producers/i })).toBeVisible()
    
    // Check for search bar
    await expect(page.getByPlaceholder(/Search producers, ingredients/i)).toBeVisible()
  })

  test('should display filter sidebar', async ({ page }) => {
    await page.goto('/')
    
    // Check if filter sidebar is visible
    await expect(page.getByText('Filters')).toBeVisible()
    
    // Check for category filters
    await expect(page.getByText('Category')).toBeVisible()
    await expect(page.getByText('Region')).toBeVisible()
    await expect(page.getByText('Certification')).toBeVisible()
  })

  test('should display products and suppliers', async ({ page }) => {
    await page.goto('/')
    
    // Wait for content to load
    await page.waitForSelector('[data-testid="product-grid"], [data-testid="supplier-grid"]', { timeout: 10000 })
    
    // Check for featured products section
    await expect(page.getByText('Featured Products')).toBeVisible()
    
    // Check for recommended suppliers section
    await expect(page.getByText('Recommended for You')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Check if mobile layout works
    await expect(page.getByRole('heading', { name: /Empowering local producers/i })).toBeVisible()
    
    // Check if filter button is visible on mobile
    await expect(page.getByText('Show Filters')).toBeVisible()
  })
})
