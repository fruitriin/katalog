<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="loading-spinner"></span>
    <slot v-if="!loading" />
    <span v-if="loading">Loading...</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ButtonProps {
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'danger' | 'outline'
  /** Button size */
  size?: 'small' | 'medium' | 'large'
  /** Disabled state */
  disabled?: boolean
  /** Loading state */
  loading?: boolean
  /** Button type */
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => [
  'btn',
  `btn--${props.variant}`,
  `btn--${props.size}`,
  {
    'btn--disabled': props.disabled,
    'btn--loading': props.loading
  }
])

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

/* Sizes */
.btn--small {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn--medium {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn--large {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}

/* Variants */
.btn--primary {
  background-color: #3b82f6;
  color: white;
}

.btn--primary:hover:not(.btn--disabled):not(.btn--loading) {
  background-color: #2563eb;
}

.btn--secondary {
  background-color: #6b7280;
  color: white;
}

.btn--secondary:hover:not(.btn--disabled):not(.btn--loading) {
  background-color: #4b5563;
}

.btn--danger {
  background-color: #ef4444;
  color: white;
}

.btn--danger:hover:not(.btn--disabled):not(.btn--loading) {
  background-color: #dc2626;
}

.btn--outline {
  background-color: transparent;
  color: #3b82f6;
  border: 2px solid #3b82f6;
}

.btn--outline:hover:not(.btn--disabled):not(.btn--loading) {
  background-color: #3b82f6;
  color: white;
}

/* States */
.btn--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--loading {
  cursor: not-allowed;
}

.loading-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>