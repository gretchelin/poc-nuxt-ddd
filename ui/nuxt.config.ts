import { resolve } from 'path';

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  components: true,
  modules: ['@nuxtjs/storybook', '@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-01-03',

  alias: {
    // layer-level aliases (prefixed with a `#`)
    '#core': resolve('core'),
    '#playground': resolve('layers/playground'),
    '#ui': resolve('ui'),
    '#auth': resolve('layers/auth'),
    '#document': resolve('layers/document'),

    // core
    '~/components': '/core/components',
    '~/composables': '/core/composables',
    '~/utils': '/core/utils',
    '~/plugins': '/core/plugins',
    '~/stores': '/core/stores',
  },

  // default folders override
  dir: {
    // core
    middleware: 'core/middleware',
    modules: 'core/modules',
    plugins: 'core/plugins',
    layouts: 'core/layouts',
    public: 'core/public',
    pages: 'core/pages',
  },
});
