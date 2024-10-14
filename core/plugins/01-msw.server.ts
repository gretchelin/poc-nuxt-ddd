export default defineNuxtPlugin(async () => {
  const env = useRuntimeConfig();

  // If mocking is desired to be available in production build,
  // remove the `process.env.NODE_ENV !== 'production'` line
  // Otherwise, DO NOT change that line or `msw` will get bundled for production build!

  // :info: The line will make sure that during build evaluation, the bundler will remove dead code
  // as the value can be evaluated in build process. Using `useRuntimeConfig()`, constants, or event custom env var
  // seemed to block the evaluation process to runtime, and thus gets `msw` bundled in production build

  if (process.env.NODE_ENV !== 'production' && env.public.enableMock) {
    const { server } = await import('#core/mocks/server');
    await server.listen();
  }
});
