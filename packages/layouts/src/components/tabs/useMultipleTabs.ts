import { toRaw, ref } from 'vue'
import type { RouteLocationNormalized } from 'vue-router'
import { useRouter } from 'vue-router'
import { useMultipleTab } from '@radical/stores'
export function initAffixTabs(): string[] {
  const affixList = ref<RouteLocationNormalized[]>([])

  const tabStore = useMultipleTab()
  const router = useRouter()
  /**
   * @description: Filter all fixed routes
   */
  function filterAffixTabs(routes: RouteLocationNormalized[]) {
    const tabs: RouteLocationNormalized[] = []
    routes &&
      routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tabs.push(toRaw(route))
        }
      })
    return tabs
  }

  /**
   * @description: Set fixed tabs
   */
  async function addAffixTabs(): Promise<void> {
    const affixTabs = filterAffixTabs(
      router.getRoutes() as unknown as RouteLocationNormalized[],
    )
    affixList.value = affixTabs
    for (const tab of affixTabs) {
      await tabStore.checkTab({
        meta: tab.meta,
        name: tab.name,
        path: tab.path,
      } as unknown as RouteLocationNormalized)
    }
  }

  let isAddAffix = false

  if (!isAddAffix) {
    addAffixTabs().catch()
    isAddAffix = true
  }
  return affixList.value
    .map((item) => item.meta?.title)
    .filter(Boolean) as string[]
}
