<script lang="ts" setup>
import { ref, onMounted, unref, computed } from 'vue'
import { createNamespace } from '@radical/utils'
import { MenuTypeEnum } from '@radical/constants'
import { getMenus } from '@radical/router'
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

const menuList = ref([])

onMounted(async () => {
  // @ts-ignore
  menuList.value = await getMenus()
})
</script>

<template>
  <div :class="bem()" class="flex-1">
    <Logo
      :class="bem('logo')"
      :logo="logoPath"
      :showTitle="!getCollapsed"
      v-if="showHeaderLogo"
    />
    <CommonMenu :items="menuList" :mode="mode" />
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
