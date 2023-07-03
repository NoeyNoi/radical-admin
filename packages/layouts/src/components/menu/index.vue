<script lang="ts" setup>
import { ref, onMounted, unref, nextTick, computed } from 'vue'
import { createNamespace, isUrl, openWindow } from '@radical/utils'
import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router'
import { MenuTypeEnum, REDIRECT_NAME } from '@radical/constants'
import { getMenus, listenerRouteChange } from '@radical/router'
import { useGo } from '@radical/hooks'
import CommonMenu from './commonMenu/index.vue'
import { useMenuSetting } from '@radical/hooks'
import { context } from '../../../bridge'
import Logo from '../../components/logo/logo.vue'
import { MenuMode } from 'ant-design-vue/lib/menu/src/interface'

const { logo: logoPath } = context
const { getCollapsed, getMenuType } = useMenuSetting()

const showHeaderLogo = computed(() => {
  return unref(getMenuType) === MenuTypeEnum.SIDEBAR
})

defineProps({
  mode: {
    type: String as PropType<MenuMode>,
    default: () => 'inline',
  },
})
const { bem } = createNamespace('layout-menu')
const { currentRoute } = useRouter()

const menuRef = ref(null)
const menuList = ref([])
const activeKey = ref()

// 定位菜单选择 与 当前路由匹配
const showOption = () => {
  nextTick(() => {
    if (!menuRef.value) return
    menuRef.value?.Ref?.showOption()
  })
}
// TODO 静态路由 待实现
onMounted(async () => {
  menuList.value = await getMenus()
  showOption()
})
// 监听路由改变
listenerRouteChange((route) => {
  if (route.name === REDIRECT_NAME) return
  const currentActiveMenu = route.meta?.currentActiveMenu as string
  handleMenuChange(route)
  if (currentActiveMenu) {
    activeKey.value = currentActiveMenu
  }
  showOption()
})
async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
  const menu = route || unref(currentRoute)
  activeKey.value = menu.name
}
async function beforeMenuClickFn(path: string) {
  if (!isUrl(path)) {
    return true
  }
  openWindow(path)
  return false
}
const go = useGo()
function handleMenuClick(path: string) {
  go(path)
}
</script>

<template>
  <div :class="bem()" class="flex-1">
    <Logo
      :class="bem('logo')"
      :logo="logoPath"
      :showTitle="!getCollapsed"
      v-if="showHeaderLogo"
    />
    <CommonMenu
      :beforeClickFn="beforeMenuClickFn"
      :items="menuList"
      @menuClick="handleMenuClick"
      :mode="mode"
    />
  </div>
</template>

<style lang="less" scoped>
.layout-menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__logo {
    flex-shrink: 0;
  }

  &__scrollbar {
    flex: 1;
    flex-basis: auto;
  }
}
</style>
