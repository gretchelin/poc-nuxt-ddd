import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    exclude: [
      '**/.husky/**',
    ],
    globals: true,
    setupFiles: [
      './core/test/setup.ts',
    ],

    // Coverage setup
    reporters: process.env.GITHUB_ACTIONS ? ['default', 'html', 'lcov', 'github-actions'] : ['default', 'html', 'lcov'],
    outputFile: {
      html: './cov-html-report.html',
    },
    coverage: {
      reportsDirectory: './test/coverage',
    },
  },
});
