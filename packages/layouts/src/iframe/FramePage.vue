<template>
  <div class="iframe-page" style="height: 100%">
    <Spin :spinning="loading" size="large">
      <iframe
        id="iframeContent"
        :src="frameSrc"
        ref="frameRef"
        allow=""
        @load="hideLoading"
      ></iframe>
    </Spin>
  </div>
</template>
<script lang="ts" setup name="FrameLayout">
import { ref } from 'vue'
import { Spin } from 'ant-design-vue'

defineProps({
  frameSrc: {
    type: String,
    default: '',
  },
})

const loading = ref(true)
const frameRef = ref<HTMLElement>()
function hideLoading() {
  loading.value = false
}
</script>
<style lang="less" scoped>
:deep(.dark-spin-nested-loading),
:deep(.light-spin-nested-loading) {
  position: relative;
  height: 100%;
  .dark-spin-container,
  .light-spin-container {
    width: 100%;
    height: 100%;
  }
  #iframeContent {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}
</style>
