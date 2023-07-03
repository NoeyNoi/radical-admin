<script lang="ts" setup>
import { MenuTypeEnum } from '@radical/constants'
import { computed, defineComponent } from 'vue'
import LeftMenuLayout from './menu-type/left-menu.vue'
import TopMenuLayout from './menu-type/top-menu.vue'
import TopMenuMixLayout from './menu-type/top-menu-mixed.vue'
import { useMenuSetting } from '@radical/hooks'

const { getMenuType } = useMenuSetting()
const layout = computed<ReturnType<typeof defineComponent>>(() => {
  switch (getMenuType.value) {
    // 左侧菜单模式
    case MenuTypeEnum.SIDEBAR:
      return LeftMenuLayout
    // 顶部菜单混合模式
    case MenuTypeEnum.MIX:
      return TopMenuMixLayout
    // 顶部菜单模式
    case MenuTypeEnum.TOP_MENU:
      return TopMenuLayout
    default:
      return undefined
  }
})
</script>
<template>
  <component :is="layout">
    <!-- 遍历插槽，这里主要是main -->
    <template #[item]="props" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="props || {}"></slot>
    </template>
  </component>
</template>
