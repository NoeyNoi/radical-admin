import { defineStore } from 'pinia'
import { toRaw, unref } from 'vue'
import {
  PAGE_NOT_FOUND_NAME,
  PageEnum,
  REDIRECT_NAME,
} from '@radical/constants'
import type {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from 'vue-router'
import { getRawRoute } from '@radical/utils'
import { context } from '../../bridge'

function handleGotoPage(router: Router) {
  const { useGo } = context
  const go = useGo(router)
  go(unref(router.currentRoute).path, true)
}

const getToTarget = (tabItem: RouteLocationNormalized) => {
  const { params, path, query } = tabItem
  return {
    params: params || {},
    path,
    query: query || {},
  }
}

export interface MultipleTabState {
  cacheTabList: Set<string>
  tabList: RouteLocationNormalized[]
  lastDragEndIndex: number
}
export const useMultipleTab = defineStore({
  id: 'APP_MULTIPLE_TABS',
  state: (): MultipleTabState => ({
    // 需要缓存的选项卡
    cacheTabList: new Set(),
    tabList: [],
    // 上次移动的选项卡的索引
    lastDragEndIndex: 0,
  }),
  getters: {
    getTabList(): RouteLocationNormalized[] {
      return this.tabList
    },
    getCachedTabList(): string[] {
      return Array.from(this.cacheTabList)
    },
    getLastDragEndIndex(): number {
      return this.lastDragEndIndex
    },
  },
  actions: {
    /**
     * 根据当前打开的选项卡更新缓存
     */
    async updateCacheTab() {
      const cacheMap: Set<string> = new Set()
      for (const tab of this.tabList) {
        const item = getRawRoute(tab)
        // 根据ignoreKeepAlive配置忽略对应的缓存
        const needCache = !item.meta.ignoreKeepAlive
        if (!needCache) {
          continue
        }
        const name = item.name as string
        cacheMap.add(name)
      }
      this.cacheTabList = cacheMap
    },
    /**
     * 刷新 tabs
     */
    async refreshPage(router: Router) {
      const { useRedo } = context
      const { currentRoute } = router
      const route = unref(currentRoute)
      const name = route.name

      const findTab = this.getCachedTabList.find((item) => item === name)
      if (findTab) {
        this.cacheTabList.delete(findTab)
      }
      const redo = useRedo(router)
      await redo()
    },
    clearCacheTabs(): void {
      this.cacheTabList = new Set()
    },
    resetState(): void {
      this.tabList = []
      this.clearCacheTabs()
    },
    goToPage(router: Router) {
      const { useGo } = context
      const go = useGo(router)
      const len = this.tabList.length
      const { path } = unref(router.currentRoute)

      let toPath: PageEnum | string = PageEnum.BASE_HOME

      if (len > 0) {
        const page = this.tabList[len - 1]
        const p = page.fullPath || page.path
        if (p) {
          toPath = p
        }
      }
      path !== toPath && go(toPath, true)
    },
    // 检查页面是否需要添加到tabs中
    async checkTab(route: RouteLocationNormalized) {
      const { path, name, meta } = getRawRoute(route)
      // 404页面不需要添加到tab
      if (
        [PageEnum.ERROR_PAGE, PageEnum.BASE_LOGIN].includes(path as PageEnum) ||
        meta?.hideTab ||
        !name ||
        [REDIRECT_NAME, PAGE_NOT_FOUND_NAME].includes(name as string)
      ) {
        return
      }
      await this.addTab(route)
    },
    // 添加到tab
    async addTab(route: RouteLocationNormalized) {
      const { path, fullPath, params, query, meta } = getRawRoute(route)
      let updateIndex = -1
      // 已存在的页面则不重复添加
      const tabHasExits = this.tabList.some((tab, index) => {
        updateIndex = index
        return (tab.fullPath || tab.path) === (fullPath || path)
      })
      // 存在则更新
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex]
        if (!curTab) {
          return
        }
        curTab.params = params || curTab.params
        curTab.query = query || curTab.query
        curTab.fullPath = fullPath || curTab.fullPath
        // 替换原有的tab
        this.tabList.splice(updateIndex, 1, curTab)
      } else {
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        const dynamicLevel = meta.dynamicLevel ?? -1
        if (dynamicLevel > 0) {
          // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
          // !首先获取到真实的路由，使用配置方式减少计算开销
          const realPath = meta.realPath ?? ''
          // 获取到已经打开的动态路由数, 判断是否大于某一个值
          if (
            this.tabList.filter((e) => e.meta.realPath ?? '' === realPath)
              .length >= dynamicLevel
          ) {
            // 关闭第一个
            const index = this.tabList.findIndex(
              (item) => item.meta.realPath === realPath,
            )
            index !== -1 && this.tabList.splice(index, 1)
          }
        }
        this.tabList.push(route)
      }
      await this.updateCacheTab()
    },
    // 关闭选中的tab
    async closeTab(tab: RouteLocationNormalized, router: Router) {
      const close = (route: RouteLocationNormalized) => {
        // @ts-ignore
        const { fullPath, meta: { affix } = {} } = route
        if (affix) {
          return
        }
        const index = this.tabList.findIndex(
          (item) => item.fullPath === fullPath,
        )
        index !== -1 && this.tabList.splice(index, 1)
      }

      const { currentRoute, replace } = router
      const { path } = unref(currentRoute)
      // 非active的tab直接关闭
      if (path !== tab.path) {
        close(tab)
        return
      }
      // 关闭 active tab
      let toTarget: RouteLocationRaw = {}
      const index = this.tabList.findIndex((item) => item.path === path)
      // 如果当前是最左边的选项卡
      if (index === 0) {
        // 只有一个选项卡，则跳转到主页，否则跳转到右侧选项卡
        if (this.tabList.length === 1) {
          toTarget = PageEnum.BASE_HOME
        } else {
          const page = this.tabList[index + 1]
          toTarget = getToTarget(page)
        }
      } else {
        // 跳转到左侧选项卡
        const page = this.tabList[index - 1]
        toTarget = getToTarget(page)
      }
      close(currentRoute.value)
      await replace(toTarget)
    },
    // 关闭当前tab左侧非affix的tab
    async closeLeftTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex((item) => item.path === route.path)
      if (index > 0) {
        const leftTabs = this.tabList.slice(0, index)
        const pathList: string[] = []
        for (const item of leftTabs) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkCloseTabs(pathList)
      }
      this.updateCacheTab()
      handleGotoPage(router)
    },
    // 关闭当前tab右侧非affix的tab
    async closeRightTabs(route: RouteLocationNormalized, router: Router) {
      const index = this.tabList.findIndex(
        (item) => item.fullPath === route.fullPath,
      )
      if (index >= 0 && index < this.tabList.length - 1) {
        const rightTabs = this.tabList.slice(index + 1, this.tabList.length)
        const pathList: string[] = []
        for (const item of rightTabs) {
          const affix = item?.meta?.affix ?? false
          if (!affix) {
            pathList.push(item.fullPath)
          }
        }
        this.bulkCloseTabs(pathList)
      }
      this.updateCacheTab()
      handleGotoPage(router)
    },
    async closeAllTab(router: Router) {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false)
      this.clearCacheTabs()
      this.goToPage(router)
    },
    /**
     * 关闭其他tabs
     */
    async closeOtherTabs(route: RouteLocationNormalized, router: Router) {
      const closePathList = this.tabList.map((item) => item.fullPath)
      const pathList: string[] = []
      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find((item) => item.path === path)
          if (!closeItem) {
            continue
          }
          const affix = closeItem?.meta?.affix ?? false
          if (!affix) {
            pathList.push(closeItem.fullPath)
          }
        }
      }
      this.bulkCloseTabs(pathList)
      this.updateCacheTab()
      handleGotoPage(router)
    },
    /**
     * 批量关闭选项卡
     */
    async bulkCloseTabs(pathList: string[]) {
      this.tabList = this.tabList.filter(
        (item) => !pathList.includes(item.fullPath),
      )
    },
    /**
     * 设置tab标题
     */
    async setTabTitle(title: string, route: RouteLocationNormalized) {
      const findTab = this.getTabList.find((item) => item === route)
      if (findTab) {
        findTab.meta.title = title
        await this.updateCacheTab()
      }
    },
  },
  persist: {
    paths: ['tabList'],
  },
})
