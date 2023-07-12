---
title: 主题样式
icon: fluent:dark-theme-20-filled
order: 6
category:
  - 使用指南
---

用于修改项目的主题、样式、颜色

## 主题色
框架沿用了[antdv](https://www.antdv.com/docs/vue/customize-theme-cn)默认的主题色 <span style="color: #1890ff">#1890ff</span>，如果你需要更改主题色，请参考 `CSS样式` 处理

## CSS样式
框架内置了 `unocss`，样式映射可查看[unocss.dev](https://unocss.dev/interactive/?s=text)，除非无法解决，否则请保持使用 `unocss`

### 主题相关
不管你需不需要多种主题，了解一下该部分都是必要的

- 通用的样式
  通用的主题样式处理位于[packages/styles/src](https://github.com/NoeyNoi/radical-admin/tree/main/packages/styles/src)中，包括antdv的主题样式及全局css变量；

- formily 表单样式
  formily的主题样式处理位于[packages/formily/style/theme.less](https://github.com/NoeyNoi/radical-admin/blob/main/packages/formily/src/style/theme.less)中，通常不用改动，
  只需在dark模式下对极端的场景做适配，开发中如遇到formily表单在dark模式下的异常情况，可于该文件适配，框架也会及时更新该部分内容

- vxe-table 表格样式
  vxe-table的主题样式处理位于[packages/table/src/scss/theme.scss](https://github.com/NoeyNoi/radical-admin/blob/main/packages/table/src/scss/theme.scss)中，通常不用改动，
  只需在dark模式下对极端的场景做适配，开发中如遇到表格在dark模式下的异常情况，可于该文件适配，框架也会及时更新该部分内容

- 全局css变量
  变量于[packages/styles/src/variables.css](https://github.com/NoeyNoi/radical-admin/blob/main/packages/styles/src/variables.css) 中
  - 在css中可通过`var(--primary-color)`方式使用
    ```css
    span {
      background-color: var(--primary-color);
    }
    ```
  另外还适配了`unocss`，可按照如下方式使用
  ```html
  <span class="color-primary">this is span</span>
  ```




### 命名空间
在 vue/ts 内，通过createNamespace导出bem，结合less简写

```ts
<script lang="ts" setup>
import { createNamespace } from '@radical/utils'
const { bem } = createNamespace('app')
<script>
<template>
  <div :class="bem()">
    <sapn :class="bem('title')">
      this is tilte
    </span>
  </div>
</template>
<style lang="less" scoped>
.app {
  color: #fff;
  &__title {
    font-size: 16px;
  }
}
</style>
```

### prefixCls 前缀
这里特指 [antdv ConfigProvider](https://www.antdv.com/components/config-provider-cn) 提供的 `prefixCls`，通常你不需要关注，但在适配 `light/dark` 主题下的 antdv 组件样式时需要了解

为了适配 `light/dark` 主题，我们通过 prefixCls 传递了 `'light'`、`'dark'`两种前缀，分别对应正常主题和暗黑主题，这意味antdv组件的class名称的前缀不再以`'antd-'`开头，
而是以`'light-'`和`'dark-'`开头

那么，修改antdv组件默认样式必须按照如下方式：
```less
<style lang="less">
.dark-menu,
.light-menu{
  overscroll-behavior: contain;
  // 优化图表居中显示
  .dark-menu-submenu-title,
  .light-menu-submenu-title {
    display: flex;
    align-items: center;
  }
  &.dark-menu-horizontal,
  &.light-menu-horizontal {
    border-bottom: none;
  }
}
</style>
```

::: warning 警告
不建议修改框架的 prefixCls，框架已经按照 `light/dark` 前缀做了主题适配，如更改，需要自行替换及适配相关CSS逻辑
:::

