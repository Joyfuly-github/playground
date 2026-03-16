<template>
  <h3>Typography</h3>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.list-preview {
  display: flex;
  position: relative;
  align-items: center;
  gap: var(--spacing-16);

  > li {
    width: 16rem;
    height: 16rem;
    display: flex;
    border: 1px solid var(--color-secondary-500);
    border-radius: var(--radius-base);
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: var(--spacing-8);
    color: rgba(255, 255, 255, 0.7);
  }
}
</style>
