<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
import { AppProvider } from '@radical/components'
import { useWebTitle } from '@radical/hooks'
import { REDIRECT_NAME } from '@radical/constants'
import { getGlobalConfig, computedAsync } from '@radical/utils'
import { namespace } from './setting/design'

import { useLocale } from '@radical/locale'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'

import { unref, watch } from 'vue'
import { useConfigStore, storeToRefs } from '@radical/stores'

// 监听页面，动态更改网站标题
const { title } = getGlobalConfig(import.meta.env)
useWebTitle(title, (route) => route.name !== REDIRECT_NAME)

//监听是否暗黑模式，动态修改html的class标识
const { getDarkMode } = storeToRefs(useConfigStore())
watch(
  () => unref(getDarkMode),
  (v) => {
    document.getElementsByTagName('html')[0].className =
      v === 'dark' ? v : 'light'
  },
  { immediate: true },
)

// 国际化
const { getLocale } = useLocale()

// 动态切换组件language
const locale = computedAsync(async () => {
  const message = {
    zh_CN: () => {
      import('dayjs/locale/zh-cn')
      dayjs.locale('zh-cn')
      return zhCN
    },
    en_US: () => {
      return enUS
    },
  }
  const mod = await message[getLocale.value]()
  return mod?.default ?? mod
})
</script>

<template>
  <ConfigProvider :locale="locale" :prefixCls="getDarkMode">
    <AppProvider :prefix-cls="namespace">
      <router-view />
    </AppProvider>
  </ConfigProvider>
</template>
