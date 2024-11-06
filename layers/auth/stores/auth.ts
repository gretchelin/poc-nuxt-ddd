import { defineStore } from 'pinia';
import type { AuthStatus } from '#auth/config/constants';

export const useAppAuthStore = defineStore('playground', () => {
  // state
  const token = ref<string>();
  const session = ref<Record<string, any>>();
  const status = ref<AuthStatus[keyof typeof AuthStatus] | undefined>();

  // methods (action)
  const setToken = (value?: string) => {
    token.value = value ?? ''; // intentional nullish coalescing operator usage, because any string can be token
  };

  const setSession = (value?: Record<string, any>) => {
    session.value = value;
  };

  const setStatus = (value?: AuthStatus[keyof typeof AuthStatus]) => {
    status.value = value;
  };

  // override methods
  const $reset = () => {
    token.value = '';
  };

  return {
    token,
    session,
    setToken,
    setSession,
    setStatus,
    $reset,
  };
});
