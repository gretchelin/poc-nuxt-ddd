import FeatureFlag from '#playground/config/featureFlag';

export default defineNuxtRouteMiddleware((to, from) => {
  if (!FeatureFlag.FEATURE_ENABLED) {
    return abortNavigation();
  }
});
