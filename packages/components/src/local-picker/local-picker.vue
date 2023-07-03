<script lang="ts">
export default {
  name: 'LocalePicker',
}
</script>
<script lang="ts" setup>
import { ref, watchEffect, unref, computed } from 'vue'
import Iconify from '../iconify/iconify.vue'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { useLocale, localeList } from '@radical/locale'

const props = defineProps({
  showText: { type: Boolean, default: true },
  /**
   * 更改时是否刷新界面
   */
  reload: { type: Boolean, default: true },
})

const selectedKeys = ref<string[]>([])

const { changeLocale, getLocale } = useLocale()

const getLocaleText = computed(() => {
  const key = selectedKeys.value[0]
  if (!key) {
    return ''
  }
  return localeList.find((item) => item.event === key)?.text
})

watchEffect(() => {
  selectedKeys.value = [unref(getLocale)]
})

async function toggleLocale(lang: string) {
  await changeLocale(lang)
  selectedKeys.value = [lang as string]
  props.reload && location.reload()
}

function handleMenuEvent(menu) {
  if (unref(getLocale) === menu) {
    return
  }
  toggleLocale(menu as string)
}
</script>

<template>
  <Dropdown trigger="click" @select="handleMenuEvent">
    <span class="flex items-center cursor-pointer">
      <Iconify icon="ion:language" hoverPointer />
      <span v-if="showText" class="ml-1">{{ getLocaleText }}</span>
    </span>
    <template #overlay>
      <Menu @click="({ key }) => handleMenuEvent(key)">
        <MenuItem v-for="item in localeList" :key="item.event">{{
          item.text
        }}</MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
