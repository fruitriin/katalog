import { vi } from 'vitest'

export interface DependencyMock {
  path: string
  mock: any
}

export class DependencyResolver {
  private mocks = new Map<string, any>()
  
  /**
   * よくある依存関係のデフォルトモックを設定
   */
  setupDefaultMocks() {
    // Vue Router
    this.addMock('vue-router', {
      useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        go: vi.fn(),
        back: vi.fn(),
        forward: vi.fn()
      }),
      useRoute: () => ({
        params: {},
        query: {},
        path: '/',
        name: 'home'
      })
    })
    
    // Pinia
    this.addMock('pinia', {
      defineStore: vi.fn(() => () => ({})),
      createPinia: vi.fn(() => ({}))
    })
    
    // Vue I18n
    this.addMock('vue-i18n', {
      useI18n: () => ({
        t: vi.fn((key: string) => key),
        locale: { value: 'ja' }
      })
    })
    
    // Axios / API クライアント
    this.addMock('@/api/client', {
      default: {
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn()
      }
    })
  }
  
  addMock(path: string, mock: any) {
    this.mocks.set(path, mock)
    vi.mock(path, () => mock)
  }
  
  /**
   * 親コンポーネントをモック化
   */
  mockParentComponent(path: string) {
    this.addMock(path, {
      default: {
        name: 'MockedParent',
        template: '<div class="mocked-parent"><slot /></div>'
      }
    })
  }
  
  /**
   * 子コンポーネントをモック化
   */
  mockChildComponent(path: string, name: string) {
    this.addMock(path, {
      default: {
        name: `Mocked${name}`,
        template: `<div class="mocked-${name.toLowerCase()}">Mocked ${name}</div>`,
        props: ['modelValue'], // 一般的なprops
        emits: ['update:modelValue']
      }
    })
  }
  
  /**
   * すべてのモックをクリア
   */
  clearMocks() {
    this.mocks.clear()
    vi.clearAllMocks()
  }
}