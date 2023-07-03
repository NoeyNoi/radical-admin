/**
 * The instant on-demand atomic CSS engine.
 * @see https://github.com/unocss/unocss
 */
import { defineConfig, presetIcons, presetMini } from 'unocss'

export default defineConfig({
  // exclude: ['node_modules', '.git', 'dist'],
  presets: [
    // 由 Iconify 提供支持的纯 CSS 图标解决方案
    presetIcons(), 
    // 最少但必不可少的规则和变体
    presetMini({ dark: 'class' })
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center'
  },
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      text: 'var(--text-color)'
    },
    backgroundColor: {},
    transitionProperty: [],
  },
})
