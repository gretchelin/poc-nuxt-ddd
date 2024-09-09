# Development Notes

<!-- TOC -->
* [Development Notes](#development-notes)
  * [Quirks](#quirks)
    * [`pages` contains page files but the page cannot be accessed in url](#pages-contains-page-files-but-the-page-cannot-be-accessed-in-url)
<!-- TOC -->

## Quirks

### `pages` contains page files but the page cannot be accessed in url

As of 09/09/2024 (using `v3.13.0`), it was noticed that Nuxt may not load pages from layers when said layer does not
have `nuxt.config.ts` in its scope.

Extending the layers by adding them manually in `nuxt.confic.ts` in **project root** dir did not help if the layer lack
nuxt config file.



