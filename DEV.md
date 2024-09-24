# Development Notes

<!-- TOC -->
* [Development Notes](#development-notes)
  * [Quirks](#quirks)
    * [`pages` contains page files but the page cannot be accessed in url](#pages-contains-page-files-but-the-page-cannot-be-accessed-in-url)
    * [`error  <script setup> cannot contain ES module exports  vue/no-export-in-script-setup` when committing files](#error--script-setup-cannot-contain-es-module-exports--vueno-export-in-script-setup-when-committing-files)
    * [Service worker not being installed when `devServer.host` is set up in `nuxt.config.ts`](#service-worker-not-being-installed-when-devserverhost-is-set-up-in-nuxtconfigts)
    * [Auth middleware for protecting page does not work.](#auth-middleware-for-protecting-page-does-not-work)
    * [Sentry not logging issue in development env](#sentry-not-logging-issue-in-development-env)
    * [Passing certain configuration to `mount` in test file throws typescript error](#passing-certain-configuration-to-mount-in-test-file-throws-typescript-error)
    * [Coverage not being updated in sonarqube for tested file](#coverage-not-being-updated-in-sonarqube-for-tested-file)
    * [Unit testing throws error despite all test passing](#unit-testing-throws-error-despite-all-test-passing)
  * [Changelog](#changelog)
<!-- TOC -->

## Quirks

### `pages` contains page files but the page cannot be accessed in url

As noted in [Nuxt Layer Docs](https://nuxt.com/docs/guide/going-further/layers.)

> A minimal Nuxt layer directory should contain a nuxt.config.ts file to indicate it is a layer.

As of 09/09/2024 (using `v3.13.0`), it was noticed that Nuxt may not load pages from layers when said layer does not
have `nuxt.config.ts` in its scope, even if said layer is located under `layers` dir which automatically recognized as
layer by Nuxt.

Extending the layers by adding them manually in `nuxt.confic.ts` in **project root** dir did not help if the layer lack
nuxt config file.

### `error  <script setup> cannot contain ES module exports  vue/no-export-in-script-setup` when committing files

The `vue/no-export-in-script-setup` rule is fixable through `eslint --fix`, but the fix may be incorrect in certain
circumstances.

As of 12/09/2024, in vue file such as below:

```vue
// Test.vue

<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
  export default {
    inhertiAttrs: false
  }
</script>

<script setup lang="ts">
  import {ref} from 'vue';

  const title = ref('Default Title');
</script>
```

when running `eslint --fix Test.vue`, eslint will fix the file by moving the `export default` line in
regular `<script />` to `<script setup />`, which will trips eslint when it checked for linting issue next with the
error below:

```
<script setup> cannot contain ES module exports  vue/no-export-in-script-setup
```

This issue stemmed from having `import` call in `<script setup />`, while `export` in regular `<script />`.

> To prevent this issue, when writing vue files which have both regular and setup `script`, do the `import` in the same
> block as `export default` (inside the regular `<script />`). Code under the `<script setup />` can still reference the
> imported values from just fine.

A correct vue file is like the one below:

```vue
// Test.vue

<template>
  <div>{{ title }}</div>
</template>

<script lang="ts">
  import {ref} from 'vue';

  export default {
    inhertiAttrs: false
  }
</script>

<script setup lang="ts">
  const title = ref('Default Title');
</script>
```

### Service worker not being installed when `devServer.host` is set up in `nuxt.config.ts`

Service Workers requires HTTPS to work despite being enabled in modern browsers by default, as noted
in [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#setting_up_to_play_with_service_workers).

> Service workers are enabled by default in all modern browsers. To run code using service workers, you'll need to serve
> your code via HTTPS — Service workers are restricted to running across HTTPS for security reasons. A server supporting
> HTTPS is necessary. To host experiments, you can use a service such as GitHub, Netlify, Vercel, etc. In order to
> facilitate local development, localhost is considered a secure origin by browsers as well.
>
> (*Excerpt taken from the link above for posterity's sake*)

As such, for local development purposes, service workers will **ONLY** be automatically installed if the project is
accessed through `http://localhost`.

If proxy is desired, then additional action must be done because we need to access the local proxy as https. To enable
HTTPS access to local proxy, follow the steps below:

1. Setup dev server setting in `nuxt.config.ts` ([Official docs](https://nuxt.com/docs/api/nuxt-config#devserver))

```typescript
export default defineNuxtConfig({
    // ...other nuxt config
    devServer: {
        host: 'myprodydoma.in',
        https: {
            key: './myproxydoma.in-key.pem',
            cert: './myproxydoma.in.pem',
        },
    },
});
```

2. Install `mkcert` to generate certificate for HTTPS access ([Official docs](https://github.com/FiloSottile/mkcert))

> ℹ️ If using WSL, install `mkcert` in windows, not WSL!

3. Run the command below in command line (powershell if Windows) to locally register the certificate we are going to
   make automatically

 ```bash
 mkcert -install
 ```

4. Generate the certificate for our proxy. This will create the certificate in the dir the command was run.

 ```bash
 mkcert myproxydoma.in
 ```

5. Copy the cert to root project. (If the file is copied to another dir, the path set in step 1 must be adjusted to
   match the files location).
6. Run the project and access it from `https://myproxydoma.in` and service workers will be installed.

> **One thing to note though**, setting `https` value in `devServer` would make the project only accessible
> through `https`
> protocol, thus make `http` no longer accessible.
> _Accessing `https://localhost:3000` requires another certificate to be generated and registered._

### Auth middleware for protecting page does not work.

This project uses `@sidebase/nuxt-auth` and according to the
official [docs](https://auth.sidebase.io/guide/application-side/configuration#globalappmiddleware)
regarding `globalAppMiddleware` configuration:

> - If you enable this, everything is going to be protected and you can selectively disable protection for some pages by
    > specifying `definePageMeta({ auth: false })`
> - If you disable this, everything is going to be public and you can selectively enable protection for some pages by
    > specifying `definePageMeta({ auth: true })`
>
> _(Excerpt taken from official doc for posterity's sake)_

However, it may not work for all cases -if not misleading-. For example, the code as of 17/09/2024 won't work without
explicitly adding `auth` to `middleware` prop.

```vue

<script setup lang="ts">
  definePageMeta({
    // middleware: ['auth'],  // ===> need this for auth setting to work!
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/profile'
    }
  })
</script>
```

This project set `globalAppMiddleware` to `false`, which is the default. Thus, in order to utilize `@sidebase/nuxt-auth`
page protection feature, explicitly adding `auth` middleware is preferred: `definePageMeta({ middleware: ['auth']` to
ensure that page protection is working.

### Sentry not logging issue in development env

This project uses sentry's official Nuxt SDK -`@sentry/nuxt`- that is as of 18/09/2024 is still considered *
*experimental and in alpha
state**. As inferred in the official docs setup [here](https://docs.sentry.io/platforms/javascript/guides/nuxt/), Sentry
will only be enabled on production build (by either running `npm run preview` or `npm run start`) and thus requires the
project to be build first (by running `npm run build`).

As such, when working in this project by running `npm run dev`, Sentry will not log anything.

> It was noticed in this project that when running `npm run preview`, `instrument.server.mjs` file must be put in
> root `public` folder, otherwise, path resolution will be wrong and command will throw an error that it cannot find the
> file.
>
> On the other hand, running with `npm run start` with correctly generated build (`instrument.server.mjs` is located
> in `.output/public`), for some reason does not trigger Sentry to log events, despite running in `preview` trigger
> Sentry to log events just fine.

### Passing certain configuration to `mount` in test file throws typescript error

As mention here in an `@vue/test-utils` lib issue [here](https://github.com/vuejs/test-utils/issues/194), it is a known
issue and so far only workaround exists.

For example, the code below will trip typescript:

```typescript
it('it should render custom child', async () => {
    await renderSuspended(TestedComponent, {
        props: {
            'data-teid': 'comp-fetch-spinner',
        }, // ==> this line throws typescript error because prop is not defined (explicitly) in the component
        slots: {
            default: 'Main Content',
        },
    });
});
```

The workarounds are either cast the offending line with `as any` like below:

```typescript
it('it should render custom child', async () => {
    await renderSuspended(TestedComponent, {
        props: {
            'data-teid': 'comp-fetch-spinner',
        } as any, // ==> typescript check passed!
        slots: {
            default: 'Main Content',
        },
    });

    //
});
```

and/or by adding shim:

```typescript
declare module '*.vue' {
    import {DefineComponent} from 'vue';
    const component: DefineComponent;
    export default component;
}
```

_(Excerpt taken from the linked issue for posterity)_

### Coverage not being updated in sonarqube for tested file

It has been noticed that sometimes, coverage report are not update despite running the test and successfully passed.
Currently, the issue is anecdotal and only happens to few people and the workaround seemed to be to delete previous
coverage/test result and re-run the test again so the system will surely generate a new report.

### Unit testing throws error despite all test passing

This project uses Sentry, which is initialized as a Nuxt's plugin. By default, Sentry only log files in `production`
mode as reported in [Sentry not logging issue in development env](#sentry-not-logging-issue-in-development-env).
However, it still does run instrumentation process and this process is what causes unit test to throw at the end of the
run.

To prevent the error form happening, we need to disable Sentry when running unit-test. It's important to note that while
Sentry has `enabledd` flag in its settings, setting it to `false` does not stop all process of Sentry.
As noted in [official docs](https://docs.sentry.io/platforms/javascript/configuration/options/#enabled), to prevent
Sentry from running AT ALL, we need to NOT calling `Sentry.init()`.

We need to add something like this when initializing Sentry:

```ts
if(!process.env.IS_TEST) {
    Sentry.init({
        // sentry options
    })
}
```


## Changelog

| Date       | Author | Notes                                                                                                                                            |
|------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| 24-09-2024 | Gretta | Added "Coverage not being updated in sonarqube for tested file", "Unit testing throws error despite all test passing".                                                                               |
| 19-09-2024 | Gretta | Added Passing certain configuration to `mount` in test file throws typescript error.                                                             |
| 18-09-2024 | Gretta | Added Sentry not logging issue in development env.                                                                                               |
| 17-09-2024 | Gretta | Added Service worker not being installed when `devServer.host` is set up in `nuxt.config.ts`, Auth middleware for protecting page does not work. |
| 12-09-2024 | Gretta | Added `error  <script setup> cannot contain ES module exports  vue/no-export-in-script-setup` when committing files                              |
| 09-09-2024 | Gretta | Added `pages` contains page files but the page cannot be accessed in url                                                                         |