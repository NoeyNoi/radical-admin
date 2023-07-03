import { DefineAppConfigOptions } from '@radical/types'
import { PermissionModeEnum } from '@radical/constants'
import { useAppConfig } from '@radical/stores'
import { _assign } from '@radical/utils'
import { createRouter, createWebHashHistory, Router } from 'vue-router'
export * from './helper'
export * from './guard'
export * from './menus'
export * from './mitt/routeChange'

export interface Stores {
  userStore?: any
  authStore?: any
  appConfig?: DefineAppConfigOptions
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

export function initGuard(s: Stores) {
  _assign(stores, s)
  stores.appConfig = useAppConfig()
}

export const getPermissionMode = () => {
  return stores.appConfig?.permissionMode
}

export const isRouteMappingMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROUTE_MAPPING
}
export const isRoleMode = () => {
  return getPermissionMode() === PermissionModeEnum.ROLE
}
