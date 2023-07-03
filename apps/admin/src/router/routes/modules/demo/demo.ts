import { LAYOUT } from '../../basic'

const dashboard: RouteRecordItem = {
  path: '/demo',
  name: 'Demo',
  component: LAYOUT,
  redirect: '/demo/form',
  meta: {
    orderNo: 2,
    icon: 'line-md:clipboard-list-twotone',
    title: 'routes.demo.demo',
  },
  children: [
    {
      path: 'table',
      name: 'Table',
      redirect: '/demo/form/basic',
      meta: {
        title: 'routes.demo.table.table',
      },
      children: [
        {
          path: 'basicTable',
          name: 'BasicTable',
          component: () => import('@/pages/demo/table/BasicTable.vue'),
          meta: {
            title: 'routes.demo.table.basic',
          },
        },
        {
          path: 'proxyTable',
          name: 'ProxyTable',
          component: () => import('@/pages/demo/table/ProxyTable.vue'),
          meta: {
            title: 'routes.demo.table.proxyTable',
          },
        },
      ],
    },

    {
      path: 'form',
      name: 'Form',
      component: () => import('@/pages/demo/Form.vue'),
      meta: {
        title: 'routes.demo.form',
        // ignoreKeepAlive: true,
      },
    },
  ],
}

export default dashboard
