<template>
  <AMenu
    class="h-full overflow-y-auto overflow-x-clip"
    :selectedKeys="selectedKeys"
    :defaultSelectedKeys="defaultSelectedKeys"
    :mode="mode"
    :openKeys="getOpenKeys"
    :inlineIndent="inlineIndent"
    @open-change="handleOpenChange"
    :class="getMenuClass"
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
import {
  computed,
  defineComponent,
  unref,
  reactive,
  watch,
  toRefs,
  ref,
} from 'vue'
import { Menu as AMenu } from 'ant-design-vue'
import BasicSubMenuItem from './components/BasicSubMenuItem.vue'
import { MenuModeEnum, MenuTypeEnum, REDIRECT_NAME } from '@radical/constants'
import { useOpenKeys } from './useOpenKeys'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { isFunction } from '@radical/utils'
import { basicProps } from './props'
import {
  listenerRouteChange,
  getCurrentParentPath,
  getAllParentPath,
} from '@radical/router'
import { useMenuSetting } from '@radical/hooks'

export default defineComponent({
  name: 'BasicMenu',
  components: {
    AMenu,
    BasicSubMenuItem,
  },
  props: basicProps,
  emits: ['menuClick'],
  setup(props, { emit }) {
    const isClickGo = ref(false)
    const currentActiveMenu = ref('')

    const menuState = reactive<MenuState>({
      defaultSelectedKeys: [],
      openKeys: [],
      selectedKeys: [],
      collapsedOpenKeys: [],
    })

    const prefixCls = 'basic-menu'
    const { items, mode } = toRefs(props)

    const { getCollapsed, getTopMenuAlign } = useMenuSetting()

    const { currentRoute } = useRouter()

    const { handleOpenChange, setOpenKeys, getOpenKeys } = useOpenKeys(
      menuState,
      items,
      mode as any,
    )

    const getShowTitle = computed(() => {
      return !unref(getCollapsed)
    })

    const getIsTopMenu = computed(() => {
      const { type, mode } = props

      return (
        (type === MenuTypeEnum.TOP_MENU && mode === MenuModeEnum.HORIZONTAL) ||
        props.isHorizontal
      )
    })

    const getMenuClass = computed(() => {
      const align = props.isHorizontal && unref(getTopMenuAlign)
      return [
        prefixCls,
        `justify-${align}`,
        {
          [`${prefixCls}__second`]: !props.isHorizontal,
          [`${prefixCls}__sidebar-hor`]: unref(getIsTopMenu),
        },
      ]
    })
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

    listenerRouteChange((route) => {
      if (route.name === REDIRECT_NAME) return
      handleMenuChange(route)
      currentActiveMenu.value = route.meta?.currentActiveMenu as string

      if (unref(currentActiveMenu)) {
        menuState.selectedKeys = [unref(currentActiveMenu)]
        setOpenKeys(unref(currentActiveMenu))
      }
    })

    !props.mixSider &&
      watch(
        () => props.items,
        () => {
          handleMenuChange()
        },
      )

    async function handleMenuClick({ key }) {
      const { beforeClickFn } = props
      if (beforeClickFn && isFunction(beforeClickFn)) {
        const flag = await beforeClickFn(key)
        if (!flag) return
      }
      emit('menuClick', key)

      isClickGo.value = true
      menuState.selectedKeys = [key]
    }

    async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
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
      getMenuClass,
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
.light-menu,
.ant-menu {
  // 阻止滚动链接，滚动不会传播给祖先
  overscroll-behavior: contain;
  // 优化图表居中显示
  .dark-menu-submenu-title,
  .light-menu-submenu-title,
  .ant-menu-submenu-title {
    display: flex !important;
    align-items: center !important;
  }
  &.dark-menu-horizontal,
  &.light-menu-horizontal,
  &.ant-menu-horizontal {
    border-bottom: none;
  }
}
</style>
