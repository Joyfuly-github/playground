<template>
  <label v-if="label" :for="id" class="label">
    {{ label }}
    <span v-if="required" class="color-danger-900" aria-label="required">*</span>
  </label>

  <div class="select-group">
    <div
      class="select"
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
      <div v-show="isOpen" class="options" role="listbox" tabindex="-1">
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

const focusedIndex = ref(-1)
const options = ref<Array<{ value: string | number; label: string; disabled: boolean }>>([])
const registerOption = (option: { value: string | number; label: string; disabled: boolean }) => {
  options.value.push(option)
}

const unregisterOption = (option: { value: string | number; label: string; disabled: boolean }) => {
  options.value = options.value.filter((o) => o.value !== option.value)
}

const handleToggle = () => {
  if (props.disabled || props.readonly) return
  isOpen.value = !isOpen.value
}

const handleOpen = () => {
  isOpen.value = true
}

const handleClose = () => {
  isOpen.value = false
  focusedIndex.value = -1
}

const move = (dir: number) => {
  const len = options.value.length
  let next = focusedIndex.value
  let count = 0

  do {
    next = (next + dir + len) % len
    count++
  } while (options.value[next]?.disabled && count < len)

  if (!options.value[next]?.disabled) {
    focusedIndex.value = next
  }
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
      move(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      move(-1)
      break
    case 'Enter':
      e.preventDefault()
      const currentOption = options.value[focusedIndex.value]
      if (currentOption) selectContext.selectOption(currentOption.value, currentOption.label)
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
    focusedIndex.value = -1
  },
  size: toRef(props, 'size'),
  focusedIndex,
  registerOption,
  unregisterOption,
})

provide('selectContext', selectContext)
</script>

<style lang="scss" scoped>
.select-group {
  position: relative;

  .select {
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--spacing-4);

    &:not(.disabled, .readonly) {
      cursor: pointer;

      .input-text {
        cursor: pointer;
      }
    }

    .input-text {
      flex: 1;
    }

    input:focus-within,
    input:hover {
      outline: none;
    }
  }

  .options {
    padding: var(--spacing-4) 0;
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid var(--color-gray);
    border-radius: var(--radius-small);
    overflow: hidden;
    transform: translate(0, calc(100% + 0.4rem));
    flex-direction: column;

    :deep(.option-item) {
      padding: 0 var(--spacing-16);
      border: none;
      border-radius: 0;
      font-weight: var(--font-weight-normal);
      justify-content: space-between;

      &:focus-within,
      &:hover {
        box-shadow: none;
        outline: none;
      }

      &.is-selected {
        color: var(--color-primary-900);
      }

      &.is-focus,
      &:hover {
        background-color: var(--color-secondary-100);
      }
    }
  }
}
</style>
