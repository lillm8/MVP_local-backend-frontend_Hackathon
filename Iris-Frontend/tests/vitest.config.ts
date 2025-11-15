import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@app': path.resolve(__dirname, '../src/app'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@hooks': path.resolve(__dirname, '../src/hooks'),
      '@contexts': path.resolve(__dirname, '../src/contexts'),
      '@types': path.resolve(__dirname, '../src/types'),
      '@lib': path.resolve(__dirname, '../src/lib'),
      // New non-prefixed aliases
      app: path.resolve(__dirname, '../src/app'),
      types: path.resolve(__dirname, '../src/types'),
      lib: path.resolve(__dirname, '../src/lib'),
      contexts: path.resolve(__dirname, '../src/contexts'),
      hooks: path.resolve(__dirname, '../src/hooks'),
      components: path.resolve(__dirname, '../src/components'),
      utils: path.resolve(__dirname, '../src/utils'),
      constants: path.resolve(__dirname, '../src/constants'),
    },
  },
  // Remove CSS and PostCSS processing (set empty options instead of false for compatibility)
  css: {},
  esbuild: {
    target: 'node14'
  },
  define: {
    'process.env': {}
  }
});