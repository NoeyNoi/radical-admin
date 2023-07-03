<script setup lang="ts">
import { Iconify } from '@radical/components'
import { computed, unref } from 'vue'
import { triggerWindowResize } from '@radical/utils'

import { useMenuSetting, useHeaderSetting } from '@radical/hooks'

const { getShowMenu, setMenuSetting } = useMenuSetting()
const { getShowHeader, setHeaderSetting } = useHeaderSetting()
const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader))

const getIcon = computed(() =>
  unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full',
)

function handleFold() {
  const isUnFold = unref(getIsUnFold)
  setMenuSetting({
    show: isUnFold,
    hidden: !isUnFold,
  })
  setHeaderSetting({ show: isUnFold })
  triggerWindowResize()
}
</script>

<template>
  <Iconify @click="handleFold" class="cursor-pointer" :icon="getIcon" />
</template>

<style scoped lang="css"></style>
