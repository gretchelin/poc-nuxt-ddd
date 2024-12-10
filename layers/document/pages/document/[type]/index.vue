<template>
  <div>
    <div class="space-y-4 p-2">
      <UIBreadcrumb
        title="Document"
        :items="breadcrumbs"
      />
      <div class="flex space-x-4">
        <NuxtLink to="/document/pdf">
          <UIButton
            :color="type === 'pdf' ? 'primary' : 'secondary'"
            class="text-teal-500"
          >
            PDF
          </UIButton>
        </NuxtLink>

        <NuxtLink to="/document/ppt">
          <UIButton
            :color="type === 'ppt' ? 'primary' : 'secondary'"
            class="text-gray-800"
          >
            PPT
          </UIButton>
        </NuxtLink>
      </div>

      <div class="flex justify-between items-center mb-6">
        <div class="flex flex-col">
          <div class="text-xl font-semibold">
            {{ type.toUpperCase() }} List
          </div>
          <div class="text-gray-400 text-sm">
            Create and manage  {{ type.toUpperCase() }}
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <UIButton
            color="primary"
            class="text-sm"
            @click="handleAdd"
          >
            + Add {{ type.toUpperCase() }}
          </UIButton>
        </div>
      </div>

      <div class="mb-6">
        <div class="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search by title or created by"
            class="px-4 py-2 border border-gray-300 rounded-md w-full"
          >
          <UIButton

            color="secondary"
            class="text-md text-gray-700"
          >
            Filter
          </UIButton>
        </div>
      </div>

      <div
        v-if="isLoading"
        class="text-center space-y-8"
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
        <table class="min-w-full table-auto bg-white rounded-lg">
          <thead class="bg-gray-100">
            <tr>
              <th class="p-4 text-left">
                No
              </th>
              <th class="p-4 text-left">
                Title
              </th>
              <th class="p-4 text-left">
                Created by
              </th>
              <th class="p-4 text-left">
                Created
              </th>
              <th class="p-4 text-left">
                Last Updated
              </th>
              <th class="p-4 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(document, idx) in data"
              :key="document?.id"
              class="border-b"
            >
              <td class="p-4">
                {{ idx + 1 }}
              </td>
              <td class="p-4">
                {{ document.title }}
              </td>
              <td class="p-4">
                {{ document.created_by }}
              </td>
              <td class="p-4">
                {{ document.created_at }}
              </td>
              <td class="p-4">
                {{ document.updated_at }}
              </td>
              <td class="p-4 flex justify-start gap-4">
                <NuxtLink :to="`/document/detail/${document?.id}`">
                  <Icon
                    name="uil-eye"
                    width="25"
                    height="20"
                    mode="svg"
                    class="text-gray-500"
                  />
                </NuxtLink>
                <Icon
                  name="uil-pen"
                  width="25"
                  height="20"
                  mode="svg"
                  class="text-gray-500"
                />
                <Icon
                  name="uil-trash"
                  width="25"
                  height="20"
                  mode="svg"
                  class="text-gray-500"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div
          v-if="!data"
          class="flex flex-col gap-1 justify-center items-center"
        >
          <img
            src="public/img/empty-state.svg"
            alt="No Data"
          >
          <span class="font-semibold">No Data Available</span>
          <span class="text-sm text-gray-700">Please add your first entry to get started.</span>
        </div>

        <div
          v-if="data?.length > 0"
          class="flex justify-between"
        >
          <div class="flex items-center space-x-2">
            <select
              id="itemsPerPage"
              v-model="itemPerPage"
              class="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option
                v-for="option in itemsPerPageOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <span class="text-sm text-gray-600">{{ itemRange }}</span>
          </div>

          <div class="flex justify-between items-center mt-6">
            <span
              :disabled="page?.value === 1"
              class="text-gray-400 px-4 py-2 rounded-md"
            >
              &lt; Previous
            </span>
            <div class="flex space-x-2">
              <button
                v-for="val in pageTotal"
                :key="val"
                :class="[
                  +currentPage === +val ? 'bg-teal-500 text-white' : 'text-gray-700',
                  'px-4 py-2 rounded-md',
                ]"
              >
                {{ page }}
              </button>
            </div>
            <span
              :disabled="page?.value === pageTotal"
              class="text-teal-500 px-4 py-2 rounded-md"
            >
              Next  &gt;
            </span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient, useQuery } from '@tanstack/vue-query';
import { getDocumentList } from '#document/api/document.ts';
import UIButton from '#ui/components/atoms/button';
import UIBreadcrumb from '#ui/components/atoms/breadcrumb';

// Page Setup
definePageMeta({
  layout: 'full',
  middleware: ['document'],
});

// Data
const page = ref(10);
const itemPerPage = ref(10);
const pageTotal = ref(1);
const total = ref(0);
const currentPage = ref(1);
const breadcrumbs = [
  { text: 'Learning Content', href: '' },
  { text: 'Document', href: '/document', active: true },
];
const route = useRoute();
const type = route?.params?.type;
const router = useRouter();
console.log(type, 'ea');
const itemsPerPageOptions = [10, 20, 50, 100];

const handleAdd = () => {
  router.push(`/document/${type}/add`);
};

// Computed
const itemRange = computed(() => {
  return `${(page.value - 1) * itemPerPage.value || 1} - ${page.value * itemPerPage.value} of ${total.value}`;
});

// Fetch
const { isLoading, data } = useQuery({
  queryKey: ['document-list-get', itemPerPage, page],
  queryFn: async () => {
    const { data } = await getDocumentList(type);

    total.value = data?.pagination?.total_data;
    currentPage.value = data?.pagination?.current_page;
    pageTotal.value = Math.ceil(data?.pagination?.total_data / 10) || 1;

    return data?.data || [];
  },
  retry: 2,
});
</script>

<style lang="postcss" scoped>

</style>
