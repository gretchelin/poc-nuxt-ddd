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
        <UIDatatable
          :headers="headers"
          :rows="data"
          :detail-action="handleDetail"
          :edit-action="handleEdit"
          :delete-action="handleDelete"
          :current-page="currentPage"
          :total-pages="pageTotal"
          :total-data="total"
          :items-per-page="itemPerPage"
        >
          <template #item_created_at="row">
            {{ dayjs(row.value).format('DD MMM YYYY, HH:mm') }}
          </template>
          <template #item_updated_at="row">
            {{ dayjs(row.value).format('DD MMM YYYY, HH:mm') }}
          </template>
        </UIDatatable>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query';
import dayjs from 'dayjs';
import { getDocumentList } from '#document/api/document.ts';
import UIButton from '#ui/components/atoms/button';
import UIBreadcrumb from '#ui/components/atoms/breadcrumb';
import UIDatatable from '#ui/components/molecules/datatable';
import { deleteDocument } from '~/layers/document/api/document';

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
const queryClient = useQueryClient();
const route = useRoute();
const type = route?.params?.type;
const router = useRouter();
const swal = useSwal();
const headers = [
  { label: 'Title', key: 'title' },
  { label: 'Created By', key: 'created_by' },
  { label: 'Created', key: 'created_at' },
  { label: 'Last Updated', key: 'updated_at' },
];

// Fetch
const { isLoading, data, refetch } = useQuery({
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

const handleAdd = () => {
  router.push(`/document/${type}/add`);
};

const handleDetail = (row: any, index: number) => {
  // Handle the detail action for the row
  // TODO
  console.log('Detail row:', row, index);
};

const handleEdit = (row: any, index: number) => {
  // Handle the edit action for the row
  // TODO
  console.log('Editing row:', row, index);
};

const { mutate: handleDeleteDocument, isPending: isProcessing } = useMutation({
  mutationKey: ['delete-document'],
  mutationFn: async (id: number) => {
    return await deleteDocument(id);
  },
  onSuccess: () => {
    swal.fire({
      position: 'top-end',
      title: 'Success',
      icon: 'success',
      timer: 2000,
    });
    refetch();
  },
  onError: (err) => {
    console.error(err);
  },
});

const handleDelete = (row: any, index: number) => {
  // Handle the delete action for the row
  console.log('Deleting row:', row, index);
  handleDeleteDocument(row.id);
};
</script>

<style lang="postcss" scoped>

</style>
