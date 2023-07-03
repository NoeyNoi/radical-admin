import { MenuModeEnum } from '@radical/constants'
import { Menu as MenuType } from '@radical/types'
import type { MenuState } from './types'
import { computed, Ref, toRaw, unref } from 'vue'
import { useTimeoutFn, uniq } from '@radical/utils'
import { getAllParentPath } from '@radical/router'
import { useMenuSetting } from '@radical/hooks'

export function useOpenKeys(
  menuState: MenuState,
  menus: Ref<MenuType[]>,
  mode: Ref<MenuModeEnum>,
) {
  // @ts-ignore
  const { getCollapsed, getAccordion } = useMenuSetting()

  async function setOpenKeys(path: string) {
    if (mode.value === MenuModeEnum.HORIZONTAL) {
      return
    }
    const handle = () => {
      const menuList = toRaw(menus.value)
      if (menuList?.length === 0) {
        menuState.openKeys = []
        return
      }
      if (!unref(getAccordion)) {
        menuState.openKeys = uniq([
          ...menuState.openKeys,
          ...getAllParentPath(menuList, path),
        ])
      } else {
        menuState.openKeys = getAllParentPath(menuList, path)
      }
    }
    useTimeoutFn(handle, 16)
  }

  const getOpenKeys = computed(() => {
    const collapse = unref(getCollapsed)
    return collapse ? menuState.collapsedOpenKeys : menuState.openKeys
  })

  /**
   * @description:  重置值
   */
  function resetKeys() {
    menuState.selectedKeys = []
    menuState.openKeys = []
  }

  function handleOpenChange(openKeys: string[]) {
    if (unref(mode) === MenuModeEnum.HORIZONTAL || !unref(getAccordion)) {
      menuState.openKeys = openKeys
    } else {
      // const menuList = toRaw(menus.value);
      // getAllParentPath(menuList, path);
      const rootSubMenuKeys: string[] = []
      for (const { children, path } of unref(menus)) {
        if (children && children.length > 0) {
          rootSubMenuKeys.push(path)
        }
      }
      if (!unref(getCollapsed)) {
        const latestOpenKey = openKeys.find(
          (key) => menuState.openKeys.indexOf(key) === -1,
        )
        if (rootSubMenuKeys.indexOf(latestOpenKey as string) === -1) {
          menuState.openKeys = openKeys
        } else {
          menuState.openKeys = latestOpenKey ? [latestOpenKey] : []
        }
      } else {
        menuState.collapsedOpenKeys = openKeys
      }
    }
  }
  return { setOpenKeys, resetKeys, getOpenKeys, handleOpenChange }
}
