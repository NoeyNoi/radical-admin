import { LAYOUT } from '../../basic'

const Dynamic: RouteRecordItem = {
  path: '/tabs',
  name: 'Tabs',
  component: LAYOUT,
  redirect: '/tabs/tab',
  meta: {
    icon: 'material-symbols:dynamic-form-rounded',
    title: '动态路由',
    orderNo: 3,
  },
  children: [
    {
      path: 'tab',
      name: 'Tab',
      component: () => import('@/pages/tabs/Tab.vue'),
      meta: {
        title: 'Tab',
      },
    },
    {
      path: 'detail/:time',
      name: 'TabDetail',
      component: () => import('@/pages/tabs/TabDetail.vue'),
      meta: {
        currentActiveMenu: '/tab',
        title: '动态路由详情',
        hideMenu: true,
        dynamicLevel: 3,
        realPath: '/tabs/detail',
      },
    },
  ],
}

export default Dynamic
