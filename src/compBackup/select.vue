<template>
  <div class="custom-select-container">
    <button
      type="button"
      ref="triggerRef"
      class="select-trigger"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :popovertarget="popoverId"
    >
      <span class="selected-value">
        {{ selectedOption ? selectedOption.label : placeholder }}
      </span>
      <span class="arrow-icon" :class="{ 'is-open': isOpen }">▼</span>
    </button>

    <div
      :id="popoverId"
      popover="auto"
      ref="popoverRef"
      class="select-dropdown"
      @toggle="handleToggle"
    >
      <ul role="listbox" class="options-list">
        <li
          v-for="option in options"
          :key="String(option.value)"
          role="option"
          class="option-item"
          :class="{ 'is-selected': isSelected(option) }"
          :aria-selected="isSelected(option)"
          @click="selectOption(option)"
        >
          {{ option.label }}
          <span v-if="isSelected(option)" class="check-icon">✓</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import { ref, computed, onMounted } from 'vue'
import { useFloating, offset, flip, size, autoUpdate } from '@floating-ui/vue'

// --- Types ---
interface SelectOption<T> {
  label: string
  value: T
}

// --- Props & Emits ---
const props = withDefaults(
  defineProps<{
    options: SelectOption<T>[]
    modelValue?: T | null // v-model 지원
    placeholder?: string
  }>(),
  {
    modelValue: null,
    placeholder: '선택해주세요',
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: T | null): void
  (e: 'change', value: T | null): void
}>()

// --- State ---
const isOpen = ref(false) // Popover의 열림/닫힘 상태를 Vue 데이터와 동기화
const triggerRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)

// 유니크한 ID 생성 (CSS Anchor나 popovertarget 매칭용)
const popoverId = `select-popover-${Math.random().toString(36).substring(2, 9)}`

// 현재 선택된 옵션 객체 계산
const selectedOption = computed(() => {
  return props.options.find((opt) => opt.value === props.modelValue) || null
})

// --- Floating UI 로직 (위치 계산) ---
const { floatingStyles } = useFloating(triggerRef, popoverRef, {
  placement: 'bottom-start',
  whileElementsMounted: autoUpdate, // 화면 스크롤/리사이즈 시 자동 업데이트
  middleware: [
    offset(4), // 버튼과 팝업 사이 간격
    flip(), // 화면 끝에 도달하면 위아래 뒤집기
    // 드롭다운 너비를 버튼 너비와 맞추는 로직
    size({
      apply({ rects, elements }) {
        Object.assign(elements.floating.style, {
          width: `${rects.reference.width}px`,
        })
      },
    }),
  ],
})

// --- Logic ---
const isSelected = (option: SelectOption<T>) => {
  return props.modelValue === option.value
}

// Popover API의 기본 동작인 Light Dismiss를 감지하여 isOpen 상태 업데이트
const handleToggle = (event: Event) => {
  // @toggle 이벤트는 HTMLElement가 아닌 ToggleEvent 인터페이스를 가짐
  const toggleEvent = event as ToggleEvent
  isOpen.value = toggleEvent.newState === 'open'
}

const selectOption = (option: SelectOption<T>) => {
  const newValue = isSelected(option) ? null : option.value // 토글식 선택 (필요에 따라 수정 가능)
  emit('update:modelValue', newValue)
  emit('change', newValue)

  // 선택 후 팝업 닫기 (Popover API JS 호출)
  popoverRef.value?.hidePopover()
}

// Floating UI 스타일을 컴포넌트 마운트 시점에 popoverRef에 할당
onMounted(() => {
  if (popoverRef.value) {
    Object.assign(popoverRef.value.style, floatingStyles.value)
  }
})
</script>

<style scoped>
/* 컨테이너 */
.custom-select-container {
  display: inline-block;
  width: 250px; /* 기본 너비 */
}

/* 1. Trigger Button 스타 일 */
.select-trigger {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  font-size: 16px;
  transition: border-color 0.2s;
}

.select-trigger:hover {
  border-color: #aaa;
}

/* 2. Dropdown (Popover) 스타일 */
.select-dropdown {
  /* --- Popover API 핵심 초기화 --- */
  padding: 0;
  border: none;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  /* Top Layer에 뜨더라도 CSS Anchor Positioning이 없으면 
     직접 위치 지정을 해줘야 함 (Floating UI의 style 사용) */
  position: absolute;
  margin: 0; /* 중요: Popover 기본 margin 제거 */

  /* 애니메이션 처리를 위해 display가 아닌 opacity 사용 권장 */
  transition:
    opacity 0.2s,
    transform 0.2s;
  opacity: 0;
  transform: translateY(-5px);
}

/* Popover가 열렸을 때의 상태 */
.select-dropdown:popover-open {
  opacity: 1;
  transform: translateY(0);
}

/* 3. Options 스타일 */
.options-list {
  list-style: none;
  margin: 0;
  padding: 8px 0;
}

.option-item {
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-item:hover {
  background-color: #f5f5f5;
}

.option-item.is-selected {
  background-color: #e6f7ff;
  color: #1890ff;
  font-weight: 500;
}

/* 기타 아이콘 */
.arrow-icon {
  font-size: 12px;
  transition: transform 0.2s;
}
.arrow-icon.is-open {
  transform: rotate(180deg);
}
.check-icon {
  font-size: 14px;
}
</style>
