import { defineComponent, toRefs } from 'vue'
import { createAppProviderContext } from '@radical/hooks'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props: {
    prefixCls: {
      type: String,
      default: 'main',
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props)
    // 将 prefixCls 注入到全局
    createAppProviderContext({ prefixCls })

    return () => slots.default?.()
  },
})
