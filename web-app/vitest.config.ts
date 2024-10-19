import path from "node:path";
import { defineConfig, defaultExclude } from "vitest/config";
import configuration from "./vite.config";

export default defineConfig({
  ...configuration,
  resolve: {
    alias: {
      ...configuration?.resolve?.alias,
      test: path.resolve(__dirname, './tests'),
    },
  },
  test: {
    globals: true,
    setupFiles: path.resolve(__dirname, 'tests/setup.ts'),
    exclude: [...defaultExclude, '**/*.next**'],
    environmentMatchGlobs: [
      ['**/*.test.tsx', 'jsdom'],
      ['**/*.component.test.ts', 'jsdom'],
    ],
    coverage:{
      provider: 'v8', // ou 'istanbul' si vous préférez
      reporter: ['text', 'json', 'html'],
      include:['src/**/*'],
      exclude:[
        'test/**',
        'vite.*.ts',
        '**/*.d.ts',
        '**/*.test.*',
        '**/*.config.*',
        '**/snapshot-tests/**',
        '**/coverage/**',
      ],
      all:true,
      thresholds: {
        autoUpdate:true,
        statements: 3.79,
      },
    },
  }});
