/**
 * 在index.html中最小化并使用ejs模板语法的插件。
 * @see https://github.com/anncwb/vite-plugin-html
 */
import type { ViteEnv } from '../utils'
import { readPackageJSON } from 'pkg-types'
import { GLOB_CONFIG_FILE_NAME } from '../constants'
import { createHtmlPlugin } from 'vite-plugin-html'

export async function configHtmlPlugin(
  root: string,
  env: ViteEnv,
  isBuild: boolean,
) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env
  const { version } = await readPackageJSON(root)

  const path = VITE_PUBLIC_PATH.endsWith('/')
    ? VITE_PUBLIC_PATH
    : `${VITE_PUBLIC_PATH}/`

  const getAppConfigSrc = () => {
    return `${
      path || '/'
    }${GLOB_CONFIG_FILE_NAME}?v=${version}-${new Date().getTime()}`
  }

  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      // 将数据注入到 ejs template
      data: {
        title: VITE_GLOB_APP_TITLE,
      },
      // 嵌入生成的app.config.js全局配置文件
      tags: isBuild
        ? [
            {
              tag: 'script',
              attrs: {
                src: getAppConfigSrc(),
              },
            },
          ]
        : [],
    },
  })
  return htmlPlugin
}
