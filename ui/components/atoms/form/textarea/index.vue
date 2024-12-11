<template>
  <div class="space-y-2">
    <Label
      :for="id"
      :text="label"
    />
    <textarea
      :id="id"
      :value="modelValue"
      rows="4"
      :placeholder="placeholder"
      class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
      @input="updateValue"
    />
    <div class="text-right text-sm text-gray-500">
      {{ modelValue.length }} / 255
    </div>
  </div>
</template>

<script lang="ts" setup>
import Label from '#ui/components/atoms/form/label';

interface IProps {
  id: string;
  modelValue: string;
  label: string;
  placeholder: string;
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: '',
  placeholder: '',
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
