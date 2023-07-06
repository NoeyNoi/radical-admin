export type LocaleType = 'zh_CN' | 'en'

export interface LocaleConfig {
  // 当前的语言
  locale: LocaleType
  // 默认语言
  fallback: LocaleType
  // 可用的语言设置
  availableLocales: LocaleType[]
}

export interface GlobConfig {
  // 网站 title
  title: string
  // 服务接口url
  apiUrl: string
  // 项目简称
  shortName: string
}

export interface GlobEnvConfig {
  // 网站 title
  VITE_GLOB_APP_TITLE: string
  // 服务接口url
  VITE_GLOB_API_URL: string
  // 项目简称
  VITE_GLOB_APP_SHORT_NAME: string
}
