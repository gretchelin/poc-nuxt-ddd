<template>
  <div class="space-y-4 p-2">
    <h1 class="mb-4  border-b pb-2 font-bold text-2xl">
      This is Playground
    </h1>

    <button
      type="button"
      class="inline-block border p-2 rounded hover:border-neutral-700"
      @click="randomizeList"
    >
      Randomize List
    </button>
    - Total {{ total }}

    <EntryCard
      v-for="entry in entries"
      :key="entry?.id"
      :title="entry?.title"
      :icon="entry?.icon"
    >
      <div>
        <a
          v-tooltip="`Edit`"
          class="inline-block"
          :href="`/playground/form/${entry?.id}`"
        >
          <Icon
            name="mdi:edit"
            mode="svg"
          />
        </a>
      </div>
    </EntryCard>
  </div>
</template>

<script setup lang="ts">
import EntryCard from '#playground/components/EntryCard.vue';

// Page Setup
definePageMeta({
  layout: 'full',
});

// Data
const entries = ref([]);

const total = computed(() => {
  return entries.value?.length || 'None';
});

// Methods
const randomizeList = () => {
  const len = Math.round(Math.random() * 30);
  entries.value = new Array(len).fill({}).map((e, idx) => {
    return {
      id: idx,
      title: `Title ${idx}`,
      icon: ['mdi:alert', 'mdi:alert-circle', 'mdi:arrow-right-thin', 'mdi:chevron-double-left', 'mdi:chevron-down', 'mdi:sail-boat', 'mdi:human-male-boy', 'mdi:linkedin', 'mdi:facebook', 'mdi:database'][idx % 10],
    };
  });
};

// lifecycle
onMounted(() => {
  randomizeList();
});
</script>

<style lang="postcss" scoped>

</style>
