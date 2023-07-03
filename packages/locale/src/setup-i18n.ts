import type { App } from 'vue'
import type { I18nOptions } from 'vue-i18n'
import { localeSetting } from './config'
import { createI18n } from 'vue-i18n'
import { setHtmlPageLang, setLoadLocalePool } from './helper'
import { getLocale } from './store'

const { fallback, availableLocales } = localeSetting

export let i18n: ReturnType<typeof createI18n>

const createI18nOptions = async (): Promise<I18nOptions> => {
  const locale = getLocale.value
  const defaultLocal = await import(`./lang/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}
  // 更新html的lang属性
  setHtmlPageLang(locale)

  setLoadLocalePool((loadLocalePool) => loadLocalePool.push(locale))

  // 参考文档：https://kazupon.github.io/vue-i18n/zh/api/#vuei18n-%E7%B1%BB
  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

// 设置 i18n 实例
export const setupI18n = async (app: App) => {
  const options = await createI18nOptions()
  i18n = createI18n(options)
  app.use(i18n)
}
