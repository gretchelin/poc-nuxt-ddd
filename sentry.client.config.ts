import * as Sentry from '@sentry/nuxt';

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.NUXT_SENTRY_DSN,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
}
