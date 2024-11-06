import { AUTH_STATE_USER_NAME, AUTH_STATE_CHANGE_NAME } from '#auth/config/constants';

export default defineNuxtPlugin((nuxtApp) => {
  const EVENT_NAME = 'storage';
  const storageListener = (evt) => {
    // if auth state changes, reload page to make sure page have latest auth state
    const { key, newValue, oldValue } = evt || {};

    if ([AUTH_STATE_USER_NAME, AUTH_STATE_CHANGE_NAME].includes(key)) {
      if (newValue !== oldValue) {
        window?.location?.reload();
      }
    }
  };

  const cleanup = () => {
    window.removeEventListener(EVENT_NAME, storageListener);
  };

  nuxtApp.hook('app:mounted', (vueApp) => {
    window.addEventListener(EVENT_NAME, storageListener);

    vueApp.onUnmount(cleanup);
  });
});
