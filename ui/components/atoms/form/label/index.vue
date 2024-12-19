<template>
  <label
    :for="for"
    class="block text-sm font-medium text-gray-700"
  >
    {{ text }}
  </label>
</template>

<script lang="ts" setup>
interface IProps {
  for: string;
  text: string;
}

const props = withDefaults(defineProps<IProps>(), {
  for: '',
  text: '',
});
</script>
