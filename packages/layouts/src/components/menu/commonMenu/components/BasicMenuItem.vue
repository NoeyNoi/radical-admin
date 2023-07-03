<template>
  <MenuItem :key="item.path">
    <MenuItemContent v-bind="$props" :item="item" />
  </MenuItem>
</template>
<script lang="ts" setup name="BasicMenuItem">
import MenuItemContent from './MenuItemContent.vue'
import { MenuItem } from 'ant-design-vue'

import { itemProps } from '../props'

defineProps(itemProps)
</script>
