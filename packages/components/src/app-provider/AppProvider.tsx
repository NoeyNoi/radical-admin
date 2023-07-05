import { defineComponent, toRefs } from 'vue'
import { createAppProviderContext } from '@radical/hooks'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props: {
    test: {
      type: String,
      default: 'test str',
    },
  },
  setup(props, { slots }) {
    const { test } = toRefs(props)
    // 将 test 注入到全局
    createAppProviderContext({ test })

    return () => slots.default?.()
  },
})
