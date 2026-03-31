<template>
  <div v-if="$slots.trigger">
    <slot name="trigger"></slot>
  </div>

  <Teleport :to="teleportTarget">
    <div v-if="isOpen" class="dialog">
      <div class="dialog-overlay"></div>

      <div class="dialog-content">
        <div v-if="title || description" class="dialog-header">
          <Title variant="h3" :title="title" :description="description" />
        </div>

        <div class="dialog-body">
          <slot></slot>

          dddd
        </div>

        <div v-if="$slots.footer" class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    teleportTarget?: string
  }>(),
  {
    teleportTarget: 'body',
  },
)

const isOpen = ref(true)
</script>

<style lang="scss" scoped>
.dialog {
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}
</style>
