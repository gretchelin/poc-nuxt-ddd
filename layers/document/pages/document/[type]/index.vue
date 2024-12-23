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

      <div class="mb-6 relative">
        <UIFilter
          placeholder="Search by title or created by"
          :is-advanced="true"
          @search="handleSearch"
          @apply="handleApply"
          @reset="handleReset"
        >
          <template #advanced-filter>
            <div class="flex flex-col space-y-2">
              <div class="text-gray-700 font-bold">
                Date
              </div>
              <div class="flex space-x-2 items-center">
                <VueDatePicker
                  ref="date1"
                  v-model="startDate"
                  auto-apply
                  :enable-time-picker="false"
                  :format="format"
                />
                <span class="text-sm text-gray-500">to</span>
                <VueDatePicker
                  ref="date2"
                  v-model="endDate"
                  auto-apply
                  :enable-time-picker="false"
                  :format="format"
                />
              </div>
            </div>
          </template>
        </UIFilter>
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
          :set-current-page="handleSetCurrentPage"
          :set-items-per-page="handleSetItemsPerPage"
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
import VueDatePicker from '@vuepic/vue-datepicker';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import { getDocumentList } from '#document/api/document.ts';
import UIButton from '#ui/components/atoms/button';
import UIBreadcrumb from '#ui/components/atoms/breadcrumb';
import UIDatatable from '#ui/components/molecules/datatable';
import UIFilter from '#ui/components/molecules/filter';
import { deleteDocument } from '~/layers/document/api/document';
import '@vuepic/vue-datepicker/dist/main.css';

// Page Setup
definePageMeta({
  layout: 'full',
  middleware: ['document'],
});

// Data
const date1 = ref<DatePickerInstance>(null);
const date2 = ref<DatePickerInstance>(null);
const startDate = ref('');
const endDate = ref('');
const itemPerPage = ref(10);
const pageTotal = ref(1);
const total = ref(0);
const currentPage = ref(1);
const breadcrumbs = [
  { text: 'Learning Content', href: '' },
  { text: 'Document', href: '/document/pdf', active: true },
];
const route = useRoute();
const type = route?.params?.type;
const router = useRouter();
const swal = useSwal();
const toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast: any) => {
    toast.onmouseenter = swal.stopTimer;
    toast.onmouseleave = swal.resumeTimer;
  },
});
const headers = [
  { label: 'Title', key: 'title' },
  { label: 'Created By', key: 'created_by' },
  { label: 'Created', key: 'created_at' },
  { label: 'Last Updated', key: 'updated_at' },
];

const params = ref({
  type_document: type,
  page_size: itemPerPage.value,
  page: currentPage.value,
  keyword: '',
});

// Fetch
const { isLoading, data, refetch } = useQuery({
  queryKey: ['document-list-get', itemPerPage, currentPage, pageTotal, total, params],
  queryFn: async () => {
    const { data } = await getDocumentList(params.value);

    total.value = data?.pagination?.total_data;
    currentPage.value = data?.pagination?.current_page;
    pageTotal.value = data?.pagination?.total_pages;

    return data?.data || [];
  },
});

const handleSearch = (value: string) => {
  params.value.keyword = value;
};

const handleApply = () => {
  params.value.start_date = dayjs(startDate.value).format('YYYY-MM-DD');
  params.value.end_date = dayjs(endDate.value).format('YYYY-MM-DD');
};

const handleReset = () => {
  delete params.value.start_date;
  delete params.value.end_date;
  if (date1.value && date2.value) {
    date1.value.clearValue();
    date2.value.clearValue();
  }
  refetch();
};

const handleSetCurrentPage = (page: number) => {
  if (page > 0 && page <= pageTotal.value) {
    currentPage.value = page;
    params.value.page = page;
  }
};
const handleSetItemsPerPage = (itemsPerPage: number) => {
  itemPerPage.value = itemsPerPage;
  params.value.page_size = itemsPerPage;
};

const handleAdd = () => {
  router.push(`/document/${type}/add`);
};

const handleDetail = (row: any, index: number) => {
  // Handle the detail action for the row
  router.push(`/document/${type}/detail/${row.id}`);
};

const handleEdit = (row: any, index: number) => {
  // Handle the edit action for the row
  router.push(`/document/${type}/edit/${row.id}`);
};

const { mutate: handleDeleteDocument, isPending: isProcessing } = useMutation({
  mutationKey: ['delete-document'],
  mutationFn: async (id: number) => {
    return await deleteDocument(id);
  },
  onSuccess: () => {
    toast.fire({
      icon: 'success',
      title: `${type.toUpperCase()} successfully deleted`,
    });
    refetch();
  },
  onError: (err) => {
    toast.fire({
      icon: 'error',
      title: `Failed to delete ${type.toUpperCase()} `,
    });
  },
});

const handleDelete = (row: any, index: number) => {
  // Handle the delete action for the row
  swal.fire({
    title: 'Delete Document',
    text: `Are you sure you want to delete this document? "${row.title}"`,
    icon: 'error',
    showCancelButton: true,
    confirmButtonColor: '#DA4A4A',
    cancelButtonColor: '#EAEAEA',
    confirmButtonText: 'Delete',
  }).then((result) => {
    if (result.isConfirmed) {
      handleDeleteDocument(row.id);
    }
  });
};

const format = (date) => {
  return dayjs(date).format('DD MMM YYYY');
};
</script>
