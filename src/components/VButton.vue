<template>
  <button
    v-bind="attrs"
    :disabled="disabled"
    :class="buttonClass"
    :style="{
      ...(props.variant !== 'text' && {
        height: sizeDefault[props.size].height,
      }),
      fontSize: sizeDefault[props.size].fontSize,
    }"
    @click="handleClick"
  >
    <VIcon v-if="icon" :name="icon" :size="sizeDefault[props.size].iconSize" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { sizeDefault } from '@/assets/tokens/size'
import VIcon from '@/components/VIcon.vue'

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
  'btn',
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

  &.btn-xs {
    padding: 0 var(--spacing-8);
  }

  &.btn-lg {
    padding: 0 var(--spacing-24);
  }

  &.btn-icon {
    padding: 0 var(--spacing-8);
  }

  &.btn-primary {
    background-color: var(--color-primary-100);
    border-color: var(--color-primary-900);
    color: var(--color-primary-900);

    // background-color: var(--color-primary-900);
    // border-color: var(--color-primary-900);
    // color: var(--color-white);
  }

  &.btn-secondary {
    background-color: var(--color-secondary-100);
    border-color: var(--color-secondary-900);
    color: var(--color-secondary-900);

    // background-color: var(--color-secondary-900);
    // border-color: var(--color-secondary-900);
    // color: var(--color-white);
  }

  &.btn-danger {
    background-color: var(--color-danger-100);
    border-color: var(--color-danger-900);
    color: var(--color-danger-900);

    // background-color: var(--color-danger-900);
    // border-color: var(--color-danger-900);
    // color: var(--color-white);
  }

  &.btn-text {
    height: auto;
    padding: 0;
    border: none;
  }

  &.full {
    width: 100%;
    display: flex;
  }

  &.disabled {
    background-color: var(--color-secondary-100);
    border-color: var(--color-gray);
    color: var(--color-gray);
    cursor: default;
  }

  &:has(.icon):not(.btn-icon) {
    &:not(.btn-text) {
      :deep(.icon) {
        transform: translateX(-50%);
      }
    }

    &.btn-text {
      gap: var(--spacing-4);
    }
  }
}
</style>
