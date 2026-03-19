<template>
  <span class="icon">
    <component :is="icon" class="svg" :strokeWidth="1.75" />
  </span>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed, type Component } from 'vue'
// import { sizeBaseIcon } from '@/assets/tokens/size'

const props = defineProps<{
  type: keyof typeof icons
}>()

const icon = computed<Component>(() => icons[props.type] as Component)
</script>

<style lang="scss" scoped>
.icon {
  width: 1em;
  height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;

  .svg {
    width: 100%;
    height: 100%;
  }
}
</style>
