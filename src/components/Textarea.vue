<template>
  <label v-if="label" :for="id" class="label">
    {{ label }}
    <span v-if="required" class="color-danger-900" aria-label="required">*</span>
  </label>

  <div class="textarea">
    <textarea
      v-model="inputValue"
      :placeholder="placeholder"
      :id="id"
      :name="name"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :class="textareaClass"
      :style="{
        resize: resizeStyle,
      }"
    />
  </div>
</template>

<script setup lang="ts">
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
  `size-${props.size}`,
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

<style lang="scss" scoped>
.textarea {
  textarea {
    width: 100%;
    max-width: 100%;
    height: auto;

    &.size-xs {
      min-height: var(--spacing-24);
      padding: var(--spacing-4) var(--spacing-8);
    }

    &.size-sm {
      min-height: var(--spacing-32);
      padding: var(--spacing-8) var(--spacing-16);
    }

    &.size-md {
      min-height: var(--spacing-40);
      padding: var(--spacing-8) var(--spacing-16);
    }

    &.size-lg {
      min-height: var(--spacing-56);
      padding: var(--spacing-16) var(--spacing-24);
    }
  }
}
</style>
