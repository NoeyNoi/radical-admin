import { ProjectConfig } from '@radical/types'
import {
  CacheTypeEnum,
  MenuModeEnum,
  MenuTypeEnum,
  PermissionModeEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
} from '@radical/constants'

/**
 * 此处没有放到package，因为每个应用需要个性化的配置
 * ! 更改配置后需要清除浏览器缓存
 */
export const projectSetting: ProjectConfig = {
  // 是否显示设置按钮
  showSettingButton: true,
  // 是否显示主题切换按钮
  showDarkModeToggle: true,
  /**
   * 设置按钮位置 可选项
   * AUTO: 自动选择
   * HEADER: 位于头部
   * FIXED: 固定在右侧
   */
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // 权限模式:通过用户角色来过滤菜单(前端方式控制)，菜单由路由配置自动生成
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 权限缓存存放位置。sessionStorage 或者 localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,
  /**
   * 会话超时处理方案
   * ROUTE_JUMP: 路由跳转到登录页
   * PAGE_COVERAGE: 生成登录弹窗，覆盖当前页面
   */
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // ! 网站灰色模式，用于可能悼念的日期开启
  grayMode: false,
  // 色弱模式
  colorWeak: false,
  // 仅显示内容：将会隐藏菜单、顶部、多标签页显示, 用于嵌入第三方应用
  fullContent: false,
  // 头部配置
  headerSetting: {
    // 是否显示顶部
    show: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示语言选择
    showLocalePicker: true,
  },
  // 菜单配置
  menuSetting: {
    // 菜单折叠
    collapsed: false,
    collapsedWidth: 48,
    // 是否显示
    show: true,
    // 是否显示dom
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 手风琴模式，每次只展示一个菜单
    accordion: false,
  },
  // 多标签
  multiTabsSetting: {
    // 开启
    show: true,
    // 是否可以拖放排序选项卡
    canDrag: true,
    // 开启快速操作
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    // 是否显示折叠按钮
    showFold: true,
  },
  // 是否开启KeepAlive缓存,开发时候最好关闭,不然每次都需要清除缓存
  openKeepAlive: true,
  // 是否显示面包屑
  showBreadCrumb: true,
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: true,
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: true,
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: false,
}
