import type { Placement } from '@popperjs/core'

export interface TooltipProps {
  content?: string; // 提示文本
  trigger?: 'hover' | 'click'; // 触发方式
  placement?: Placement; // 定位方向（继承 popperjs 类型）
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void; // 显示/隐藏变化
}