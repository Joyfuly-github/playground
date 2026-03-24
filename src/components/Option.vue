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
    <Icon v-if="isSelected" type="Check" class="icon-check"></Icon>
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
  focusedIndex: number
  registerOption: (option: { value: string | number; label: string; disabled: boolean }) => void
  unregisterOption: (option: { value: string | number; label: string; disabled: boolean }) => void
}>('selectContext')

const isSelected = computed(() => context?.selectValue?.value === props.value)
const isFocused = computed(() => context?.focusedIndex === props.index)

const handleClick = () => {
  if (props.disabled) return
  context?.selectOption(props.value, props.label)
}

const option = {
  value: props.value,
  label: props.label,
  disabled: props.disabled,
}

onMounted(() => {
  context?.registerOption(option)
})

onUnmounted(() => {
  console.log('onUnmounted')
  context?.unregisterOption(option)
})
</script>
