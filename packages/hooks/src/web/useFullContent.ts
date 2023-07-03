import { computed, unref } from 'vue'

import { useConfigStoreWithOut } from '@radical/stores'

import { useRouter } from 'vue-router'

/**
 * @description: content部分全屏展示
 */
export const useFullContent = () => {
  const appStore = useConfigStoreWithOut()
  const router = useRouter()
  const { currentRoute } = router

  /**
   * 当地址栏有完整查询参数 __full__时显示全屏
   * 否则返回默认的项目配置
   */
  const getFullContent = computed(() => {
    const route = unref(currentRoute)
    const query = route.query
    if (query && Reflect.has(query, '__full__')) {
      return true
    }
    return appStore.getProjectConfig.fullContent
  })

  return { getFullContent }
}
