<script lang="ts" setup>
import { SettingButtonPosition } from '../setting'
import { computed, unref } from 'vue'
import { SettingButtonPositionEnum } from '@radical/constants'
import { useRootSetting, useHeaderSetting } from '@radical/hooks'
const { getShowSettingButton, getSettingButtonPosition, getFullContent } =
  useRootSetting()
const { getShowHeader } = useHeaderSetting()
const getIsFixedSettingDrawer = computed(() => {
  if (!unref(getShowSettingButton)) {
    return false
  }
  const settingButtonPosition = unref(getSettingButtonPosition)

  if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
    return !unref(getShowHeader) || unref(getFullContent)
  }
  return settingButtonPosition === SettingButtonPositionEnum.FIXED
})
</script>
<template>
  <SettingButtonPosition v-if="getIsFixedSettingDrawer" />
</template>
<style lang="scss" scoped></style>
