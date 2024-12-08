<template>
  <div class="base-layout--full">
    <div class="flex flex-1 overflow-hidden">
      <div
        data-qa="sidebar"
        class="sidebar flex flex-col space-y-4 border-r-2 border-gray-100"
      >
        <div class="border-b-2 border-gray-100">
          <div class="flex items-center space-x-3 mb-6 mx-2 mt-4">
            <img src="public/img/logo/logo.svg" alt="myDigiLearn" />
            <div class="flex flex-col">
              <div class="text-xl font-semibold">myDigiLearn</div>
              <div class="text-xs text-gray-400">Content Management System</div>
            </div>
            <div
              class="border p-1 rounded cursor-pointer"
              data-qa="collapse-navbar"
            >
              <img
                src="public/img/icons/arrow-left.svg"
                alt="Collapse Navbar"
              />
            </div>
          </div>
        </div>

        <div class="flex h-full space-x-5">
          <div class="navbar-parent">
            <img src="public/img/icons/home.svg" alt="Home" />

            <img src="public/img/avatar.png" alt="Avatar" />
          </div>

          <div>
            <div class="text-sm font-semibold text-gray-600">
              Learning Content
            </div>
            <div class="space-y-2">
              <div class="flex items-center space-x-2 text-gray-700">
                <i class="fas fa-video" />
                <span>Video</span>
              </div>
              <div class="flex items-center space-x-2 text-gray-700">
                <i class="fas fa-microphone" />
                <span>Audio</span>
              </div>
              <div class="flex items-center space-x-2 text-gray-700">
                <i class="fas fa-file-alt" />
                <span>Article</span>
              </div>
              <div class="flex items-center space-x-2 text-teal-500">
                <i class="fas fa-file" />
                <span>Document</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="body">
        <main data-qa="body" class="main">
          <slot />
        </main>

<<<<<<< HEAD
        <footer data-qa="footer" class="footer">FOOTER</footer>
=======
        <!-- <footer
          data-qa="footer"
          class="footer"
        >
          FOOTER
        </footer> -->
>>>>>>> 90b1c04 (feat(global-component): button, datatable, breadcrumb)
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

.sidebar {
  @apply min-h-full overflow-auto p-2;
  width: 320px;
  background: bg-primary;
}

.navbar-parent {
  @apply border-r-2 border-gray-100 pr-2 h-full flex flex-col justify-between;
}

.body {
  @apply flex flex-col flex-1 min-h-full overflow-auto p-4;
}

.main {
  @apply flex-1;
}

.footer {
  @apply p-2 bg-neutral-100;
  justify-self: end;
}
</style>

