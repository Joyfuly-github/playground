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
      aria-haspopup="listbox"
      @click.stop="handleToggle"
      @keydown="handleKeyDown"
    >
      <input
        type="text"
        :placeholder="placeholder"
        :id="id"
        :name="name"
        readonly
        class="input-text"
        :value="modelValue?.label"
      />

      <div class="suffix">
        <Icon type="ChevronDown" :class="{ 'is-open': isOpen }" />
      </div>
    </div>

    <Transition>
      <div v-if="isOpen" ref="refOptions" class="options" role="listbox" tabindex="-1">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: {
      value: string | number
      label: string
    } | null
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

const emit = defineEmits(['update:modelValue'])

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

const activeIndex = ref(-1)
const options = ref<Array<{ value: string | number; label: string; index: number }>>([])
const registerOption = (option: any) => {
  options.value.push(option)
}
// const optionsCount = ref(0)
// const totalOptions = 3

const handleToggle = () => {
  isOpen.value = !isOpen.value
}

const handleOpen = () => {
  isOpen.value = true
}

const handleClose = () => {
  isOpen.value = false
  activeIndex.value = -1
}

const selectOption = (e) => {
  console.log('selectOption', e)
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isOpen.value) {
    if (e.key === 'ArrowDown' || e.key === 'Enter') {
      handleOpen()
      return
    }
  }

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % totalOptions
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = (activeIndex.value - 1 + totalOptions) % totalOptions
      break
    case 'Enter':
      e.preventDefault()
      selectOption(e)
      break
    case 'Escape':
      handleClose()
      break
  }
}

const selectContext = reactive({
  selectValue: toRef(props, 'modelValue'),
  selectOption: (value: string | number, label: string) => {
    emit('update:modelValue', { value, label })
    isOpen.value = false
    activeIndex.value = -1
  },
  activeIndex,
  registerOption,
})

provide('selectContext', selectContext)
</script>
