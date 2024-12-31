<template>
  <div class="base-layout--full">
    <div class="flex flex-1 overflow-hidden">
      <Sidebar :handle-collapse-sidebar="handleCollapseSidebar" />
      <div
        class="body"
        :class="isCollapseSidebar ? 'ml-32': 'ml-80'"
      >
        <main
          data-qa="body"
          class="main"
        >
          <slot />
        </main>

        <!-- <footer
          data-qa="footer"
          class="footer"
        >
          FOOTER
        </footer> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '~/components/sidebar';

const isCollapseSidebar = ref(false);

const handleCollapseSidebar = (isCollapse: boolean) => {
  isCollapseSidebar.value = isCollapse;
};
</script>

<style lang="postcss" scoped>
:global(body:has(.base-layout--full)) {
  @apply w-screen h-screen overflow-hidden;
}

:global(body:has(.base-layout--full) > #__nuxt) {
  @apply w-full h-full overflow-hidden;
}

.base-layout--full {
  @apply flex flex-col w-full h-full;
}

.body {
  @apply flex flex-col flex-1 min-h-full overflow-auto p-4;
  transition: width 0.3s ease-in-out;
}

.main {
  @apply flex-1;
}

.footer {
  @apply p-2 bg-neutral-100;
  justify-self: end;
}
</style>
