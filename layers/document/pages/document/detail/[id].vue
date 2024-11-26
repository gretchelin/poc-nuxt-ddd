import SvgHome from '#core/components/icons/Home.vue';
import IconHome from '#core/components/icons/Home.vue';
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
                  route.params?.id && link.url.includes(':id')
                    ? link.url.replace(':id', route.params?.id)
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
        <h3>Detail page</h3>
      </div>
      <div class="bg-grey">
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const breadcrumbs = [
  { title: 'Home', url: '/' },
  { title: 'Content', url: null },
  { title: 'Document', url: '/document' },
  { title: 'Detail', active: true }
]

// Page Setup
definePageMeta({
  layout: 'document',
  middleware: ['document'],
});

const route = useRoute();

</script>

<style lang="postcss" scoped>

</style>

