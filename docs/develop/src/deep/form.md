---
title: 表单
icon: ant-design:form-outlined
order: 2
category:
  - 深入
---

项目中的表单有多种方式

## Formily
基于配置的前端表单解决方案，参考
- [formilyjs 介绍](https://formilyjs.org/zh-CN/guide)
- [Form API](https://core.formilyjs.org/zh-CN/api/models/form)
- [组件库 Formily Antdv-x3](https://antdv-x3.formilyjs.org/)

### props
项目内基于formily做了封装，即[packages/formily](https://github.com/NoeyNoi/radical-admin/blob/main/packages/formily/src/formily.tsx)

- [schema](https://vue.formilyjs.org/api/shared/schema.html#schema)
- [formProps](https://core.formilyjs.org/zh-CN/api/entry/create-form#iformprops)


### 使用方式

::: warning 注意
目前项目中只引入了示例所需的组件，如需更多组件，请于[formily/src/bathImport.ts](https://github.com/NoeyNoi/radical-admin/blob/main/packages/formily/src/bathImport.ts)中配置
:::

```ts
<script lang="ts" setup>
import { useFormilyForm } from '@radical/formily'

const schema = {
  type: 'object',
  properties: {
    mail: {
      type: 'string',
      title: '邮箱',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'large',
        allowClear: true,
      },
      required: true,
    },
    password: {
      type: 'string',
      title: '密码',
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        size: 'large',
        allowClear: true,
      },
      required: true,
    },
    submit: {
      type: 'void',
      'x-component': 'Button',
      'x-component-props': {
        size: 'large',
        block: true,
        type: 'primary',
        '@click': () => handleSubmit(),
      },
      'x-content': '提交',
    },
  },
}
const { FormilyForm, submit } = useFormilyForm({ schema })

const handleSubmit = async () => {
  const formData = await submit()
  if (formData) alert(JSON.stringify(formData, null, 2))
}
</script>
<template>
  <div class="w-400px">
    <FormilyForm />
  </div>
</template>
```

## antdvue 表单
参考[https://3x.antdv.com/components/form-cn](https://3x.antdv.com/components/form-cn)，不推荐

## vxe-table 表单
参考[https://vxetable.cn/#/table/module/form](https://vxetable.cn/#/table/module/form)，不推荐
