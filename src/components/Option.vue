<template>
  <Button
    type="button"
    :disabled="disabled"
    variant="ghost"
    :size="context?.size"
    class="option-item"
    :class="{ 'is-selected': isSelected, 'is-focus': isFocused }"
    role="option"
    :aria-selected="isSelected"
    @click="handleClick"
  >
    <slot></slot>
    <Icon v-if="isSelected" type="Check" class="icon-check"></Icon>
  </Button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: string | number
    label: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

interface Option {
  value: string | number
  label: string
  disabled: boolean
}

const context = inject<{
  selectValue: string | number
  selectOption: (value: string | number) => void
  size: 'xs' | 'sm' | 'md' | 'lg'
  focusedIndex: number
  registerOption: (option: Option) => void
  unregisterOption: (option: Option) => void
  options: Option[]
}>('selectContext')

const index = computed(() => {
  return context?.options.findIndex((o) => o.value === props.value) ?? -1
})

const isSelected = computed(() => context?.selectValue === props.value)
const isFocused = computed(() => context?.focusedIndex === index.value)

const handleClick = () => {
  if (props.disabled) return
  context?.selectOption(props.value)
}

const option = reactive({
  value: props.value,
  disabled: props.disabled,
  label: props.label ?? String(props.value),
})

onMounted(() => {
  context?.registerOption(option)
})

onUnmounted(() => {
  context?.unregisterOption(option)
})
</script>
