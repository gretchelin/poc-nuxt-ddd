<template>
  <div class="relative">
    <!-- Sidebar -->
    <div :class="['sidebar', isSidebarVisible ? 'sidebar--expanded' : 'sidebar--collapsed']">
      <div class="border-b-2 border-gray-100">
        <div class="flex items-center space-x-3 m-4">
          <img
            src="public/img/logo/logo.svg"
            alt="myDigiLearn"
            @click="toggleSidebar"
          >
          <div
            v-show="isSidebarVisible"
            class="flex flex-col"
          >
            <div class="text-xl font-semibold">
              myDigiLearn
            </div>
            <div class="text-xs text-gray-400 w-44">
              Content Management System
            </div>
          </div>
          <div
            class="border p-1 text-lg rounded cursor-pointer"
            data-qa="collapse-navbar"
            @click="toggleSidebar"
          >
            <Icon
              v-if="isSidebarVisible"
              name="mdi-chevron-left"
              class="text-gray-400"
              width="24"
              height="24"
              mode="svg"
            />
            <Icon
              v-else
              name="mdi-chevron-right"
              class="text-gray-400"
              width="24"
              height="24"
              mode="svg"
            />
          </div>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <div>
        <slot name="menu" />
      </div>

      <div class="flex h-full space-x-5">
        <div class="sidebar--parent">
          <div class="flex flex-col gap-2">
            <div
              v-for="(item, index) in parentMenuItems"
              :key="index"
              :class="[
                'sidebar--parent-items',
                item.active ? 'bg-teal-100 text-teal-600' : 'hover:bg-teal-100 hover:text-teal-600 text-gray-400',
              ]"
              @click="handleClickParentMenu(item)"
            >
              <Icon
                :name="item.icon"
                class="m-2"
                width="18"
                height="18"
                mode="svg"
              />
            </div>
          </div>

          <img
            src="public/img/avatar.png"
            alt="Avatar"
            class="cursor-pointer"
            @click="toggleDropdown"
          >
        </div>
        <div :class="isSidebarVisible ? '': 'pt-6'">
          <div
            v-show="isSidebarVisible"
            class="text-sm font-semibold text-gray-600 pt-4"
          >
            {{ selectedChildMenuItems?.titleMenu }}
          </div>

          <div
            v-for="(childMenu, index) in selectedChildMenuItems.menuList"
            :key="index"
            :class="!isSidebarVisible ? 'even:border-b-2 even:border-gray-200 even:pb-4 odd:pt-4 w-7' : 'w-56'"
          >
            <div
              v-show="isSidebarVisible"
              class="text-sm text-gray-600 my-4"
            >
              {{ childMenu.subtitleMenu }}
            </div>
            <div :class="isSidebarVisible ? 'space-y-4 ml-3': 'space-y-6 ml-1'">
              <div
                v-for="(item, index) in childMenu.items"
                :key="index"
                class="flex items-center space-x-2 justify-between text-gray-700 cursor-pointer mr-2"
              >
                <div
                  class="flex items-center space-x-2 mr-2 cursor-pointer"
                  @click="handleRoute(item)"
                >
                  <Icon
                    :name="item.icon"
                    width="18"
                    class="text-gray-400"
                    mode="svg"
                  />
                  <span
                    v-show="isSidebarVisible"
                    class="text-sm flex justify-between items-center"
                  >{{ item.name }}
                  </span>
                </div>
                <slot
                  v-if="item.badgeMenu && isSidebarVisible"
                  :name="`chip_${item.slug}`"
                  :row="item"
                  :index="index"
                  :class="chip"
                >
                  <div class="chip px-2 py-1 h-8 text-align-center flex gap-1 items-center rounded font-semibold text-sm border-1 border-color-yellow-400">
                    AI <Icon name="mdi-creation-outline" />
                  </div>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="isDropdownVisible"
        class="absolute left-12 bottom-2 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10"
      >
        <div class="text-gray-600 text-sm">
          <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <div class="flex items-center space-x-2">
              <img
                src="public/img/avatar.png"
                alt="Avatar"
                class="cursor-pointer"
                @click="toggleDropdown"
              >
              <span>Alikha Kalistha <span class="text-xs text-gray-300">akhila@gmai.id</span></span>
            </div>
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <div class="flex items-center space-x-2">
              <Icon
                name="mdi-home"
                class="text-gray-400 bottom-0"
                width="18"
                height="18"
                mode="svg"
              />
              <span>Frontpage <span class="text-xs text-gray-300">mydigilearn.id</span></span>
            </div>
          </div>
          <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            <div class="flex items-center space-x-2">
              <Icon
                name="mdi-logout"
                class="text-gray-400"
                width="18"
                height="18"
                mode="svg"
              />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { parentMenuItems, childMenuItems } from '~/core/config/constant';

// Sidebar visibility and menu states
const parentMenu = ref(parentMenuItems);
const isSidebarVisible = ref(true);
const isDropdownVisible = ref(false);
const selectedChildMenuItems = ref(childMenuItems.find(menu => menu.parentMenu === 'dashboard'));
const router = useRouter();
const props = defineProps({
  handleCollapseSidebar: {
    type: Function,
    required: true,
  },
});

// Toggle dropdown visibility
const toggleDropdown = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
};

// Handle click event to toggle active state or do something when clicked
const handleClickParentMenu = (item) => {
  parentMenu.value.map(parent => parent.active = false);
  const selectedParentMenu = parentMenu.value.find(parent => parent.name === item.name);
  selectedParentMenu.active = true;
  selectedChildMenuItems.value = childMenuItems.find(menu => menu.parentMenu === item.name);
};

// Toggle the sidebar visibility
const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
  props.handleCollapseSidebar(!isSidebarVisible.value);
};

const handleRoute = (item) => {
  router.push(item.url);
};
</script>

<style scoped>
.sidebar {
  @apply h-screen fixed left-0 top-0 flex flex-col border-r-2 border-gray-100 transition-all ease-in-out;
  background: bg-primary;
  transition: width 0.2s ease-in-out;
}

.sidebar--expanded {
  @apply w-[320px];
}

.sidebar--collapsed {
  @apply w-[130px];
}

.sidebar--parent {
  @apply border-r-2 border-gray-100 px-2 py-4 h-full flex flex-col justify-between w-14;
}

.sidebar--parent-items {
  @apply flex justify-center rounded cursor-pointer;
}

.chip {
  @apply text-orange-400 bg-yellow-50 p-2 border border-orange-400;
}
</style>
