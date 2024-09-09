<template>
  <div class="base-layout--full">
    <header data-teid="top-navbar" class="top-navbar">
      NAVBAR
    </header>

    <div class="flex flex-1 overflow-hidden">
      <div data-teid="sidebar" class="sidebar">
        SIDEBAR
      </div>

      <div class="body">
        <main data-teid="body" class="main">
          <slot />
        </main>

        <footer data-teid="footer" class="footer">
          FOOTER
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
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

.top-navbar {
  @apply p-2;
  min-height: 40px;
  background: #e6e6fa;
}

.sidebar {
  @apply min-h-full overflow-auto p-2;
  width: 280px;
  background: #ffc7c7;
}

.body {
  @apply flex flex-col flex-1 min-h-full overflow-auto;
}

.main {
  @apply flex-1;
}

.footer {
  @apply p-2 bg-neutral-100;
  justify-self: end;
}
</style>
