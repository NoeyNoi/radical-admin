<script lang="ts" setup>
import { Drawer, Divider } from 'ant-design-vue'
import DarkModeToggle from './DarkModeToggle.vue'
import NavigationBarPicker from './NavigationBarPicker.vue'
import Features from './Features.vue'
import Content from './Content.vue'
import FooterButtons from './FooterButtons.vue'
import { baseHandler } from '../handler'
import { HandlerSettingEnum } from '@radical/constants'

import { navigationBarTypeList } from '../constant'
import { useI18n } from '@radical/locale'

import { useMenuSetting, useRootSetting } from '@radical/hooks'

const { t } = useI18n()

const { getShowDarkModeToggle } = useRootSetting()
const { getMenuType } = useMenuSetting()

defineProps({
  visible: { type: Boolean, default: false },
})
const emit = defineEmits(['update:visible'])
const handleClose = () => {
  emit('update:visible', false)
}
</script>

<template>
  <Drawer :visible="visible" @close="handleClose" :width="300" forceRender>
    <template #title>{{ t('layout.setting.drawerTitle') }}</template>
    <template v-if="getShowDarkModeToggle">
      <Divider orientation="left">{{ t('layout.setting.darkMode') }}</Divider>
      <DarkModeToggle />
    </template>
    <Divider orientation="left">{{ t('layout.setting.navMode') }}</Divider>
    <NavigationBarPicker
      :def="getMenuType"
      :type-list="navigationBarTypeList"
      @handler="
        (item) => {
          baseHandler(HandlerSettingEnum.CHANGE_LAYOUT, {
            mode: item.mode,
            type: item.type,
          })
        }
      "
    />
    <Divider orientation="left"
      >{{ t('layout.setting.interfaceFunction') }}
    </Divider>
    <Features />
    <Divider orientation="left">{{
      t('layout.setting.interfaceDisplay')
    }}</Divider>
    <Content />
    <Divider />
    <FooterButtons />
  </Drawer>
</template>
