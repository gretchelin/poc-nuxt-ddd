<template>
  <button
    :class="[
      'button',
      `button--${color}`,
      `button--${variant}`,
      `button--${size}`,
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading slot content (if loading is true) -->
    <slot
      v-if="loading"
      name="loading"
    />

    <!-- Prepend content, usually for icons or other elements -->
    <slot
      name="prepend"
      :icon-class="iconClass"
    />

    <!-- Default slot for the label/text -->
    <slot />

    <!-- Append content, usually for icons or other elements -->
    <slot
      name="append"
      :icon-class="iconClass"
    />
  </button>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

type ButtonSizes = 'large' | 'medium' | 'small';
type ButtonColors = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
type ButtonVariants = 'solid' | 'outlined' | 'soft' | 'transparent';

interface ButtonProps {
  size?: ButtonSizes;
  color?: ButtonColors;
  variant?: ButtonVariants;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  iconClass?: boolean;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'medium',
  variant: 'solid',
  color: 'primary',
  disabled: false,
  fullWidth: false,
  loading: false,
  iconClass: undefined,
});

const isDisabled = computed(() => props.disabled || props.loading);

// Icon class for prepend and append slots
const iconClass = computed(() => {
  return props.iconClass;
});

// Handling button click
const handleClick = () => {
  if (!isDisabled.value && !props.loading) {
    // Emit click event to parent
  }
};
</script>

<style scoped>
@import './style.css';

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
