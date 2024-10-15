export default defineNuxtPlugin((nuxtApp) => {
  const env = useRuntimeConfig();

  const api = $fetch.create({
    baseURL: env.public.apiBaseUrl,
    onRequest({ options }) {
      const { token } = storeToRefs(useAppAuthStore());

      if (token.value) {
        options.headers.set('Authorization', `Bearer ${token.value}`);
      }
    },
    async onResponseError({ response }) {
      const { iframeMode } = storeToRefs(useCoreStore());

      if (response.status === 401) {
        if (!iframeMode.value) {
          await nuxtApp.runWithContext(() => navigateTo('/auth/login'));
        }
        else {
          // throw user to error page instead of login
          throw createError({ message: 'Invalid credential', statusCode: 401 });
        }
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
