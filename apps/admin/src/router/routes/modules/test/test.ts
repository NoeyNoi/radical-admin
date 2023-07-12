import { LAYOUT } from '../../basic'

const test: RouteRecordItem = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/test',
  meta: {
    orderNo: 7,
    icon: 'ph:code-bold',
    title: '测试',
  },
  children: [
    {
      path: 'test',
      name: 'ttest',
      component: () => import('@/pages/test/test.vue'),
      meta: {
        icon: 'mdi:monitor-dashboard',
        title: 'Test',
      },
    },
  ],
}

export default test
