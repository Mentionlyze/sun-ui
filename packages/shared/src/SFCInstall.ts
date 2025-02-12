export const withSFCInstall = (comp: any) => {
  comp.install = (app: any) => {
    app.component(comp.name, comp)
  }
  return comp
}
