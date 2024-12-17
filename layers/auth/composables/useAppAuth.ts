import { useCookie } from 'nuxt/app';
import { useLocalStorage } from '@vueuse/core';
import { postLogin } from '../api/auth';
import { AUTH_COOKIE_NAME, LS_USER_INFO, AUTH_COOKIE_EXPIRED_AT } from '#auth/config/constants';

export default function () {
  const authStore = useAppAuthStore();
  const authCookie = useCookie(AUTH_COOKIE_NAME, {
    sameSite: 'strict',
    secure: true,
    maxAge: 24 * 60 * 60,
  });
  const userInfo = useLocalStorage(LS_USER_INFO, {});
  const expiredDate = useCookie(AUTH_COOKIE_EXPIRED_AT);

  const getUser = (data?: Record<string, any>) => {
    // const { data: loginRes, error } = await useFetch('/api/session');
    useLocalStorage(LS_USER_INFO, data?.user);
  };

  const clearToken = () => {
    // STEP 1: Clear session
    authCookie.value = '';
    userInfo.value = '';
    expiredDate.value = '';
    authStore.setToken(undefined);
    authStore.setStatus(AuthStatus.UNAUTH);
  };

  const setToken = (token?: string) => {
    // if token is empty, clear state
    // otherwise, set auth state
    if (!token || token === '') {
      clearToken();
      return;
    }
    // STEP 1: Set session
    authCookie.value = token;
    authStore.setToken(token);
    authStore.setStatus(AuthStatus.AUTH);
  };

  const signIn = async (loginData, options?: { callbackUrl: string }) => {
    authStore.setStatus(AuthStatus.PENDING);
    let loginRes = {};
    try {
      loginRes = await postLogin(loginData);

      // await useFetch('/api/login', {
      //   method: 'post',
      //   body: loginData,
      // });

      console.log('[USEAPPAUTH]', loginRes);
    }
    catch (error) {
      console.log('[USEAPPAUTH]', { error });
      authStore.setStatus(AuthStatus.UNAUTH);
      throw error;
    }

    // STEP 1: Set session
    const { data } = loginRes;
    setToken(data?.token);
    expiredDate.value = data?.expiredAt;
    // STEP 2: Get session data
    await getUser(data);

    // STEP 3 : redirect user if `options.callbackUrl` i set
    if (options?.callbackUrl) {
      navigateTo(options?.callbackUrl);
    }
  };

  const signOut = async () => {
    clearToken();
  };

  const verifyToken = async (token?: string) => {
    const authStore = useAppAuthStore();

    const { data, error } = await useFetch('/api/verify', {
      method: 'post',
      body: {
        token,
      },
    });

    console.log('[AUTH] verifyToken', { token, data, error });

    // remove token if it's invalid
    if (!data?.value || error?.value) {
      clearToken();
      console.log('[AUTH] clearToken', { token, data, error });
    }
    // update token if it has changed
    else if (authStore.token !== token) {
      setToken(token);
      const exp = data.value?.exp || 0;
      expiredDate.value = (exp * 1000).toString();

      // Update session data
      getUser();
      console.log('[AUTH] setToken', { token, data, error });
    }

    return data;
  };

  const isAuthenticated = () => {
    if (!userInfo.value || !expiredDate.value) {
      return false;
    }

    const isTokenExpired = Number(expiredDate.value) < Date.now();
    return !isTokenExpired;
  };

  return { signIn, signOut, verifyToken, setToken, isAuthenticated };
}
