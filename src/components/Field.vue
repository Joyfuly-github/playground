<template>
  <div class="field">
    <label v-if="label" class="label">
      {{ label }}
      <span v-if="required" class="color-danger-900" aria-label="required">*</span>
    </label>

    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    required?: boolean
    label?: string
  }>(),
  {
    required: false,
  },
)
</script>
