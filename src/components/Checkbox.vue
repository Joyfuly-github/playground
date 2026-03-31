`
<!-- 
check 된 값
boolean에서 value로 바꿔야할듯
-->
<template>
  <label class="input-checkbox" :class="checkboxClass">
    <input
      type="checkbox"
      v-model="checkValue"
      :id="id"
      :name="name"
      :disabled="disabled"
      @click.stop="readonly && $event.preventDefault()"
    />
    <span class="checkbox">
      <Icon type="Check" />
    </span>

    <div class="inner-check">
      <span v-if="label">{{ label }}</span>
      <slot></slot>
    </div>
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

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checkValue = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    if (props.readonly) {
      console.log(props.readonly)
      return false
    }
    console.log('오지뫗')
    emit('update:modelValue', val)
  },
})

const checkboxClass = computed(() => [
  `text-${props.size}`,
  {
    disabled: props.disabled,
    readonly: props.readonly,
  },
])
</script>

<style lang="scss" scoped>
.input-checkbox {
  max-width: 100%;
  line-height: var(--lh-tight);
  display: inline-flex;
  cursor: pointer;
  word-break: keep-all;
  overflow-wrap: break-word;
  align-items: flex-start;
  gap: 0.5em;

  input[type='checkbox'] {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
    appearance: none;
    -webkit-appearance: none;
    pointer-events: none;
  }

  .checkbox {
    width: 1.2em;
    height: 1.2em;
    display: flex;
    position: relative;
    top: 0.1em;
    border: 1px solid var(--color-gray);
    border-radius: var(--radius-small);
    justify-content: center;
    align-items: center;
    color: var(--color-white);
    transition: all ease-in-out 0.4s;

    :deep(.icon) {
      width: 1em;
      height: 1em;
      transform: scale(0);
      transition: all cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.2s 0.2s;
    }
  }

  .inner-check {
    flex: 1;
  }

  input[type='checkbox']:checked ~ .checkbox {
    :deep(.icon) {
      transform: scale(1);
    }
  }

  &:not(.disabled, .readonly) {
    &:focus-within,
    &:hover {
      .checkbox {
        box-shadow:
          var(--color-white) 0px 0px 0px 1px,
          var(--color-black) 0px 0px 0px 2px;
      }
    }

    input[type='checkbox']:checked ~ .checkbox {
      background-color: var(--color-secondary-900);
      border-color: var(--color-secondary-900);
    }
  }

  &.disabled,
  &.readonly {
    cursor: default;

    .checkbox {
      background-color: var(--color-disabled-bg);
      border-color: var(--color-disabled-bg);
    }
  }

  &.disabled .checkbox {
    color: var(--color-disabled-font);
  }

  &.readonly .checkbox {
    color: var(--color-black);
  }
}
</style>
`
