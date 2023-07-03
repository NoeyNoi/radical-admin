import { computed, toRaw, unref } from 'vue'
import { uniqBy } from '@radical/utils'
import { useMultipleTab } from '@radical/stores'
import { useMultipleTabSetting } from '@radical/hooks'
import { RouteRecordRaw, useRouter } from 'vue-router'

export function useFrameKeepAlive() {
  const router = useRouter()
  const { currentRoute } = router
  const { getShowMultipleTab } = useMultipleTabSetting()
  const tabStore = useMultipleTab()
  const getFramePages = computed(() => {
    const ret =
      getAllFramePages(
        toRaw(router.getRoutes()) as unknown as RouteRecordRaw[],
      ) || []
    return ret
  })
  const getOpenTabList = computed((): string[] => {
    return tabStore.getTabList.reduce((prev: string[], next) => {
      if (next.meta && Reflect.has(next.meta, 'frameSrc')) {
        prev.push(next.name as string)
      }
      return prev
    }, [])
  })
  function getAllFramePages(routes: RouteRecordRaw[]): RouteRecordRaw[] {
    let res: RouteRecordRaw[] = []
    for (const route of routes) {
      const { meta: { frameSrc } = {}, children } = route
      if (frameSrc) {
        res.push(route)
      }
      if (children && children.length) {
        res.push(...getAllFramePages(children))
      }
    }
    res = uniqBy(res, 'name')
    return res
  }
  function showIframe(item: RouteRecordRaw) {
    return item.name === unref(currentRoute).name
  }
  function hasRenderFrame(name: string) {
    if (!unref(getShowMultipleTab)) {
      return router.currentRoute.value.name === name
    }
    return unref(getOpenTabList).includes(name)
  }

  return { hasRenderFrame, getFramePages, showIframe, getAllFramePages }
}
