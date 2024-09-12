<template>
  <section
    v-tooltip="'this component exist in playground feature'"
    data-teid="entry-card"
    class="entry-card"
  >
    <div v-if="icon">
      <Icon
        :name="icon"
        mode="svg"
      />
    </div>
    <div>
      <h1 class="font-semibold capitalize">
        {{ title }}
      </h1>

      <div class="empty:display-none">
        <slot />
      </div>
    </div>
  </section>
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
  @apply p-3 border rounded flex gap-4 hover:border-cyan-800;
}
</style>
