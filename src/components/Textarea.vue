<template>
  <label v-if="label" :for="id" class="label">
    {{ label }}
    <span v-if="required" class="color-danger-900">*</span>
  </label>

  <div class="textarea-group">
    <textarea
      v-model="inputValue"
      :placeholder="placeholder"
      :id="id"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      class="textarea"
      :class="textareaClass"
      :style="{
        minHeight: sizeDefault[props.size].height,
        fontSize: sizeDefault[props.size].fontSize,
        resize: resizeStyle,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { sizeDefault } from '@/assets/tokens/size'

const props = withDefaults(
  defineProps<{
    modelValue: string
    id?: string
    name?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    rows?: number
    resize?: boolean | 'none' | 'both' | 'horizontal' | 'vertical'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  {
    disabled: false,
    readonly: false,
    required: false,
    rows: 3,
    resize: 'none',
    size: 'md',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const textareaClass = computed(() => [
  `input-${props.size}`,
  {
    disabled: props.disabled,
    readonly: props.readonly,
  },
])

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

const resizeStyle = computed(() => {
  if (props.resize === true) return 'both'
  if (props.resize === false || !props.resize) return 'none'
  return props.resize
})
</script>
