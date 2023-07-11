import type { Router, RouteRecordNormalized } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { omit, cloneDeep } from '@radical/utils'

/**
 * 将多级路由转换为二级路由
 */
export function flatMultiLevelRoutes(routeModules: RouteRecordItem[]) {
  const modules: RouteRecordItem[] = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    // 这里是一个引用，routeModule的改变最终会反应到modules上
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    promoteRouteLevel(routeModule)
  }
  return modules
}

// 确定路由是否超过2级
function isMultipleRoute(routeModule: RouteRecordItem) {
  if (
    !routeModule ||
    !Reflect.has(routeModule, 'children') ||
    !routeModule.children?.length
  ) {
    return false
  }

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

// 转换路由，将多级路由转为二级路由
function promoteRouteLevel(routeModule: RouteRecordItem) {
  // 使用 vue-router 分割菜单
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null
  // 删除原 children 字段
  routeModule.children = routeModule.children?.map((item): any =>
    omit(item, 'children'),
  )
}

// 将所有子路由添加到二级路由
function addToChildren(
  routes: RouteRecordNormalized[],
  children: RouteRecordItem[],
  routeModule: RouteRecordItem,
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    // 找到二级根路由
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as RouteRecordItem)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}
