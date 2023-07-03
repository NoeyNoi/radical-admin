import type { GlobEnvConfig, GlobConfig } from '@radical/types'
import { version } from '../package.json'

// 获取全局变量
export function getGlobalConfig(
  env: Record<string, any>,
): Readonly<GlobConfig> {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME } =
    getAppConfig(env)

  const glob: Readonly<GlobConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortName: VITE_GLOB_APP_SHORT_NAME,
  }
  return glob as Readonly<GlobConfig>
}

/**
 * 获取配置文件变量名
 * @param env
 */
export function getAppConfigFileName(env: Record<string, any>) {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '')
}

function createStorageKeyPrefix(env: Record<string, any>) {
  const { VITE_GLOB_APP_SHORT_NAME } = getAppConfig(env)
  return `${VITE_GLOB_APP_SHORT_NAME}_${env.MODE}`.toUpperCase()
}

// 根据版本生成缓存密钥
export function createStorageName(env: Record<string, any>) {
  return `${createStorageKeyPrefix(env)}${`_${version}`}_`.toUpperCase()
}
// 开发环境从.env 文件获取，生产环境通过全局变量获取
function getAppConfig(env: Record<string, any>) {
  const ENV_NAME = getAppConfigFileName(env)
  const ENV = (env.DEV ? env : window[ENV_NAME]) as GlobEnvConfig
  const { VITE_GLOB_APP_SHORT_NAME } = ENV
  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(
      // `VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`,
      `VITE_GLOB_APP_SHORT_NAME 变量只能是字符/下划线，请在环境变量中修改并重新运行。`,
    )
  }
  return ENV
}
