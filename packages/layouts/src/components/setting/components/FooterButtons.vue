<script lang="ts" setup>
import { useI18n } from '@radical/locale'
import { useConfigStore, useMultipleTab } from '@radical/stores'
import { resetRouter } from '@radical/router'
import { Space, Button } from 'ant-design-vue'

const { t } = useI18n()
const tabStore = useMultipleTab()
const configStore = useConfigStore()

const handleReset = () => {
  try {
    configStore.resetProjectConfig()
  } catch (error: any) {
    // createMessage.error(error);
  }
}
// TODO
const handleClearAndRedo = () => {
  localStorage.clear()
  resetRouter()
  // permissionStore.resetState()
  tabStore.resetState()
  location.reload()
}
</script>
<template>
  <Space direction="vertical" class="w-full">
    <Button type="primary" @click="handleReset" block>
      {{ t('common.resetText') }}
    </Button>
    <Button block danger @click="handleClearAndRedo">
      {{ t('layout.setting.clearBtn') }}
    </Button>
  </Space>
</template>
