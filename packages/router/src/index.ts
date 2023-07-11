import { PermissionModeEnum } from '@radical/constants'
import { useConfigStoreWithOut } from '@radical/stores'
import { _assign } from '@radical/utils'
import { createRouter, createWebHashHistory, Router } from 'vue-router'
import { unref } from 'vue'
export * from './helper'
export * from './guard'
export * from './menus'
export * from './mitt/routeChange'

export interface Stores {
  userStore?: any
  authStore?: any
}

export const stores: Stores = {}

const WHITE_NAME_LIST: string[] = []
let basicRoutes: RouteRecordItem[] = []
export let router: Router

export function InitRouter(
  path: string,
  BasicRoutes: RouteRecordItem[],
): Router {
  basicRoutes = BasicRoutes
  // 白名单处理
  ;(() => {
    const getRouteNames = (routeRecords: RouteRecordItem[]) =>
      routeRecords.forEach((item) => {
        WHITE_NAME_LIST.push(item.name)
        if (item?.children?.length) {
          getRouteNames(item.children)
        }
      })
    getRouteNames(basicRoutes)
  })()

  router = createRouter({
    history: createWebHashHistory(path),
    // @ts-ignore
    routes: basicRoutes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  })
  return router
}

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}
// 初始化守卫依赖的store
export function initStoreForGuard(s: Stores) {
  _assign(stores, s)
}

export const getPermissionMode = () => {
  const configStore = useConfigStoreWithOut()
  return unref(configStore.getProjectConfig.permissionMode)
}

export const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE
}
