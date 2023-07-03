<script lang="ts" setup>
import { Iconify } from '@radical/components'
import LayoutBreadcrumb from '../components/breadcrumb/index.vue'
import LayoutTabs from '../components/tabs/index.vue'
import AppFullScreen from '../components/FullScreen.vue'
import { SettingButton } from '../components/setting'
import UserDropdown from '../components/user-dropdown/index.vue'
import { context } from '../../bridge'
import { computed, unref } from 'vue'
import { Space } from 'ant-design-vue'
import { SettingButtonPositionEnum, MenuTypeEnum } from '@radical/constants'
import {
  useHeaderSetting,
  useRootSetting,
  useMenuSetting,
  useMultipleTabSetting,
} from '@radical/hooks'
import { LocalePicker } from '@radical/components'
import Logo from '../components/logo/logo.vue'

const { logo: logoPath } = context
const {
  getShowFullScreen,
  getShowLocalePicker,
  getShowHeader,
  getShowFullHeaderRef,
} = useHeaderSetting()
const { getSettingButtonPosition, getShowSettingButton } = useRootSetting()
const { getMenuType, getCollapsed, getShowMenu, setMenuSetting } =
  useMenuSetting()
const { getShowMultipleTab } = useMultipleTabSetting()
const getShowSetting = computed(() => {
  if (!unref(getShowSettingButton)) {
    return false
  }
  const settingButtonPosition = unref(getSettingButtonPosition)

  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return unref(getShowHeader)
  }
  return settingButtonPosition === SettingButtonPositionEnum.HEADER
})

const getShowHeaderMultipleTab = computed(() => {
  return unref(getShowMultipleTab) && unref(getMenuType) !== MenuTypeEnum.MIX
})
const showHeaderLogo = computed(() => {
  return unref(getMenuType) !== MenuTypeEnum.SIDEBAR
})

// 菜单显示隐藏
const getShowCollapsed = computed(() => {
  return unref(getShowMenu) && unref(getMenuType) === MenuTypeEnum.SIDEBAR
})
const hideMenu = () => {
  setMenuSetting({ collapsed: !unref(getCollapsed) })
}
</script>
<template>
  <div
    v-if="getShowFullHeaderRef"
    :class="[
      'flex',
      'justify-between',
      'h-48px',
      'shadow',
      { 'mb-8px': !getShowHeaderMultipleTab },
    ]"
    :style="{ '--un-shadow-color': 'var(--n-border-color)' }"
  >
    <slot name="logo">
      <Space align="center" :size="0">
        <Logo
          :logo="logoPath"
          v-if="showHeaderLogo"
          :style="{
            width: '180px',
          }"
          :showRightBorder="false"
        />
        <Iconify
          v-if="!getCollapsed && getShowCollapsed"
          @click="hideMenu"
          icon="ant-design:menu-fold-outlined"
          class="cursor-pointer v-middle pl-8px pr-8px"
        />
        <Iconify
          v-else-if="getCollapsed && getShowCollapsed"
          @click="hideMenu"
          icon="ant-design:menu-unfold-outlined"
          class="cursor-pointer v-middle pl-8px pr-8px"
        />
        <slot name="breadcrumb">
          <LayoutBreadcrumb />
        </slot>
      </Space>
    </slot>
    <slot name="menu"></slot>
    <Space :size="16" class="pl-8px pr-8px line-height-48px">
      <AppFullScreen v-if="getShowFullScreen" />
      <LocalePicker
        v-if="getShowLocalePicker"
        :reload="true"
        :showText="false"
      />
      <UserDropdown />
      <SettingButton v-if="getShowSetting" />
    </Space>
  </div>
  <template v-if="getShowHeaderMultipleTab">
    <slot name="tabs">
      <LayoutTabs />
    </slot>
  </template>
</template>

<style></style>
