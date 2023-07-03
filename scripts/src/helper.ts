import { green, red } from 'picocolors'
import { load as yamlLoad } from 'js-yaml'
import { readFile } from 'fs-extra'
import { IGNORE_WORKSPACE } from './constant'
import { execa } from 'execa'
import minimist from 'minimist'

export type WorkspacePackage = { name: string; version?: string; path: string }

export function error(err: any) {
  console.log(red(err))
}

export function succeed(msg: any) {
  console.log(green(msg))
}

/**
 * 获取命令行参数
 * @param argvName
 */
export function commandArgv(argvName: string | undefined = undefined) {
  const argv = minimist(process.argv.slice(2))
  return argvName ? argv[argvName] || undefined : argv
}

/**
 * 根据yaml文件读取Workspace
 */
export async function readWorkspace() {
  const path = '../pnpm-workspace.yaml'
  try {
    const workspace = yamlLoad(await readFile(path, { encoding: 'utf8' }), {
      json: true,
    }) as any
    return workspace.packages as string[]
  } catch (e) {
    throw e
  }
}
// 过滤掉工程提供的基础包
export async function filterWorkspace() {
  try {
    const filterArgv = (await readWorkspace()).filter(
      (wr) => !IGNORE_WORKSPACE.includes(wr),
    )
    return filterArgv
      .map((argv) => ['--filter', '../' + argv])
      .flatMap((argv) => argv)
  } catch (e) {
    throw e
  }
}
// 获取对应空间下的所有项目
export async function getWorkspacePackages(filterArgv: string[] = []) {
  // 参考：https://pnpm.io/zh/cli/list
  const { stdout } = await execa(
    'pnpm',
    ['ls', '-r', '--depth', '-1', '--json'].concat(filterArgv),
  )
  if (!stdout) return []
  return JSON.parse(stdout) as WorkspacePackage[]
}
