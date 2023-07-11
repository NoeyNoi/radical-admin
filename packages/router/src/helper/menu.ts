import { isUrl, cloneDeep, findParentPath, mapTree } from '@radical/utils'
import { Menu } from '@radical/types'

export function getAllParentPath<T = Recordable<any>>(
  treeData: T[],
  path: string,
) {
  const menuList = findParentPath(treeData, (n) => n.path === path) as Menu[]
  return (menuList || []).map((item) => item.path)
}

function joinParentPath(menus: RouteRecordItem[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://router.vuejs.org/zh/guide/essentials/nested-routes.html
    if (!(menu.path.startsWith('/') || isUrl(menu.path))) {
      // 路径不是以/开头，也不是url，则添加到父级path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(
        menu.children,
        menu.meta?.hidePathForChildren ? parentPath : menu.path,
      )
    }
  }
}

// 从route配置生成菜单
export function transformRouteToMenu(routeModList: RouteRecordItem[]) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: RouteRecordItem[] = []

  cloneRouteModList.forEach((item) => {
    // 当隐藏子菜单时，重定向到指定路由
    if (item.meta?.hideChildrenInMenu && typeof item.redirect === 'string') {
      item.path = item.redirect
    }
    // 单个显示
    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })
  // 筛选隐藏子菜单
  routeList.forEach((v) => {
    if (v.meta.hideChildrenInMenu) {
      delete v.children
    }
  })
  const list = mapTree(routeList, {
    conversion: (node: RouteRecordItem) => {
      const { meta: { hideMenu = false } = {} } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: node.name,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {}),
      }
    },
  })
  joinParentPath(list)
  return cloneDeep(list)
}
