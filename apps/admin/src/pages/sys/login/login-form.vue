<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useFormilyForm } from '@radical/formily'
import { MailOutlined, LockOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@radical/locale'
import { useMessage } from '@radical/hooks'
import { LoginStateEnum, useLoginState } from './use-login'
import LoginFormTitle from './login-form-title.vue'
import { useUserStore } from '@/store/user'

const { t } = useI18n()

const { setLoginState, getLoginState } = useLoginState()
const show = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN)

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
    submit: {
      type: 'void',
      'x-component': 'Button',
      'x-component-props': {
        size: 'large',
        block: true,
        type: 'primary',
        '@click': () => handleSubmit(),
      },
      'x-reactions': {
        fulfill: {
          schema: {
            'x-component-props.loading': '{{ $form.submitting }}',
          },
        },
      },
      'x-content': t('sys.login.loginButton'),
    },
    group: {
      type: 'void',
      'x-component': 'FormButtonGroup',
      'x-component-props': {
        align: 'right',
        style: 'margin-top: 6px',
        gutter: 0,
      },
      properties: {
        register: {
          'x-component': 'Button',
          'x-component-props': {
            type: 'link',
            onClick: () => setLoginState(LoginStateEnum.REGISTER),
          },
          'x-content': t('sys.login.registerButton'),
        },
        forgetPassword: {
          'x-component': 'Button',
          'x-component-props': {
            type: 'link',
            onClick: () => setLoginState(LoginStateEnum.RESET_PASSWORD),
          },
          'x-content': t('sys.login.forgetPassword'),
        },
      },
    },
  },
}
const { FormilyForm, submit, form } = useFormilyForm({ schema })

const { notification } = useMessage()
const userStore = useUserStore()

const handleSubmit = async () => {
  const formData = await submit()
  if (formData) {
    try {
      form.submitting = true
      const userInfo = await userStore.login({
        mail: formData.mail,
        password: formData.password,
      })
      if (userInfo) {
        notification.success({
          message: t('sys.login.loginSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${
            userInfo.nickname || userInfo.mail
          }`,
          duration: 3,
        })
      }
    } catch (error) {
      console.error(`login-error: ${error}`)
    } finally {
      form.submitting = false
    }
  }
}
</script>
<template>
  <template v-if="show">
    <login-form-title class="enter-x" />
    <FormilyForm />
  </template>
</template>
