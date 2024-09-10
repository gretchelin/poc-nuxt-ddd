# Development Notes

<!-- TOC -->
* [Development Notes](#development-notes)
  * [Quirks](#quirks)
    * [`pages` contains page files but the page cannot be accessed in url](#pages-contains-page-files-but-the-page-cannot-be-accessed-in-url)
<!-- TOC -->

## Quirks

### `pages` contains page files but the page cannot be accessed in url

As noted in https://nuxt.com/docs/guide/going-further/layers.

> A minimal Nuxt layer directory should contain a nuxt.config.ts file to indicate it is a layer.

As of 09/09/2024 (using `v3.13.0`), it was noticed that Nuxt may not load pages from layers when said layer does not
have `nuxt.config.ts` in its scope, even if said layer is located under `layers` dir which automatically recognized as layer by Nuxt.

Extending the layers by adding them manually in `nuxt.confic.ts` in **project root** dir did not help if the layer lack
nuxt config file.



