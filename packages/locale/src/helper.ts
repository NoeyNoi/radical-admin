import type { LocaleType } from '@radical/types'
import { set } from '@radical/utils'

export const loadLocalePool: LocaleType[] = []

// 设置html lang属性
export const setHtmlPageLang = (locale: LocaleType) => {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export const setLoadLocalePool = (
  cb: (loadLocalePool: LocaleType[]) => void,
) => {
  cb(loadLocalePool)
}

// 获取对应的模块的字段映射
export const genMessage = (
  langs: Record<string, Record<string, any>>,
  prefix = 'lang',
) => {
  const obj: Recordable<any> = {}

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}
