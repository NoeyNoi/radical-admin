import type { UserConfig } from 'vite'

export async function createAntdPreset(): Promise<UserConfig> {
  return {
    optimizeDeps: {
      // TODO：当不使用国际化时可以适当关闭相关的配置
      include: [
        '@ant-design/icons-vue',
        'ant-design-vue/es/locale/zh_CN',
        'ant-design-vue/es/locale/en_US',
        'dayjs',
        'dayjs/locale/eu',
        'dayjs/locale/zh-cn',
        // 'lodash-es',
      ]
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // antdv: ['ant-design-vue', '@ant-design/icons-vue'],
            dayjs: ['dayjs'],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  }
}
