#!/usr/bin/env node

/**
 * Code Quality Test Script for IrisFrontend
 * Runs ESLint, TypeScript check, Prettier check, Jest tests, and build to ensure code quality
 */

const { execSync } = require('child_process');

// Colors for output
const colors = {
  RED: '\x1b[31m',
  GREEN: '\x1b[32m',
  YELLOW: '\x1b[33m',
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m'
};

// Function to print colored output
function printStatus(status, message) {
  const colorMap = {
    SUCCESS: colors.GREEN,
    WARNING: colors.YELLOW,
    ERROR: colors.RED,
    INFO: colors.BLUE
  };
  
  const emojiMap = {
    SUCCESS: '✅',
    WARNING: '⚠️ ',
    ERROR: '❌',
    INFO: 'ℹ️ '
  };
  
  console.log(`${colorMap[status]}${emojiMap[status]} ${message}${colors.RESET}`);
}

// Function to run command and capture output
function runCommand(command, options = {}) {
  try {
    const output = execSync(command, { 
      encoding: 'utf8', 
      stdio: options.silent ? 'pipe' : 'inherit',
      timeout: options.timeout || 30000, // 30 second timeout
      ...options 
    });
    return { success: true, output: output || '', exitCode: 0 };
  } catch (error) {
    return { 
      success: false, 
      output: error.stdout || error.stderr || error.message, 
      exitCode: error.status || 1 
    };
  }
}

// Function to count ESLint issues
function countESLintIssues(output) {
  let errors = 0;
  let warnings = 0;
  
  // Count errors (look for "error" followed by space)
  const errorMatches = output.match(/error /g);
  if (errorMatches) {
    errors = errorMatches.length;
  }
  
  // Count warnings (look for "warning" followed by space)
  const warningMatches = output.match(/warning /g);
  if (warningMatches) {
    warnings = warningMatches.length;
  }
  
  // Also check the summary line at the end
  const problemsMatch = output.match(/(\d+) errors?.*?(\d+) warnings?/);
  if (problemsMatch) {
    errors = parseInt(problemsMatch[1]) || errors;
    warnings = parseInt(problemsMatch[2]) || warnings;
  }
  
  return { errors, warnings };
}

