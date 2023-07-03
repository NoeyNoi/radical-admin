import { loadRoutesFromModules } from '@radical/utils'
import { RouteRecordRaw } from 'vue-router'
import {
  LOGIN_ROUTE,
  ROOT_ROUTE,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
} from './basic'

const routeModuleRecord = import.meta.glob('./modules/**/*.ts', { eager: true })
// @ts-ignore
const routeModules: RouteRecordRaw[] = loadRoutesFromModules(routeModuleRecord)

export const asyncRoutes = [...routeModules]

export const BasicRoutes = [
  LOGIN_ROUTE,
  ROOT_ROUTE,
  REDIRECT_ROUTE,
  // 这个务必放到最后
  PAGE_NOT_FOUND_ROUTE,
]
