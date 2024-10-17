export default defineNuxtRouteMiddleware(async (to, from) => {
  const coreStore = useCoreStore();
  const isEmbed = to?.path?.indexOf('/embed') === 0;

  // only continue processing if an embed path
  if (isEmbed) {
    // mark iframe mode to true
    coreStore.setIframeMode(true);
  }
});
