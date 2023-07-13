---
title: 组件注册使用
icon: material-symbols:settop-component-outline
order: 7
category:
  - 使用指南
---

## 按需引入
项目目前的组件注册机制是按需注册，是在需要用到的页面才引入，请勿使用全局引入，否则需要自行处理打包优化

### antdvue

```vue
<script lang="ts" setup>
import { Button } from 'ant-design-vue'
</script>
<template>
  <Button class="m-10">按钮</Button>
</template>
```

### formily/antdv-x3
目前项目中只引入了示例所需的组件，如需更多组件，请于[formily/src/bathImport.ts](https://github.com/NoeyNoi/radical-admin/blob/main/packages/formily/src/bathImport.ts)中配置

```ts
import { FormItem, Input, Password, FormButtonGroup } from '@formily/antdv-x3'
import { Button } from 'ant-design-vue'
import CountDownInput from './custom/countdown-input'

export { FormItem, Input, Password, FormButtonGroup, Button, CountDownInput }
```

### vxe-table
目前项目中只引入了示例所需的组件，如需更多组件，请于[table/src/setup.ts](https://github.com/NoeyNoi/radical-admin/blob/main/packages/table/src/setup.ts)中配置

也可参考[vxe-table 按需加载](https://vxetable.cn/#/table/start/use)

```ts
import { App } from 'vue'
import XEUtils from 'xe-utils'
import {
  // 全局对象
  VXETable,

  // 表格功能
  Filter,
  // Edit,
  // Menu,
  // Export,
  // Keyboard,
  // Validator,

  // 可选组件
  Icon,
  Column,
  // Colgroup,
  Grid,
  // Tooltip,
  Toolbar,
  Pager,
  // Form,
  // FormItem,
  // FormGather,
  // Checkbox,
  // CheckboxGroup,
  // Radio,
  // RadioGroup,
  // RadioButton,
  // Switch,
  // Input,
  Select,
  // Optgroup,
  // Option,
  // Textarea,
  // Button,
  // Modal,
  // List,
  // Pulldown,

  // 表格
  Table,
} from 'vxe-table'
import zhCN from 'vxe-table/es/locale/lang/zh-CN'
import './scss/theme.scss'

// 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
VXETable.setup({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args),
})

export function setupTable(app: App) {
  // 表格功能
  app.use(Filter)
  // .use(Edit)
  // .use(Menu)
  // .use(Export)
  // .use(Keyboard)
  // .use(Validator)

  // 可选组件
  app
    .use(Icon)
    .use(Column)
    // .use(Colgroup)
    .use(Grid)
    // .use(Tooltip)
    .use(Toolbar)
    .use(Pager)
    // .use(Form)
    // .use(FormItem)
    // .use(FormGather)
    // .use(Checkbox)
    // .use(CheckboxGroup)
    // .use(Radio)
    // .use(RadioGroup)
    // .use(RadioButton)
    // .use(Switch)
    // .use(Input)
    .use(Select)
    // .use(Optgroup)
    // .use(Option)
    // .use(Textarea)
    // .use(Button)
    // .use(Modal)
    // .use(List)
    // .use(Pulldown)

    // 安装表格
    .use(Table)
}
```

### 其他
- [vueuse](https://vueuse.org/core/useLocalStorage/)
- [lodash](https://lodash.com/docs/4.17.15)

以上工具函数导入位于[packages/utils/index.ts](https://github.com/NoeyNoi/radical-admin/blob/main/packages/utils/index.ts)中，如有更多功能需求，请自行按需导入
```ts
/**
 * utils中包含了
 * 自定义方法
 * vueuse 的部分方法: https://vueuse.org/core/useLocalStorage/
 * lodash 的部分方法: https://lodash.com/docs/4.17.15
 * sortablejs：https://github.com/SortableJS/Sortable/tree/master
 */

export * from './src'

export {
  useFullscreen,
  useTransition,
  TransitionPresets,
  useElementSize,
  useLocalStorage,
  useTitle,
  useDebounceFn,
  tryOnBeforeUnmount,
  tryOnUnmounted,
  useIntervalFn,
  computedAsync,
  useTimeoutFn
} from '@vueuse/core'

export {
  isEqual,
  omit,
  cloneDeep,
  isUndefined,
  clone,
  isArray,
  isString,
  toString,
  isFunction,
  isObject,
  uniq,
  uniqBy,
  assign as _assign,
  set,
  isNumber,
} from 'lodash-es'

// @ts-ignore
import Sortable from 'sortablejs'
export { Sortable }

```

