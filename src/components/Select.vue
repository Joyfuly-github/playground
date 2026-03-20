<template>
  <label v-if="label" :for="id" class="label">
    {{ label }}
    <span v-if="required" class="color-danger-900">*</span>
  </label>

  <div class="select-group">
    <div
      ref="refSelect"
      class="select has-suffix"
      :class="selectClass"
      :aria-expanded="isOpen"
      area-haspopup="selectOptions"
      @click="handleToggle"
    >
      <input
        v-model="selectedOption"
        type="text"
        :placeholder="placeholder"
        :id="id"
        :name="name"
        readonly
        class="input-text"
      />

      <div class="suffix">
        <Icon type="ChevronDown" :class="{ 'is-open': isOpen }" />
      </div>
    </div>

    <Transition>
      <div v-if="isOpen" ref="refOptions" class="options" role="selectOptions">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: object
    id?: string
    name?: string
    placeholder?: string
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    size?: 'xs' | 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  {
    disabled: false,
    readonly: false,
    required: false,
    size: 'md',
  },
)

interface selectedOption {
  value: string
  label: string
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: selectedOption): void
}>()

const selectedOption = computed({
  get: () => props.modelValue,
  set: (val: selectedOption) => emit('update:modelValue', val),
})

const selectClass = computed(() => [
  `size size-${props.size}`,
  {
    disabled: props.disabled,
    readonly: props.readonly,
  },
])

const isOpen = ref(false)
const refSelect = ref<HTMLElement | null>(null)
const refOptions = ref<HTMLElement | null>(null)

const handleToggle = () => {
  isOpen.value = !isOpen.value
  console.log(isOpen.value)
}
</script>

<style lang="scss" scoped></style>
