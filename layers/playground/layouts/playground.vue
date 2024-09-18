<template>
  <div class="base-layout--full">
    <header
      data-teid="top-navbar"
      class="top-navbar"
    >
      <div class="flex-1">
        Hello, <span class="font-bold">{{ authData?.user?.name || 'Guest' }}</span>
      </div>

      <div class="flex justify-end self-end">
        <UiButton
          v-if="authStatus === 'authenticated'"
          v-tooltip="'Logout'"
          class="aspect-square rounded text-neutral-700"
          @click="doLogout"
        >
          <Icon
            name="mdi:logout"
            mode="svg"
            size="20"
          />
        </UiButton>

        <NuxtLink
          v-else
          v-tooltip="'Login'"
          to="/auth/login"
          class="inline-block bg-white aspect-square p-2 rounded text-neutral-700"
        >
          <Icon
            name="mdi:login"
            mode="svg"
            size="20"
          />
        </NuxtLink>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <div
        data-teid="sidebar"
        class="sidebar"
      >
        <ul>
          <li>
            <NuxtLink to="/">
              Index
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/playground">
              Playground Public
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/playground/protected">
              Playground Protected
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="body">
        <main
          data-teid="body"
          class="main"
        >
          <slot />
        </main>

        <footer
          data-teid="footer"
          class="footer"
        >
          {{ playgroundStore.copy }}<br>
          Page: {{ pageRef }}
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlaygroundStore } from '#playground/stores/playground';

const { signOut } = useAuth();
const {
  data: authData,
  status: authStatus,
} = useAuthState();
const playgroundStore = usePlaygroundStore();

const pageRef = computed(() => playgroundStore.pageRef);

const doLogout = () => {
  signOut({
    callbackUrl: '/auth/login',
  });
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
  @apply p-2 flex items-center bg-green-800 text-green-50;
  min-height: 40px;
}

.sidebar {
  @apply min-h-full overflow-auto p-2 bg-green-900 text-green-50;
  width: 280px;
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
