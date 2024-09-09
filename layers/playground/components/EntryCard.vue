<template>
  <div data-teid="entry-card" class="entry-card">
    <h2 class="text-xs text-neutral-400 mb-2 font-light">
      this component exist in playground feature
    </h2>
    <h1>{{ title }}</h1>

    <p>
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Lorem',
});
</script>

<style lang="postcss" scoped>
.entry-card {
  @apply p-3 border rounded;
}
</style>
