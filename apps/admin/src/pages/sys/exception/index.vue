<script lang="tsx">
import type { PropType } from 'vue'
import { defineComponent, ref, computed, unref } from 'vue'
import { Result, Button } from 'ant-design-vue'
import { BASIC_LOGIN_PATH } from '@radical/constants'
import { useRoute } from 'vue-router'
import { useI18n } from '@radical/locale'
import { createNamespace } from '@radical/utils/src/bem'
import notDataSvg from '@/assets/svg/no-data.svg'
import netWorkSvg from '@/assets/svg/net-error.svg'
import { useGo, useRedo } from '@radical/hooks'

/**
 * Exception related enumeration
 */
enum ExceptionEnum {
  // 页面无法访问
  PAGE_NOT_ACCESS = 403,
  // 找不到页面
  PAGE_NOT_FOUND = 404,
  // 系统错误
  ERROR = 500,
  // 网络错误
  NET_WORK_ERROR = 10000,
  // 页面上没有数据
  // TODO: In fact, it is not an exception page
  PAGE_NOT_DATA = 10100,
}

interface MapValue {
  title: string
  subTitle: string
  btnText?: string
  icon?: string
  handler?: AnyFunction<any>
  status?: string
}

export default defineComponent({
  name: 'ErrorPage',
  props: {
    // 状态码
    status: {
      type: Number as PropType<number>,
      default: ExceptionEnum.PAGE_NOT_FOUND,
    },
    title: {
      type: String as PropType<string>,
      default: '',
    },
    subTitle: {
      type: String as PropType<string>,
      default: '',
    },
    full: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const statusMapRef = ref(new Map<string | number, MapValue>())

    const { query } = useRoute()
    const go = useGo()
    const redo = useRedo()
    const { t } = useI18n()
    const { bem } = createNamespace('app-exception-page')

    const getStatus = computed(() => {
      const { status: routeStatus } = query
      const { status } = props
      return Number(routeStatus) || status
    })

    const getMapValue = computed((): MapValue => {
      return unref(statusMapRef).get(unref(getStatus)) as MapValue
    })

    const backLoginI18n = t('sys.exception.backLogin')
    const backHomeI18n = t('sys.exception.backHome')

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
      title: '403',
      status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
      subTitle: t('sys.exception.subTitle403'),
      btnText: props.full ? backLoginI18n : backHomeI18n,
      handler: () => (props.full ? go(BASIC_LOGIN_PATH) : go()),
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
      title: '404',
      status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
      subTitle: t('sys.exception.subTitle404'),
      btnText: props.full ? backLoginI18n : backHomeI18n,
      handler: () => (props.full ? go(BASIC_LOGIN_PATH) : go()),
    })

    unref(statusMapRef).set(ExceptionEnum.ERROR, {
      title: '500',
      status: `${ExceptionEnum.ERROR}`,
      subTitle: t('sys.exception.subTitle500'),
      btnText: backHomeI18n,
      handler: () => go(),
    })

    unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
      title: t('sys.exception.noDataTitle'),
      subTitle: '',
      btnText: t('common.redo'),
      handler: () => redo(),
      icon: notDataSvg,
    })

    unref(statusMapRef).set(ExceptionEnum.NET_WORK_ERROR, {
      title: t('sys.exception.networkErrorTitle'),
      subTitle: t('sys.exception.networkErrorSubTitle'),
      btnText: t('common.redo'),
      handler: () => redo(),
      icon: netWorkSvg,
    })

    return () => {
      const { title, subTitle, btnText, icon, handler, status } =
        unref(getMapValue) || {}

      return (
        <Result
          class={bem() + ' m-4'}
          status={status as any}
          title={props.title || title}
          subTitle={props.subTitle || subTitle}
          v-slots={{
            extra: () =>
              btnText && (
                <Button type="primary" onClick={handler}>
                  {() => btnText}
                </Button>
              ),
            icon: () => (icon ? <img src={icon} /> : null),
          }}
        />
      )
    }
  },
})
</script>
<style lang="less">
.app-exception-page {
  display: flex;
  align-items: center;
  flex-direction: column;
  .light-result-icon,
  .dark-result-icon,
  .ant-result-icon {
    img {
      max-width: 400px;
      max-height: 300px;
    }
  }
}
</style>
