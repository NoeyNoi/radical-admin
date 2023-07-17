<script lang="ts" setup>
import { unref, computed } from 'vue'
import { useFormilyForm } from '@radical/formily'
import { MailOutlined } from '@ant-design/icons-vue'
import { useI18n } from '@radical/locale'
import { useLoginState, LoginStateEnum } from './use-login'
import { useMessage } from '@radical/hooks'
import LoginFormTitle from './login-form-title.vue'
import { sendResetpwdmail } from '@/apis/sys/auth'
import Extra from './extra'

const { t } = useI18n()
const { handleBackLogin, getLoginState } = useLoginState()

const getShow = computed(
  () => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD,
)

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
    submit: {
      type: 'void',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        extra: Extra(),
      },
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
      'x-content': t('sys.login.resetButton'),
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
      await sendResetpwdmail({
        mail: formData.mail,
      })
      notification.success({
        message: t('sys.login.resetSuccessTitle'),
        description: t('sys.login.resetSuccessDesc'),
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
