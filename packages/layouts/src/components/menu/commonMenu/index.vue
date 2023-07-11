<template>
  <AMenu
    class="h-full overflow-y-auto overflow-x-clip"
    :selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :mode="mode"
    :openKeys="getOpenKeys"
    :inlineIndent="inlineIndent"
    @open-change="handleOpenChange"
    @click="handleMenuClick"
    :subMenuOpenDelay="0.2"
    :style="getMenuStyle"
  >
    <template v-for="item in items" :key="item.path">
      <BasicSubMenuItem
        :item="item"
        :isHorizontal="isHorizontal"
        :showTitle="getShowTitle"
      />
    </template>
  </AMenu>
</template>
<script lang="ts">
import type { MenuState } from './types'
import { computed, defineComponent, unref, reactive, toRefs, ref } from 'vue'
import { Menu as AMenu } from 'ant-design-vue'
import BasicSubMenuItem from './components/BasicSubMenuItem.vue'
import { MenuModeEnum, REDIRECT_NAME } from '@radical/constants'
import { useOpenKeys } from './useOpenKeys'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { basicProps } from './props'
import {
  listenerRouteChange,
  getCurrentParentPath,
  getAllParentPath,
} from '@radical/router'
import { useGo, useMenuSetting } from '@radical/hooks'
import { isUrl, openWindow } from '@radical/utils'

export default defineComponent({
  name: 'BasicMenu',
  components: {
    AMenu,
    BasicSubMenuItem,
  },
  props: basicProps,
  emits: ['menuClick'],
  setup(props) {
    const menuState = reactive<MenuState>({
      defaultSelectedKeys: [],
      openKeys: [],
      selectedKeys: [],
      collapsedOpenKeys: [],
    })

    const { getCollapsed, getTopMenuAlign } = useMenuSetting()
    const getShowTitle = computed(() => {
      return !unref(getCollapsed)
    })

    const { currentRoute } = useRouter()
    const { items, mode } = toRefs(props)
    const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
      menuState,
      items,
      mode as any,
    )

    const getMenuStyle = computed(() => {
      const { mode } = props
      return mode === MenuModeEnum.HORIZONTAL
        ? {
            height: '48px',
            lineHeight: '48px',
            overflow: 'hidden',
            alignItems: 'baseline',
            justifyContent: unref(getTopMenuAlign),
          }
        : {}
    })

    const isClickGo = ref(false)
    const go = useGo()
    async function handleMenuClick({ key }) {
      if (isUrl(key)) {
        openWindow(key)
        return
      }
      go(key)
      isClickGo.value = true
      menuState.selectedKeys = [key]
    }

    const currentActiveMenu = ref('')
    listenerRouteChange((route) => {
      if (route.name === REDIRECT_NAME) return
      handleMenuChange(route)
      currentActiveMenu.value = route.meta?.currentActiveMenu as string

      if (unref(currentActiveMenu)) {
        menuState.selectedKeys = [unref(currentActiveMenu)]
        setOpenKeys(unref(currentActiveMenu))
      }
    })

    async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
      // 外部链接
      if (unref(isClickGo)) {
        isClickGo.value = false
        return
      }
      const path =
        (route || unref(currentRoute)).meta?.currentActiveMenu ||
        (route || unref(currentRoute)).path
      setOpenKeys(path)
      if (unref(currentActiveMenu)) return
      if (props.isHorizontal) {
        const parentPath = await getCurrentParentPath(path)
        menuState.selectedKeys = [parentPath]
      } else {
        const parentPaths = await getAllParentPath(props.items, path)
        menuState.selectedKeys = parentPaths
      }
    }

    return {
      handleMenuClick,
      getShowTitle,
      getMenuStyle,
      handleOpenChange,
      getOpenKeys,
      ...toRefs(menuState),
    }
  },
})
</script>
<style lang="less">
.dark-menu,
.light-menu {
  // 阻止滚动链接，滚动不会传播给祖先
  overscroll-behavior: contain;
  // 优化图标居中显示
  .dark-menu-submenu-title,
  .light-menu-submenu-title {
    display: flex !important;
    align-items: center !important;
  }
  &__dark-menu-horizontal,
  &__light-menu-horizontal {
    border-bottom: none;
  }
}
</style>
