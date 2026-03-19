<template>
  <!-- label -->
  <label v-if="label" :for="id" class="label">
    {{ label }}
    <span v-if="required" class="color-danger-900">*</span>
  </label>

  <div class="flex-center gap-8">
    <!-- input group -->
    <div
      class="input-group"
      :class="[
        inputClass,
        {
          error: error,
        },
      ]"
      :style="{
        height: sizeDefault[size].height,
        fontSize: sizeDefault[size].fontSize,
      }"
    >
      <!-- prefix -->
      <slot name="prefix" />

      <!-- input -->
      <input
        ref="inputRef"
        v-model="value"
        :type="inputType"
        :id="id"
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        class="input-text"
        :aria-invalid="error ? 'true' : 'false'"
        :aria-describedby="message ? `${id}-desc` : undefined"
        @keydown.enter="onEnter"
      />

      <!-- clear -->
      <button
        v-if="clearable && hasValue && !disabled && !readonly"
        type="button"
        class="input-clear"
        @mousedown.prevent
        @click="onClear"
      >
        ✕
      </button>

      <!-- password toggle -->
      <button
        v-if="type === 'password'"
        type="button"
        class="input-toggle"
        @mousedown.prevent
        @click="togglePassword"
      >
        {{ isPasswordVisible ? '🙈' : '👁' }}
      </button>

      <!-- suffix -->
      <slot name="suffix" />
    </div>

    <!-- search button -->
    <BaseButton v-if="search" :size="size" variant="secondary" @click="onSearch">
      Search
    </BaseButton>

    <!-- 확장 버튼 슬롯 -->
    <slot name="buttons" />
  </div>

  <!-- message -->
  <p v-if="message" :id="`${id}-desc`" class="input-message" :class="{ error: error }">
    {{ message }}
  </p>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { sizeDefault } from '@/assets/tokens/size'
import BaseButton from '@/components/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    id: string
    name?: string
    type?: 'text' | 'password'
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    search?: boolean
    clearable?: boolean
    error?: boolean
    message?: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  {
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    search: false,
    clearable: false,
    error: false,
    size: 'md',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'search', value: string): void
  (e: 'clear'): void
}>()

/* ---------------- 상태 ---------------- */

const inputRef = ref<HTMLInputElement | null>(null)
const isPasswordVisible = ref(false)

const inputType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const hasValue = computed(() => !!props.modelValue)

/* ---------------- slots ---------------- */

const slots = useSlots()

const hasPrefix = computed(() => !!slots.prefix)
const hasSuffix = computed(() => !!slots.suffix)

/* ---------------- class ---------------- */

const inputClass = computed(() => [
  `input-${props.size}`,
  {
    disabled: props.disabled,
    readonly: props.readonly,
    'has-prefix': hasPrefix.value,
    'has-suffix': hasSuffix.value,
  },
])

/* ---------------- v-model ---------------- */

const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
})

/* ---------------- actions ---------------- */

const onClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}

const togglePassword = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}

const onSearch = () => {
  emit('search', props.modelValue)
}

/* 🔥 핵심: Enter 동작 */
const onEnter = () => {
  if (props.search) {
    onSearch()
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.input-text {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
}

.input-clear,
.input-toggle {
  background: none;
  border: none;
  cursor: pointer;
}

.input-group.error {
  border: 1px solid red;
}

.input-message {
  font-size: 12px;
  margin-top: 4px;

  &.error {
    color: red;
  }
}
</style>
