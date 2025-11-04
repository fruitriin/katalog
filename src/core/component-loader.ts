export interface ComponentMeta {
  name: string
  path: string
  component: any
  props?: Record<string, any>
  emits?: string[]
  slots?: string[]
  docs?: string
}

export interface ComponentLoaderConfig {
  patterns: string[]
  exclude?: string[]
  eager?: boolean
}

export class ComponentLoader {
  private components = new Map<string, ComponentMeta>()
  
  constructor(private config: ComponentLoaderConfig) {}
  
  async loadComponents(): Promise<Map<string, ComponentMeta>> {
    const modules = import.meta.glob('/src/components/**/*.vue', { 
      eager: this.config.eager ?? true 
    })
    
    for (const [path, module] of Object.entries(modules)) {
      if (this.shouldExclude(path)) continue
      
      const meta = await this.extractComponentMeta(path, module)
      this.components.set(meta.name, meta)
    }
    
    return this.components
  }
  
  private shouldExclude(path: string): boolean {
    return this.config.exclude?.some(pattern => 
      new RegExp(pattern.replace(/\*/g, '.*')).test(path)
    ) ?? false
  }
  
  private async extractComponentMeta(path: string, module: any): Promise<ComponentMeta> {
    const name = this.extractComponentName(path)
    
    return {
      name,
      path,
      component: module.default || module,
      // TODO: TypeScript解析でprops/emits/slots取得
      props: {},
      emits: [],
      slots: []
    }
  }
  
  private extractComponentName(path: string): string {
    const filename = path.split('/').pop()?.replace('.vue', '') || 'Unknown'
    return filename.charAt(0).toUpperCase() + filename.slice(1)
  }
}