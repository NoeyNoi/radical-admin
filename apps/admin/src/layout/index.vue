<script lang="ts" setup>
import { useMultipleTabSetting, useRootSetting } from '@radical/hooks'
import { Layout } from '@radical/layouts'
import { useMultipleTab } from '@radical/stores'
import { computed, unref } from 'vue'
import { FrameLayout } from '@radical/layouts'

const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting()
const { getShowMultipleTab } = useMultipleTabSetting()

const tabStore = useMultipleTab()

const openCache = computed(
  () => unref(getOpenKeepAlive) && unref(getShowMultipleTab),
)

const getCaches = computed((): string[] => {
  if (!unref(getOpenKeepAlive)) {
    return []
  }
  return tabStore.getCachedTabList
})
</script>

<template>
  <layout>
    <template #main>
      <RouterView>
        <template #default="{ Component, route }">
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </template>
      </RouterView>
      <FrameLayout v-if="getCanEmbedIFramePage" />
    </template>
  </layout>
</template>
