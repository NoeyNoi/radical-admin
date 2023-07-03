<script lang="ts" setup>
import { ref } from 'vue'
import UserInfo from './user-info.vue'
import { useI18n } from '@radical/locale'
import { context } from '../../../bridge'
import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { Iconify } from '@radical/components'

const { useUserStore } = context
const userStore = useUserStore()

const { t } = useI18n()

const options = ref([
  {
    label: t('退出系统'),
    key: 'logout',
    icon: 'ri:shut-down-line',
  },
])

const handleSelect = (key) => {
  switch (key) {
    case 'logout':
      handleLoginOut()
      break
  }
}

const handleLoginOut = () => {
  userStore.logout(true)
}
</script>

<template>
  <Dropdown>
    <UserInfo />
    <template #overlay>
      <Menu @click="({ key }) => handleSelect(key)">
        <MenuItem v-for="item in options" :key="item.key">
          <template #icon>
            <Iconify :icon="item.icon" />
          </template>
          {{ item.label }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
