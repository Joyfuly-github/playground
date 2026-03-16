<template>
  <span
    class="icon"
    :style="{
      width: sizeScale[props.size],
      height: sizeScale[props.size],
    }"
  >
    <component :is="icon" :size="sizeScale[props.size]" />
  </span>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed, type Component } from 'vue'
import { sizeScale } from '@/assets/tokens/size'

const props = withDefaults(
  defineProps<{
    name: keyof typeof icons
    size?: 'xs' | 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'md',
  },
)

const icon = computed<Component>(() => icons[props.name] as Component)
</script>

<style lang="scss" scoped>
.icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}
</style>
