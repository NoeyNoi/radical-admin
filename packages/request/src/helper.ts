import { isObject, isString } from '@radical/utils'
import { Modal, message } from 'ant-design-vue'
import { useI18n } from '@radical/locale'
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object

export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?_t=${now}`
  }
  return { _t: now }
}

/**
 * @description: Format request parameter time
 */
export const formatRequestDate = (params: Recordable<any>) => {
  if (!isObject(params)) {
    return
  }

  for (const key in params) {
    const format = params[key]?.format ?? null
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT)
    }
    if (isString(key)) {
      const value = params[key]
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key])
    }
  }
}

export const handleErrorFunction = (msg, mode) => {
  const { t } = useI18n()
  if (mode === 'modal') {
    Modal.error({ title: t('sys.api.errorTip'), content: msg })
  } else if (mode === 'message') {
    message.error(msg)
  }
}
