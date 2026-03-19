<template>
  <button
    v-bind="attrs"
    :disabled="disabled"
    class="btn"
    :class="buttonClass"
    :style="{
      ...(props.variant !== 'text' && {
        height: sizeDefault[props.size].height,
      }),
      fontSize: sizeDefault[props.size].fontSize,
    }"
    @click="handleClick"
  >
    <Icon v-if="icon" :type="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { sizeDefault } from '@/assets/tokens/size'
import Icon from '@/components/Icon.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'danger' | 'text'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    iconOnly?: boolean
    icon?: keyof typeof icons
  }>(),
  {
    disabled: false,
    size: 'md',
    fullWidth: false,
    iconOnly: false,
  },
)

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const attrs = useAttrs()

const buttonClass = computed(() => [
  `btn-${props.size}`,
  props.variant && `btn-${props.variant}`,
  {
    'w-full': props.fullWidth,
    disabled: props.disabled,
    'btn-icon': props.iconOnly,
  },
])

const handleClick = (event: MouseEvent) => {
  ;(document.activeElement as HTMLElement)?.blur()
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.btn {
  display: inline-flex;
  padding: 0 var(--spacing-16);
  background-color: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: var(--radius-small);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  justify-content: center;
  align-items: center;

  &:not(.disabled):hover {
    text-decoration: underline;
  }

  &.btn-xs,
  &.btn-sm {
    padding: 0 var(--spacing-8);
  }

  &.btn-icon {
    padding: 0 var(--spacing-8);
  }

  &.btn-primary {
    background-color: var(--color-primary-100);
    border-color: var(--color-primary-900);
    color: var(--color-primary-900);
  }

  &.btn-secondary {
    background-color: var(--color-secondary-100);
    border-color: var(--color-secondary-900);
    color: var(--color-secondary-900);
  }

  &.btn-danger {
    background-color: var(--color-danger-100);
    border-color: var(--color-danger-900);
    color: var(--color-danger-900);
  }

  &.btn-text {
    height: auto;
    padding: 0;
    border: none;
  }

  &.disabled {
    background-color: var(--color-bg);
    border-color: var(--color-gray);
    color: var(--color-disabled);
    cursor: default;
  }

  &:has(.icon):not(.btn-icon) {
    gap: var(--spacing-8);

    &.btn-xs,
    &.btn-sm,
    &.btn-text {
      gap: var(--spacing-4);
    }
  }
}
</style>
