<!-- 
	maxlength
	error message
	search enter event 
	input type="number"
-->
<template>
  <label v-if="label" :for="id" class="label">
    {{ label }}
    <span v-if="required" class="color-danger-900">*</span>
  </label>

  <div class="flex-center gap-8">
    <div
      class="input-group"
      :class="inputClass"
      :style="{
        height: sizeDefault[props.size].height,
        fontSize: sizeDefault[props.size].fontSize,
      }"
    >
      <Button v-if="search" icon="Search" variant="text" iconOnly @click="onSearch" />

      <slot name="prefix"></slot>

      <input
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :id="id"
        :name="name"
        :disabled="disabled"
        :readonly="readonly"
        class="input-text"
      />

      <Button
        v-if="hasValue && !disabled && !readonly"
        icon="X"
        variant="text"
        iconOnly
        @mousedown.prevent
        @click="onClear"
      />

      <slot name="suffix"></slot>
    </div>

    <Button v-if="search" :size="size" variant="secondary" @click="onSearch">Search</Button>
    <slot name="buttons"></slot>
  </div>
</template>

<script setup lang="ts">
import { sizeDefault } from '@/assets/tokens/size'

const props = withDefaults(
  defineProps<{
    modelValue: string
    id?: string
    name?: string
    type?: 'text' | 'password'
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    search?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  {
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    search: false,
    size: 'md',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', event: MouseEvent): void
  (e: 'clear'): void
}>()

const slots = useSlots()
const hasPrefix = computed(() => !!slots.prefix)
const hasSuffix = computed(() => !!slots.suffix)
const inputClass = computed(() => [
  `input-${props.size}`,
  {
    disabled: props.disabled,
    readonly: props.readonly,
    'has-prefix': hasPrefix.value,
    'has-suffix': hasSuffix.value,
  },
])

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

const hasValue = computed(() => !!inputValue.value)

const onSearch = (event: MouseEvent) => {
  ;(document.activeElement as HTMLElement)?.blur()
  emit('search', event)
}

const onClear = () => {
  console.log('onClear', hasValue.value)
  inputValue.value = ''
  emit('clear')
}
</script>
