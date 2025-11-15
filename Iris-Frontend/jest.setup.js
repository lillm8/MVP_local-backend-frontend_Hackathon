import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }
  },
}))

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock Clerk
jest.mock('@clerk/nextjs', () => ({
  ClerkProvider: ({ children }) => children,
  useUser: () => ({
    isSignedIn: false,
    user: null,
  }),
  useAuth: () => ({
    isSignedIn: false,
    userId: null,
    sessionId: null,
  }),
  SignIn: () => <div>Sign In</div>,
  SignUp: () => <div>Sign Up</div>,
  UserButton: () => <div>User Button</div>,
}))

// Mock React Query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: undefined,
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
  })),
  useMutation: jest.fn(() => ({
    mutate: jest.fn(),
    isLoading: false,
    isError: false,
    error: null,
  })),
  QueryClient: jest.fn(() => ({
    setQueryData: jest.fn(),
    getQueryData: jest.fn(),
    invalidateQueries: jest.fn(),
  })),
  QueryClientProvider: ({ children }) => children,
}))

// Mock Sentry
jest.mock('@sentry/nextjs', () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  withScope: jest.fn((callback) => callback({})),
}))

// Mock PostHog
jest.mock('posthog-js', () => ({
  default: {
    capture: jest.fn(),
    identify: jest.fn(),
    reset: jest.fn(),
  },
}))

// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8000'
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'pk_test_mock'
process.env.NEXT_PUBLIC_POSTHOG_KEY = 'phc_mock'