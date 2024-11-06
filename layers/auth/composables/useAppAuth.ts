import { useLocalStorage } from '@vueuse/core';
import { postLogin } from '#auth/api/auth';
import { AuthStatus, AUTH_COOKIE_NAME, AUTH_STATE_STATUS, AUTH_STATE_RBAC, AUTH_STATE_USER_NAME } from '#auth/config/constants';

export default function () {
  const authStore = useAppAuthStore();
  const authCookie = useCookie(AUTH_COOKIE_NAME, {
    sameSite: 'strict',
    secure: true,
    maxAge: 24 * 60 * 60,
  });
  const userLocalStorage = useLocalStorage(AUTH_STATE_USER_NAME, '');
  const statusLocalStorage = useLocalStorage(AUTH_STATE_STATUS, '');
  const rbacLocalStorage = useLocalStorage(AUTH_STATE_RBAC, '');

  const getSession = (data: Record<string, any>) => {
    // TODO: Get user detail from API
    console.log('getSession', data);
  };

  const clearToken = () => {
    // STEP 1: Clear session
    authCookie.value = '';
    authStore.setToken(undefined);
    authStore.setStatus(AuthStatus.UNAUTH);
  };

  const setToken = (token?: string) => {
    // if token is empty, clear state
    // otherwise, set auth state
    const validToken = (token ?? false) || token === '';
    if (!validToken) {
      clearToken();
      return;
    }

    // STEP 1: Set session token
    authCookie.value = token;
    authStore.setToken(token);
  };

  const signIn = async (loginData, options?: { callbackUrl: string }) => {
    authStore.setStatus(AuthStatus.PENDING);

    let loginRes;
    try {
      loginRes = await postLogin(loginData);

      // STEP 1: Set session
      const data = loginRes?.data;
      setToken(data?.token);

      // STEP 2: Get/Set session data
      // Need to store status, user, and rbac the way v1 use it so login state is synced across 2 'site'
      await getSession(data);
      statusLocalStorage.value = 'true';
      userLocalStorage.value = JSON.stringify(data?.user || '');
      rbacLocalStorage.value = JSON.stringify(data?.access_control || '');

      // TODO: STEP 2A. Encrypt rbac value before storing to local storage
      // May require update on v1 side if encryption result is not readable in either side.

      // STEP 3 : redirect user if `options.callbackUrl` i set
      if (options?.callbackUrl) {
        navigateTo(options?.callbackUrl);
      }
    }
    catch (error) {
      authStore.setStatus(AuthStatus.UNAUTH);
      throw error;
    }
  };

  const signOut = async () => {
    clearToken();

    userLocalStorage.value = '';
    statusLocalStorage.value = 'false';
    rbacLocalStorage.value = '';

    // clean up storage for backward compatibility with v1
    const keys = ['accessToken', 'expiredToken', 'tokenSSO'];
    keys.forEach((k) => {
      localStorage.removeItem(k);
    });

    // TODO: Call api

    return true;
  };

  const verifyToken = async (token) => {
    const authStore = useAppAuthStore();

    authStore.setStatus(AuthStatus.PENDING);

    const { data, error } = await useFetch('/api/verify', {
      method: 'post',
    });

    // remove token if it's invalid
    if (!data?.value || error?.value) {
      clearToken();
      authStore.setStatus(AuthStatus.UNAUTH);

      return false;
    }

    // if token is not explicitly passed then token is inferred from cookie
    const internalToken = token || authCookie.value;

    // update token if it has changed from stored token
    if (internalToken !== authStore.token) {
      authStore.setToken(token);

      // Update session data
      getSession();
    }

    authStore.setStatus(AuthStatus.AUTH);

    return true;
  };

  return { signIn, signOut, verifyToken, setToken };
}
