<script lang="ts" setup>
import {
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Card
} from 'ant-design-vue'
import LayoutMenu from '../components/menu/index.vue'
import HeaderComp from '../components/header.vue'
import LayoutTabs from '../components/tabs/index.vue'
import MainSet from '../components/main-set.vue'
import { storeToRefs, useComosables, useConfigStore } from '@radical/stores'
import { computed, unref } from 'vue'
import { useMenuSetting, useMultipleTabSetting } from '@radical/hooks'
const { toggleCollapsed, getCollapsed, getMenuWidth, getShowSidebar } =
  useMenuSetting()
const { getShowMultipleTab } = useMultipleTabSetting()

const {
  headerRef,
  tabRef,
  headerHeight,
  contentStyle,
  mainStyle,
  headerStyle,
} = useComosables()

const menuHeight = computed(() => `calc(100vh - ${unref(headerHeight)}px)`)

const { getDarkMode } = storeToRefs(useConfigStore())
</script>
<template>
  <Layout class="h-full">
    <LayoutHeader ref="headerRef" :theme="getDarkMode" :style="headerStyle">
      <slot name="header">
        <HeaderComp />
      </slot>
    </LayoutHeader>
    <Layout has-sider :style="{ height: menuHeight }">
      <LayoutSider
        v-if="getShowSidebar"
        :theme="getDarkMode"
        show-trigger
        bordered
        :collapsed-width="48"
        :width="getMenuWidth"
        collapse-mode="width"
        :collapsed="getCollapsed"
        @update:collapsed="toggleCollapsed"
      >
        <slot name="sider">
          <LayoutMenu />
        </slot>
      </LayoutSider>
      <Layout>
        <LayoutHeader
          v-if="getShowMultipleTab"
          :theme="getDarkMode"
          :style="headerStyle"
        >
          <slot name="tabs">
            <LayoutTabs ref="tabRef" />
          </slot>
        </LayoutHeader>
        <Layout :content-style="contentStyle">
          <LayoutContent
            :content-style="mainStyle"
            class="overflow-auto pt-8px pl-8px"
          >
            <Card :body-style="{ height: '100%', padding: '4px'}">
              <MainSet>
                <slot name="main"></slot>
              </MainSet>
            </Card>
          </LayoutContent>
        </Layout>
      </Layout>
    </Layout>
  </Layout>
</template>
<style lang="less" scoped>
.dark-card,
.light-card {
  height: 100%;
}
</style>

