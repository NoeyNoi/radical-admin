<template>
  <VxeGrid ref="xGrid" v-bind="gridOptions" v-on="gridEvent">
    <template #[item]="_props" v-for="item in Object.keys($slots)" :key="item">
      <slot :name="item" v-bind="_props || {}"></slot>
    </template>
  </VxeGrid>
</template>
<script lang="ts" setup name="GridTable">
import { ref, inject, onMounted } from 'vue'
import { VxeGrid } from 'vxe-table'

const props = defineProps(['uid', 'gridOptions'])

const gridEvent = {
  proxyQuery() {
    console.log('数据代理查询事件')
  },
  proxyDelete() {
    console.log('数据代理删除事件')
  },
  proxySave() {
    console.log('数据代理保存事件')
  },
}

const xGrid = ref()
const table = inject(props.uid)

onMounted(() => {
  // @ts-ignore
  table?.setTable({
    tableRef: xGrid.value,
  })
})
</script>
