<script lang="ts" setup name="SwitchItem">
import { PropType } from 'vue'
import { HandlerSettingEnum } from '@radical/constants'
import { baseHandler } from '../handler'
import { Switch } from 'ant-design-vue'

const props = defineProps({
  title: { type: String, default: '' },
  def: {
    type: Boolean as PropType<boolean>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  disabled: {
    type: Boolean,
  },
})
const onChange = (value) => {
  props?.event && baseHandler(props.event, value)
}
</script>
<template>
  <div class="switch-item flex justify-between m-1">
    <span class="color-text">{{ title }}</span>
    <Switch
      :checked="def"
      checked-children="开"
      un-checked-children="关"
      :disabled="disabled"
      @change="onChange"
    />
  </div>
</template>
