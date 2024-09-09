// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    './core',
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/tailwindcss', '@pinia/nuxt', '@nuxt/icon', '@vueuse/nuxt'],
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },


  // ========================================
  // set up icon
  // ========================================

  icon: {
    serverBundle: {
      // explicitly define which icon package will be bundled and served from our server
      // https://nuxt.com/modules/icon#iconify-dataset
      collections: ['uil', 'mdi'],
    },
    // define custom icon settings, must set `ssr: true` or set `provider: "server"` under `icon` setting
    // https://nuxt.com/modules/icon#custom-local-collections
    customCollections: [
      {
        prefix: 'mdl',
        dir: './core/assets/icons'
      },
    ],
  },


  // ========================================
  // setup env
  // ========================================

  runtimeConfig: {
    public: {
      enableMock: process.env.ENABLE_MOCK || false,
    },
  },

  // ========================================
  // setup layers as domain architecture
  // ========================================

  // aliases, layers, core and third party
  alias: {
    // layer-level aliases (prefixed with a `#`)
    '#core': '/core',
    '#playground': '~/layers/playground',

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

  // setup global style to be included in each page
  css: [
    '~/core/assets/global.css',
  ],

  // define layers components path config here
  components: [
    {
      path: '~/core/components',
      prefix: 'Core',
      global: true,
    },
    {
      path: '#playground/components',
      pathPrefix: false,
      global: false,
    },
  ],
});