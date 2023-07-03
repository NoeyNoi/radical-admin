<script lang="ts" setup>
import { computed, unref } from 'vue'
import SwitchItem from './SwitchItem.vue'
import SelectItem from './SelectItem.vue'
import { MenuTypeEnum, HandlerSettingEnum } from '@radical/constants'
import { topMenuAlignOptions } from '../constant'
import { useI18n } from '@radical/locale'
import { useMenuSetting, useHeaderSetting } from '@radical/hooks'

const { t } = useI18n()

const { getShowMenu, getMenuType, getTopMenuAlign, getAccordion } =
  useMenuSetting()

const { getShowHeader } = useHeaderSetting()

const getShowMenuRef = computed(() => {
  return unref(getShowMenu) && unref(getMenuType) !== MenuTypeEnum.TOP_MENU
})
const getShowMenuTopAlign = computed(() => {
  return unref(getShowHeader) && unref(getMenuType) === MenuTypeEnum.TOP_MENU
})
</script>
<template>
  <SwitchItem
    :title="t('layout.setting.menuAccordion')"
    :def="getAccordion"
    :event="HandlerSettingEnum.MENU_ACCORDION"
    :disabled="!getShowMenuRef"
  />
  <SelectItem
    :title="t('layout.setting.topMenuLayout')"
    :options="topMenuAlignOptions"
    :def="getTopMenuAlign"
    :event="HandlerSettingEnum.MENU_TOP_ALIGN"
    :disabled="!getShowMenuTopAlign"
  />
</template>
