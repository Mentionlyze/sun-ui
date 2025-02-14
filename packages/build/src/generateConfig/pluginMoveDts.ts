import type { PluginOption } from 'vite'
import type { GenerateConfigOptions } from './options'
import { cp } from 'node:fs/promises'
import process from 'node:process'
import { getParsedCommandLineOfConfigFile, sys } from 'typescript'
import { absCwd, usePathAbs, usePathRel } from '../utils'
import { resolveEntry } from './lib'
import { getOptions } from './options'

export function pluginMoveDts(options: GenerateConfigOptions = {}): PluginOption {
  const { entry, outDir, mode, dts } = getOptions(options)

  if (mode !== 'pacakge' || !dts) {
    return null
  }

  const tsConfigs = getParsedCommandLineOfConfigFile(dts, {}, sys as any)

  if (!tsConfigs) {
    throw new Error(`could not find tsconfig file: ${dts}`)
  }

  const { rootDir, outDir: tsOutDir } = tsConfigs.options

  if (!rootDir || !tsOutDir) {
    throw new Error(`could not find rootDir or outDir in tsconfig file: ${dts}`)
  }

  const relRoot = usePathRel(rootDir)
  const absRoot = usePathAbs(rootDir)

  const relPackagePath = relRoot(process.cwd())

  const { rel: relEntryPath } = resolveEntry(entry)

  return {
    name: 'move-dts',
    apply: 'build',
    async closeBundle() {
      const source = absRoot(tsOutDir, relPackagePath, relEntryPath)
      const target = absCwd(outDir, relEntryPath)

      try {
        await cp(source, target, { recursive: true, force: true })
      }
      catch (error) {
        console.log(`[${relPackagePath}]: falied to move dts file!`)
        console.error(error)
      }
    },
  }
}
