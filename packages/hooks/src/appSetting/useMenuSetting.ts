import { computed, unref, ref } from 'vue'
import type { MenuSetting } from '@radical/types'

import {
  SIDE_BAR_MINI_WIDTH,
  MenuModeEnum,
  MenuTypeEnum,
} from '@radical/constants'

import { useConfigStoreWithOut } from '@radical/stores'

import { useFullContent } from '../web'

const mixSideHasChildren = ref(false)

export function useMenuSetting() {
  const { getFullContent: fullContent } = useFullContent()
  const configStore = useConfigStoreWithOut()
  const getShowSidebar = computed(() => {
    return (
      unref(getShowMenu) &&
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
      !unref(fullContent)
    )
  })

  const getCollapsed = computed(() => configStore.getMenuSetting.collapsed)
  const getCollapsedWidth = computed(
    () => configStore.getMenuSetting.collapsedWidth,
  )

  const getMenuType = computed(() => configStore.getMenuSetting.type)

  const getMenuMode = computed(() => configStore.getMenuSetting.mode)

  const getShowMenu = computed(() => configStore.getMenuSetting.show)

  const getMenuHidden = computed(() => configStore.getMenuSetting.hidden)

  const getMenuWidth = computed(() => configStore.getMenuSetting.menuWidth)

  const getAccordion = computed(() => configStore.getMenuSetting.accordion)

  const getTopMenuAlign = computed(
    () => configStore.getMenuSetting.topMenuAlign,
  )

  const getIsSidebarType = computed(
    () => unref(getMenuType) === MenuTypeEnum.SIDEBAR,
  )

  const getIsTopMenu = computed(
    () => unref(getMenuType) === MenuTypeEnum.TOP_MENU,
  )

  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.HORIZONTAL
  })

  const getIsMixMode = computed(() => {
    return (
      unref(getMenuMode) === MenuModeEnum.INLINE &&
      unref(getMenuType) === MenuTypeEnum.MIX
    )
  })

  const getRealWidth = computed(() => {
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth)
  })

  const getMiniWidthNumber = computed(() => {
    return SIDE_BAR_MINI_WIDTH
  })

  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || unref(getMenuHidden)
        ? 0
        : unref(getRealWidth)

    return `calc(100% - ${unref(width)}px)`
  })

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    configStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    })
  }
  return {
    setMenuSetting,
    toggleCollapsed,
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getCollapsedWidth,
    getMiniWidthNumber,
    getCalcContentWidth,
    getMenuWidth,
    getIsSidebarType,
    getAccordion,
    getShowTopMenu,
    getTopMenuAlign,
    getMenuHidden,
    getIsTopMenu,
    getShowSidebar,
    getIsMixMode,
    mixSideHasChildren,
  }
}