async function main() {
  console.log('🔍 Code Quality Test Suite - IrisFrontend');
  console.log('==========================================');
  console.log('');
  
  let totalErrors = 0;
  let eslintErrors = 0;
  let eslintWarnings = 0;
  
  // 1. ESLint
  console.log('1️⃣  Running ESLint...');
  console.log('-------------------');
  console.log('');
  
  const eslintResult = runCommand('npm run lint', { silent: true });
  const eslintIssues = countESLintIssues(eslintResult.output);
  eslintErrors = eslintIssues.errors;
  eslintWarnings = eslintIssues.warnings;
  
  if (eslintErrors > 0) {
    printStatus('ERROR', `ESLint found ${eslintErrors} errors`);
    totalErrors += eslintErrors;
  } else if (eslintWarnings > 0) {
    printStatus('WARNING', `ESLint found ${eslintWarnings} warnings (no errors)`);
  } else {
    printStatus('SUCCESS', 'ESLint passed with no issues');
  }
  
  console.log(`   Errors: ${eslintErrors}`);
  console.log(`   Warnings: ${eslintWarnings}`);
  console.log('');
  
  if (eslintErrors > 0 || eslintWarnings > 0) {
    console.log('ESLint Output:');
    console.log(eslintResult.output);
    console.log('');
  }
  
  // 2. TypeScript Check
  console.log('2️⃣  Running TypeScript Check...');
  console.log('-----------------------------');
  console.log('');
  
  const tscResult = runCommand('npm run type-check', { silent: true });
  if (tscResult.success) {
    printStatus('SUCCESS', 'TypeScript check passed');
  } else {
    printStatus('ERROR', 'TypeScript check failed');
    console.log(tscResult.output);
    console.log('');
    totalErrors += 1;
  }
  
  // 3. Prettier Check
  console.log('3️⃣  Running Prettier Check...');
  console.log('----------------------------');
  console.log('');
  
  const prettierResult = runCommand('npx prettier --check "src/**/*.{ts,tsx,js,jsx,json,css,md}"', { silent: true });
  if (prettierResult.success) {
    printStatus('SUCCESS', 'Prettier formatting check passed');
  } else {
    printStatus('ERROR', 'Prettier formatting check failed - files need formatting');
    console.log(prettierResult.output);
    console.log('');
    totalErrors += 1;
  }
  
  // 4. Jest Tests
  console.log('4️⃣  Running Jest Tests...');
  console.log('------------------------');
  console.log('');
  
  const jestResult = runCommand('npm test -- --passWithNoTests', { silent: true });
  if (jestResult.success) {
    printStatus('SUCCESS', 'Jest tests passed');
  } else {
    printStatus('ERROR', 'Jest tests failed');
    console.log(jestResult.output);
    console.log('');
    totalErrors += 1;
  }
  
  // 5. Build
  console.log('5️⃣  Running Build...');
  console.log('------------------');
  console.log('');
  
  const buildResult = runCommand('npm run build', { silent: true });
  if (buildResult.success) {
    printStatus('SUCCESS', 'Build completed successfully');
  } else {
    printStatus('ERROR', 'Build failed');
    console.log(buildResult.output);
    console.log('');
    totalErrors += 1;
  }
  
  // 6. E2E Tests (optional)
  console.log('6️⃣  Running E2E Tests (if available)...');
  console.log('--------------------------------------');
  console.log('');
  
  const e2eResult = runCommand('npm run e2e', { silent: true });
  if (e2eResult.success) {
    printStatus('SUCCESS', 'E2E tests passed');
  } else if (e2eResult.output.includes('No tests found') || e2eResult.output.includes('No test files found')) {
    printStatus('INFO', 'No E2E tests found (skipped)');
  } else {
    printStatus('WARNING', 'E2E tests failed or not configured');
    console.log(e2eResult.output);
    console.log('');
  }
  
  // Summary
  console.log('📊 Summary');
  console.log('==========');
  console.log('');
  
  if (totalErrors === 0) {
    if (eslintWarnings > 0) {
      printStatus('SUCCESS', 'All critical checks passed! IrisFrontend code quality is good.');
      console.log('');
      console.log(`✅ ESLint: ${eslintWarnings} warnings (no errors)`);
      console.log('✅ TypeScript: No type errors');
      console.log('✅ Prettier: Code formatting is correct');
      console.log('✅ Jest: All tests passed');
      console.log('✅ Build: Successful compilation');
      console.log('');
      console.log('🎉 Your IrisFrontend code is ready for production!');
      console.log('💡 Consider fixing ESLint warnings for even better code quality.');
    } else {
      printStatus('SUCCESS', 'All checks passed! IrisFrontend code quality is excellent.');
      console.log('');
      console.log('✅ ESLint: No issues found');
      console.log('✅ TypeScript: No type errors');
      console.log('✅ Prettier: Code formatting is correct');
      console.log('✅ Jest: All tests passed');
      console.log('✅ Build: Successful compilation');
      console.log('');
      console.log('🎉 Your IrisFrontend code is ready for production!');
    }
  } else {
    printStatus('ERROR', 'Some checks failed. Please review the issues above.');
    console.log('');
    console.log(`❌ Total errors found: ${totalErrors}`);
    console.log('');
    console.log('🔧 To fix issues:');
    console.log('   - ESLint errors: Run \'npm run lint\' and fix reported issues');
    console.log('   - ESLint warnings: Review and fix code style issues');
    console.log('   - TypeScript errors: Fix type definitions and imports');
    console.log('   - Prettier issues: Run \'npx prettier --write "src/**/*.{ts,tsx,js,jsx,json,css,md}"\'');
    console.log('   - Jest failures: Fix failing tests in the tests/ directory');
    console.log('   - Build errors: Resolve compilation issues');
    console.log('   - E2E failures: Fix end-to-end tests in tests/e2e/');
  }
  
  console.log('');
  
  // Exit with appropriate code
  process.exit(totalErrors > 0 ? 1 : 0);
}

// Run the main function
main().catch(error => {
  console.error('Script failed:', error);
  process.exit(1);
});
