import FeatureFlag from '#document/config/featureFlag';

export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAppAuth();

  if (!FeatureFlag.FEATURE_ENABLED) {
    return abortNavigation();
  }

  if (!auth.isAuthenticated()) {
    window.location.href = '/pages/login';
  }
});
