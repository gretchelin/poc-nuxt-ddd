<template>
  <div
    class="input-field"
    :data-error="error || undefined"
  >
    <label
      v-if="label"
      :for="id || internalId"
      class="input-field--label"
      :data-required="required || undefined"
    >{{ label }}</label>

    <div class="input-wrapper">
      <slot name="input-prepend" />
      <input
        :id="id || internalId"
        v-bind="bindInputProps"
        v-model="model"
        class="border w-full"
        @input="emits('input')"
        @blur="emits('blur')"
        @change="emits('change')"
      >
      <slot name="input-append" />
    </div>

    <slot name="append" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  type?: string;
  inputProps?: Record<string, string>;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  maskOptions?: Record<string, string>;
  id?: string;
}

// Emits
const emits = defineEmits<{
  (e: 'change' | 'blur' | 'input'): void;
}>();

// Props
const model = defineModel();

const props = withDefaults(defineProps<Props>(), {
  label: '',
  type: 'text',
  required: false,
});

// Data
const internalId = useId();

// Computed
const bindInputProps = computed(() => {
  // exclude value from available prop to bind
  const { value, ...inputAttr } = props?.inputProps || {};

  return {
    ...inputAttr,
    type: props.type,
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly,
  };
});
</script>

<style lang="postcss" scoped>
.input-field {
  @apply space-y-2;
}

.input-field--label {
  @apply block font-semibold;
}

.input-field:has(input[required]) .input-field--label:after,
.input-field--label[data-required]:after {
  @apply text-red-600;

  content: '*';
}

.input-field .input-wrapper {
  @apply border rounded overflow-hidden flex;
}

.input-field[data-error] .input-wrapper {
  @apply border-red-600;
}

.input-field input {
  @apply px-3 py-1.5 border-none;
}
</style>
