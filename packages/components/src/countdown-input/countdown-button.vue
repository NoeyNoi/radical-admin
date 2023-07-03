<script setup lang="ts">
import { ref, watchEffect, computed, unref, useAttrs } from 'vue'
import { useCountdown } from './use-countdown'
import { isFunction } from '@radical/utils'
import { useI18n } from '@radical/locale'
import { Button } from 'ant-design-vue'

const props = defineProps({
  value: { type: [Object, Number, String, Array] },
  count: { type: Number, default: 60 },
  beforeStartFunc: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
})

const attrs = useAttrs()

const loading = ref(false)

const { t } = useI18n()
const { currentCount, isStart, start, reset } = useCountdown(props.count)

const buttonText = computed(() => {
  return !unref(isStart)
    ? t('component.countdown.normalText')
    : t('component.countdown.sendText', [unref(currentCount)])
})

watchEffect(() => {
  props.value === undefined && reset()
})

/**
 * @description: 执行前判断是否有 beforeStartFunc，有则先执行
 */
async function handleStart() {
  const { beforeStartFunc } = props
  if (beforeStartFunc && isFunction(beforeStartFunc)) {
    loading.value = true
    try {
      const canStart = await beforeStartFunc()
      canStart && start()
    } finally {
      loading.value = false
    }
  } else {
    start()
  }
}
</script>
<template>
  <Button
    v-bind="attrs"
    :disabled="isStart"
    @click="handleStart"
    :loading="loading"
  >
    {{ buttonText }}
  </Button>
</template>
