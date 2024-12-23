<template>
  <div>
    <table
      ref="dataTable"
      :class="tableClass"
      :options="options"
    >
      <!-- Table Header -->
      <thead>
        <tr>
          <!-- Conditionally render the Row Number Column based on showRowNumber prop -->
          <th v-if="showRowNumber">
            <slot name="headerNumber">
              No
            </slot>
          </th>

          <slot name="headers">
            <th
              v-for="(header, index) in headers"
              :key="index"
            >
              {{ header.label }}
            </th>
          </slot>

          <!-- Custom Actions Column -->
          <th v-if="withActions">
            Actions
          </th>
        </tr>
      </thead>
      <!-- Table Body -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
        >
          <!-- Conditionally render the Row Number Column based on showRowNumber prop -->
          <td v-if="showRowNumber">
            <slot
              name="rowNumber"
              :row="row"
              :index="rowIndex"
            >
              {{ getRowNumber(rowIndex) }}
            </slot>
          </td>

          <slot
            name="row"
            :row="row"
            :index="rowIndex"
          >
            <td
              v-for="(column, colIndex) in headers"
              :key="colIndex"
            >
              <slot
                :name="`item_${column.key}`"
                v-bind="{
                  data: row,
                  value: row[column.key],
                  idx: rowIndex,
                  key: column.key,
                }"
              >
                {{ row[column.key] }}
              </slot>
            </td>
          </slot>

          <!-- Custom Row Actions (e.g., Detail, Edit, Delete) -->
          <td
            v-if="withActions"
            class="flex justify-start gap-4 border-none"
          >
            <slot
              name="actions"
              :row="row"
              :index="rowIndex"
            >
              <!-- Default Action Buttons -->
              <Icon
                v-if="detailAction"
                name="uil-eye"
                width="25"
                height="20"
                mode="svg"
                class="action"
                @click="handleDetail(row, rowIndex)"
              />
              <Icon
                v-if="editAction"
                name="uil-pen"
                width="25"
                height="20"
                mode="svg"
                class="action"
                @click="handleEdit(row, rowIndex)"
              />
              <Icon
                v-if="deleteAction"
                name="uil-trash"
                width="25"
                height="20"
                mode="svg"
                class="action"
                @click="handleDelete(row, rowIndex)"
              />
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Custom Pagination Controls Slot -->
    <div class="mt-6 flex justify-between">
      <slot
        name="pagination"
        :current-page="currentPage"
        :total-pages="totalPages"
        :set-page="setPage"
        :set-items-per-page="setItemsPerPage"
      >
        <div class="flex items-center space-x-2">
          <select
            id="itemsPerPage"
            v-model="itemsPerPage"
            class="bg-white border border-gray-300 rounded-md px-3 py-2 text-sm"
            @change="setItemsPerPage"
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

        <div class="flex justify-between items-center">
          <span
            :disabled="currentPage === 1"
            class="text-gray-400 px-4 py-2 rounded-md"
            @click="setPage(currentPage - 1)"
          >
            &lt; Previous
          </span>
          <!-- Page Numbers -->
          <div class="flex items-center space-x-1">
            <button
              v-if="currentPage > 3"
              class="px-3 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              :class="[
                +currentPage === 1 ? 'bg-teal-500 text-white' : 'text-gray-700',
                'px-4 py-2 rounded-md',
              ]"
              @click="setPage(1)"
            >
              1
            </button>
            <span v-if="currentPage > 3">...</span>

            <button
              v-for="page in pageNumbers"
              :key="page"
              :class="[
                +currentPage === +page ? 'bg-teal-500 text-white' : 'text-gray-700',
                'px-4 py-2 rounded-md',
              ]"
              @click="setPage(page)"
            >
              {{ page }}
            </button>

            <span v-if="currentPage < totalPages - 2">...</span>

            <button
              v-if="currentPage < totalPages - 2"
              :class="[
                +currentPage === +totalPages ? 'bg-teal-500 text-white' : 'text-gray-700',
                'px-4 py-2 rounded-md',
              ]"
              @click="setPage(totalPages)"
            >
              {{ totalPages }}
            </button>
          </div>
          <span
            :disabled="currentPage === totalPages"
            class="text-teal-500 px-4 py-2 rounded-md"
            @click="setPage(currentPage + 1)"
          >
            Next  &gt;
          </span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import emptyState from 'public/img/empty-state.svg';

interface Header {
  label: string;
  key: string;
}

interface IProps {
  headers: Header[];
  rows: Array<any>;
  tableClass?: string;
  showRowNumber?: boolean;
  withActions?: boolean;
  currentPage: number;
  totalPages: number;
  totalData: number;
  itemsPerPage: number;
  detailAction?: (row: any, index: number) => void;
  editAction?: (row: any, index: number) => void;
  deleteAction?: (row: any, index: number) => void;
  setCurrentPage?: (page: number) => void;
  setItemsPerPage?: (itemsPerPage: number) => void;
}

const props = withDefaults(defineProps<IProps>(), {
  headers: [] as Header,
  rows: [],
  tableClass: 'custom-datatable',
  showRowNumber: true,
  withActions: true,
  currentPage: 1,
  itemsPerPage: 10,
});

const dataTable = ref(null);
const currentPage = ref(props.currentPage);
const itemsPerPage = ref(props.itemsPerPage);
const totalPages = ref(props.totalPages);
const totalData = ref(props.totalData);
const itemsPerPageOptions = [10, 20, 50, 100];

const getRowNumber = (index: number) => {
  return (props.currentPage - 1) * props.itemsPerPage + index + 1;
};

const emptyStateHtml = `
  <div
    class='flex flex-col gap-1 justify-center items-center'
  >
    <img
      src='${emptyState}'
      alt='No Data'
    >
    <span class='font-semibold'>No Data Available</span>
    <span class='text-sm text-gray-700'>Please add your first entry to get started.</span>
  </div>
`;

const options = {
  searching: false,
  paging: false,
  info: false,
  language: {
    emptyTable: `<div v-html=${emptyStateHtml}`,
  },
};

const handleDetail = (row: any, rowIndex: number) => {
  if (props.detailAction) {
    props.detailAction(row, rowIndex);
  }
};
const handleEdit = (row: any, rowIndex: number) => {
  if (props.editAction) {
    props.editAction(row, rowIndex);
  }
};
const handleDelete = (row: any, rowIndex: number) => {
  if (props.deleteAction) {
    props.deleteAction(row, rowIndex);
  }
};

const itemRange = computed(() => {
  return `${(currentPage.value - 1) * itemsPerPage.value + 1} - ${Math.min(currentPage.value * itemsPerPage.value, totalData.value)} of ${totalData.value}`;
});

const pageNumbers = computed(() => {
  const pages = [];
  const start = Math.max(1, currentPage.value - 2);
  const end = Math.min(totalPages.value, currentPage.value + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});

const setPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
  if (props.setCurrentPage) {
    props.setCurrentPage(page);
  }
};

// Set the items per page
const setItemsPerPage = (event: any) => {
  if (props.setItemsPerPage) {
    props.setItemsPerPage(event.target.value);
  }
  itemsPerPage.value = event.target.value;
};
</script>

<style scoped>
  .custom-datatable {
    @apply min-w-full table-auto bg-white rounded-lg
  }

  thead {
    @apply bg-gray-100
  }

  tr {
    @apply border-b
  }

  th {
    @apply bg-gray-100 font-semibold p-4 text-sm text-left
  }

  td {
    @apply p-4 text-sm border-b
  }

  .action {
    @apply text-gray-500 cursor-pointer
  }
</style>
