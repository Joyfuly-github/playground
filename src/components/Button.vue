<template>
  <button
    v-bind="attrs"
    :type="type"
    :disabled="disabled"
    class="btn"
    @click.stop="handleClick"
    @pointerdown="playActive"
    :class="[buttonClass, { active: isActive }]"
  >
    <Icon v-if="icon" :type="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import Icon from '@/components/Icon.vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'ghost' | 'link'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    fullWidth?: boolean
    iconOnly?: boolean
    icon?: keyof typeof icons
  }>(),
  {
    type: 'button',
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
  `size-${props.size}`,
  props.variant && `btn-${props.variant}`,
  props.iconOnly && 'btn-icon',
  {
    'w-full': props.fullWidth,
    disabled: props.disabled,
  },
])

const handleClick = (event: MouseEvent) => {
  ;(document.activeElement as HTMLElement)?.blur()
  emit('click', event)
}

const isActive = ref(false)

const playActive = () => {
  isActive.value = false
  requestAnimationFrame(() => {
    isActive.value = true
  })

  setTimeout(() => {
    isActive.value = false
  }, 500)
}
</script>

<style lang="scss" scoped>
$colorType: 'primary', 'secondary', 'success', 'info', 'warning', 'danger';

.btn {
  display: inline-flex;
  font-weight: var(--font-weight-medium);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-4);

  @each $type in $colorType {
    &.btn-#{$type} {
      background-color: var(--color-#{$type}-100);
      border-color: var(--color-#{$type}-900);
      color: var(--color-#{$type}-900);

      &:focus-within,
      &:hover {
        &:not(.disabled, .readonly) {
          border-color: var(--color-#{$type}-900);
          box-shadow:
            var(--color-white) 0px 0px 0px 1px,
            var(--color-#{$type}-900) 0px 0px 0px 2px;
        }
      }
    }
  }

  &.btn-ghost {
    border-color: transparent;

    &:focus-within,
    &:hover {
      background-color: var(--color-secondary-100);
    }
  }

  &.btn-link {
    min-width: none !important;
    height: auto;
    padding: 0;
    border: none;

    &:focus-within,
    &:hover {
      text-decoration: underline;

      &.btn-icon {
        color: var(--color-disabled-font);
      }
    }
  }

  &.btn-icon {
    padding: var(--spacing-4);
  }

  &:not(.btn-icon) .icon {
    transform: translateX(calc(var(--spacing-4) * -1));
  }

  &.active:not(.disabled, .readonly) {
    animation: buttonAni 0.3s ease-in;
  }
}

@keyframes buttonAni {
  0% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(0, 0.1rem);
  }

  100% {
    transform: translate(0, 0);
  }
}
</style>
