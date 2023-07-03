import { stores, isRouteMappingMode, router } from './index'

import type { Menu } from '@radical/types'
import { BASIC_LOGIN_PATH, PageEnum } from '@radical/constants'
import { configureDynamicParamsMenu } from './helper'

const LOGIN_PATH = BASIC_LOGIN_PATH
const whitePathList: string[] = [LOGIN_PATH]

// 权限守卫
export function createAuthGuard(PAGE_NOT_FOUND_ROUTE) {
  const { authStore } = stores
  router.beforeEach(async (to, from, next) => {
    // 白名单
    if (whitePathList.includes(to.path as PageEnum) || to.meta.ignoreAuth) {
      next()
      return
    }
    /**
     * 有路由校验且未通过的情况下可以使用以下逻辑，重定向到登录页面
     */
    // const redirectData: {
    //   path: string
    //   replace: boolean
    //   query?: Recordable<string>
    // } = {
    //   path: LOGIN_PATH,
    //   replace: true,
    // }
    // if (to.path) {
    //   redirectData.query = {
    //     ...redirectData.query,
    //     redirect: to.path,
    //   }
    // }
    // next(redirectData)

    // 登录后处理404
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== PageEnum.BASE_HOME
    ) {
      next(PageEnum.BASE_HOME)
      return
    }
    // 动态添加的路由
    if (authStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    // 权限处理：参考https://doc.vvbin.cn/guide/auth.html
    const routes = await authStore.buildRoutesAction()

    routes.forEach((route) => {
      router.addRoute(route)
    })

    router.addRoute(PAGE_NOT_FOUND_ROUTE)

    authStore.setDynamicAddedRoute(true)

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData =
        to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    }
  })
}

// 路由守卫：进入路由，增加Tabs
export function createTabsGuard(func: Function) {
  router.beforeEach(async (to) => {
    if (whitePathList.includes(to.path)) return
    // Notify routing changes
    func(to)
  })
}

export function createParamMenuGuard() {
  const { authStore } = stores
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next()
      return
    }

    // menu has been built.
    if (!authStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    let menus: Menu[] = []
    if (isRouteMappingMode()) {
      menus = authStore.getFrontMenuList
    }
    menus.forEach((item) => configureDynamicParamsMenu(item, to.params))
    next()
  })
}
