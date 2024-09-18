<template>
  <div class="p-4">
    This is a protected page.
    <br>

    Only authorized user can enter this page!
  </div>
</template>

<script setup lang="ts">
import { usePlaygroundStore } from '#playground/stores/playground';

definePageMeta({
  layout: 'playground',
  middleware: ['playground', 'auth'],
});

const playgroundStore = usePlaygroundStore();

onMounted(() => {
  playgroundStore.pageRef = 'Playground Protected Page';
});
</script>

<style scoped>

</style>
