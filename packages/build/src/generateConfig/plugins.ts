import type { RollupReplaceOptions } from '@rollup/plugin-replace'
import type { Options as VueOptions } from '@vitejs/plugin-vue'
import type { PluginVisualizerOptions } from 'rollup-plugin-visualizer'
import type { PackageJson } from 'type-fest'
import type { PluginOption } from 'vite'
import type { ViteInspectOptions } from 'vite-plugin-inspect'
import type { GenerateConfigOptions } from './options'
import replace from '@rollup/plugin-replace'
import vue from '@vitejs/plugin-vue'
import visualizer from 'rollup-plugin-visualizer'
import inspect from 'vite-plugin-inspect'
import { isObjectLike } from '../utils'
import { pluginMoveDts } from './pluginMoveDts'
import { pluginSetPackageJson } from './pluginSetPackageJson'

export interface GenerateConfigPluginsOptions {
  pluginVue?: boolean | VueOptions

  pluginInspect?: boolean | ViteInspectOptions

  pluginVisualizer?: boolean | PluginVisualizerOptions

  pluginReplace?: boolean | RollupReplaceOptions
}

export function getPresetPlugin<K extends keyof GenerateConfigPluginsOptions>(
  options: GenerateConfigPluginsOptions,
  key: K,
  plugin: (...args: any[]) => PluginOption,
  defaultOptions?: GenerateConfigPluginsOptions[K],
): PluginOption | undefined {
  const value = options[key]
  if (!value)
    return null

  return plugin(
    isObjectLike(value) ? value : defaultOptions,
  )
}

export function getPresetPlugins(options: GenerateConfigPluginsOptions = {}) {
  const result: PluginOption[] = []

  result.push(
    getPresetPlugin(options, 'pluginVue', vue),
    getPresetPlugin(options, 'pluginInspect', inspect),
    getPresetPlugin(options, 'pluginVisualizer', visualizer),
    getPresetPlugin(options, 'pluginReplace', replace),
  )
  return result
}

export function getPlugins(pacakgeJson: PackageJson = {}, options: GenerateConfigOptions = {}) {
  const { mode, dts } = options

  const result = getPresetPlugins(options)

  if (mode === 'pacakge') {
    result.push(pluginSetPackageJson(pacakgeJson, options))
  }

  if (dts) {
    result.push(pluginMoveDts(options))
  }

  return result
}
