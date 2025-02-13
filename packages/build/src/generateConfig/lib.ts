import type { LibraryFormats } from 'vite'
import type { GenerateConfigOptions } from './options'
import { statSync } from 'node:fs'
import { join } from 'node:path'
import { PackageJson } from 'type-fest'
import { BuildOptions, LibraryOptions } from 'vite'
import { absCwd, camelCase, kebabCase, relCwd } from '../utils'
import { getOptions } from './options'

export function getOutfileName(fileName: string, format: LibraryFormats, buildMode: GenerateConfigOptions['mode']) {
  const formatName = format as ('es' | 'umd')
  const ext = formatName === 'es' ? 'mjs' : '.umd.js'
  let tail: string

  if (buildMode === 'full') {
    tail = '.full.js'
  }
  else if (buildMode === 'full-min') {
    tail = '.full.min.js'
  }
  else {
    tail = ext
  }

  return `${fileName}${tail}`
}

interface EntryInfo {
  abs: string
  rel: string
  isFile: boolean
}

export function resolveEntry(entry: string): EntryInfo {
  const absEntry = absCwd(entry)
  const isEntryFile = statSync(absEntry).isFile()
  const absEntryFolder = isEntryFile ? absCwd(join(entry, '..')) : absEntry

  return {
    abs: absEntry,
    rel: relCwd(absEntryFolder),
    isFile: isEntryFile,
  }
}
