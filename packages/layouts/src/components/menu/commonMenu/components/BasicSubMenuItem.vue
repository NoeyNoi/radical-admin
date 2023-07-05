<template>
  <BasicMenuItem
    v-if="!menuHasChildren(item) && getShowMenu"
    v-bind="$props"
    :level="props.level + 1"
  />
  <SubMenu v-if="menuHasChildren(item) && getShowMenu" :key="item.path">
    <template #title>
      <MenuItemContent v-bind="$props" :item="item" :level="props.level + 1" />
    </template>

    <template
      v-for="childrenItem in item.children || []"
      :key="childrenItem.path"
    >
      <BasicSubMenuItem
        v-bind="$props"
        :item="childrenItem"
        :level="props.level + 1"
      />
    </template>
  </SubMenu>
</template>
<script lang="ts" setup name="BasicSubMenuItem">
import type { Menu as MenuType } from '@radical/types'
import { computed } from 'vue'
import { SubMenu } from 'ant-design-vue'
import { itemProps } from '../props'
import BasicMenuItem from './BasicMenuItem.vue'
import MenuItemContent from './MenuItemContent.vue'

const props = defineProps(itemProps)
const getShowMenu = computed(() => !props.item.meta?.hideMenu)

function menuHasChildren(menuTreeItem: MenuType): boolean {
  return (
    !menuTreeItem.meta?.hideChildrenInMenu &&
    Reflect.has(menuTreeItem, 'children') &&
    !!menuTreeItem.children &&
    menuTreeItem.children.length > 0
  )
}
</script>
