import { RoleEnum } from '@radical/constants'
import type { RouteMeta } from 'vue-router'

export interface MenuTag {
  // 类型
  type?: 'primary' | 'error' | 'warn' | 'success'
  // 内容
  content?: string
  // 为true则显示小圆点
  dot?: boolean
}

export interface Menu {
  //  菜单名
  name: string
  // 菜单图标,如果没有，则会尝试使用route.meta.icon
  icon?: string
  // 菜单路径
  path: string
  // 路径参数
  paramPath?: string
  // 是否禁用
  disabled?: boolean
  // 子菜单
  children?: Menu[]
  orderNo?: number
  roles?: RoleEnum[]
  meta?: Partial<RouteMeta>
  // 菜单标签设置
  tag?: MenuTag
  hideMenu?: boolean
  label?: Node | JSX.Element | string
  key?: string | number | Symbol
}

export interface MenuModule {
  orderNo?: number
  menu: Menu
}
