import { LAYOUT } from '../../basic'

const IFrame = () => import('@/pages/sys/iframe/FrameBlank.vue')

const iframe: RouteRecordItem = {
  path: '/frame',
  name: 'Frame',
  component: LAYOUT,
  redirect: '/frame/doc',
  meta: {
    orderNo: 1000,
    icon: 'ion:tv-outline',
    title: '外部页面',
  },

  children: [
    {
      path: 'antv',
      name: 'Antv',
      component: IFrame,
      meta: {
        frameSrc: 'https://antdv.com/components/overview-cn/',
        title: 'antVue文档(内嵌)',
      },
    },
    {
      path: 'https://antdv.com/components/overview-cn/',
      name: 'DocExternal',
      component: IFrame,
      meta: {
        title: '项目文档(外链)',
      },
    },
  ],
}

export default iframe
