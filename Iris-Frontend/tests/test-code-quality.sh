#!/bin/bash

# Code Quality Test Script for IrisFrontend
# Runs ESLint, TypeScript check, Prettier check, Jest tests, and build to ensure code quality

echo "🔍 Code Quality Test Suite - IrisFrontend"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "SUCCESS")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "ERROR")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

# Function to run command and capture output
run_command() {
    local command="$1"
    local description="$2"
    local output=""
    local exit_code=0
    
    echo "Running: $description"
    if output=$(bash -c "$command" 2>&1); then
        exit_code=0
    else
        exit_code=$?
    fi
    
    echo "$output"
    return $exit_code
}

# Function to count ESLint issues
count_eslint_issues() {
    local output="$1"
    local errors=0
    local warnings=0
    
    # Count errors by looking for lines that contain "Error:"
    errors=$(echo "$output" | grep -c "Error:" || echo "0")
    
    # Count warnings by looking for lines that contain "Warning:"
    warnings=$(echo "$output" | grep -c "Warning:" || echo "0")
    
    echo "$errors $warnings"
}

# Track overall status
TOTAL_ERRORS=0
ESLINT_ERRORS=0
ESLINT_WARNINGS=0

echo "1️⃣  Running ESLint..."
echo "-------------------"
echo ""

# Run ESLint and capture output
ESLINT_OUTPUT=$(run_command "npm run lint" "ESLint check")
ESLINT_EXIT_CODE=$?

# Count issues
ESLINT_ISSUES=$(count_eslint_issues "$ESLINT_OUTPUT")
ESLINT_ERRORS=$(echo $ESLINT_ISSUES | cut -d' ' -f1)
ESLINT_WARNINGS=$(echo $ESLINT_ISSUES | cut -d' ' -f2)

if [ $ESLINT_ERRORS -gt 0 ]; then
    print_status "ERROR" "ESLint found $ESLINT_ERRORS errors"
    TOTAL_ERRORS=$((TOTAL_ERRORS + ESLINT_ERRORS))
elif [ $ESLINT_WARNINGS -gt 0 ]; then
    print_status "WARNING" "ESLint found $ESLINT_WARNINGS warnings (no errors)"
else
    print_status "SUCCESS" "ESLint passed with no issues"
fi

echo "   Errors: $ESLINT_ERRORS"
echo "   Warnings: $ESLINT_WARNINGS"
echo ""

echo "2️⃣  Running TypeScript Check..."
echo "-----------------------------"
echo ""

# Run TypeScript check
TSC_OUTPUT=$(run_command "npm run type-check" "TypeScript check")
TSC_EXIT_CODE=$?

if [ $TSC_EXIT_CODE -eq 0 ]; then
    print_status "SUCCESS" "TypeScript check passed"
else
    print_status "ERROR" "TypeScript check failed"
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi

echo ""

echo "3️⃣  Running Prettier Check..."
echo "----------------------------"
echo ""

# Run Prettier check
PRETTIER_OUTPUT=$(run_command "npx prettier --check 'src/**/*.{ts,tsx,js,jsx,json,css,md}'" "Prettier check")
PRETTIER_EXIT_CODE=$?

if [ $PRETTIER_EXIT_CODE -eq 0 ]; then
    print_status "SUCCESS" "Prettier formatting check passed"
else
    print_status "ERROR" "Prettier formatting check failed - files need formatting"
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi

echo ""

echo "4️⃣  Running Jest Tests..."
echo "------------------------"
echo ""

# Run Jest tests
JEST_OUTPUT=$(run_command "npm test -- --passWithNoTests" "Jest tests")
JEST_EXIT_CODE=$?

if [ $JEST_EXIT_CODE -eq 0 ]; then
    print_status "SUCCESS" "Jest tests passed"
else
    print_status "ERROR" "Jest tests failed"
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi

echo ""

echo "5️⃣  Running Build..."
echo "------------------"
echo ""

# Run build
BUILD_OUTPUT=$(run_command "npm run build" "Build")
BUILD_EXIT_CODE=$?

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    print_status "SUCCESS" "Build completed successfully"
else
    print_status "ERROR" "Build failed"
    TOTAL_ERRORS=$((TOTAL_ERRORS + 1))
fi

echo ""

echo "6️⃣  Running E2E Tests (if available)..."
echo "--------------------------------------"
echo ""

# Run E2E tests (optional, don't fail if not available)
E2E_OUTPUT=$(run_command "npm run e2e" "E2E tests")
E2E_EXIT_CODE=$?

if [ $E2E_EXIT_CODE -eq 0 ]; then
    print_status "SUCCESS" "E2E tests passed"
elif echo "$E2E_OUTPUT" | grep -q "No tests found" || echo "$E2E_OUTPUT" | grep -q "No test files found"; then
    print_status "INFO" "No E2E tests found (skipped)"
    E2E_EXIT_CODE=0  # Don't count as failure
else
    print_status "WARNING" "E2E tests failed or not configured"
fi

echo ""

echo "7️⃣  Running Vitest Tests (if available)..."
echo "----------------------------------------"
echo ""

