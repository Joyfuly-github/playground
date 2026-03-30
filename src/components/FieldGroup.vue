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

  > * {
    flex: 1;
  }
}
</style>
