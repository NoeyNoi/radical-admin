import type { LocaleConfig, LocaleType } from '@radical/types'

export const LOCALE: { [key: string]: LocaleType } = {
  zh: 'zh_CN',
  en: 'en',
}
// 语言列表
export const localeList: any[] = [
  {
    text: '简体中文',
    event: LOCALE.zh,
  },
  {
    text: 'English',
    event: LOCALE.en,
  },
]
// 国际化设置
export const localeSetting: LocaleConfig = {
  // 语言环境
  locale: LOCALE.zh,
  // 预设的语言环境。用于I18n回退
  fallback: LOCALE.zh,
  // 以词法顺序排列的 messages 中的可用语言环境列表
  availableLocales: [LOCALE.zh, LOCALE.en],
}
