<template>
  <span
    class="icon"
    :style="{
      width: sizeIcon[props.size],
      height: sizeIcon[props.size],
    }"
  >
    <component :is="icon" :size="sizeIcon[props.size]" :strokeWidth="0.75" />
  </span>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import { computed, type Component } from 'vue'
import { sizeIcon } from '@/assets/tokens/size'

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
