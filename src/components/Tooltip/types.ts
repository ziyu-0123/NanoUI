import type { Placement, Options } from '@popperjs/core'

export interface TooltipProps {
  content?: string; // 提示文本
  trigger?: 'hover' | 'click'; // 触发方式
  placement?: Placement; // 定位方向（继承 popperjs 类型）
  manual?: boolean; // 是否手动控制显示隐藏
  popperOptions?: Partial<Options>; // 自定义 popper 配置
  transition?: string; // 过渡动画名称
  openDelay?: number; // 打开延迟（ms）
  closeDelay?: number; // 关闭延迟（ms）
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void; // 显示/隐藏变化
}

export interface TooltipInstance {
  show: () => void; // 手动显示
  hide: () => void; // 手动隐藏
}