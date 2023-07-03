import { computed, unref } from 'vue'
import type { HeaderSetting } from '@radical/types'
import { MenuModeEnum } from '@radical/constants'
import { useConfigStoreWithOut } from '@radical/stores'
import { useMenuSetting } from './useMenuSetting'
import { useRootSetting } from './useRootSetting'
import { useFullContent } from '../web'

export function useHeaderSetting() {
  const { getFullContent } = useFullContent()
  const configStore = useConfigStoreWithOut()

  const getShowFullHeaderRef = computed(() => {
    return !unref(getFullContent) && unref(getShowHeader)
  })

  const getUnFixedAndFull = computed(() => !unref(getShowFullHeaderRef))

  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader)
    return (
      (need && !unref(getShowMixHeaderRef)) || (need && unref(getIsTopMenu))
    )
  })

  const { getMenuMode, getIsSidebarType, getIsTopMenu } = useMenuSetting()
  const { getShowBreadCrumb } = useRootSetting()

  const getShowMixHeaderRef = computed(
    () => !unref(getIsSidebarType) && unref(getShowHeader),
  )

  const getShowHeader = computed(() => configStore.getHeaderSetting.show)

  const getShowFullScreen = computed(
    () => configStore.getHeaderSetting.showFullScreen,
  )
  const getShowLocalePicker = computed(
    () => configStore.getHeaderSetting.showLocalePicker,
  )

  const getShowBread = computed(() => {
    return (
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL && unref(getShowBreadCrumb)
    )
  })

  const getShowContent = computed(() => {
    return unref(getShowBread)
  })

  // Set header configuration
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    configStore.setProjectConfig({ headerSetting })
  }
  return {
    setHeaderSetting,
    getShowFullScreen,
    getShowBread,
    getShowContent,
    getShowHeader,
    getShowMixHeaderRef,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,
    getUnFixedAndFull,
    getShowLocalePicker,
  }
}
