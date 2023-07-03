import { useI18n } from '@radical/locale'
const { t } = useI18n()

export default () => {
  return <span class="color-primary">{t('sys.login.resetPasswordTip')}</span>
}
