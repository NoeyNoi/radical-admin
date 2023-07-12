<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { useGo } from '@radical/hooks'

const go = useGo()
const  handleDetail = () => {
  const time = +new Date()
  go(`/tabs/detail/${time}`)
}
</script>
<template>
  <Button class="m-10" @click="handleDetail">打开详情页</Button>
</template>
