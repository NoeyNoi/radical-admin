<template>
  <span class="flex items-center">
    <Iconify v-if="getIcon" :icon="getIcon" :size="18" class="mr-2" />
    <template v-if="level !== 1 || showTitle">
      {{ getTitle }}
    </template>
  </span>
</template>
<script lang="ts" setup name="MenuItemContent">
import { computed } from 'vue'
import { Iconify } from '@radical/components'
import { contentProps } from '../props'
import { useI18n } from '@radical/locale'

const props = defineProps(contentProps)
const { t } = useI18n()
const getTitle = computed(() => t(props.item?.title))
const getIcon = computed(() => props.item?.icon)
const level = computed(() => props?.level)
</script>
