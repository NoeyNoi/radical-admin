<template>
  <div :class="prefixCls" style="height: 100%">
    <Spin :spinning="loading" size="large">
      <iframe
        id="iframeContent"
        :src="frameSrc"
        :class="`${prefixCls}`"
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
import { useDesign } from '@radical/hooks'

defineProps({
  frameSrc: {
    type: String,
    default: '',
  },
})

const loading = ref(true)
const frameRef = ref<HTMLElement>()
const { prefixCls } = useDesign('iframe-page')
function hideLoading() {
  loading.value = false
}
</script>
<style lang="less" scoped>
:deep(.dark-spin-nested-loading),
:deep(.light-spin-nested-loading),
:deep(.ant-spin-nested-loading) {
  position: relative;
  height: 100%;
  .dark-spin-container,
  .light-spin-container,
  .ant-spin-container {
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
