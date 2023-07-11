import { stores, router } from './index'
import { BASIC_LOGIN_PATH, PageEnum } from '@radical/constants'

const LOGIN_PATH = BASIC_LOGIN_PATH
const whitePathList: string[] = [LOGIN_PATH]

// 权限守卫
export function createAuthGuard(PAGE_NOT_FOUND_ROUTE) {
  const { authStore } = stores
  // TODO: 路由切换时弱网环境下页面会切换较慢，待添加路由动画
  router.beforeEach(async (to, from, next) => {
    // 白名单 或 忽略鉴权的路由
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
    // 如果动态路由已被添加，则通过
    if (authStore.getIsDynamicAddedRoute) {
      next()
      return
    }
    // 过滤路由、转二级路由、生成菜单等
    const routes = await authStore.buildRoutesAction()
    routes.forEach((route) => {
      router.addRoute(route)
    })
    // 添加404页面
    router.addRoute(PAGE_NOT_FOUND_ROUTE)
    authStore.setDynamicAddedRoute(true)

    /**
     * 首次进入应用时由于是动态路由，会匹配到404页面
     * 参考：https://router.vuejs.org/zh/guide/advanced/dynamic-routing.html
     */
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
export function createTabsGuard(routeChangeCB: Function) {
  router.beforeEach(async (to) => {
    if (whitePathList.includes(to.path)) return
    // 通知监听路由改变的钩子
    routeChangeCB(to)
  })
}
