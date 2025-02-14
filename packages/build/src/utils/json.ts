import { readFile, writeFile } from 'node:fs/promises'

export async function readJsonFile<T extends Record<string, any> = Record<string, any>>(filePath: string): Promise<T> {
  const content = await readFile(filePath, 'utf-8')
  return JSON.parse(content) as T
}

export async function writeJsonFile(filePath: string, ...data: Parameters<typeof JSON.stringify>): Promise<void> {
  const content = JSON.stringify(data, null, 2)
  await writeFile(filePath, content, 'utf-8')
}
