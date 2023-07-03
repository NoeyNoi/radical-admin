import type { LocaleType } from '@radical/types'
import { computed } from 'vue'
import { LOCALE_KEY } from '@radical/constants'
import { useLocalStorage } from '@radical/utils'
import { localeSetting } from './config'

const store = useLocalStorage(LOCALE_KEY, localeSetting)

export function setLocale(locale: LocaleType) {
  store.value.locale = locale
}

// 获取缓存中的locale配置
export const getLocale = computed(() => store.value.locale)
