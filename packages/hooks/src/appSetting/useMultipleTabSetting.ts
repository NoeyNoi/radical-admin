import { computed } from 'vue'
import type { MultiTabsSetting } from '@radical/types'
import { useConfigStoreWithOut } from '@radical/stores'

export function useMultipleTabSetting() {
  const configStore = useConfigStoreWithOut()

  const getShowMultipleTab = computed(
    () => configStore.getMultiTabsSetting.show,
  )

  const getShowQuick = computed(() => configStore.getMultiTabsSetting.showQuick)

  const getShowRedo = computed(() => configStore.getMultiTabsSetting.showRedo)

  const getShowFold = computed(() => configStore.getMultiTabsSetting.showFold)

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    configStore.setProjectConfig({ multiTabsSetting })
  }
  return {
    setMultipleTabSetting,
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
  }
}
