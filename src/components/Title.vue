<template>
  <div class="mb- 16">
    <component :is="variant" class="mb-0" :class="`font-${variant}`">
      {{ title }}
    </component>

    <p class="color-secondary-900">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
    description: string
  }>(),
  {
    variant: 'h5',
  },
)
</script>
