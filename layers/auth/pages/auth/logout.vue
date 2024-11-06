<template>
  <div>
    <h1>
      Logging you out....
    </h1>
  </div>
</template>

<script setup lang="ts">
const { signOut } = useAppAuth();

onMounted(async () => {
  await signOut();

  navigateTo('/auth/login', {
    replace: true,
  });
});
</script>
