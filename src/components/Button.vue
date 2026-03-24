<!--  
	iconButton 분리
-->
<template>
  <button
    v-bind="attrs"
    :disabled="disabled"
    class="btn"
    :class="buttonClass"
    @click.stop="handleClick"
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
</script>
