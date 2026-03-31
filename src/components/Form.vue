<template>
  <form class="form-layout" @submit.prevent="$emit('submit')">
    <slot />

    <div class="button-group">
      <slot name="buttons" />
    </div>
  </form>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'submit'): void
}>()
</script>

<style lang="scss" scoped>
.form-layout {
  .button-group {
    margin-top: var(--spacing-24);
    display: flex;
    gap: var(--spacing-8);
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
