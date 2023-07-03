<script lang="ts" setup>
import { storeToRefs, useComosables, useConfigStore } from '@radical/stores'
import Menu from '../components/menu/index.vue'
import Header from '../components/header.vue'
import MainSet from '../components/main-set.vue'

import {
  Layout,
  LayoutSider,
  LayoutHeader,
  LayoutContent,
  Card
} from 'ant-design-vue'

import { useMenuSetting } from '@radical/hooks'

const { headerRef, contentStyle, mainStyle, headerStyle, contentRef } =
  useComosables()
const {
  toggleCollapsed,
  getCollapsed,
  getCollapsedWidth,
  getMenuWidth,
  getShowSidebar,
} = useMenuSetting()

const { getDarkMode } = storeToRefs(useConfigStore())
</script>

<template>
  <!-- TODO theme 根据主题适配 -->
  <Layout has-sider class="h-full">
    <LayoutSider
      :theme="getDarkMode"
      v-if="getShowSidebar"
      :collapsedWidth="getCollapsedWidth"
      :width="getMenuWidth"
      :collapsed="getCollapsed"
      @update:collapsed="toggleCollapsed"
    >
      <Menu />
    </LayoutSider>
    <Layout>
      <LayoutHeader :theme="getDarkMode" ref="headerRef" :style="headerStyle">
        <slot name="header">
          <Header />
        </slot>
      </LayoutHeader>
      <Layout :style="contentStyle">
        <LayoutContent
          ref="contentRef"
          :style="mainStyle"
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
</template>

<style lang="less" scoped>
.dark-card,
.light-card {
  height: 100%;
}
</style>
