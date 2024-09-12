<template>
  <div>
    <div
      v-if="isLoading"
      v-tooltip="'spinner is from core layer'"
    >
      spinner
      <CoreFetchSpinner />
    </div>
    <section
      v-else
      class="space-y-4 p-4"
    >
      <h1 class="uppercase font-bold text-2xl">
        {{ data?.name }} <span class="font-normal text-lg lowercase text-neutral-400">{{ pokeType }}</span>
      </h1>

      <img
        alt="font-default"
        :src="data?.sprites?.front_default"
        class="max-w-[400px]"
      >

      <div>
        <div class="font-semibold text-lg">
          Moves
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4">
          <div
            v-for="move in data?.moves"
            :key="move"
          >
            {{ move?.move?.name }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

definePageMeta({
  layout: 'full',
  middleware: ['playground'],
});

// data
const route = useRoute();

// computed
const id = computed(() => {
  return route?.params?.id;
});

const pokeType = computed(() => {
  return data?.value?.types?.map(e => e?.type?.name).join('/');
});

const { isLoading, data } = useQuery({
  queryKey: ['playground-detail-get', id],
  queryFn: async ({ signal }) => {
    return await $fetch(`https://pokeapi.co/api/v2/pokemon/${id.value}/`, {
      signal,
    });
  },
  enabled: () => !!id.value,
});
</script>

<style scoped>

</style>
