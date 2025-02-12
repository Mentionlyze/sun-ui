import { DefineComponent, App } from 'vue'

type SFCInstall<T = any> = DefineComponent<{}, {}, T> & {
  install: (app: App) => void
}

export const withSFCInstall = (comp: DefineComponent<{}, {}, any>): SFCInstall => {
  comp.install = (app: any) => {
    app.component(comp.name, comp)
  }
  return comp as SFCInstall
}
