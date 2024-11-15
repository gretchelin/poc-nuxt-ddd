<template>
    <div class="space-y-4 p-2">
      <h1 class="mb-4  border-b pb-2 font-bold text-2xl">
        Document
      </h1>
  
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
        <table border="1">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Created By</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(document, idx) in data"
                    :key="document?.id"
                >
                    <td>{{ idx + 1 }}</td>
                    <td>{{ document.title }}</td>
                    <td>{{ document.created_by }}</td>
                    <td>{{ document.created_at }}</td>
                    <td></td>
                </tr>
            </tbody>
        </table>
   
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useQueryClient, useQuery } from '@tanstack/vue-query';
  import { getDocumentList } from '../../api/document.ts'
//   import { usePlaygroundStore } from '#playground/stores/playground';
  
  // Page Setup
  definePageMeta({
    layout: 'document',
    middleware: ['document'],
  });
  
  // Data
  const queryClient = useQueryClient();
  const page = ref(1);
  const itemPerPage = ref(20);
  const pageTotal = ref(1);
  const total = ref(0);
//   const playgroundStore = usePlaygroundStore();
  
  // Computed
  const itemRange = computed(() => {
    return `${(page.value - 1) * itemPerPage.value || 1} - ${page.value * itemPerPage.value}`;
  });
  
  // Fetch
  const { isLoading, data } = useQuery({
    queryKey: ['document-list-get', itemPerPage, page],
    queryFn: async () => {
      const { data } = await getDocumentList()

      total.value = data?.pagination?.total_data;
      pageTotal.value = Math.ceil(data?.pagination?.total_data / 20) || 1;
  
      return data?.data || [];
    },
    retry: 2,
  });
  
  
  // Methods
  const cancelFetch = () => {
    queryClient.cancelQueries({ queryKey: ['document-list-get'] });
  };
  
  // lifecycle
  onMounted(() => {
    // playgroundStore.$patch({
    //   pageRef: 'Document Page',
    // });
  });
  </script>
  
  <style lang="postcss" scoped>
  
  </style>
  