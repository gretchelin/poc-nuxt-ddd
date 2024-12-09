<template>
  <div>
    <div
      aria-label="breadcrumb"
      data-qa="breadcrumb"
      class="mb-4 flex space-x-4 items-center"
    >
      <!-- Title Slot with Default Content -->
      <slot name="title" v-bind="{ titleClass: 'breadcrumb--title' }">
        <div class="breadcrumb--title">{{ title }}</div>
      </slot>

      <div class="text-gray-400 text-sm">|</div>

      <div class="flex gap-4 items-center">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="flex gap-4 items-center"
        >
          <NuxtLink :to="`${item.href}`">
            <div
              :class="[
                item.active ? 'text-teal-500 font-semibold' : 'text-gray-400',
                'text-sm'
              ]"
            >
              {{ item.text }}
            </div>
          </NuxtLink>

          <!-- Separator Slot -->
          <slot
            name="separator"
            v-bind="{ active: item?.active, class: 'breadcrumb--separator', value: 'separator' }"
          >
            <!-- Default separator content if no slot is provided -->
            <span 
              v-if="!item.active"
              class="breadcrumb--separator"
            >
              {{ separator }}
            </span>
          </slot>
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

interface IProps {
  title?: string; 
  items: BreadcrumbItem[];
  separator?: string;
}

const props = withDefaults(defineProps<IProps>(), {
  title: '',
  items: [] as BreadcrumbItem[],
  separator: '>',
})

</script>

<style scoped>

.breadcrumb--title {
  @apply font-bold text-lg
}

.breadcrumb--separator {
  @apply text-gray-400 text-sm
}

</style>