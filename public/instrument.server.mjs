import * as Sentry from "@sentry/nuxt";

Sentry.init({
    dsn: process.env.NUXT_SENTRY_DSN,
});

