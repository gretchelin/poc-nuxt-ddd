<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <template v-if="loading">
      <span class="loader" /> <!-- Optional loading spinner -->
    </template>
    <template v-else>
      <span
        v-if="icon"
        class="mr-2"
      >
        <slot name="icon" /> <!-- Optional icon -->
      </span>
      <slot />
    </template>
  </button>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

type ButtonSizes = 'large' | 'medium' | 'small';
type ButtonColors = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
type ButtonVariants = 'solid' | 'outlined' | 'soft' | 'transparent';

export interface ButtonProps {
  size?: ButtonSizes;
  color?: ButtonColors;
  variant?: ButtonVariants;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  variant: 'solid',
  color: 'primary',
  disabled: false,
  fullWidth: false,
  loading: false,
  icon: undefined,
});

const isDisabled = computed(() => props.disabled || props.loading);

// Dynamic classes based on props
const buttonClasses = computed(() => {
  const baseStyles = 'font-medium rounded transition-colors duration-300 focus:outline-none';
  const colorStyles = {
    primary: 'bg-brand-solid text-white disabled:bg-red-300',
    secondary: 'bg-secondary text-black disabled:bg-gray-300',
    success: 'bg-success-solid text-white',
    info: 'bg-info-solid text-white',
    warning: 'bg-warning-solid text-white',
    error: 'bg-error-solid text-white',
  };
  const sizeStyles = {
    small: 'px-3 py-1 text-sm rounded',
    medium: 'px-4 py-2 text-base rounded-md',
    large: 'px-6 py-3 text-lg rounded-lg',
  };
  const variantStyles = {
    solid: 'shadow-100',
    outlined: 'border',
  };

  return `${baseStyles} ${colorStyles[props.color]} ${sizeStyles[props.size]} ${variantStyles[props.variant]} ${
    props.disabled || props.loading ? 'opacity-50 cursor-not-allowed' : ''
  }`;
});

// Handling button click
const handleClick = () => {
  if (!isDisabled.value && !props.loading) {
    // Emit click event to parent
    console.log('Button clicked');
  }
};
</script>

<style scoped>
.loader {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
