<template>
  <div class="space-y-2">
    <Label
      :for="id"
      :text="label"
    />
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-teal-500"
      @input="updateValue"
    >
  </div>
</template>

<script lang="ts" setup>
import Label from '#ui/components/atoms/form/label';

interface IProps {
  id: string;
  modelValue: string;
  label: string;
  type: string;
  placeholder: string;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  placeholder: '',
  type: 'text',
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
};
</script>

<style scoped>
/* Optional additional styling can go here */
</style>
