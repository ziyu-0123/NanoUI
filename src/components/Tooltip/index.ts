import type { App } from 'vue'
import Tooltip from '@/components/Tooltip/Tooltip.vue'

// 实现 Vue 插件接口：提供 install 方法
Tooltip.install = (app: App) => {
  // 全局注册组件（使用组件自身的 name 作为注册名）
  app.component(Tooltip.name as string, Tooltip)
}

// 默认导出组件（支持局部注册）
export default Tooltip

// 导出类型（方便外部使用类型定义）
export * from './types'