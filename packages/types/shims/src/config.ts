import {
  CacheTypeEnum,
  MenuModeEnum,
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeEnum,
} from '@radical/constants'

export type LocaleType = 'zh_CN' | 'en'

export interface LocaleConfig {
  // 当前的语言
  locale: LocaleType
  // 默认语言
  fallback: LocaleType
  // 可用的语言设置
  availableLocales: LocaleType[]
}

export interface StaticConfig {
  /**
   *权限类型：
   *frontend：表示权限由前端控制
   *backend：表示权限由后端控制
   */
  authType: 'frontend' | 'backend'
}

export interface DynamicConfig {
  __: string
}

export interface GlobConfig {
  // 网站 title
  title: string
  // 服务接口url
  apiUrl: string
  // 项目简称
  shortName: string
}

export interface GlobEnvConfig {
  // 网站 title
  VITE_GLOB_APP_TITLE: string
  // 服务接口url
  VITE_GLOB_API_URL: string
  // 项目简称
  VITE_GLOB_APP_SHORT_NAME: string
}

export interface DefineAppConfigOptions {
  // 主题
  theme: ThemeEnum
  // 是否显示主题切换按钮
  showThemeModeToggle: boolean
  // pageLayout是否启用 keep-alive
  openKeepAlive: boolean
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: boolean
  // 切换接口时是否删除未关闭的消息并通知
  closeMessageOnSwitch: boolean
  // 切换接口时是否取消已发送但未响应的http请求
  removeAllHttpPending: boolean
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum
  // 配置按钮的显示位置
  settingButtonPosition: SettingButtonPositionEnum
  // 设置抽屉为打开状态
  openSettingDrawer: boolean
  // 权限模式
  permissionMode: PermissionModeEnum
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum
  // 网站灰色模式，对可能的哀悼日期开放
  grayMode: boolean
  // 是否开启弱色模式
  colorWeak: boolean
  sidebar: SidebarConfigOptions
  menu: MenuConfigOptions
  header: HeaderConfigOptions
  logo: LogoConfigOptions
  tabTar: TabTbrConfigOptions
}

export interface SidebarConfigOptions {
  show: boolean
  visible: boolean
  collapsed: boolean
  width: number
  readonly collapsedWidth: number
}
export interface MenuConfigOptions {
  mode: MenuModeEnum
  accordion: boolean
  topMenuAlign: 'start' | 'center' | 'end'

  dropdownPlacement:
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-start'
    | 'bottom'
    | 'bottom-end'
    | 'left-start'
    | 'left'
    | 'left-end'
}

export interface HeaderConfigOptions {
  show: boolean
  visible: boolean
  showFullScreen: boolean
  showLocalePicker: boolean
  showSetting: boolean
  readonly height: number
  // Show breadcrumbs
  showBreadCrumb: boolean
}

export interface LogoConfigOptions {
  show: boolean
  visible: boolean
  showTitle: boolean
}

export interface TabTbrConfigOptions {
  show: boolean
  visible: boolean
  canDrag: boolean
  showQuick: boolean
  showRedo: boolean
  showFold: boolean
  readonly height: number
}

export interface FooterLinkOptions {
  label?: string
  icon?: string
  target?: '_self' | '_blank'
  url: string
}
