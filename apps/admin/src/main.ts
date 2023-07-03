import '@radical/styles'
// import 'ant-design-vue/dist/antd.variable.css'
import App from './app.vue'
import { createApp } from 'vue'
import { InitRouter } from '@radical/router'
import { setupRouteGuard } from '@/router/guard'
import { setupI18n } from '@radical/locale'
import { setupPinia } from '@radical/stores'
import { initApplication } from './init-application'
import { BasicRoutes } from './router/routes'
import { setupTable } from '@radical/table'

// 开发环境加载ant样式
// if (import.meta.env.DEV) {
//   import('ant-design-vue/es/style')
// }
;(async () => {
  const app = createApp(App)
  // 初始化pinia
  setupPinia(app)
  // 多语言配置，异步场景：可以从服务器端获取语言文件
  await setupI18n(app)
  // 初始化应用配置
  await initApplication()
  // 初始化 Router
  const router = InitRouter(import.meta.env.VITE_PUBLIC_PATH, BasicRoutes)
  app.use(router)
  // 路由守卫
  await setupRouteGuard()
  await router.isReady()
  // vxe-table
  app.use(setupTable)
  // 挂载app实例
  app.mount('#app')

  // 关闭mock, 支持Tree Shaking `mockjs`
  if (__VITE_USE_MOCK__) {
    import('../mock/_mock-server').then(({ setupProdMockServer }) =>
      setupProdMockServer(),
    )
  }
})()
