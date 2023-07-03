<script lang="ts" setup>
import { Switch } from 'ant-design-vue'
import { Iconify } from '@radical/components'
import { ThemeEnum } from '@radical/constants'
import { useConfigStore, storeToRefs } from '@radical/stores'

const configStore = useConfigStore()
const { setDarkMode } = configStore
const { getDarkMode } = storeToRefs(configStore)
</script>

<template>
  <Switch
    :checked="getDarkMode"
    :checkedValue="ThemeEnum.DARK"
    :unCheckedValue="ThemeEnum.LIGHT"
    @change="setDarkMode"
  >
    <template #checkedChildren>
      <Iconify
        class="align-text-bottom"
        icon="emojione:crescent-moon"
        hoverPointer
      />
    </template>
    <template #unCheckedChildren>
      <Iconify class="align-text-bottom" icon="twemoji:sun" hoverPointer />
    </template>
  </Switch>
</template>
