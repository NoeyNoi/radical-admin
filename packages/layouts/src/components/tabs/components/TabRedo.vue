<script setup lang="ts">
import { Iconify } from '@radical/components'
import { useTabs, usePromise } from '@radical/hooks'

const { refreshPage } = useTabs()

function reload() {
  return new Promise(async (resolve) => {
    await refreshPage()
    setTimeout(() => {
      resolve({})
    }, 1200)
  })
}

const { loading, handleFn: handleRedo } = usePromise(reload, {
  immediate: false,
})
</script>

<template>
  <Iconify
    @click="handleRedo"
    icon="ant-design:redo-outlined"
    :infinite="loading"
    class="cursor-pointer"
  />
</template>

<style scoped lang="css"></style>
