<template>
  <label class="input-checkbox" :class="checkboxClass">
    <input type="checkbox" />

    <span v-if="label" class="label">{{ label }}</span>
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    id?: string
    name?: string
    disabled?: boolean
    readonly?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  {
    disabled: false,
    readonly: false,
    size: 'md',
  },
)

const checkboxClass = computed(() => [
  `text-${props.size}`,
  {
    disabled: props.disabled,
    readonly: props.readonly,
  },
])
</script>

<style lang="scss" scoped></style>
