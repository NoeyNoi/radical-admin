import {
  REDIRECT_NAME,
  PAGE_NOT_FOUND_NAME,
  BASIC_HOME_PATH,
} from '@radical/constants'
import Exception from '@/pages/sys/exception/index.vue'
import Redirect from '@/pages/sys/redirect/index.vue'
import { t } from '@radical/locale'

// 页面主体，包括头部、菜单、面包屑等，即非页面内容部分
const LAYOUT = () => import('@/layout/index.vue')

// 404 页面
const PAGE_NOT_FOUND_ROUTE: RouteRecordItem = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    key: 333,
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: () => Exception,
      meta: {
        title: 'ErrorPage',
        key: 3333,
      },
    },
  ],
}

// 重定向页面
const REDIRECT_ROUTE: RouteRecordItem = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true,
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: Redirect,
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true,
      },
    },
  ],
}
// 根路由
const ROOT_ROUTE: RouteRecordItem = {
  path: '/',
  name: 'Root',
  redirect: BASIC_HOME_PATH,
  meta: {
    title: 'Root',
  },
}
// 登录页面
const LOGIN_ROUTE: RouteRecordItem = {
  path: '/login',
  name: 'Login',
  component: () => import('@/pages/sys/login/login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
}

export { LAYOUT, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE, ROOT_ROUTE, LOGIN_ROUTE }
