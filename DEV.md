# Development Notes

<!-- TOC -->
* [Development Notes](#development-notes)
  * [Quirks](#quirks)
    * [`pages` contains page files but the page cannot be accessed in url](#pages-contains-page-files-but-the-page-cannot-be-accessed-in-url)
    * [`error  <script setup> cannot contain ES module exports  vue/no-export-in-script-setup` when committing files](#error--script-setup-cannot-contain-es-module-exports--vueno-export-in-script-setup-when-committing-files)
<!-- TOC -->

## Quirks

### `pages` contains page files but the page cannot be accessed in url

As noted in https://nuxt.com/docs/guide/going-further/layers.

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
