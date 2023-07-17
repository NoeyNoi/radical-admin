<script lang="ts" setup name="Form">
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
  <h3 class="color-text">表单演示</h3>
  <p>
    表单使用 Formily Antdv-x3，基于 ant-design-vue 和Vue 3
    封装的Formily2.x组件体系
  </p>
  <div class="w-400px">
    <FormilyForm />
  </div>
</template>
