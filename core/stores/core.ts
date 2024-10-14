import { defineStore } from 'pinia';

export const useCoreStore = defineStore('playground', () => {
  // state
  const iframeMode = ref<boolean>(false);
  const token = ref<string>();

  // methods (action)
  const setIframeMode = (value?: boolean) => {
    iframeMode.value = value || false;
  };

  const setToken = (value?: string) => {
    token.value = value ?? ''; // intentional nullish coalescing operator usage, because any string can be token
  };

  // override methods
  const $reset = () => {
    iframeMode.value = false;
    token.value = '';
  };

  return {
    iframeMode,
    token,
    setIframeMode,
    setToken,
    $reset,
  };
});
