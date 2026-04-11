import type { VNode, ComponentInternalInstance } from 'vue'

export interface MessageProps {
  message?: string | VNode; // 提示内容（支持文本/VNode——比如带图标按钮的自定义内容）
  duration?: number; // 自动关闭时长（0 表示不关闭）
  showClose?: boolean; // 是否显示关闭按钮
  type?: 'success' | 'info' | 'warning' | 'danger'; // 提示类型
  onDestory: () => void;
  offset?: number;
  id: string;
  zIndex: number;
  transitionName?: string;
}

export interface MessageContext {
  id: string; // 唯一标识 → 给每个消息框贴“身份证号”
  vnode: VNode; // 虚拟节点 → 消息框的“虚拟DOM描述”
  vm: ComponentInternalInstance;
  props: MessageProps; // 最终Props → 消息框的“配置参数”
  destory: () => void;
}

export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>