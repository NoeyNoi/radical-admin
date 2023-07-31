<template>
  <MenuItem :key="item.path">
    <MenuItemContent v-bind="$props" :item="item" />
    <!-- 菜单折叠时展示title -->
    <template #title v-if="level === 1 && item?.title">
      {{ item?.title }}
    </template>
  </MenuItem>
</template>
<script lang="ts" setup name="BasicMenuItem">
import MenuItemContent from './MenuItemContent.vue'
import { MenuItem } from 'ant-design-vue'

import { itemProps } from '../props'

defineProps(itemProps)
</script>
<style lang="less">
.light-menu-inline-collapsed,
.dark-menu-inline-collapsed {
  .light-menu-item,
  .dark-menu-item {
    display: flex;
    align-items: center;
  }
}
</style>
