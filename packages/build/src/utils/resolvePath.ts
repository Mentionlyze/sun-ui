import { relative, resolve, sep } from 'node:path'
import process from 'node:process'

function normalizePath(path: string) {
  if (sep === '/') {
    return path
  }

  return path.replace(new RegExp(`\\${sep}`, 'g'), '/')
}

export function usePathAbs(basePath: string) {
  return (...path: string[]) => normalizePath(resolve(basePath, ...path))
}

export const absCwd = usePathAbs(process.cwd())

export function usePathRel(basePath: string) {
  return (path: string, ignoreLocalSignal: boolean = true) => {
    const result = normalizePath(relative(basePath, path))
    if (result.slice(0, 2) === '..') {
      return result
    }
    else {
      return ignoreLocalSignal ? result : `./${result}`
    }
  }
}

export const relCwd = usePathRel(process.cwd())
