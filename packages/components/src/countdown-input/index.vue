<script lang="ts" setup>
// 组件文档：https://doc.vvbin.cn/components/count-down.html#countdown
import { type PropType } from 'vue'
import type { ButtonSize } from '@radical/types'
import { useAttrs, computed } from 'vue'
import { createNamespace } from '@radical/utils'
import CountButton from './countdown-button.vue'
import { Input, ButtonProps } from 'ant-design-vue'

const { bem } = createNamespace('count-down-input')
const attrs = useAttrs()
const emit = defineEmits(['change'])

const props = defineProps({
  value: { type: String },
  size: {
    type: String as PropType<ButtonSize>,
    validator: (v: string) => ['default', 'large', 'small'].includes(v),
  },
  count: { type: Number, default: 60 },
  sendCodeApi: {
    type: Function as PropType<() => Promise<boolean>>,
    default: null,
  },
  btnProps: {
    type: Object as PropType<ButtonProps>,
  },
})

const state = computed({
  get() {
    return props.value
  },
  set(value) {
    emit?.('change', value)
  },
})

const slotKeys = computed(() => {
  return Object.keys(attrs).filter((k) => k !== 'addonAfter')
})
</script>

<template>
  <Input v-bind="attrs" :class="bem()" :size="size" :value="state">
    <template #prefix v-if="$slots.prefix">
      <component :is="$slots?.prefix" />
    </template>
    <template #addonAfter>
      <CountButton
        v-bind="btnProps"
        :size="size"
        :count="count"
        :value="state"
        :beforeStartFunc="sendCodeApi"
      />
    </template>
    <template #[item]="data" v-for="item in slotKeys">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Input>
</template>

<style lang="less">
.count-down-input {
  .dark-input-group-addon,
  .light-input-group-addon .ant-input-group-addon {
    padding-right: 0;
    background-color: transparent;
    border: none;

    button {
      font-size: 14px;
    }
  }
}
</style>
