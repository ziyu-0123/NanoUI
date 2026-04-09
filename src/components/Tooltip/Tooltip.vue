<template>
  <div class="nano-tooltip"
    ref="popperContainerNode"
    v-on="outerEvents">
      <div 
        class="nano-tooltip__trigger" 
        ref="triggerNode"
        v-on="events"
        >
        <slot></slot>
      </div>
      <Transition :name="transition">
        <div 
          v-if="isOpen"
          class="nano-tooltip__popper" 
          ref="popperNode"
          style="position: absolute;"
          >
          <slot name="content">
            {{content}}
          </slot>
          <div id="arrow" data-popper-arrow></div>
        </div>
      </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import type { TooltipProps, TooltipEmits, TooltipInstance } from './types'
import { debounce } from 'lodash-es'
import useClickOutside from '@/hooks/useClickOutside'

defineOptions({
  name: 'NanoTooltip'
})

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom', // 默认显示在触发元素下方
  trigger: 'hover',
  transition: 'fade', // 默认 fade 过渡
  openDelay: 0, // 默认无打开延迟
  closeDelay: 0, // 默认无关闭延迟
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)

const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode=ref<HTMLElement>()
let popperInstance: null | Instance = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})
let openTimes = 0
let closeTimes = 0
const popperOptions = computed(() => {
  return {
    placement: props.placement, // 定位方向
    modifiers: [
      {
        name: 'offset', // 偏移修饰符：提示框与触发元素的间距
        options: {
          offset: [0, 10],
        },
      }
    ],
    ...props.popperOptions // 合并用户自定义配置（优先级更高）
  }
})

const open = () => {
    openTimes++
    console.log('open times', openTimes)
    isOpen.value = true
    emits('visible-change', true) // 触发显示事件
}

const close = () => {
  closeTimes++
  console.log('close times', closeTimes)
    isOpen.value = false
    emits('visible-change', false) // 触发隐藏事件
}

const openDebounce = debounce(open, props.openDelay)
const closeDebounce = debounce(close, props.closeDelay)

const openFinal = () => {
  closeDebounce.cancel()
  openDebounce()
}

const closeFinal = () => {
  openDebounce.cancel()
  closeDebounce()
}

const togglePopper = () => {
  if (isOpen.value) {
    closeFinal()
  } else {
    openFinal()
  }
}

useClickOutside(popperContainerNode, () => {
  // click 触发时，点击外部且非手动控制 → 关闭提示框
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    closeFinal()
  }
})

const attachEvents = () => {
  if (props.trigger === 'hover') {
    // hover 触发：触发元素移入 → 打开，容器移出 → 关闭
    events['mouseenter'] = openFinal()
    outerEvents['mouseleave'] = closeFinal()
  } else if (props.trigger === 'click') {
    // click 触发：点击触发元素 → 切换状态
    events['click'] = togglePopper
  }
}
if (!props.manual) {
  attachEvents()
}

watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {}
    outerEvents = {}    
  } else {
    attachEvents()
  }
})

watch(() => props.trigger, (newTrigger, oldTrigger) => {
  if (newTrigger !== oldTrigger) {
    // clear the events
    events = {}
    outerEvents = {}
    attachEvents()
  }
})

watch(isOpen, (newValue) => {
  if (newValue) {
    // 确保 DOM 存在时创建实例
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value)
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post'})

onUnmounted(() => {
  popperInstance?.destroy()
})

defineExpose<TooltipInstance>({
  'show': openFinal,
  'hide': closeFinal
})
</script>

<!-- <style scoped>
.nano-tooltip {
  display: inline-block;
  /* 确保容器不会撑开 */
  line-height: 0;
}

.nano-tooltip__trigger {
  display: inline-block;
  /* 让 trigger 的尺寸完全由内容决定 */
  line-height: 0;
}

/* 确保 trigger 内的 img 正确显示 */
.nano-tooltip__trigger img {
  display: inline-block;
}
</style> -->
