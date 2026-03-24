<template>
  <Button
    type="button"
    :disabled="disabled"
    variant="ghost"
    class="option-item"
    :class="{ 'is-selected': isSelected, 'is-focus': isFocused }"
    role="option"
    :aria-selected="isSelected"
    @click="handleClick"
  >
    <slot></slot>
  </Button>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    value: string | number
    label: string
    index: number
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const context = inject<{
  selectValue: { value: string | number; label: string } | null
  selectOption: (value: string | number, label: string) => void
  activeIndex: number
}>('selectContext')

const isSelected = computed(() => context?.selectValue?.value === props.value)
const isFocused = computed(() => context?.activeIndex === props.index)

const handleClick = () => {
  if (props.disabled) return
  context?.selectOption(props.value, props.label)
}
</script>
