import type { RouteLocationNormalizedLoaded } from 'vue-router'

import { watch, unref } from 'vue'
import { useRouter } from 'vue-router'
import { useTitle as _useTitle } from '@radical/utils'
import { useI18n, useLocale } from '@radical/locale'

/**
 * 监听页面更改和动态更改网站标题
 */
export const useWebTitle = (
  title: string,
  preventHandler: (
    route: RouteLocationNormalizedLoaded,
  ) => Promise<boolean> | boolean,
) => {
  const { t } = useI18n()
  const { currentRoute } = useRouter()

  const pageTitle = _useTitle()
  const { getLocale } = useLocale()

  // 监听路由改变、国际化切换
  watch(
    [() => currentRoute.value.path, () => getLocale.value],
    async () => {
      const route = unref(currentRoute)
      if (!preventHandler(route)) {
        return
      }
      const tTitle = t(route?.meta?.title as string)
      pageTitle.value = tTitle ? ` ${tTitle} - ${title} ` : `${title}`
    },
    { immediate: true },
  )
}
