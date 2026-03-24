<script setup lang="ts">
// ... 기존 코드 유지

const activeIndex = ref(-1) // 현재 포커스된 옵션의 인덱스
const optionsCount = ref(0) // 슬롯에 들어온 옵션 개수 (자동 계산 로직 필요)

// 총 옵션 개수를 파악하기 위한 간단한 방법 (실제로는 더 정교한 관리가 필요함)
// 여기서는 하드코딩 대신 Option들이 생성될 때 자기를 등록하도록 만들 수도 있습니다.
const totalOptions = 4 // 예시 값

const handleKeyDown = (e: KeyboardEvent) => {
  if (!isOpen.value) {
    if (e.key === 'ArrowDown' || e.key === 'Enter') handleOpen()
    return
  }

  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = (activeIndex.value + 1) % totalOptions
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = (activeIndex.value - 1 + totalOptions) % totalOptions
      break
    case 'Enter':
      e.preventDefault()
      // 현재 포커스된 인덱스의 요소를 클릭하게 만드는 로직 필요
      selectFocusedOption()
      break
    case 'Escape':
      handleClose()
      break
  }
}

// Context에 activeIndex 추가
const selectContext = reactive({
  selectValue: toRef(props, 'modelValue'),
  activeIndex, // 자식들이 내가 포커스인지 알 수 있게 공유
  selectOption: (value: string | number, label: string) => {
    emit('update:modelValue', { value, label })
    isOpen.value = false
    activeIndex.value = -1 // 초기화
  },
})

provide('selectContext', selectContext)
</script>

<template>
  <div class="select-group" @keydown="handleKeyDown"></div>
</template>
