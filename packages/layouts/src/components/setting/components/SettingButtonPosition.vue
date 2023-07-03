<script lang="ts" setup>
import { Affix } from 'ant-design-vue'
import { Iconify } from '@radical/components'
import SettingDrawer from './SettingDrawer.vue'
import { ref } from 'vue'
import { useComosables } from '@radical/stores'

const settingDrawerVisible = ref(false)
const { contentRef } = useComosables()
const handleSetClick = () => {
  settingDrawerVisible.value = true
}
</script>
<template>
  <Affix
    @click="handleSetClick"
    :target="() => contentRef"
    class="fixed z-999 w-34px h-34px line-height-32px text-center text-white border-rd-l bg-[#4d85ff] right-0 !top-2/5 cursor-pointer"
  >
    <Iconify icon="ion:settings-outline" class="v-middle" hoverPointer />
  </Affix>
  <SettingDrawer v-model:visible="settingDrawerVisible" />
</template>
<style lang="scss" scoped></style>
