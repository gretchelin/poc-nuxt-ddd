export default defineNuxtPlugin(async () => {
  const env = useRuntimeConfig();

  if (env.public.enableMock) {
    const { worker } = await import('@/mocks/browser');
    worker.start();
  }
});
