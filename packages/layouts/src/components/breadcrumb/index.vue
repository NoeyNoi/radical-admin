<script lang="ts" setup>
import { RouteLocationMatched, useRouter } from 'vue-router'
import { ref, watchEffect, computed, unref } from 'vue'
import { useI18n } from '@radical/locale'
import { useRootSetting, useMenuSetting } from '@radical/hooks'
import { filterTree } from '@radical/utils'
import { REDIRECT_NAME, MenuTypeEnum } from '@radical/constants'
import { Menu } from '@radical/types'
import { getMenus, getAllParentPath } from '@radical/router'
import { Breadcrumb, BreadcrumbItem } from 'ant-design-vue'
import MenuComponent from './menu'

const { getShowBreadCrumb } = useRootSetting()
const { getMenuType } = useMenuSetting()
const showBreadCrumb = computed(() => {
  return (
    unref(getShowBreadCrumb) && unref(getMenuType) !== MenuTypeEnum.TOP_MENU
  )
})

const { currentRoute } = useRouter()
const { t } = useI18n()
const routes = ref<RouteLocationMatched[]>([])

watchEffect(async () => {
  if (currentRoute.value.name === REDIRECT_NAME) return
  const menus = await getMenus()

  const routeMatched = currentRoute.value.matched
  const cur = routeMatched?.[routeMatched.length - 1]
  let path = currentRoute.value.path

  if (cur && cur?.meta?.currentActiveMenu) {
    path = cur.meta.currentActiveMenu as string
  }

  const parent = getAllParentPath(menus, path)
  const filterMenus = menus.filter((item) => item.path === parent[0])
  const matched = getMatched(filterMenus, parent) as any
  if (!matched || matched.length === 0) return

  const breadcrumbList = filterItem(matched)

  if (currentRoute.value.meta?.currentActiveMenu) {
    breadcrumbList.push({
      ...currentRoute.value,
      name: currentRoute.value.name,
    } as unknown as RouteLocationMatched)
  }

  routes.value = breadcrumbList
})

function getMatched(menus: Menu[], parent: string[]) {
  const matched: Menu[] = []

  menus.forEach((item) => {
    if (parent.includes(item.path)) {
      matched.push(item)
    }

    if (item.children?.length) {
      matched.push(...getMatched(item.children, parent))
    }
  })
  return matched
}

function filterItem(list: RouteLocationMatched[]) {
  return filterTree(list, (item) => {
    const { meta, name } = item
    if (!meta) {
      return !!name
    }
    const { title, hideBreadcrumb, hideMenu } = meta
    if (!title || hideBreadcrumb || hideMenu) {
      return false
    }
    return true
  }).filter((item) => !item.meta?.hideBreadcrumb)
}
</script>

<template>
  <Breadcrumb v-if="showBreadCrumb">
    <BreadcrumbItem
      v-for="(route, index) in routes"
      :key="index"
      :class="{ 'cursor-pointer': route.children }"
    >
      <span
        class="mr-1.2 ml-1.2"
        :class="{ 'cursor-pointer': route.children }"
        >{{ t(route.meta.title) }}</span
      >
      <template #overlay v-if="route.children">
        <MenuComponent :items="route.children" />
      </template>
    </BreadcrumbItem>
  </Breadcrumb>
</template>
