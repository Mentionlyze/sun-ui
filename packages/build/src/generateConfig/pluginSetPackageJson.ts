import type { PackageJson } from 'type-fest'
import type { PluginOption } from 'vite'
import type { GenerateConfigOptions } from './options'
import { basename } from 'node:path'
import { absCwd, isObjectLike, kebabCase, relCwd, writeJsonFile } from '../utils'
import { getOutfileName, resolveEntry } from './lib'
import { getOptions } from './options'

export function pluginSetPackageJson(pacakgeJson: PackageJson = {}, options: GenerateConfigOptions = {}): PluginOption {
  const {
    onSetPkg,
    mode,
    fileName,
    outDir,
    dts,
  } = getOptions(options)

  if (mode !== 'pacakge') {
    return null
  }

  const finalFileName = fileName || kebabCase(pacakgeJson.name || '')

  return {
    name: 'set-package-json',
    apply: 'build',
    async closeBundle() {
      const pacakgeJsonObj = pacakgeJson
      const exportsData: Record<string, any> = {}

      const umd = relCwd(absCwd(outDir, getOutfileName(finalFileName, 'umd', mode)), false)
      pacakgeJsonObj.main = umd
      exportsData.require = umd

      const es = relCwd(absCwd(outDir, getOutfileName(finalFileName, 'es', mode)), false)
      pacakgeJsonObj.module = es
      exportsData.import = es

      if (dts) {
        const dtsPath = getDtsPath(options)
        pacakgeJsonObj.types = dtsPath
        exportsData.types = dtsPath
      }

      if (!isObjectLike(pacakgeJsonObj.exports)) {
        pacakgeJsonObj.exports = {}
      }
      Object.assign(pacakgeJsonObj.exports, { '.': exportsData })

      if (onSetPkg) {
        await onSetPkg(pacakgeJsonObj)
      }

      await writeJsonFile(absCwd(outDir, 'package.json'), pacakgeJsonObj, null, 2)
    },
  }
}

function getDtsPath(options: GenerateConfigOptions) {
  const { entry, outDir } = getOptions(options)
  const { rel, isFile } = resolveEntry(entry)
  const entryFileName = isFile ? basename(entry).replace(/\..*$/, '.d.ts') : 'index.d.ts'

  return relCwd(absCwd(outDir, rel, entryFileName), false)
}
