<template>
  <div>
    <div class="flex items-center gap-4">
      <Icon
        name="mdi-search"
        class="filter--icon"
        width="22"
        height="22"
        mode="svg"
      />
      <input
        type="text"
        :placeholder="placeholder"
        class="-ml-12 pl-10 px-4 py-2 border border-gray-300 rounded-md w-full focus:border-teal-500 focus:outline-none"
        @keyup="handleSearch"
      >
      <UIButton
        color="secondary"
        class="text-sm text-gray-500"
        @click="toggleFilter"
      >
        <img
          src="public/img/icons/filter.svg"
          alt="filter"
        >
        Filter
      </UIButton>
    </div>

    <div
      v-show="isFilterVisible"
      class="filter"
    >
      <div class="flex items-center space-x-2">
        <slot name="advanced-filter" />
      </div>

      <!-- Action buttons -->
      <div class="filter--actions">
        <span
          class="mr-2 cursor-pointer"
          @click="handleReset"
        >
          Reset
        </span>
        <UIButton
          color="secondary"
          :class="['border']"
          @click="toggleFilter"
        >
          Cancel
        </UIButton>
        <UIButton
          class="px-4 py-2 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600"
          @click="handleApply"
        >
          Apply
        </UIButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import UIButton from '#ui/components/atoms/button';

interface IProps {
  id: string;
  placeholder: string;
  isAdvanced: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  isAdvanced: false,
  placeholder: '',
});

// Define emits for actions
const emit = defineEmits<{
  (e: 'search' | 'apply' | 'reset', payload?: any): void;
}>();

const isFilterVisible = ref(false);

const toggleFilter = () => {
  isFilterVisible.value = !isFilterVisible.value;
};

const handleSearch = (e: any) => {
  emit('search', e.target.value);
};

const handleReset = () => {
  emit('reset');
};

const handleApply = () => {
  emit('apply');
  toggleFilter();
};
</script>

<style scoped>
.filter {
  @apply flex flex-col py-3 px-4 border shadow rounded my-2 gap-2 right-1 bg-white absolute;
}

.filter--icon {
  @apply text-gray-400;
  margin-left: 10px;
  z-index: 5
}

.filter--actions {
  @apply flex items-center space-x-2 border-t pt-2 mt-1 justify-end
}
</style>
