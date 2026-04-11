import { onMounted, onBeforeUnmount, isRef, watch, unref } from 'vue'
import type { Ref } from 'vue'
export default function useEventListener(
  // 事件目标：支持两种形式——1. 响应式 Ref（比如 ref(null)） 2. 普通 DOM/Window 等
  target: Ref<EventTarget | null> | EventTarget,
  event: string, // 要监听的事件名（比如 'click'、'scroll'）
  handler: (e: Event) => any // 事件处理函数
) {
  // 核心逻辑1：判断目标是否是响应式 Ref
  if (isRef(target)) {
    // 如果是 Ref：监听 Ref 的值变化（比如从 null 变成 DOM 元素）
    watch(target, (value, oldValue) => {
      // 移除旧目标的事件（避免旧元素还绑定着事件）
      oldValue?.removeEventListener(event, handler) // 移除旧目标的事件
      // 给新目标绑定事件
      value?.addEventListener(event, handler) // 绑定新目标的事件
    })
  } else {
    // 核心逻辑2：非 Ref 目标（比如 window、document 或固定 DOM）
    // 组件挂载后再绑定（确保 DOM 已存在）
    onMounted(() => {
      target.addEventListener(event, handler)
    })
  }
  // 核心逻辑3：组件卸载前自动解绑事件（关键！避免内存泄漏）
  onBeforeUnmount(() => {
    // unref：如果是 Ref 就取其值，非 Ref 直接返回自身
    unref(target)?.removeEventListener(event, handler)
  })
}
