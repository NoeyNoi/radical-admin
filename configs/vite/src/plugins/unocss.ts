import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
/**
 * UnoCSS：https://unocss.dev/guide/
 * 注意：为了适配vscode插件，已将unocss.config.ts放置到根目录
 */
export function configUnocssPlugin() {
  return UnoCSS(resolve(__dirname, '../../../unocss.config.ts'))
}
