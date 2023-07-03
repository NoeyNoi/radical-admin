<script lang="ts" setup>
import { computed, unref } from 'vue'
import { useI18n } from '@radical/locale'
import { Iconify } from '@radical/components'
import { Tooltip } from 'ant-design-vue'

import { useFullscreen } from '@radical/utils'
const { t } = useI18n()
const { toggle, isFullscreen } = useFullscreen()

const getTitle = computed(() => {
  return unref(isFullscreen)
    ? t('layout.header.tooltipExitFull')
    : t('layout.header.tooltipEntryFull')
})
</script>

<template>
  <Tooltip :title="getTitle" placement="bottom" :duration="500">
    <span @click="toggle" class="flex items-center cursor-pointer">
      <Iconify
        icon="ant-design:fullscreen-outlined"
        hoverPointer
        v-if="!isFullscreen"
      />
      <Iconify icon="ant-design:fullscreen-exit-outlined" v-else />
    </span>
  </Tooltip>
</template>
