/**
 * utils中包含了
 * 自定义方法
 * vueuse: https://vueuse.org/core/useLocalStorage/
 * lodash的部分方法
 * sortablejs：https://github.com/SortableJS/Sortable/tree/master
 */
export * from './src'
export * from '@vueuse/core'
export {
  isEqual,
  omit,
  cloneDeep,
  isUndefined,
  clone,
  isArray,
  isString,
  toString,
  uniq,
  uniqBy,
  assign as _assign,
  merge as _merge,
  omit as _omit,
} from 'lodash-es'
// @ts-ignore
import Sortable from 'sortablejs'
export { Sortable }
