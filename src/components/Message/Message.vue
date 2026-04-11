<template>
  <Transition 
  :name="transitionName"
  @after-leave="destroyComponent" 
  @enter="updateHeight"
  >
    <div
      class="nano-message"
      v-show="visible"
      :class="{
      [`nano-message--${type}`]: type,
      'is-close': showClose
      }"
      role="alert"
      ref="messageRef"
      :style="cssStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="nano-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message" />
        </slot>
      </div>
      <div class="nano-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark"/>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { MessageProps } from './types'
import { getLastBottomOffset } from './method'
import RenderVnode from '@/Common/RenderVnode'
import Icon from '../Icon/Icon.vue'
import useEventListener from '../../hooks/useEventListener'
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info', // 默认类型
  duration: 3000, // 默认 3 秒关闭
  offset: 20, 
  transitionName: 'fade-up'
})
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
const height = ref(0)
const lastOffset = computed(() => getLastBottomOffset(props.id))
const topOffset = computed(() => props.offset + lastOffset.value)
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex
}))
let timer: any
function startTimer() {
  if (props.duration === 0) return
  timer = setTimeout(() => {
    visible.value = false
  }, props.duration)
}
function clearTimer() {
  clearTimeout(timer)
}
onMounted(async () => {
  visible.value = true // 挂载后显示
  startTimer()
})
function keydown(e: Event) {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    visible.value = false
  }
}
useEventListener(document, 'keydown', keydown)
function destroyComponent () {
  props.onDestory() // 触发 method.ts 传入的销毁回调
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible
})
</script>
