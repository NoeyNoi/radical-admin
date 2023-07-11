import { LAYOUT } from '../../basic'
/**
 * 由于多级路由最终会转为二级路由，所以你也可以完全不写实际不存在的component
 * 4.1版本之前即时不会被渲染也要求提供component，4.1版本提供了解决方案，参考：https://github.com/vuejs/router/releases/tag/v4.1.0
 */
const MultiLevel: RouteRecordItem = {
  path: '/multiLevel',
  name: 'MultiLevel',
  component: LAYOUT,
  redirect: '/multiLevel/level1',
  meta: {
    orderNo: 4,
    title: '多级路由',
    icon: 'tabler:frame-off',
  },
  children: [
    {
      path: 'level1',
      name: 'Level1',
      // 可不写
      component: () => import('@/pages/demo/page/index.vue'),
      meta: {
        title: 'Level1',
      },
      children: [
        {
          path: 'level1-1',
          name: 'Level1-1',
          // 可不写
          component: () => import('@/pages/demo/page/index.vue'),
          meta: {
            title: 'Level1-1',
          },
          children: [
            {
              path: 'level1-1-1',
              name: 'Level1-1-1',
              component: () => import('@/pages/demo/page/index.vue'),
              meta: {
                title: 'Level1-1-1',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default MultiLevel
