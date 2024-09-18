<template>
  <div class="layout--auth">
    <slot />
  </div>
</template>

<style lang="postcss" scoped>
body:has(.layout--auth) {
  @apply w-full h-full p-0 m-0 overflow-auto;
}

body:has(.layout--auth) :deep(#__nuxt) {
  @apply w-full min-h-full;
}
</style>
