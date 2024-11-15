import FeatureFlag from '../config/featureFlag';

export default defineNuxtRouteMiddleware((to, from) => {
  if (!FeatureFlag.FEATURE_ENABLED) {
    return abortNavigation();
  }
});
