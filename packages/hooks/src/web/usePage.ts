import type { RouteLocationRaw, Router } from 'vue-router'
import { REDIRECT_NAME, PageEnum } from '@radical/constants'
import { unref } from 'vue'
import { useRouter } from 'vue-router'
import { useNProgress } from './useNProgress'

export type PathAsPageEnum<T> = T extends { path: string }
  ? T & { path: PageEnum }
  : T
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>

function handleError(e: Error) {
  console.error(`页面跳转错误：${e}`)
}

/**
 * 页面切换，推荐所有跳转皆采用该逻辑，原因是这里做了弱网条件下的页面加载进度条，否则可能会有页面假死现象
 */
export function useGo(_router?: Router) {
  const { push, replace } = _router || useRouter()
  function go(opt: RouteLocationRawEx = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) {
      return
    }
    useNProgress(opt as string, 'start')
    isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
  }
  return go
}

/**
 * 页面刷新
 */
export const useRedo = (_router?: Router) => {
  const { push, currentRoute } = _router || useRouter()
  const { query, params = {}, name, fullPath } = unref(currentRoute.value)
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === REDIRECT_NAME) {
        resolve(false)
        return
      }
      if (name && Object.keys(params).length > 0) {
        params['_redirect_type'] = 'name'
        params['path'] = String(name)
      } else {
        params['_redirect_type'] = 'path'
        params['path'] = fullPath
      }
      push({ name: REDIRECT_NAME, params, query }).then(() => resolve(true))
    })
  }
  return redo
}
