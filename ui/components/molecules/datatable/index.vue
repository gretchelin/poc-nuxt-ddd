<template>
  <div class="overflow-x-auto bg-white shadow-md rounded-lg">
    <!-- Table Header -->
    <table class="min-w-full table-auto">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 text-left">
            #
          </th> <!-- Row Number Column -->

          <th
            v-for="(column, index) in columns"
            :key="index"
            class="px-4 py-2 text-left cursor-pointer"
            @click="sortData(column.key)"
          >
            {{ column.label }}
            <span
              v-if="column.sortable"
              class="ml-1 text-sm text-gray-500"
            >
              <Icon
                name="uil-filter"
                width="40"
                height="40"
                mode="svg"
                class="animate-spin mx-auto"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in sortedData"
          :key="rowIndex"
        >
          <td class="px-4 py-2">
            {{ getRowNumber(rowIndex) }}
          </td>
          <td
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
            class="px-4 py-2"
          >
            {{ row[column.key] }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="flex justify-between items-center mt-4">
      <button
        :disabled="currentPage === 1"
        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        @click="prevPage"
      >
        Previous
      </button>
      <div class="flex space-x-2">
        <button
          v-for="page in pageNumbers"
          :key="page"
          :class="[
            currentPage === page ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-700',
            'px-4 py-2 rounded-md',
          ]"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </div>
      <button
        :disabled="currentPage === totalPages"
        class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface Column {
  label: string;
  key: string;
  sortable?: boolean;
}

interface DataRow {
  [key: string]: any;
}

const props = defineProps({
  columns: {
    type: Array as () => Column[],
    required: true,
  },
  data: {
    type: Array as () => DataRow[],
    required: true,
  },
});

const currentPage = ref(1);
const itemsPerPage = ref(3);

// Sort functionality
const sortKey = ref<string | null>(null);
const sortOrder = ref<'asc' | 'desc'>('asc');

const sortedData = computed(() => {
  const sorted = [...props.data];

  if (sortKey.value) {
    sorted.sort((a, b) => {
      const aValue = a[sortKey.value as string];
      const bValue = b[sortKey.value as string];

      if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sorted.slice(start, end);
});

// Pagination logic
const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage.value));

const pageNumbers = computed(() => {
  const numbers = [];
  for (let i = 1; i <= totalPages.value; i++) {
    numbers.push(i);
  }
  return numbers;
});

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const goToPage = (page: number) => {
  currentPage.value = page;
};

const sortData = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  }
  else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

// Get the row number for each item based on pagination
const getRowNumber = (index: number) => {
  return (currentPage.value - 1) * itemsPerPage.value + index + 1;
};
</script>

<style scoped>
</style>
