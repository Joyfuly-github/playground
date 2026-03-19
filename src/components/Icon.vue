<template>
  <span class="icon">
    <component :is="icon" class="svg" :strokeWidth="1.75" />
  </span>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed, type Component } from 'vue'
// import { sizeIcon } from '@/assets/tokens/size'

const props = defineProps<{
  type: keyof typeof icons
}>()

const icon = computed<Component>(() => icons[props.type] as Component)
</script>

<style lang="scss" scoped>
.icon {
  padding: var(--spacing-4);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  .svg {
    width: 1.2em;
    height: 1.2em;
  }
}
</style>
