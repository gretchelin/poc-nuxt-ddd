// https://nuxt.com/docs/api/configuration/nuxt-config
// export default defineNuxtConfig({

// });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  components: true,
  modules: ['@nuxtjs/storybook', '@nuxtjs/tailwindcss'],
  compatibilityDate: '2025-01-03',
});
