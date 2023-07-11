import type { RouteRecordNormalized } from 'vue-router'
import { stores, isRoleMode, router } from '../index'
import { getAllParentPath } from '../helper'
import { isUrl, filterTree } from '@radical/utils'

import { pathToRegexp } from 'path-to-regexp'
import { Menu } from '@radical/types'

// ===========================
// ==========Helper===========
// ===========================

async function getAsyncMenus() {
  const authStore = stores.authStore
  return authStore.getFrontMenuList.filter(
    (item) => !item.hideMenu && !item.meta?.hideMenu,
  )
}

export const getMenus = async (): Promise<Menu[]> => {
  const menus = await getAsyncMenus()
  if (isRoleMode()) {
    const routes = router.getRoutes()
    return filterTree(menus, basicFilter(routes))
  }
  return menus
}

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus()
  const allParentPath = await getAllParentPath(menus, currentPath)
  return allParentPath?.[0]
}

function basicFilter(routes: RouteRecordNormalized[]) {
  return (menu: Menu) => {
    const matchRoute = routes.find((route) => {
      if (isUrl(menu.path)) return true

      if (route.meta.carryParam) {
        return pathToRegexp(route.path).test(menu.path)
      }
      const isSame = route.path === menu.path
      if (!isSame) return false

      if (route.meta?.ignoreAuth) return true

      return isSame || pathToRegexp(route.path).test(menu.path)
    })

    if (!matchRoute) return false
    menu.icon = (menu.icon || matchRoute.meta.icon) as string
    menu.meta = matchRoute.meta
    return true
  }
}
