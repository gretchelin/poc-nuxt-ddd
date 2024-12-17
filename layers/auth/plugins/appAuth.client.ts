import { LS_AUTH_STATE_CHANGE_NAME } from '#auth/config/constants';

export default defineNuxtPlugin(() => {
  const { token } = storeToRefs(useAppAuthStore());

  watch(token, (val) => {
    if (val) {
      window.localStorage.setItem(
        LS_AUTH_STATE_CHANGE_NAME,
        (parseFloat(window.localStorage.getItem(LS_AUTH_STATE_CHANGE_NAME) || '0') + 1).toString(),
      );
    }
    else {
      window.localStorage.setItem(LS_AUTH_STATE_CHANGE_NAME, '0');
    }
  });

  const storageListener = (evt: StorageEvent) => {
    if (evt.key == LS_AUTH_STATE_CHANGE_NAME) {
      if (evt.newValue !== evt.oldValue) {
        window.location.reload();
      }
    }
  };

  onMounted(() => {
    window.addEventListener('storage', storageListener);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('storage', storageListener);
  });
});
