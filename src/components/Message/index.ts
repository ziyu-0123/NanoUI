import type { App } from 'vue'
import Message from '@/components/Message/Message.vue'
import { createMessage, closeAll } from '@/components/Message/method'

// 支持 app.use(Message) 安装组件
Message.install = (app: App) => {
  app.component(Message.name as string, Message)
}

// 导出组件、创建方法、关闭方法、类型
export default Message
export {
  createMessage,
  closeAll
}
export * from './types'