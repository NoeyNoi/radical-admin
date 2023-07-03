<script lang="ts" setup>
import { computed, unref } from 'vue'
import SwitchItem from './SwitchItem.vue'
import { HandlerSettingEnum, MenuTypeEnum } from '@radical/constants'
import { useI18n } from '@radical/locale'
import {
  useMultipleTabSetting,
  useMenuSetting,
  useHeaderSetting,
  useRootSetting,
} from '@radical/hooks'

const { t } = useI18n()

const { getShowBreadCrumb, getFullContent, getColorWeak, getGrayMode } =
  useRootSetting()

const { getShowMenu, getMenuType } = useMenuSetting()

const { getShowHeader } = useHeaderSetting()

const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } =
  useMultipleTabSetting()

const getShowBreadCrumbSwitch = computed(() => {
  return !unref(getShowHeader) || unref(getMenuType) === MenuTypeEnum.TOP_MENU
})
</script>

<template>
  <SwitchItem
    :title="t('layout.setting.breadcrumb')"
    :def="getShowBreadCrumb"
    :event="HandlerSettingEnum.SHOW_BREADCRUMB"
    :disabled="getShowBreadCrumbSwitch"
  />
  <SwitchItem
    :title="t('layout.setting.tabs')"
    :def="getShowMultipleTab"
    :event="HandlerSettingEnum.TABS_SHOW"
  />
  <SwitchItem
    :title="t('layout.setting.tabsRedoBtn')"
    :def="getShowRedo"
    :event="HandlerSettingEnum.TABS_SHOW_REDO"
    :disabled="!getShowMultipleTab"
  />
  <SwitchItem
    :title="t('layout.setting.tabsQuickBtn')"
    :def="getShowQuick"
    :event="HandlerSettingEnum.TABS_SHOW_QUICK"
    :disabled="!getShowMultipleTab"
  />
  <SwitchItem
    :title="t('layout.setting.tabsFoldBtn')"
    :def="getShowFold"
    :event="HandlerSettingEnum.TABS_SHOW_FOLD"
    :disabled="!getShowMultipleTab"
  />
  <SwitchItem
    :title="t('layout.setting.sidebar')"
    :def="getShowMenu"
    :event="HandlerSettingEnum.MENU_SHOW_SIDEBAR"
    :disabled="getMenuType === MenuTypeEnum.TOP_MENU"
  />
  <SwitchItem
    :title="t('layout.setting.header')"
    :def="getShowHeader"
    :event="HandlerSettingEnum.HEADER_SHOW"
  />
  <SwitchItem
    :title="t('layout.setting.fullContent')"
    :def="getFullContent"
    :event="HandlerSettingEnum.FULL_CONTENT"
  />
  <SwitchItem
    :title="t('layout.setting.grayMode')"
    :def="getGrayMode"
    :event="HandlerSettingEnum.GRAY_MODE"
  />
  <SwitchItem
    :title="t('layout.setting.colorWeak')"
    :def="getColorWeak"
    :event="HandlerSettingEnum.COLOR_WEAK"
  />
</template>
