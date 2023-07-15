---
title: 图标
icon: mdi:emoticon-wink
order: 1
category:
  - 深入
---

项目中有以下两种图标使用方式
## Iconify 图标
具体实现方式请参考 [Iconify 组件](https://github.com/NoeyNoi/radical-admin/blob/main/packages/components/src/iconify/iconify.vue)

### icon检索
👉🏻 [https://icon-sets.iconify.design/?query=icon](https://icon-sets.iconify.design/?query=icon)

### props
- color: 图标颜色（非需要不用设置，主题会自动适配）
- size: 图标大小
- infinite：动态图标动画infinite属性设置
- icon：图表名称
- prefix：图标前缀
- hoverPointer：hover时是否显示抓手
- hoverColor：hover时的颜色

### 使用方式
```ts
<script lang="ts" setup>
import { Iconify } from '@radical/components'
</script>

<template>
  // iconify 使用方式，参考 https://icon-sets.iconify.design/ic/baseline-home/
  <Iconify icon="ic:baseline-home" />
  // ant-design 图标使用方式，该方式需要添加`ant-design:` 前缀
  <Iconify icon="ant-design:fullscreen-exit-outlined" v-else />
</template>
```

项目中使用到的是 [`vite-plugin-purge-icons`](https://github.com/antfu/purge-icons/blob/main/packages/vite-plugin-purge-icons/README.md) 这个插件来进行图标实现。

完整组件封装代码如下：
```ts
<script setup lang="ts" name="Iconify">
import type { PropType, CSSProperties } from 'vue'
import { unref, computed, useAttrs, ref, nextTick, watch, onMounted } from 'vue'
import { createNamespace, isString } from '@radical/utils'
import Iconify from '@purge-icons/generated'

const props = defineProps({
  color: { type: String },
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
  infinite: { type: Boolean },
  icon: { type: String },
  prefix: { type: String, default: '' },
  hoverPointer: { type: Boolean },
  hoverColor: { type: String, default: 'inherit' },
})

const iconRefEl = ref<HTMLElement | null>(null)

const getIconRef = computed(
  () => `${props.prefix ? props.prefix + ':' : ''}${props.icon}`,
)

const { bem } = createNamespace('iconify')

const attrs = useAttrs()

const styles = computed((): CSSProperties => {
  const { size, color } = props
  let _size = size
  if (isString(size)) {
    _size = parseInt(size, 10)
  }

  return {
    fontSize: `${_size}px`,
    color: color,
    display: 'inline-flex',
  }
})

const classes = computed(() => {
  const cls = [bem(), unref(attrs).class]
  if (props.infinite) {
    cls.push(bem('infinite'))
  }
  return cls
})

const update = async () => {
  const el = unref(iconRefEl)
  if (!el) return

  await nextTick()
  const icon = unref(getIconRef)
  if (!icon) return

  const svg = Iconify.renderSVG(icon, {})
  if (svg) {
    // 本地图标
    el.textContent = ''
    el.appendChild(svg)
  } else {
    // 线上图标
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = icon
    el.textContent = ''
    el.appendChild(span)
  }
}

watch(() => props.icon, update, { flush: 'post' })

onMounted(update)
</script>

<template>
  <span
    :class="[classes, { 'hover:cursor-pointer': hoverPointer }]"
    :style="styles"
    ref="iconRefEl"
  ></span>
</template>

<style lang="less" scoped>
.iconify {
  display: inline-block;
  transition: color 0.3s, transform 0.3s;
  &:hover {
    color: v-bind(hoverColor) !important;
  }
}

.iconify__infinite {
  animation: loading-circle 1s infinite linear;
}
</style>

```

## 组件库图标
使用 ant-design-vue 提供的图标（不建议直接使用，除非特别需要）

```vue
<template>
  <StarOutlined />
  <StarFilled />
  <StarTwoTone twoToneColor="#eb2f96" />
</template>

<script setup lang="ts">
import { 
  StarOutlined,
  StarFilled,
  StarTwoTone
} from '@ant-design/icons-vue'
</script>
```
