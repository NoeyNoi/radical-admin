<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { BASIC_HOME_PATH } from '@radical/constants'
import { createNamespace, getGlobalConfig } from '@radical/utils'
import { computed, unref } from 'vue'
import { storeToRefs, useConfigStore } from '@radical/stores'

const { bem } = createNamespace('app-logo')

const props = defineProps({
  showTitle: { type: Boolean, default: true },
  // TODO:适配暗黑模式
  showRightBorder: { type: Boolean, default: true },
  homePath: { type: String, default: BASIC_HOME_PATH },
  logo: { type: String },
})

const { push } = useRouter()
const { title } = getGlobalConfig(import.meta.env)

function goHome() {
  push(props.homePath)
}
const { getDarkMode } = storeToRefs(useConfigStore())
const borderStyle = computed(() => {
  return props.showRightBorder
    ? {
        borderRight: `1px solid ${
          unref(getDarkMode) === 'dark' ? '#303030' : '#f0f0f0'
        }`,
      }
    : {
        borderRight: 'none',
      }
})
</script>

<template>
  <div :class="bem()" @click="goHome" :style="borderStyle">
    <img :src="logo" alt="logo" />
    <div
      class="ml-2 truncate color-text"
      :class="bem('title')"
      v-if="showTitle"
    >
      {{ title }}
    </div>
  </div>
</template>

<style lang="less" scoped>
.app-logo {
  display: flex;
  align-items: center;
  padding-left: 7px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 48px;
  background: transparent;
  box-sizing: border-box;
  &__title {
    font-size: 16px;
    font-weight: 700;
    transition: all 0.5s;
    line-height: normal;
  }
  img {
    width: 32px;
  }
}
</style>
