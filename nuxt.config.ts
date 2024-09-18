// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
      './core',
      './ui',
  ],
  ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    '@vee-validate/nuxt',
    '@sidebase/nuxt-auth',
    'floating-vue/nuxt',
    '@sentry/nuxt/module',
  ],
  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },

  // ========================================
  // set up pinia
  // ========================================

  pinia: {
    storesDirs: ['./layers/**/stores/**', './core/stores/**'],
  },

  // ========================================
  // set up sentry
  // ========================================

  sentry: {
    sourceMapsUploadOptions: {
      org: process.env.NUXT_SENTRY_ORG,
      project: process.env.NUXT_SENTRY_PROJECT,
      authToken: process.env.NUXT_SENTRY_TOKEN,
    },
  },

  // ========================================
  // set up fonts
  // ========================================

  fonts: {
    // define font options
    // https://fonts.nuxt.com/get-started/configuration#families
    families: [
      { name: 'Inter', provider: 'google' },
    ]
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
      enableMock: process.env.NUXT_PUBLIC_ENABLE_MOCK,
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },


  // ========================================
  // setup auth
  // ========================================

  auth: {
    isEnabled: false,
    disableServerSideAuth: false,
    originEnvKey: 'AUTH_ORIGIN',
    baseURL: 'http://localhost:3000/api/auth',
    provider: { /* your provider config */ },
    sessionRefresh: {
      enablePeriodically: true,
      enableOnWindowFocus: true,
    }
  },

  // ========================================
  // setup layers as domain architecture
  // ========================================

  // aliases, layers, core and third party
  alias: {
    // layer-level aliases (prefixed with a `#`)
    '#core': '/core',
    '#playground': '~/layers/playground',
    '#ui': '/ui',

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
  // relative path must use `~` as base
  components: [
    {
      path: '~/layers/playground/components',
      pathPrefix: false,
      global: false,
    },
    {
      path: '~/core/components',
      prefix: 'Core',
      global: true,
    },
    {
      path: '~/ui/components',
      prefix: 'Ui',
      global: true,
    },
  ],
});