<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useI18n } from '@radical/locale'
import { Iconify } from '@radical/components'
import { TabActionEnum } from '@radical/constants'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { useMultipleTab } from '@radical/stores'
import { useTabs } from '@radical/hooks'

const { refreshPage, close, closeAll, closeLeft, closeRight, closeOther } =
  useTabs()
const { t } = useI18n()

const tabStore = useMultipleTab()
const { currentRoute } = useRouter()

const props = defineProps({
  tabItem: {
    type: Object as PropType<RouteLocationNormalized>,
    default: null,
  },
})

const options = computed(() => {
  if (!props.tabItem) {
    return
  }
  const { meta } = props.tabItem
  const { path } = unref(currentRoute)
  const isCurItem = props.tabItem ? props.tabItem.path === path : false

  // Refresh button
  const index = tabStore.getTabList.findIndex(
    (tab) => tab.path === props.tabItem.path,
  )
  // const refreshDisabled = !isCurItem
  // Close left
  const closeLeftDisabled = index === 0 || !isCurItem

  const disabled = tabStore.getTabList.length === 1

  // Close right
  const closeRightDisabled =
    !isCurItem ||
    (index === tabStore.getTabList.length - 1 &&
      tabStore.getLastDragEndIndex >= 0)
  return [
    // !建议: refresh和外层的刷新保留一个，放置在外层效果更佳
    // {
    //   label: t('layout.multipleTab.reload'),
    //   key: TabActionEnum.REFRESH_PAGE,
    //   icon: 'ion:reload-sharp',
    //   disabled: refreshDisabled,
    // },
    {
      label: t('layout.multipleTab.close'),
      key: TabActionEnum.CLOSE_CURRENT,
      icon: 'clarity:close-line',
      disabled: !!meta?.affix || disabled,
    },
    {
      icon: 'line-md:arrow-close-left',
      key: TabActionEnum.CLOSE_LEFT,
      label: t('layout.multipleTab.closeLeft'),
      disabled: closeLeftDisabled,
    },
    {
      icon: 'line-md:arrow-close-right',
      key: TabActionEnum.CLOSE_RIGHT,
      label: t('layout.multipleTab.closeRight'),
      disabled: closeRightDisabled,
    },
    {
      icon: 'dashicons:align-center',
      key: TabActionEnum.CLOSE_OTHER,
      label: t('layout.multipleTab.closeOther'),
      disabled: disabled || !isCurItem,
    },
    {
      label: t('layout.multipleTab.closeAll'),
      key: TabActionEnum.CLOSE_ALL,
      icon: 'clarity:minus-line',
      disabled: disabled,
    },
  ]
})
const handleSelect = async (key) => {
  switch (key) {
    case TabActionEnum.REFRESH_PAGE:
      await refreshPage()
      break
    case TabActionEnum.CLOSE_CURRENT:
      await close(props.tabItem)
      break
    case TabActionEnum.CLOSE_ALL:
      await closeAll()
      break
    case TabActionEnum.CLOSE_LEFT:
      await closeLeft()
      break
    case TabActionEnum.CLOSE_RIGHT:
      await closeRight()
      break
    case TabActionEnum.CLOSE_OTHER:
      await closeOther()
      break
  }
}
</script>
<template>
  <Dropdown trigger="click">
    <Iconify
      icon="material-symbols:double-arrow-rounded"
      class="rotate-90 cursor-pointer"
      rotate="90deg"
    />
    <template #overlay>
      <Menu @click="({ key }) => handleSelect(key)">
        <MenuItem
          v-for="item in options"
          :key="item.key"
          :disabled="item.disabled"
        >
          <template #icon>
            <Iconify :icon="item.icon" />
          </template>
          {{ item.label }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
