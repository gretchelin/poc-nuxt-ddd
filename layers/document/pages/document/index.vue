<template>
  <div>
    <div class="space-y-4 p-2">
      <div class="flex gap-2">
        <div class="content-area__heading">
          <h2 class="text-2xl !font-bold text-spacecadet-950">
            Document
          </h2>
        </div>
        <div class="flex">
          <ul class="flex flex-wrap items-center gap-2">
            <li class="inline-flex items-center gap-2">
              <NuxtLink to="/">
                <IconHome />
              </NuxtLink>
              <span class="mx-2 flex items-start">
              </span>
            </li>
            <li
              v-if="breadcrumbs"
              v-for="(link, index) in breadcrumbs?.slice(1, -1)"
              :key="index"
              class="text-cutured-950 inline-flex items-center gap-2"
            >
              <NuxtLink
                v-if="link.url"
                :to="
                  route.params.id && link.url.includes(':id')
                    ? link.url.replace(':id', route.params.id)
                    : link.url
                "
              >
                {{ link.title }}
              </NuxtLink>
              <span
                v-else
                class="text-cutured-950 cursor-default"
              >{{ link.title }}</span>
              <span class="mx-2 flex items-start">
              </span>
            </li>
        
            <li
              v-if="breadcrumbs?.length === 5"
              class="inline-flex text-spacecadet-40"
            >
              <span
                
                class="cursor-default"
              >
              </span>
            </li>
            <li
              v-else-if="breadcrumbs?.slice(-1)[0].active"
              class="inline-flex text-spacecadet-40"
            >
              <span
              
                class="text-cutured-950 cursor-default"
              >{{ breadcrumbs.slice(-1)[0].title }}</span>
            </li>
          </ul>
        </div>
      </div>
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
              <td>
                <NuxtLink :to="`/document/detail/${document?.id}`">Detail</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient, useQuery } from '@tanstack/vue-query';
import { getDocumentList } from '../../api/document.ts';

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
const breadcrumbs = [
  { title: 'Home', url: '/' },
  { title: 'Content', url: null },
  { title: 'Document', active: true }
]
const route = useRouter();

// Computed
const itemRange = computed(() => {
  return `${(page.value - 1) * itemPerPage.value || 1} - ${page.value * itemPerPage.value}`;
});

// Fetch
const { isLoading, data } = useQuery({
  queryKey: ['document-list-get', itemPerPage, page],
  queryFn: async () => {
    const { data } = await getDocumentList();

    total.value = data?.pagination?.total_data;
    pageTotal.value = Math.ceil(data?.pagination?.total_data / 20) || 1;

    return data?.data || [];
  },
  retry: 2,
});
</script>

  <style lang="postcss" scoped>

  </style>
