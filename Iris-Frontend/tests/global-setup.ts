import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  // Setup code that runs before all tests
  console.log('Setting up global test environment...')
  
  // You can add database seeding, authentication setup, etc. here
  // For now, we'll just ensure the app is running
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  try {
    // Wait for the app to be ready
    await page.goto(config.projects[0].use.baseURL || 'http://localhost:3000')
    await page.waitForLoadState('networkidle')
    console.log('App is ready for testing')
  } catch (error) {
    console.error('Failed to verify app is running:', error)
    throw error
  } finally {
    await browser.close()
  }
}

export default globalSetup