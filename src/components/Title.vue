<template>
  <div
    v-if="title || description"
    class="title-group"
    :class="{
      [`font-${variant}`]: variant,
    }"
  >
    <component v-if="title" :is="variant" class="title">
      {{ title }}
    </component>

    <p v-if="description" class="description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
    description?: string
  }>(),
  {
    variant: 'h5',
  },
)
</script>

<style lang="scss" scoped>
.title-group {
  margin-bottom: var(--spacing-16);

  .title {
    line-height: var(--lh-tight);
    margin-bottom: 0;
  }

  .description {
    line-height: var(--lh-tight);
    margin-top: 0.4rem;
    font-size: 0.6em;
    font-weight: var(--font-weight-light);
    color: var(--color-disabled-font);
  }
}
</style>
