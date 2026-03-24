<script setup lang="ts">
const move = (dir: number) => { const len = options.value.length let next = focusedIndex.value do { next = (next + dir + len) % len } while (options.value[next]?.disabled) focusedIndex.value = next }
</script>

<template>
  <div class="select-group" @keydown="handleKeyDown"></div>
</template>
