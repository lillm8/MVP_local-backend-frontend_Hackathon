# Test Suite Documentation

## Purpose
Testing framework for Iris Marketplace Frontend with SOLID principles analysis, E2E testing, and code quality validation.

## Test Files

### `solid-principles.test.ts`
- **Type**: Unit tests using Vitest
- **Purpose**: Analyzes codebase for SOLID principles compliance
- **What it tests**: SRP, OCP, LSP, ISP, DIP violations in TypeScript files
- **Run command**: `npx vitest run tests/solid-principles.test.ts`
- **Watch mode**: `npx vitest tests/solid-principles.test.ts`
- **Coverage**: `npx vitest run tests/solid-principles.test.ts --coverage`

### `homepage.spec.ts`
- **Type**: End-to-end tests using Playwright
- **Purpose**: Tests homepage functionality and UI interactions
- **What it tests**: Page loading, UI elements, responsive design, user flows
- **Run command**: `npx playwright test`
- **Headed mode**: `npx playwright test --headed`
- **Debug mode**: `npx playwright test --debug`

### `global-setup.ts`
- **Type**: Playwright global setup
- **Purpose**: Initializes test environment before all E2E tests
- **What it does**: Launches browser, verifies app is running on localhost:3000

### `global-teardown.ts`
- **Type**: Playwright global teardown
- **Purpose**: Cleans up test environment after all E2E tests
- **What it does**: Handles cleanup tasks and resource disposal

### `test-code-quality.sh`
- **Type**: Shell script for code quality validation
- **Purpose**: Runs comprehensive code quality checks
- **What it does**: ESLint, TypeScript check, build verification
- **Run command**: `./tests/test-code-quality.sh`

### `vitest.config.ts`
- **Type**: Vitest configuration
- **Purpose**: Configures unit testing environment
- **Settings**: Node.js, ES2020+, V8 coverage, `**/*.test.ts` pattern

## Prerequisites
- Node.js 18+
- npm dependencies installed
- Application running on localhost:3000 (for E2E tests)

## Quick Start
```bash
# Install dependencies
npm install

# Run all unit tests
npx vitest run

# Run E2E tests
npx playwright test

# Run code quality checks
./tests/test-code-quality.sh
```

## Best Practices

### Development
1. Keep files focused - single responsibility per module
2. Limit exports - avoid barrel exports with too many items
3. Design lean interfaces - break large interfaces into smaller ones
4. Minimize dependencies - reduce coupling between modules
5. Use abstractions - depend on interfaces, not concrete implementations

### Code Review
1. Check SOLID violations before merging
2. Address high-severity issues immediately
3. Use test results to guide refactoring priorities
4. Consider overall SOLID score when evaluating code quality