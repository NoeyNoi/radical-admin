import type { RouteRecordRaw, RouteMeta, RouteComponent } from 'vue-router'

type Lazy<T> = () => Promise<T>

export type RouteRecordItem = RouteRecordRaw & {
  path: string
  name: string
  meta: RouteMeta
  root?: Boolean
  children?: RouteRecordItem[]
  component?: RouteComponent | Lazy<RouteComponent> | string
}
