import type { App, DefineComponent } from 'vue'

export type SFCInstall = DefineComponent<{}, {}, any> & {
  install: (app: App) => void
}

export function withSFCInstall(comp: DefineComponent<{}, {}, any>): SFCInstall {
  comp.install = (app: any) => {
    app.component(comp.name, comp)
  }
  return comp as SFCInstall
}
