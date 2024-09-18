import * as Sentry from '@sentry/nuxt';
import { getAppConfig } from '#core/api/config';

// Setup global site configuration
export default defineNuxtPlugin(async () => {
  const cookie = useCookie('appConfig');

  // get config (if not already exist)
  try {
    if (!cookie.value) {
      const { data: res } = await getAppConfig();

      // store organization data in cookie
      if (res?.value?.success) {
        cookie.value = res?.value?.data;
      }
    }
  }
  catch (err) {
    Sentry.withScope(function (scope) {
      scope.setLevel('log');
      scope.setTransactionName('SettingAppConfig');

      // The exception has the event level set by the scope (info).
      Sentry.captureException(err);
    });
  }

  if (cookie.value) {
    // set theme
    if (document) {
      // set color range
      const colorRange = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

      // set color
      colorRange.forEach((code) => {
        document.documentElement.style.setProperty(`--color-primary-${code}`, cookie.value?.primary_color);
        document.documentElement.style.setProperty(`--color-secondary-${code}`, cookie.value?.secondary_color);
      });
    }
  }
});
