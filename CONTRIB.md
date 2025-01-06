# Contribution Guideline

<!-- TOC -->

* [Contribution Guideline](#contribution-guideline)
    * [Folder structure](#folder-structure)
    * [Working on new feature](#working-on-new-feature)
    * [Updating eslint rules](#updating-eslint-rules)
    * [Fetching APIs](#fetching-apis)
    * [Testing: Setting ids for testing purposes](#testing-setting-ids-for-testing-purposes)

<!-- TOC -->

### Folder structure

This project is using domain-based directory architecture. As such, it utilizes Nuxt3 `Layer` concept to encapsulate
code instead of module.

```
.
├── core                                # Core project (shared setup)
│   ├── components                      # Common components shared by domains
│   ├── composables                     # Common composables shared by domains     
│   ├── layouts                         # Common layout shared by domains     
│   ├── locales                         # Common i18n language store share by domains     
│   ├── plugins                         # Common plugins shared by domains     
│   ├── public                          # Public assets served at server root
│   ├── stores                          # Common store shared by domains
│   ├── utils                           # Common utility functions shared by domains
│   └── nuxt.config.ts                  # (Required) Core-specific nuxt config      
├── ui                                  # UI library project
│   ├── components                      # Common components shared by domains
│   │   ├── atoms                       # Collection of components (Based on Atomic design) 
│   │   │   ├── <component_name>        # Single Component
│   │   │   │   ├── index.stories.ts    # Storybook file
│   │   │   │   ├── index.spec.ts       # Test file
│   │   │   │   ├── index.vue           # Vue SFC
│   │   │   │   └── style.css           # CSS file
│   │   │   .                            
│   │   │   .                           
│   │   │   └── <component_name>        # Single Component
│   │   ├── molecules                   # Collection of components (Based on Atomic design) 
│   │   ├── organisms                   # Collection of components (Based on Atomic design) 
│   │   ├── templates                   # Collection of components (Based on Atomic design) 
│   │   └── pages                       # Collection of components (Based on Atomic design) 
│   └── nuxt.config.ts                  # (Required) UI-specific nuxt config      
├── layers                              # Domain-based project holder
│   └── <domain_name>                   # Domain-bsaed project (feature-based)
│       ├── api                         # Domain-specific api source
│       ├── components                  # Domain-specific components
│       ├── composables                 # Domain-specific composables
│       ├── layouts                     # Domain-specific layouts   
│       ├── locales                     # Domain-specific i18n language store
│       ├── pages                       # Domain-specific pages 
│       │   └── <domain_path>           # Domain-specific base path (ie. domain.com/<domain_path>/)
│       ├── plugins                     # Domain-specific plugins     
│       ├── public                      # Domain-specific public dir (only if domain-specific asset/-override is needed)
│       ├── stores                      # Domain-specific store
│       ├── utils                       # Domain-specific utilities (ie. helper functions)
│       ├── config                      # Domain-specific config (constants, flags, etc)     
│       └── nuxt.config.ts              # (Required) Domain-specific nuxt config      
├── public                              # Public assets served at server root
├── nuxt.config.ts                      # Root nuxt config      
└── README.md
```

### Working on new feature

Follow this step when you need to create a new feature. For example, we are going to work on a feature called "Shop":

1. Create a new layer project under `layers` folder with the command below

```bash
npx nuxi init --template layer layers/<layer_project_name>
```

2. Remove unnecessary files and folder. In common setup, removing files directly in the root `feature` folder is fine
   except `nuxt.config.ts`.
3. Add layer paths to `nuxt.config.ts` in the project root folder.
4. Restart server.

> :warning: Changes to `nuxt.config.ts`, especially in layers, may not be picked up by Nuxt, so make sure to restart
> server manually if making any changess to nuxt config or app config to prevent working on obsolete setup


> ℹ️ Running the command in step 1 is optional. You can also manually create each folders as needed,
>
> ie. when working with feature A, we only needed components and pages. We could just make folder `FeatureA`
> under `layers` and also `components` and `pages` under `FeatureA`.
>
> However, make sure to add `nuxt.config.ts` or `pages` may not get picked up by Nuxt

### Updating eslint rules

When updating eslint config, make sure to commit the change on its own (not mixed with other files) as in order
for it to have an effect, devs may need to clear installed packaged and reinstall them.

You can run the command below (assuming on UNIX-based OS and using `npm` as package manager)

 ```bash
 rm -rf node_modules && npm i
```


## Fetching APIs

When fetching APIs from internal backend is required and it requires auth, you can use the global `$api` wrapper fetch defined in [core > plugins > api](https://git.digitalamoeba.id/mydigilearn-saas/frontend/cms-v2/-/blob/main/core/plugins/api.ts ).

Sample usage:

```
// in <feature>/pages/list.vue

<script setup lang=ts>

// ... other codes

const { $api } = useNuxtApp()
const { data: modules } = await useAsyncData('modules', () => $api('/v2/cms/list'))

// ... other codes

</script>
```

Otherwise, you can use regular `$fetch` or `useFetch` to connect to the api.

> `$api` has token built-in in its request headers, so there is no need to manually added them when you make a request to internal backend. 

Official guide regarding custom useFetch can be read [here](https://nuxt.com/docs/guide/recipes/custom-usefetch#custom-fetch).


## Testing: Setting ids for testing purposes

To easily conduct testing (be unit testing or E2E testing), all components of interest must have **`data-qa`** assigned as an attribute.

Example:
```
// <feature>/components/ComplexCard.vue

<template>
    <div data-qa="complex-card">
        <div data-qa="complex-card--header">
            <h1 data-qa="complex-card--header--title">
                Lorem ipsum dolor sit amet
            </h1>
        </div>
        <div data-qa="complext-card--body">
            <template v-if="entries?.length">
                <div 
                    v-for="(entry, idx) in entries" 
                    :key="entry.id"
                    data-qa="complex-card--body--entry"
                >
                    <span>Entry {{idx}}</span>
                </div>
            </template>
        </div>
    </div>
</template>
```

This makes it possible to access `title` DOM or `entry` DOM directly and do assertions on them.

```
// <feature>/components/ComplexCard.spec.ts

describe('<feature>/components/ComplexCard.vue', () => {
    test('show title by default', () => {
        const screen = renderSuspended(TestedComponent); // mount the component header

        expect(screen.getByTestId('complex-card--header--title')).toBeDefined(); // check if DOM exist
    })
})
```



## Changelog

| Date       | Author | Notes                                                                                                               |
|------------|--------|---------------------------------------------------------------------------------------------------------------------|
| 26-11-2024 | Gretta | Added `Fetching APIs`, `Testing: Setting ids for testing purposes`, updated `Folder Structure`                                        |
| 03-09-2024 | Gretta | Added `Folder Structure`, `Working on new feature`, `Updating eslint rules`                                         |

