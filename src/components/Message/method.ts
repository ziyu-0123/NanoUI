import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from './types'
import useZIndex from '../../hooks/useZIndex'
import MessageConstructor from './Message.vue'
let seed = 1
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`
  const { nextZIndex } = useZIndex() 
  const container = document.createElement('div')
  const destory = () => {
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1) return // 没找到，直接返回
    instances.splice(idx, 1)
    render(null, container) // 卸载组件：Vue 渲染 null 到容器，清空 DOM
  }
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }
  const newProps = {
    ...props, // 外部传入的 props（比如 message、type、duration）
    id,
    zIndex: nextZIndex(),
    onDestory: destory // 补充销毁回调（组件内部动画结束后调用）
  }
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  console.log('vnode', vnode)
  document.body.appendChild(container.firstElementChild!)
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestroy
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1) // 取最后一个元素
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  if (idx <= 0) {
    return 0 // 第一个实例，偏移为 0
  } else {
    const prev = instances[idx - 1]
    return instances[idx - 1]?.vm?.exposed?.bottomOffset?.value ?? 0 // 取上一个实例的底部偏移
  }
}

export const closeAll = () => {
  instances.forEach(instance => {
    instance.destory() // 逐个调用手动销毁
  })
}