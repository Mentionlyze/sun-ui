import { cp, readdir } from 'node:fs/promises'
import { join } from 'node:path'
import process from 'node:process'

const fromRoot = (...paths: string[]) => join(__dirname, '..', ...paths)

const PKGS_DTS_DIR = fromRoot('dist/packages')

const PKGS_DIR = fromRoot('packages')

const PKG_DTS_RELATIVE_DIR = 'dist'

const PKG_ENTRY_RELATIVE_DIR = 'src'

async function main() {
  const pkgs = await match()
  const tasks = pkgs.map(resolve)
  await Promise.all(tasks)
}

async function match() {
  const res = await readdir(PKGS_DTS_DIR, { withFileTypes: true })
  return res.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
}

async function resolve(pkgName: string) {
  try {
    const sourceDir = join(PKGS_DTS_DIR, pkgName, PKG_ENTRY_RELATIVE_DIR)
    const targetDir = join(PKGS_DIR, pkgName, PKG_DTS_RELATIVE_DIR)
    const sourceFiles = await readdir(sourceDir)
    const cpTasks = sourceFiles.map(async (file) => {
      const sourceFile = join(sourceDir, file)
      const targetFile = join(targetDir, file)
      console.log(`[${pkgName}]: moving: ${sourceFile} to ${targetFile}`)
      return cp(sourceFile, targetFile, { force: true, recursive: true })
    })
    await Promise.all(cpTasks)
    console.log(`[${pkgName}]: moved successfully`)
  }
  catch (e: any) {
    console.log(`[${pkgName}]: failed to move, error: ${e}`)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
