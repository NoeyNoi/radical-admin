<script lang="ts" setup>
import { Tabs, TabPane, Space } from 'ant-design-vue'
import { Iconify } from '@radical/components'
import type { RouteLocationNormalized, RouteMeta } from 'vue-router'
import { Sortable } from '@radical/utils'
import { useRouter } from 'vue-router'
import { computed, nextTick, ref, unref } from 'vue'
import { useI18n } from '@radical/locale'
import { REDIRECT_NAME } from '@radical/constants'
import { useGo, useTabs } from '@radical/hooks'
import TabRedo from './components/TabRedo.vue'
import TabQuick from './components/TabQuick.vue'
import FoldButton from './components/FoldButton.vue'
import { useMultipleTab, storeToRefs, useConfigStore } from '@radical/stores'
import { listenerRouteChange } from '@radical/router'
import { useMultipleTabSetting } from '@radical/hooks'
const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting()
const { close } = useTabs()
const { t } = useI18n()
const multipleTabStore = useMultipleTab()
const { getTabList } = storeToRefs(multipleTabStore)
const router = useRouter()
const go = useGo()

const activeTabName = ref<string>('')

const tabList = computed(() => {
  return unref(getTabList).filter(
    (item) => !item.meta?.hideTab && router.hasRoute(item.name),
  )
})

listenerRouteChange((route) => {
  const { name } = route
  if (name === REDIRECT_NAME || !route) {
    return
  }

  const { path, fullPath, meta = {} } = route
  const { currentActiveMenu, hideTab } = meta as RouteMeta
  const isHide = !hideTab ? null : currentActiveMenu
  const p = isHide || fullPath || path
  if (activeTabName.value !== p) {
    activeTabName.value = p as string
  }

  if (isHide) {
    const findParentRoute = router
      .getRoutes()
      .find((item) => item.path === currentActiveMenu)

    findParentRoute &&
      multipleTabStore.checkTab(
        findParentRoute as unknown as RouteLocationNormalized,
      )
  } else {
    multipleTabStore.checkTab(unref(route))
  }
})
const handleChange = (value: string) => {
  go(value, false)
}
//监听是否暗黑模式，动态修改html的class标识
const { getDarkMode } = storeToRefs(useConfigStore())
// 获取tabs内dom设置tabs页签拖拽排序
nextTick(() => {
  const selection = document.querySelector(
    `#drag > .${getDarkMode.value}-tabs-nav > .${getDarkMode.value}-tabs-nav-wrap > .${getDarkMode.value}-tabs-nav-list`,
  )
  new Sortable(selection)
})

const handleClose = (e: PointerEvent, route: RouteLocationNormalized) => {
  e.stopPropagation()
  close(route)
}
</script>
<template>
  <Tabs
    v-model:activeKey="activeTabName"
    type="card"
    id="drag"
    :tabBarGutter="2"
    :animated="false"
    size="small"
    @change="handleChange"
    class="h-30px"
    style="margin-top: 6px"
    :tabBarStyle="{
      height: '32px',
    }"
  >
    <TabPane
      style="height: 32px"
      v-for="(item, index) in tabList"
      :key="item.query ? item.fullPath : item.path"
      :name="item.fullPath"
    >
      <template #tab>
        <div
          class="group hover:text-[var(--n-tab-text-color-active)] hover:pr-10px"
          :class="{ 'pr-10px': activeTabName === item.fullPath }"
        >
          <span>{{ t(item.meta.title) }}</span>
          <Iconify
            v-if="index != 0"
            class="absolute top-1/2 ml-4px mt--6px hover:!text-14px group-hover:!inline-flex !z-999"
            :class="{ ['!hidden']: activeTabName !== item.fullPath }"
            size="12"
            icon="ep:close-bold"
            @click="handleClose($event, item)"
          />
        </div>
      </template>
    </TabPane>
    <template #rightExtra>
      <Space class="pr-8px">
        <TabRedo v-if="getShowRedo" />
        <TabQuick :tabItem="$route" v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" />
      </Space>
    </template>
  </Tabs>
</template>
<style lang="less">
// tabs样式重置
.dark-tabs-card.dark-tabs-top,
.light-tabs-card.light-tabs-top {
  .dark-tabs-nav,
  .light-tabs-nav {
    .dark-tabs-tab,
    .light-tabs-tab {
      border-radius: 8px 8px 0 0 !important;
      border: none;
      transition: none;
    }
    .dark-tabs-nav-wrap,
    .light-tabs-nav-wrap {
      .dark-tabs-nav-list,
      .light-tabs-nav-list {
        .dark-tabs-tab-active:before,
        .dark-tabs-tab-active:after,
        .dark-tabs-tab-active > div:before,
        .dark-tabs-tab-active > div:after,
        .light-tabs-tab-active:before,
        .light-tabs-tab-active:after,
        .light-tabs-tab-active > div:before,
        .light-tabs-tab-active > div:after {
          display: inline-block;
          position: absolute;
          content: '';
          width: 16px;
          height: 16px;
          z-index: 10;
          border-radius: 16px;
          bottom: 1px;
        }
        .dark-tabs-tab-active,
        .light-tabs-tab-active {
          background: #f0f2f5;
          & > div:before,
          & > div:after {
            width: 10px;
            height: 10px;
            background-color: #f0f2f5;
            bottom: 0px;
            z-index: 5;
          }
          & > div:before {
            left: -8px;
          }
          & > div:after {
            right: -8px;
          }
        }
        .dark-tabs-tab-active {
          background: #1e1e1e;
          & > div:before,
          & > div:after {
            background-color: #1e1e1e;
          }
        }
        .dark-tabs-tab-active:before,
        .dark-tabs-tab-active:after {
          background-color: #000;
        }
        .light-tabs-tab-active:before,
        .light-tabs-tab-active:after {
          background-color: #fafafa;
        }
        .dark-tabs-tab-active:before,
        .light-tabs-tab-active:before {
          left: -16px;
        }
        .dark-tabs-tab-active:after,
        .light-tabs-tab-active:after,
        .ant-tabs-tab-active:after {
          right: -16px;
        }
        .dark-tabs-tab:nth-last-child(2):after,
        .dark-tabs-tab:nth-last-child(2) > div:after,
        .light-tabs-tab:nth-last-child(2):after,
        .light-tabs-tab:nth-last-child(2) > div:after,
        .ant-tabs-tab:nth-last-child(2):after,
        .ant-tabs-tab:nth-last-child(2) > div:after {
          display: none;
        }
      }
    }
  }
}
</style>
