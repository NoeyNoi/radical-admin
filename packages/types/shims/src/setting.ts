import {
  CacheTypeEnum,
  MenuModeEnum,
  MenuTypeEnum,
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
} from '@radical/constants'
import { LocaleType } from './config'

export interface MenuSetting {
  collapsed: boolean
  show: boolean
  hidden: boolean
  menuWidth: number
  mode: MenuModeEnum
  type: MenuTypeEnum
  topMenuAlign: 'start' | 'center' | 'end'
  accordion: boolean
  readonly width?: number
  readonly collapsedWidth?: number
}

export interface MultiTabsSetting {
  show: boolean
  hidden?: boolean
  showQuick: boolean
  canDrag: boolean
  showRedo: boolean
  showFold: boolean
  readonly height?: number
}

export interface HeaderSetting {
  // 是否显示顶部
  show: boolean
  hidden?: boolean
  // 显示全屏按钮
  showFullScreen: boolean
  // 显示国际化切换按钮
  showLocalePicker: boolean
  // 高度
  readonly height?: number
}

export interface LocaleSetting {
  // 是否显示语言选择器
  showPicker: boolean
  // 当前语言
  locale: LocaleType
  // 默认语言
  fallback: LocaleType
  // 允许的语言
  availableLocales: LocaleType[]
}

// 一些零星的配置
export interface SporadicSetting {
  // pageLayout是否启用 keep-alive
  openKeepAlive: boolean
  // 显示面包屑
  showBreadCrumb: boolean
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean
  // TODO：待实现，切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: boolean
  // TODO：待实现
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: boolean
  // 是否显示设置按钮
  showSettingButton: boolean
  // 是否显示主题切换按钮
  showDarkModeToggle: boolean
  // 设置按钮位置 可选项，AUTO: 自动选择；HEADER: 位于头部；FIXED: 固定在右侧
  settingButtonPosition: SettingButtonPositionEnum
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum
  // 权限模式,默认前端角色权限模式
  // ROUTE_MAPPING: 前端模式（菜单由路由生成，默认）
  // ROLE：前端模式（菜单路由分开）
  permissionMode: PermissionModeEnum
  // TODO：需要接口配合：会话超时处理方案
  // ROUTE_JUMP: 路由跳转到登录页
  // PAGE_COVERAGE: 生成登录弹窗，覆盖当前页面
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // 网站灰色模式，用于可能悼念的日期开启
  grayMode: boolean
  // 色弱模式
  colorWeak: boolean
  // 是否取消菜单,顶部,多标签页显示, 用于可能内嵌在别的系统内
  fullContent: boolean
}

export interface ProjectConfig extends SporadicSetting {
  // 头部配置
  headerSetting: HeaderSetting
  // 菜单配置
  menuSetting: MenuSetting
  // 多标签配置
  multiTabsSetting: MultiTabsSetting
}
