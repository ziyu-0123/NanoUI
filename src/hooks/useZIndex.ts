import { computed, ref } from 'vue'

// 全局递增的 zIndex 计数器
const zIndex = ref(0)
const useZIndex = (initialValue = 2000) => {
  // 基础层级（默认 2000）
  const initialZIndex = ref(initialValue)
  // 当前计算后的层级 = 基础值 + 递增计数器
  const currentZIndex = computed(() => zIndex.value + initialZIndex.value)
  // 获取下一个层级（计数器 +1，返回新值）
  const nextZIndex = () => {
    zIndex.value++
    return currentZIndex.value
  }
  return {
    currentZIndex,
    nextZIndex,
    initialZIndex
  }
}

export default useZIndex