// import type { ProjectConfig } from '@/types'
import { computed } from 'vue'
import { useConfigStoreWithOut } from '@radical/stores'

export function useRootSetting() {
  const configStore = useConfigStoreWithOut()

  const getOpenKeepAlive = computed(
    () => configStore.getProjectConfig.openKeepAlive,
  )

  const getSettingButtonPosition = computed(
    () => configStore.getProjectConfig.settingButtonPosition,
  )

  const getCanEmbedIFramePage = computed(
    () => configStore.getProjectConfig.canEmbedIFramePage,
  )

  const getPermissionMode = computed(
    () => configStore.getProjectConfig.permissionMode,
  )

  const getShowSettingButton = computed(
    () => configStore.getProjectConfig.showSettingButton,
  )

  const getShowBreadCrumb = computed(
    () => configStore.getProjectConfig.showBreadCrumb,
  )

  const getFullContent = computed(
    () => configStore.getProjectConfig.fullContent,
  )

  const getColorWeak = computed(() => configStore.getProjectConfig.colorWeak)

  const getGrayMode = computed(() => configStore.getProjectConfig.grayMode)

  const getShowDarkModeToggle = computed(
    () => configStore.getProjectConfig.showDarkModeToggle,
  )
  return {
    getSettingButtonPosition,
    getFullContent,
    getColorWeak,
    getGrayMode,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getPermissionMode,
    getShowBreadCrumb,
    getShowSettingButton,
    getShowDarkModeToggle,
  }
}
