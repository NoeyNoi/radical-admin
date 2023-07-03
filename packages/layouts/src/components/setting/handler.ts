import { HandlerSettingEnum, MenuTypeEnum } from '@radical/constants'
import { ProjectConfig } from '@radical/types'
import { useConfigStore } from '@radical/stores'
import { updateColorWeak } from '../../logics/updateColorWeak'
import { updateGrayMode } from '../../logics/updateGrayMode'

export function baseHandler(event: HandlerSettingEnum, value: any) {
  const configStore = useConfigStore()
  const config = handler(event, value)
  // @ts-ignore
  configStore.setProjectConfig(config)
}

export function handler(
  event: HandlerSettingEnum,
  value: any,
): DeepPartial<ProjectConfig> {
  switch (event) {
    // 菜单模式
    case HandlerSettingEnum.CHANGE_LAYOUT:
      const { mode, type } = value
      return {
        menuSetting: {
          mode,
          type,
          collapsed: false,
          show: true,
          hidden: false,
        },
        showBreadCrumb: Boolean(type !== MenuTypeEnum.TOP_MENU),
      }
    // 菜单手风琴模式
    case HandlerSettingEnum.MENU_ACCORDION:
      return { menuSetting: { accordion: value } }
    // 顶部菜单布局
    case HandlerSettingEnum.MENU_TOP_ALIGN:
      return { menuSetting: { topMenuAlign: value } }
    // 左侧菜单
    case HandlerSettingEnum.MENU_SHOW_SIDEBAR:
      return { menuSetting: { show: value } }

    // ============root==================
    // 内容全屏
    case HandlerSettingEnum.FULL_CONTENT:
      return { fullContent: value, multiTabsSetting: { show: !value } }
    // 面包屑
    case HandlerSettingEnum.SHOW_BREADCRUMB:
      return { showBreadCrumb: value }
    // 灰色模式
    case HandlerSettingEnum.GRAY_MODE:
      updateGrayMode(value)
      return { grayMode: value }
    // 色弱模式
    case HandlerSettingEnum.COLOR_WEAK:
      updateColorWeak(value)
      return { colorWeak: value }

    // ============tabs==================
    // 标签页快捷按钮
    case HandlerSettingEnum.TABS_SHOW_QUICK:
      return { multiTabsSetting: { showQuick: value } }
    // 标签页
    case HandlerSettingEnum.TABS_SHOW:
      return { multiTabsSetting: { show: value } }
    // 标签页刷新按钮
    case HandlerSettingEnum.TABS_SHOW_REDO:
      return { multiTabsSetting: { showRedo: value } }
    // 标签页折叠按钮
    case HandlerSettingEnum.TABS_SHOW_FOLD:
      return { multiTabsSetting: { showFold: value } }

    // ============header==================
    // 顶栏显示
    case HandlerSettingEnum.HEADER_SHOW:
      return { headerSetting: { show: value } }
    default:
      return {}
  }
}
