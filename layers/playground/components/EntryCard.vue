<template>
  <div data-teid="entry-card" class="entry-card">
    <div v-if="icon">
      <Icon :name="icon" mode="svg"/>
    </div>
    <div>
      <h2 class="text-xs text-neutral-400 mb-2 font-light">
        this component exist in playground feature
      </h2>
      <h1>{{ title }}</h1>

      <div class="empty:display-none">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  icon?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'Lorem',
});
</script>

<style lang="postcss" scoped>
.entry-card {
  @apply p-3 border rounded flex gap-4;
}
</style>
