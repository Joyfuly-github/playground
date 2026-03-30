<template>
  <fieldset class="fieldset">
    <div class="mb-16">
      <legend class="font-h5 mb-0">{{ props.legend }}</legend>
      <p class="color-secondary-900">{{ props.description }}</p>
    </div>

    <slot />
  </fieldset>
</template>

<script setup lang="ts">
const props = defineProps<{
  legend?: string
  description?: string
}>()
</script>

<style lang="scss" scoped>
.fieldset {
  &:not(:first-child) {
    margin-top: var(--spacing-32);
    padding-top: var(--spacing-32);
    border-top: 1px solid var(--color-secondary-500);
  }

  > *:not(:first-child) {
    margin-top: var(--spacing-16);
  }
}
</style>
