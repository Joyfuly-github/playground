<template>
  <span class="badge" :class="badgeClass">
    <Icon v-if="icon" :type="icon" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'
import Icon from '@/components/Icon.vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'ghost' | 'link'
    size?: 'xs' | 'sm' | 'md' | 'lg'
    icon?: keyof typeof icons
  }>(),
  {
    size: 'xs',
  },
)

const badgeClass = computed(() => [`size-${props.size}`, props.variant && `badge-${props.variant}`])
</script>

<style lang="scss" scoped>
$colorType: 'primary', 'secondary', 'success', 'info', 'warning', 'danger';

.badge {
  display: inline-flex;
  font-weight: var(--font-weight-medium);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-4);

  @each $type in $colorType {
    &.badge-#{$type} {
      background-color: var(--color-#{$type}-900);
      border-color: var(--color-#{$type}-900);
      color: var(--color-white);
    }
  }
}
</style>
