# Contribution Guideline

<!-- TOC -->
* [Contribution Guideline](#contribution-guideline)
    * [Folder structure](#folder-structure)
    * [Working on new feature](#working-on-new-feature)
    * [Updating eslint rules](#updating-eslint-rules)
<!-- TOC -->

### Folder structure

This project is using domain-based directory architecture. As such, it utilizes Nuxt3 `Layer` concept to encapsulate
code
instead of module.

```
.
├── core                        # Core project settings
│   ├── components              # Common components shared by domains
│   ├── composables             # Common composables shared by domains     
│   ├── layouts                 # Common layout shared by domains     
│   ├── plugins                 # Common plugins shared by domains     
│   ├── public                  # Public assets served at server root     
│   └── stores                  # Common store shared by domains     
├── layers                      # Domain-based project holder
│   └── <domain_name>           # Domain-bsaed project
│       ├── components          # Domain-specific components
│       ├── pages               # Domain-specific pages
│       │   └── <domain_path>   # Domain-specific base path (ie. domain.com/<domain_path>/)
│       ├── config              # Domain-specific config (constants, flags, etc)     
│       └── nuxt.config.ts      # (Required) Domain-specific nuxt config.      
├── public                      # Public assets served at server root
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


> :info: Running the command in step 1 is optional. You can also manually create each folders as needed,
>
> ie. when working with feature A, we only needed components and pages. We could just make folder `FeatureA`
> under `layers` and also `components` and `pages` under `FeatureA`.
>
> However, make sure to add `nuxt.config.ts` or `pages` may not get picked up by Nuxt

### Updating eslint rules

When you are updating eslint config, make sure to commit the change on its own (not mixed with other files) as in order
for it to have an effect, devs may need to clear installed packaged and reinstall them.

You can run the command below (assuming on UNIX-based OS and using `npm` as package manager)

 ```bash
 rm -rf node_modules && npm i
```

