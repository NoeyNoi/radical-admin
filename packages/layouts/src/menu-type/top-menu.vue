<script lang="ts" setup>
import { Layout, LayoutHeader, Card } from 'ant-design-vue'
import HeaderComp from '../components/header.vue'
import LayoutMenu from '../components/menu/index.vue'
import MainSet from '../components/main-set.vue'
import { storeToRefs, useComosables, useConfigStore } from '@radical/stores'

const { headerRef, contentStyle, mainStyle, headerStyle } = useComosables()

const { getDarkMode } = storeToRefs(useConfigStore())
</script>
<template>
  <Layout class="h-full">
    <LayoutHeader :theme="getDarkMode" ref="headerRef" :style="headerStyle">
      <slot name="header">
        <HeaderComp ref="headerRef">
          <template #menu>
            <LayoutMenu mode="horizontal" />
          </template>
        </HeaderComp>
      </slot>
    </LayoutHeader>
    <Layout :content-style="contentStyle">
      <Layout :content-style="mainStyle" class="overflow-auto p-6px">
        <Card :body-style="{ height: '100%', padding: '4px' }">
          <MainSet>
            <slot name="main"></slot>
          </MainSet>
        </Card>
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
