import dayjs from 'dayjs'
import { resolve } from 'path'
import { green } from 'picocolors'
import { readPackageJSON } from 'pkg-types'
import type { UserConfig } from 'vite'
import { loadEnv, mergeConfig } from 'vite'
import { OUTPUT_DIR } from './constants'
import { configVitePlugins } from './plugins'
import type { PresetType } from './presets'
import { createPreset } from './presets'
import { resolveProxy, wrapperEnv } from './utils'

export * from './constants'

export async function createViteConfig(
  command: 'build' | 'serve',
  mode: string,
  cwd: string,
  { preset }: { preset: PresetType },
): Promise<UserConfig> {
  const root = cwd
  const env = loadEnv(mode, root)
  const { dependencies, devDependencies, name, version } =
    await readPackageJSON(cwd)

  console.log(green(`${name}-version 正在运行...`))
  console.log()

  // loadEnv读取的布尔类型是一个字符串. 通过函数转为 boolean 类型
  const viteEnv = wrapperEnv(env)
  const {
    VITE_PUBLIC_PATH,
    VITE_PROXY,
    VITE_USE_MOCK,
    VITE_DROP_CONSOLE,
    VITE_USE_HTTPS,
    VITE_PORT,
  } = viteEnv

  // 通用配置
  const commonConfig: UserConfig = {
    root,
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        '@': `${resolve(root, 'src')}`,
        // layouts: `${resolve(root, '../../packages/layouts/src')}`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    // 定义全局常量替换方式。其中每项在开发环境下会被定义在全局，而在构建时被静态替换。
    define: {
      __VITE_USE_MOCK__: VITE_USE_MOCK,
      // 取消vue-i18-next警告
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify({
        pkg: { dependencies, devDependencies, name, version },
        lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      }),
    },
    server: {
      https: VITE_USE_HTTPS,
      port: VITE_PORT || 3000,
      host: true,
      proxy: !VITE_USE_HTTPS ? resolveProxy(VITE_PROXY) : undefined,
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: OUTPUT_DIR,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'pinia', 'vue-router'],
            mockjs: ['mockjs'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['dayjs/locale/en', 'dayjs/locale/zh-cn', '@iconify/iconify'],
      // exclude: ['vue-demi'],
    },
    plugins: await configVitePlugins(root, viteEnv, command === 'build'),
  }

  return mergeConfig(commonConfig, await createPreset(preset)())
}
