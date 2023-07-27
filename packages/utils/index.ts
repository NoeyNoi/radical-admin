/**
 * utils中包含了
 * 自定义方法
 * vueuse 的部分方法: https://vueuse.org/core/useLocalStorage/
 * lodash 的部分方法: https://lodash.com/docs/4.17.15
 * sortablejs：https://github.com/SortableJS/Sortable/tree/master
 */

export * from './src'

export {
  useFullscreen,
  useTransition,
  TransitionPresets,
  useElementSize,
  useLocalStorage,
  useTitle,
  useDebounceFn,
  tryOnBeforeUnmount,
  tryOnUnmounted,
  useIntervalFn,
  computedAsync,
  useTimeoutFn,
} from '@vueuse/core'

export {
  isEqual,
  omit,
  cloneDeep,
  isUndefined,
  clone,
  isArray,
  isString,
  toString,
  isFunction,
  isObject,
  uniq,
  uniqBy,
  assign as _assign,
  set,
  isNumber,
  merge as deepMerge,
} from 'lodash-es'

// @ts-ignore
import Sortable from 'sortablejs'
export { Sortable }
