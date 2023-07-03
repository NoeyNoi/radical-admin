import type { PluginOption } from 'vite'

/**
 * 用于打包时生成其他配置文件。
 * 该文件可以配置一些全局变量，这样就可以在不重新打包的情况下直接从外部更改
 */
import { writeFileSync, mkdirp, readFileSync } from 'fs-extra'
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR, APP_NAME } from '../constants'
import { getAppConfigFileName } from '@radical/utils'
import { cyan, red, gray, green } from 'picocolors'
import { resolve } from 'path'
import dotenv from 'dotenv'

interface Options {
  configName: string
  config: any
  configFileName?: string
}

export function runBuildConfig() {
  const config = getEnvConfig()
  const configFileName = getAppConfigFileName(config)
  createConfig({
    config,
    configName: configFileName,
    configFileName: GLOB_CONFIG_FILE_NAME,
  })
}

function createConfig(params: Options) {
  const { configName, config, configFileName } = params
  try {
    const windowConf = `window.${configName}`
    // 确保变量不会被修改
    const configStr = `${windowConf}=${JSON.stringify(config)};
       Object.freeze(${windowConf});
       Object.defineProperty(window, "${configName}", {
         configurable: false,
         writable: false,
       });
     `.replace(/\s/g, '')
    mkdirp(resolve(process.cwd(), OUTPUT_DIR))
    writeFileSync(
      resolve(process.cwd(), `${OUTPUT_DIR}/${configFileName}`),
      configStr,
    )

    console.log(
      cyan(`✨ [${APP_NAME}]`) + ` - configuration file is build successfully:`,
    )
    console.log(gray(OUTPUT_DIR + '/' + green(configFileName)) + '\n')
  } catch (error) {
    console.log(
      red('configuration file configuration file failed to package:\n' + error),
    )
  }
}

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script
  const reg = new RegExp('--mode ([a-z_\\d]+)')
  const result = reg.exec(script as string) as any
  if (result) {
    const mode = result[1] as string
    return ['.env', `.env.${mode}`]
  }
  return ['.env', '.env.production']
}

/**
 * 获取以指定前缀开头的环境变量
 * @param match prefix
 * @param confFiles ext
 */
function getEnvConfig(match = 'VITE_GLOB_', confFiles = getConfFiles()) {
  let envConfig: Record<string, string> = {}

  confFiles.forEach((item) => {
    try {
      const env = dotenv.parse(readFileSync(resolve(process.cwd(), item)))
      envConfig = { ...envConfig, ...env }
    } catch (e) {
      console.error(`Error in parsing ${item}`, e)
    }
  })

  const reg = new RegExp(`^(${match})`)

  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key)
    }
  })

  return envConfig
}

export function createConfigPlugin(): PluginOption {
  return {
    name: 'generate-config',
    closeBundle() {
      try {
        const argvList = process.argv.splice(2)

        // 生成配置文档
        if (!argvList.includes('disabled-config')) {
          runBuildConfig()
        }

        console.log(`✨ ${cyan(`[${APP_NAME}]`)}` + ' - build successfully!')
      } catch (error) {
        console.log(red('vite build error:\n' + error))
        process.exit(1)
      }
    },
  }
}
