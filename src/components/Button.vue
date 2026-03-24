<!--  
	iconButton 분리
-->
<template>
  <button
    v-bind="attrs"
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
    disabled?: boolean
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'link'
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
  `size size-${props.size}`,
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
