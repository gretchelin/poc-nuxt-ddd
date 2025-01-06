export default defineNuxtPlugin(() => {
  const env = useRuntimeConfig();

  // disable console.log when not in development mode
  if (process.env.NODE_ENV !== 'development' && !env.app.enableConsole) {
    // eslint-disable-next-line no-console
    console.log = () => {};
  }
});
