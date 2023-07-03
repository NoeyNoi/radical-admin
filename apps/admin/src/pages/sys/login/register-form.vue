<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useFormilyForm } from '@radical/formily'
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@radical/locale'
import { useLoginState, LoginStateEnum } from './use-login'
import { useMessage } from '@radical/hooks'
import LoginFormTitle from './login-form-title.vue'
import { register } from '@/apis/auth'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()

const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER)

const schema = {
  type: 'object',
  properties: {
    mail: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        size: 'large',
        allowClear: true,
        placeholder: t('sys.login.mailPlaceholder'),
      },
      'x-content': {
        prefix: MailOutlined,
      },
      required: true,
    },
    verifycode: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'CountDownInput',
      'x-component-props': {
        size: 'large',
        allowClear: true,
        btnProps: {
          type: 'primary',
        },
        placeholder: t('sys.login.verifycodePlaceholder'),
      },
      'x-content': {
        prefix: MailOutlined,
      },
      required: true,
    },
    password: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        size: 'large',
        allowClear: true,
        placeholder: t('sys.login.passwordPlaceholder'),
      },
      'x-content': {
        prefix: LockOutlined,
      },
      required: true,
    },
    password2: {
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        size: 'large',
        allowClear: true,
        placeholder: t('sys.login.password2Placeholder'),
      },
      'x-content': {
        prefix: LockOutlined,
      },
      required: true,
      'x-validator': {
        validator: (value, rule, ctx) => {
          if (!value || !ctx.form.values?.password) return ''
          return ctx.form.values?.password !== value ? rule.message : ''
        },
        message: t('sys.login.diffPwd'),
      },
      'x-reactions': {
        dependencies: ['password'],
        fulfill: {
          run: "$values?.password2 && $form.validate('password2')",
        },
      },
    },
    submit: {
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'Button',
      'x-component-props': {
        size: 'large',
        block: true,
        type: 'primary',
        '@click': () => handleRegister(),
      },
      'x-reactions': {
        fulfill: {
          schema: {
            'x-component-props.loading': '{{ $form.submitting }}',
          },
        },
      },
      'x-content': t('sys.login.registerButton'),
    },
    back: {
      type: 'void',
      'x-decorator': 'FormItem',
      'x-component': 'Button',
      'x-component-props': {
        size: 'large',
        block: true,
        '@click': () => handleBackLogin(),
      },
      'x-content': t('sys.login.backSignIn'),
    },
  },
}
const { FormilyForm, submit, form } = useFormilyForm({ schema })

const { notification } = useMessage()

const handleRegister = async () => {
  const formData = await submit()
  console.log('formData', formData)
  if (formData) {
    try {
      form.submitting = true
      await register({
        mail: formData.mail,
        verifycode: formData.verifycode,
        password: formData.password,
      })
      notification.success({
        message: t('sys.login.registerSuccessTitle'),
        description: t('sys.login.registerSuccessDesc'),
        duration: 3,
      })
    } catch (error) {
      console.error(`login-error: ${error}`)
    } finally {
      form.submitting = false
    }
  }
}
</script>

<template>
  <template v-if="getShow">
    <login-form-title class="enter-x" />
    <FormilyForm />
  </template>
</template>
