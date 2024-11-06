# Contribution Guideline

<!-- TOC -->
* [Contribution Guideline](#contribution-guideline)
    * [Folder structure](#folder-structure)
    * [Working on new feature](#working-on-new-feature)
    * [Updating eslint rules](#updating-eslint-rules)
  * [Running HTTPS locally](#running-https-locally)
    * [Running this project with v1](#running-this-project-with-v1)
  * [Changelog](#changelog)
<!-- TOC -->

### Folder structure

This project is using domain-based directory architecture. As such, it utilizes Nuxt3 `Layer` concept to encapsulate
code instead of module.

```
.
├── core                        # Core project (shared setup)
│   ├── components              # Common components shared by domains
│   ├── composables             # Common composables shared by domains     
│   ├── layouts                 # Common layout shared by domains     
│   ├── plugins                 # Common plugins shared by domains     
│   ├── public                  # Public assets served at server root     
│   ├── stores                  # Common store shared by domains
│   └── nuxt.config.ts          # (Required) Core-specific nuxt config      
├── ui                          # UI library project
│   ├── components              # Common components shared by domains
│   └── nuxt.config.ts          # (Required) UI-specific nuxt config      
├── layers                      # Domain-based project holder
│   └── <domain_name>           # Domain-bsaed project (feature-based)
│       ├── components          # Domain-specific components
│       ├── pages               # Domain-specific pages
│       │   └── <domain_path>   # Domain-specific base path (ie. domain.com/<domain_path>/)
│       ├── config              # Domain-specific config (constants, flags, etc)     
│       └── nuxt.config.ts      # (Required) Domain-specific nuxt config      
├── public                      # Public assets served at server root
├── nuxt.config.ts              # Root nuxt config      
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

## Running HTTPS locally

1. Install `mkcert` to generate certificate for HTTPS access ([Official docs](https://github.com/FiloSottile/mkcert))

> ℹ️ If using WSL, install `mkcert` in windows, not WSL!

2. Run the command below in command line (powershell if Windows) to locally register the certificate we are going to
   make automatically

 ```bash
 mkcert -install
 ```

3. Generate the certificate for our proxy. This will create the certificate in the dir the command was run.

 ```bash
 mkcert myproxydoma.in
 ```

4. Copy the cert to root project. (If the file is copied to another dir, the path set in step 1 must be adjusted to
   match the files location).
5. Run the project and access it from `https://myproxydoma.in`

> **One thing to note though**, setting `https` value in `devServer` would make the project only accessible
> through `https`
> protocol, thus make `http` no longer accessible.
> _Accessing `https://localhost:3000` requires another certificate to be generated and registered._

6. Setup dev server setting in `nuxt.config.ts` ([Official docs](https://nuxt.com/docs/api/nuxt-config#devserver))

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

> **One thing to note though**, setting `https` value in `devServer` would make the project only accessible
> through `https`
> protocol, thus make `http` no longer accessible.
> _Accessing `https://localhost:3000` requires another certificate to be generated and registered._


### Running this project with v1

As this project is a migration project and the migration process is incremental, the actual deployment will have this
project (will be called v2) run side-by-side with the existing project (will be called v1). To make sure the project run
as intended as in production/deployment setup, we need to set up some things first.

> As of 2024-11-06, deployment for poc runs under `v2` path ie. `domain.com/v2`, while v1 runs in `domain.com`

1. Running v1 and v2 under nginx reverse proxy
   You can use this article to get
   started: https://medium.com/@jeremygooch/run-multiple-ui-dev-builds-on-the-same-port-bd90ccf1c22e.
   Although Vite-based project requires more setup as the out-of-the-box solution in the article only works for non-Vite
   projects.
   The full setup can be seen here: https://gist.github.com/gretchelin/46e3c45866fe7276ac44f80aee432864.

The project uses docker to setup nginx and can reference any project in any dir (no need for specific dir setup), but
make sure the assigned port in `docker-compose.yml` matches the port targeted by the target projects.

2. Running with HTTPS.
   You can use the steps in `Running HTTPS locally` to setup SSL certificate locally, but instead of setting up https in
   local project nuxt/vite config, setup the https in nginx config.

## Changelog

| Date       | Author | Notes                                                                       |
|------------|--------|-----------------------------------------------------------------------------|
| 06-1-2024  | Gretta | Added `Running HTTPS locally`, `Running this project with v1`               |
| 03-09-2024 | Gretta | Added `Folder Structure`, `Working on new feature`, `Updating eslint rules` |

