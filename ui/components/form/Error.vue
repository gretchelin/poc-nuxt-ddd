<template>
  <div class="form-input--error">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.form-input--error {
  @apply text-xs text-red-600;
}
</style>
