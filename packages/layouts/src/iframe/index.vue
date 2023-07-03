<template>
  <template v-if="showFrame">
    <template v-for="frame in getFramePages" :key="frame.path">
      <FramePage
        v-if="frame.meta.frameSrc && hasRenderFrame(frame.name)"
        v-show="showIframe(frame)"
        :frameSrc="frame.meta.frameSrc"
      />
    </template>
  </template>
</template>
<script lang="ts" name="FrameLayout" setup>
import { unref, computed } from 'vue'
import FramePage from './FramePage.vue'
import { useFrameKeepAlive } from './useFrameKeepAlive'

const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive()

const showFrame = computed(() => unref(getFramePages).length > 0)
</script>
