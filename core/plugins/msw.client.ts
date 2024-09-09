export default defineNuxtPlugin(async () => {
  const env = useRuntimeConfig();

  if (env.public.enableMock) {
    const { worker } = await import('#core/mocks/browser');
    worker.start();
  }
});
