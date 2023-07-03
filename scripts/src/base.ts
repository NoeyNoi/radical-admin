import { execa } from 'execa'
import {
  commandArgv,
  error,
  filterWorkspace,
  getWorkspacePackages,
} from './helper'
import { isArray, isString } from '@radical/utils'
import { DEFAULT_SELECT_TYPE } from './constant'
import prompts from 'prompts'

// pnpm -w run turbo:xx --filter @xxx
async function runScript(argv: string[], script: string) {
  execa('pnpm', ['-w', 'run', `turbo:${script}`].concat(argv), {
    stdio: 'inherit',
    preferLocal: true,
  })
}

async function baseScript(command: string, isFilterWorkspace: boolean) {
  const argv = commandArgv('filter')
  let filterArgv: string[] = []
  try {
    if (isArray(argv)) {
      filterArgv = argv
        .map((argvItem) => ['--filter', `../${argvItem}`])
        .flatMap((argvItem) => argvItem)
    } else if (isString(argv)) {
      filterArgv = ['--filter', argv]
    } else {
      filterArgv = isFilterWorkspace ? await filterWorkspace() : []
    }
    const workspacePackages = await getWorkspacePackages(filterArgv)
    if (!workspacePackages.length) {
      throw new Error('没有找到 pnpm-workspace.yaml 中配置的项目!')
    }
    if (workspacePackages.length === 1) {
      await runScript(['--filter', workspacePackages[0].name], command)
      return
    }
    const choices = workspacePackages.map((item) => ({
      title: item.name,
      value: item.name,
    }))
    const { packages } = await prompts([
      {
        type: DEFAULT_SELECT_TYPE,
        message: `请选择要执行 ${command} 命令的包名: `,
        name: 'packages',
        choices,
        validate: function (val) {
          if (val && val.length) return true
          return '尚未选择包名，请选择: '
        },
      },
    ])

    const scriptArgv = isArray(packages)
      ? packages
          .map((argvItem) => ['--filter', argvItem])
          .flatMap((argvItem) => argvItem)
      : ['--filter', packages || '']
    await runScript(scriptArgv, command)
  } catch (e) {
    throw e
  }
}
/**
 * 主要用于多个app中有多个应用时，方便用户选择启动具体应用
 * @param command 指令
 * @param isFilterWorkspace 是否过滤workspace
 */
export function run(command: string, isFilterWorkspace = false) {
  // fix: 解决控制台打印的颜色失效的问题
  process.env.FORCE_COLOR = 'true'

  baseScript(command, isFilterWorkspace).catch((err) => {
    error(err)
    process.exit(1)
  })
}
