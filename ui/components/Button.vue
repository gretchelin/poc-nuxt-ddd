<template>
  <component
    :is="as"
    type="button"
    class="ui-button"
  >
    <slot />
  </component>
</template>

<script lang="ts">
export default {
  name: 'UiButton',
};
</script>

<script setup lang="ts">
interface Props {
  as?: string;
}

// Props
withDefaults(defineProps<Props>(), {
  as: 'button',
});
</script>

<style lang="postcss" scoped>
.ui-button {
  @apply px-3 py-1.5 bg-neutral-50 border border-transparent hover:border-neutral-300;
}
</style>
