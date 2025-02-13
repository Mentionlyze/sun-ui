import type { PackageJson } from 'type-fest'
import type { GenerateConfigPluginsOptions } from './plugins'

export interface GenerateConfigOptions extends GenerateConfigPluginsOptions {
  entry?: string

  outDir?: string

  fileName?: string

  mode?: 'pacakge' | 'full' | 'full-min'

  dts?: string

  onSetPkg?: (pkg: PackageJson) => void | Promise<void>
}

export function defaultOptions(): Required<GenerateConfigOptions> {
  return {
    entry: 'src/index.ts',
    outDir: 'dist',
    fileName: '',
    mode: 'pacakge',
    dts: '',
    onSetPkg: () => {},
    pluginVue: false,
    pluginInspect: false,
    pluginVisualizer: false,
    pluginReplace: false,
  }
}

export function getOptions(options: GenerateConfigOptions): Required<GenerateConfigOptions> {
  return {
    ...defaultOptions(),
    ...options,
  }
}
