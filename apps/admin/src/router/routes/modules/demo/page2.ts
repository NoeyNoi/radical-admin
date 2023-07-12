import { LAYOUT } from '../../basic'

const Page2: RouteRecordItem = {
  path: '/pageTest2',
  name: 'PageTest2',
  component: LAYOUT,
  redirect: '/pageTest2/test2',
  meta: {
    orderNo: 5,
    title: '一级路由',
    icon: 'icon-park-solid:one-key',
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'test2',
      name: 'test2',
      component: () => import('@/pages/demo/page/index.vue'),
      meta: {
        title: 'test2',
      },
    },
  ],
}

export default Page2
