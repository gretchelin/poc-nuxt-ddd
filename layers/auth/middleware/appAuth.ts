export default defineNuxtRouteMiddleware(async (to, from) => {
  const auth = useAppAuth();
  // const coreStore = useCoreStore();
  // const { iframeMode } = storeToRefs(coreStore);

  // STEP 1: Get auth config in route meta
  const authMeta = to?.meta?.auth;

  // STEP 2: Check if user is authenticated
  const res = await auth.verifyToken();

  // if verify failed
  if (!res) {
    // by default, if `unauthenticatedOnly` is not set to `true`,
    // and using this middleware, it is assumed the path is protected by auth
    // so we need to check `unauthenticatedOnly` value first
    if (authMeta?.unauthenticatedOnly) {
      // do nothing, as we allow access
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
});
