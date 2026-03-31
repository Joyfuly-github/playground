<template>
  <div class="field-group" :class="{ 'is-vertical': vertical }">
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    vertical?: boolean
  }>(),
  {
    vertical: false,
  },
)
</script>

<style lang="scss" scoped>
.field-group {
  display: flex;
  gap: var(--spacing-8);

  &.is-vertical {
    flex-direction: column;
  }

  &:has(.input-checkbox),
  &:has(.input-radio) {
    column-gap: var(--spacing-16);
  }

  > * {
    flex: auto;
  }

  :deep(.input-checkbox),
  :deep(.input-radio) {
    flex: none;
  }
}
</style>
