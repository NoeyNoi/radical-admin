/**
 * 用于监视路由更改，以更改菜单和选项卡的状态
 * 不监听路由是因为路由状态的更改会受到页面呈现时间的影响，导致很慢
 */
import type { RouteLocationNormalized } from 'vue-router'
import { getRawRoute, mitt } from '@radical/utils'

const emitter = mitt()

const key = Symbol()

let lastChangeTab: RouteLocationNormalized

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}
// 使用该方案监听路由会更快，也方便统一管理
export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  emitter.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}

export function removeTabChangeListener() {
  emitter.clear()
}
