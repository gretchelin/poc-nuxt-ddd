<template>
  <div class="space-y-4 p-2">
    <h1 class="mb-4  border-b pb-2 font-bold text-2xl">
      This is Playground
    </h1>

    <button
      type="button"
      class="inline-block border p-2 rounded hover:border-neutral-700"
      @click="cancelFetch"
    >
      Cancel fetch
    </button>

    <div>
      Page:
      <ul class="list-none flex gap-2 flex-wrap">
        <li
          v-for="pageNum in pageTotal"
          :key="pageNum"
          class="cursor-pointer"
          :class="page === (pageNum) ? 'text-cyan-800' : 'text-neutral-400'"
          @click="page = pageNum"
        >
          {{ pageNum }}
        </li>
      </ul>
    </div>

    <div>Showing item {{ itemRange }} from {{ total }}</div>

    <div
      v-if="isLoading"
      class="text-center space-y-4"
    >
      <Icon
        name="uil-spinner"
        width="40"
        height="40"
        mode="svg"
        class="animate-spin mx-auto"
      />
      <span>Fetching data....</span>
    </div>
    <template v-else>
      <EntryCard
        v-for="(entry, idx) in data"
        :key="entry?.name || idx"
        :title="entry?.name"
      >
        <div>
          <a
            v-tooltip="`Edit`"
            class="inline-block"
            :href="`/playground/form/${entry?.name}`"
          >
            <Icon
              name="mdi:edit"
              mode="svg"
            />
          </a>
        </div>
      </EntryCard>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient, useQuery } from '@tanstack/vue-query';
import EntryCard from '#playground/components/EntryCard.vue';

// Page Setup
definePageMeta({
  layout: 'full',
  middleware: ['playground'],
});

// Data
const queryClient = useQueryClient();
const page = ref(1);
const itemPerPage = ref(20);
const pageTotal = ref(1);
const total = ref(0);

// Computed
const itemRange = computed(() => {
  return `${(page.value - 1) * itemPerPage.value || 1} - ${page.value * itemPerPage.value}`;
});

// Fetch
const { isLoading, data } = useQuery({
  queryKey: ['playground-list-get', itemPerPage, page],
  queryFn: async ({ signal }) => {
    const data = await $fetch('https://pokeapi.co/api/v2/pokemon', {
      signal,
      params: {
        offset: (page.value - 1) * itemPerPage.value,
        limit: itemPerPage.value,
      },
    });

    total.value = data?.count;
    pageTotal.value = Math.ceil(data?.count / 20) || 1;

    return data?.results || [];
  },
  retry: 2,
});

// Methods
const cancelFetch = () => {
  queryClient.cancelQueries({ queryKey: ['playground-list-get'] });
};

// lifecycle
onMounted(() => {
});
</script>

<style lang="postcss" scoped>

</style>
