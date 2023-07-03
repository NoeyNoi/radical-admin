<template>
  <BasicMenuItem
    v-if="!menuHasChildren(item) && getShowMenu"
    v-bind="$props"
    :class="prefixCls"
    :level="props.level + 1"
  />
  <SubMenu
    v-if="menuHasChildren(item) && getShowMenu"
    :class="[prefixCls]"
    :key="item.path"
    popupClassName="app-top-menu-popup"
  >
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
import { useDesign } from '@radical/hooks'

const { prefixCls } = useDesign('basic-menu-item')

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
