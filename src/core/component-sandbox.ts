import { createApp, defineComponent, h } from 'vue'
import type { Component } from 'vue'

export interface SandboxConfig {
  // グローバル依存のモック
  globalMocks?: Record<string, any>
  // プラグインのモック
  pluginMocks?: Array<{ install: (app: any) => void }>
  // ルーターのモック
  routerMock?: {
    currentRoute: any
    push: (to: any) => void
  }
  // ストアのモック
  storeMock?: any
}

export class ComponentSandbox {
  private app: any
  
  constructor(private config: SandboxConfig = {}) {}
  
  /**
   * コンポーネントを依存関係から分離してマウント
   */
  async mountComponent(component: Component, props: Record<string, any> = {}) {
    // 新しいVueアプリケーションインスタンスを作成
    this.app = createApp({
      render: () => h(component, props)
    })
    
    // モックプラグインを設定
    this.setupMocks()
    
    // コンテナ要素を作成
    const container = document.createElement('div')
    document.body.appendChild(container)
    
    // マウント
    const instance = this.app.mount(container)
    
    return {
      instance,
      container,
      unmount: () => {
        this.app.unmount()
        document.body.removeChild(container)
      }
    }
  }
  
  private setupMocks() {
    // グローバルプロパティのモック
    if (this.config.globalMocks) {
      Object.entries(this.config.globalMocks).forEach(([key, value]) => {
        this.app.config.globalProperties[key] = value
      })
    }
    
    // ルーターモック
    if (this.config.routerMock) {
      this.app.provide('router', this.config.routerMock)
      this.app.config.globalProperties.$router = this.config.routerMock
      this.app.config.globalProperties.$route = this.config.routerMock.currentRoute
    }
    
    // プラグインモック
    this.config.pluginMocks?.forEach(plugin => {
      this.app.use(plugin)
    })
  }
}