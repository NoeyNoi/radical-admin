<script lang="ts" setup>
import { computed } from 'vue'
import { Iconify } from '@radical/components'
import { context } from '../../../bridge'
const { useUserStore } = context

const userStore = useUserStore()

const getUserInfo = computed(() => {
  const { realName = 'Noey', desc } = userStore.getUserInfo || {}
  return { realName, desc }
})
</script>
<template>
  <div class="flex cursor-pointer flex-items-center color-primary fw-600">
    <Iconify icon="carbon:user-filled" class="w-6" size="18" />
    <span>{{ getUserInfo.realName }}</span>
  </div>
</template>
