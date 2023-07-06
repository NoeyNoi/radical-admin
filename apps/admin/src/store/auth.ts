import { defineStore, useConfigStoreWithOut } from '@radical/stores'
import { filterTree } from '@radical/utils'
import { Menu } from '@radical/types'
import { useUserStore } from './user'
import { toRaw, unref } from 'vue'
import { PermissionModeEnum, PageEnum } from '@radical/constants'
import { flatMultiLevelRoutes, transformRouteToMenu } from '@radical/router'
import { asyncRoutes } from '@/router/routes'

interface AuthState {
  // 是否已动态添加路由
  isDynamicAddedRoute: boolean
  // 触发菜单更新
  lastBuildMenuTime: number
  // 前端菜单列表
  frontMenuList: Menu[]
}

export const useAuthStore = defineStore('app-auth-store', {
  state: (): AuthState => ({
    isDynamicAddedRoute: false,
    lastBuildMenuTime: 0,
    frontMenuList: [],
  }),
  getters: {
    getFrontMenuList(): Menu[] {
      return this.frontMenuList
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setFrontMenuList(list: Menu[]) {
      this.frontMenuList = list
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added
    },
    resetState(): void {
      this.isDynamicAddedRoute = false
      this.lastBuildMenuTime = 0
    },
    async buildRoutesAction(): Promise<RouteRecordItem[]> {
      // const { t } = useI18n()
      const configStore = useConfigStoreWithOut()
      const userStore = useUserStore()

      let routes: RouteRecordItem[] = []
      const roleList = toRaw(userStore.getRoles) || []
      const permissionMode = unref(configStore.getProjectConfig.permissionMode)

      // 根据 meta.roles 结合 roleList 过滤掉无权限路由
      const routeFilter = (route: RouteRecordItem) => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some((role) => roles.includes(role))
      }
      // 根据 meta.ignoreRoute 过滤路由
      const routeRemoveIgnoreFilter = (route: RouteRecordItem) => {
        const { meta } = route
        const { ignoreRoute } = meta || {}
        return !ignoreRoute
      }
      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: RouteRecordItem[]) => {
        if (!routes || routes.length === 0) return
        let homePath: string = PageEnum.BASE_HOME
        function patcher(routes: RouteRecordItem[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/'
          routes.forEach((route: RouteRecordItem) => {
            const { path, children, redirect } = route
            const currentPath = path.startsWith('/') ? path : parentPath + path
            if (currentPath === homePath) {
              if (redirect) {
                homePath = route.redirect! as string
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true })
                throw new Error('end')
              }
            }
            children && children.length > 0 && patcher(children, currentPath)
          })
        }
        try {
          patcher(routes)
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return
      }
      // 路由处理
      switch (permissionMode) {
        case PermissionModeEnum.ROLE:
          // @ts-ignore
          routes = filterTree(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          // 将多级路由转换为二级路由
          routes = flatMultiLevelRoutes(routes)
          break
        case PermissionModeEnum.ROUTE_MAPPING:
          // @ts-ignore
          routes = filterTree(asyncRoutes, routeFilter)
          routes = routes.filter(routeFilter)
          // 相比ROLE模式，多了菜单自动生成
          const menuList = transformRouteToMenu(routes)
          routes = filterTree(routes, routeRemoveIgnoreFilter)
          routes = routes.filter(routeRemoveIgnoreFilter)
          // 菜单排序
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })
          this.setFrontMenuList(menuList as Menu[])
          // 将多级路由转换为二级路由
          routes = flatMultiLevelRoutes(routes)
          break
      }
      patchHomeAffix(routes)
      return routes
    },
  },
})

// 需要在setup外使用时
export function useAuthStoreWithout() {
  return useAuthStore()
}
