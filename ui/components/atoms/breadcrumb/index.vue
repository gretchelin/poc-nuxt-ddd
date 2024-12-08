<template>
  <div aria-label="breadcrumb" data-qa="breadcrumb" class="mb-4 flex space-x-4 items-center">
    <div class="font-bold text-lg">{{ title }}</div>
    <div class="text-gray-400 text-sm">|</div>
    <div class="flex gap-4 items-center">
      <div v-for="(item, index) in items" :key="index">
        <div class="flex gap-4 items-center"">
          <NuxtLink :to="`${item.href}`">
            <div :class="[item.active ? 'text-teal-500 font-semibold' : 'text-gray-400', 'text-sm']">
              {{ item.text }}
            </div> 
          </NuxtLink>
          <span class="text-gray-400 text-sm" v-if="!item.active">
            &gt;
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface BreadcrumbItem {
  href: string;
  text: string;
  active: boolean;
}

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array as () => BreadcrumbItem[],
    required: true,
  },
});
</script>

<style scoped>
</style>