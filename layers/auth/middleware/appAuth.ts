import { AUTH_COOKIE_NAME } from '#auth/config/constants';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAppAuth();
  const coreStore = useCoreStore();
  const { iframeMode } = storeToRefs(coreStore);

  // STEP 1: Get auth config in route meta
  const authMeta = to?.meta?.auth;

  // STEP 2: Check if user is authenticated
  // in non-embed mode, we redirect user to login page on unauthenticated
  if (!iframeMode?.value) {
    const authCookie = useCookie(AUTH_COOKIE_NAME);
    const token = authCookie?.value;

    const res = await auth.verifyToken(token);

    console.log('[MDLW] [AUTH]', { res });

    // if verify failed
    if (!res.value) {
      // by default, if `unauthenticatedOnly` is not set to `true`,
      // and using this middleware, it is assumed the path is protected by auth
      // so we need to check `unauthenticatedOnly` value first
      if (authMeta?.unauthenticatedOnly) {
        // allow access
      }
      else {
        // if already on login page, abort navigation to itself
        if (to.path === '/auth/login' && from.path === to.path) {
          return abortNavigation();
        }
        // otherwise, redirect user to login page
        else {
          return navigateTo('/auth/login');
        }
      }
    }
    // if verify is valid
    else {
      // if it has `navigateAuthenticatedTo` set,
      // and currently is not on the target of redirect,
      // redirect to `navigateAuthenticatedTo` value
      if (authMeta?.navigateAuthenticatedTo && from?.path !== authMeta?.navigateAuthenticatedTo) {
        return navigateTo(authMeta.navigateAuthenticatedTo);
      }
    }
  }
  // however, in embed path, for better UX and cohesiveness,
  // we throw user to error page instead
  else {
    // get token passed from parent and set it
    const tokenCookie = useCookie('token');
    const res = await auth.verifyToken(tokenCookie?.value);

    if (!res) {
      createError({ statusCode: 401, statusMessage: 'Access not Authorized' });
    }
  }
});
