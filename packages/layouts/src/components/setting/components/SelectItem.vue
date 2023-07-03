<script lang="ts" setup name="SelectItem">
import { PropType } from 'vue'
import { HandlerSettingEnum } from '@radical/constants'
import { baseHandler } from '../handler'
import { useI18n } from '@radical/locale'
import { Select, SelectOption } from 'ant-design-vue'

const { t } = useI18n()

const props = defineProps({
  title: { type: String, default: '' },
  def: {
    type: [String, Number] as PropType<string | number>,
  },
  event: {
    type: Number as PropType<HandlerSettingEnum>,
  },
  disabled: {
    type: Boolean,
  },
  options: { type: Array<{ label: string; value: string }>, default: () => [] },
})
const onChange = (value) => {
  baseHandler(props.event, value)
}
</script>
<template>
  <div class="switch-item flex justify-between m-1">
    <span class="color-text">{{ title }}</span>
    <Select
      class="w-70px"
      size="small"
      :value="def"
      optionLabelProp="title"
      :disabled="disabled"
      @update:value="onChange"
    >
      <template v-for="item in options" :key="item.value">
        <SelectOption :value="item.value" :title="t(item.label)">
          {{ t(item.label) }}
        </SelectOption>
      </template>
    </Select>
  </div>
</template>
<style lang="less" scoped></style>
