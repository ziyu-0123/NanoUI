<template>
  <div class="nano-tooltip"
    v-on="outerEvents">
      <div 
        class="nano-tooltip__trigger" 
        ref="triggerNode"
        v-on="events"
        >
        <slot></slot>
      </div>
      <div 
        v-if="isOpen"
        class="nano-tooltip__popper" 
        ref="popperNode"
        style="position: absolute;"
        >
        <slot name="content">
          {{content}}
        </slot>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance } from '@popperjs/core'
import type { TooltipProps, TooltipEmits } from './types'

const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom', // 默认显示在触发元素下方
  trigger: 'hover',
})

const emits = defineEmits<TooltipEmits>()

const isOpen = ref(false)

const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
let popperInstance: null | Instance = null
let events: Record<string, any> = reactive({})
let outerEvents: Record<string, any> = reactive({})

const togglePopper = () => {
  isOpen.value = !isOpen.value
  emits('visible-change', isOpen.value)
}

const open = () => {
  isOpen.value = true
  emits('visible-change', true) // 触发显示事件

}

const close = () => {
  isOpen.value = false
  emits('visible-change', false) // 触发隐藏事件
}

const attachEvents = () => {
  if (props.trigger === 'hover') {
    // hover 触发：触发元素移入 → 打开，容器移出 → 关闭
    events['mouseenter'] = open
    outerEvents['mouseleave'] = close
  } else if (props.trigger === 'click') {
    // click 触发：点击触发元素 → 切换状态
    events['click'] = togglePopper
  }
}

attachEvents()
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
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 0], // 调整偏移量，避免tooltip紧贴触发元素
            },
          },
        ],
      })
    } else {
      popperInstance?.destroy()
    }
  }
}, { flush: 'post'})
</script>

<style scoped>
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
</style>
