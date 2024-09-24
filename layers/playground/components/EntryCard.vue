<template>
  <section
    v-tooltip="'this component exist in playground feature'"
    data-teid="entry-card"
    class="entry-card"
  >
    <div
      v-if="icon"
      data-teid="entry-card--icon"
    >
      <Icon
        :name="icon"
        mode="svg"
      />
    </div>
    <div>
      <h1
        class="font-semibold capitalize"
        data-teid="entry-card--title"
      >
        {{ title }}
      </h1>

      <div
        class="empty:display-none"
        data-teid="entry-card--main"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  icon?: string;

  [key: string]: any;
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
