// src/global.d.ts
import type { App } from 'vue'

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $echo: (name: string) => string;
  }
}

// 或者如果需要导出插件类型
export interface TestPlugin {
  install: (app: App) => void;
}