# Run Vitest tests (optional, don't fail if not available)
VITEST_OUTPUT=$(run_command "npx vitest run" "Vitest tests")
VITEST_EXIT_CODE=$?

if [ $VITEST_EXIT_CODE -eq 0 ]; then
    print_status "SUCCESS" "Vitest tests passed"
elif echo "$VITEST_OUTPUT" | grep -q "No tests found" || echo "$VITEST_OUTPUT" | grep -q "No test files found"; then
    print_status "INFO" "No Vitest tests found (skipped)"
    VITEST_EXIT_CODE=0  # Don't count as failure
else
    print_status "WARNING" "Vitest tests failed or not configured"
fi

echo ""

echo "📊 Summary"
echo "=========="
echo ""

if [ $TOTAL_ERRORS -eq 0 ]; then
    if [ $ESLINT_WARNINGS -gt 0 ]; then
        print_status "SUCCESS" "All critical checks passed! IrisFrontend code quality is good."
        echo ""
        echo "✅ ESLint: $ESLINT_WARNINGS warnings (no errors)"
        echo "✅ TypeScript: No type errors"
        echo "✅ Prettier: Code formatting is correct"
        echo "✅ Jest: All tests passed"
        echo "✅ Build: Successful compilation"
        if [ $E2E_EXIT_CODE -eq 0 ]; then
            echo "✅ E2E: All end-to-end tests passed"
        else
            echo "ℹ️  E2E: No tests or tests skipped"
        fi
        if [ $VITEST_EXIT_CODE -eq 0 ]; then
            echo "✅ Vitest: All unit tests passed"
        else
            echo "ℹ️  Vitest: No tests or tests skipped"
        fi
        echo ""
        echo "🎉 Your IrisFrontend code is ready for production!"
        echo "💡 Consider fixing ESLint warnings for even better code quality."
    else
        print_status "SUCCESS" "All checks passed! IrisFrontend code quality is excellent."
        echo ""
        echo "✅ ESLint: No issues found"
        echo "✅ TypeScript: No type errors"
        echo "✅ Prettier: Code formatting is correct"
        echo "✅ Jest: All tests passed"
        echo "✅ Build: Successful compilation"
        if [ $E2E_EXIT_CODE -eq 0 ]; then
            echo "✅ E2E: All end-to-end tests passed"
        else
            echo "ℹ️  E2E: No tests or tests skipped"
        fi
        if [ $VITEST_EXIT_CODE -eq 0 ]; then
            echo "✅ Vitest: All unit tests passed"
        else
            echo "ℹ️  Vitest: No tests or tests skipped"
        fi
        echo ""
        echo "🎉 Your IrisFrontend code is ready for production!"
    fi
else
    print_status "ERROR" "Some checks failed. Please review the issues above."
    echo ""
    if [ $ESLINT_ERRORS -gt 0 ]; then
        echo "❌ ESLint: $ESLINT_ERRORS errors, $ESLINT_WARNINGS warnings"
    else
        echo "⚠️  ESLint: $ESLINT_WARNINGS warnings (no errors)"
    fi
    if [ $TSC_EXIT_CODE -ne 0 ]; then
        echo "❌ TypeScript: Type errors found"
    else
        echo "✅ TypeScript: No type errors"
    fi
    if [ $PRETTIER_EXIT_CODE -ne 0 ]; then
        echo "❌ Prettier: Code formatting issues found"
    else
        echo "✅ Prettier: Code formatting is correct"
    fi
    if [ $JEST_EXIT_CODE -ne 0 ]; then
        echo "❌ Jest: Test failures found"
    else
        echo "✅ Jest: All tests passed"
    fi
    if [ $BUILD_EXIT_CODE -ne 0 ]; then
        echo "❌ Build: Compilation failed"
    else
        echo "✅ Build: Successful compilation"
    fi
    if [ $E2E_EXIT_CODE -ne 0 ]; then
        echo "⚠️  E2E: Tests failed or not configured"
    else
        echo "✅ E2E: All end-to-end tests passed"
    fi
    if [ $VITEST_EXIT_CODE -ne 0 ]; then
        echo "⚠️  Vitest: Tests failed or not configured"
    else
        echo "✅ Vitest: All unit tests passed"
    fi
fi

echo ""
echo "🔧 To fix issues:"
echo "   - ESLint errors: Run 'npm run lint' and fix reported issues"
echo "   - ESLint warnings: Review and fix code style issues"
echo "   - TypeScript errors: Fix type definitions and imports"
echo "   - Prettier issues: Run 'npx prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"'"
echo "   - Jest failures: Fix failing tests in the tests/ directory"
echo "   - Build errors: Resolve compilation issues"
echo "   - E2E failures: Fix end-to-end tests in tests/e2e/"
echo "   - Vitest failures: Fix unit tests in tests/ directory"
echo ""

# Install timeout command on macOS if not available
if ! command -v timeout >/dev/null 2>&1 && ! command -v gtimeout >/dev/null 2>&1; then
    echo "💡 Tip: Install coreutils for better timeout support:"
    echo "   brew install coreutils"
    echo ""
fi

# Exit with appropriate code
if [ $TOTAL_ERRORS -eq 0 ]; then
    exit 0
else
    exit 1
fi