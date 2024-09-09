<template>
  <div class="space-y-4 p-2">
    <h1 class="mb-4  border-b pb-2 font-bold text-2xl">
      This is Playground
    </h1>

    <button type="button" class="inline-block" @click="randomizeList">
      Randomize List
    </button> - Total {{ total }}

    <EntryCard v-for="entry in entries" :key="entry?.id" :title="entry?.title" />
  </div>
</template>

<script setup lang="ts">
import EntryCard from '#playground/components/EntryCard.vue';

// Page Setup
definePageMeta({
  layout: 'full',
});

// Data
const entries = ref(new Array(20).fill({}).map((e, idx) => {
  return {
    id: idx,
    title: `Title ${idx}`,
  };
}));

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
    };
  });
};
</script>

<style lang="postcss" scoped>

</style>
