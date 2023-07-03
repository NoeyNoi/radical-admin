import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'
import { persistGlobalConfig } from './persist'
import { createStorageName } from '@radical/utils'

const pinia = createPinia()
// 全局持久化配置
pinia.use(
  createPersistedState(persistGlobalConfig(createStorageName(import.meta.env))),
)

export function setupPinia(app: App<Element>) {
  app.use(pinia)
}

export * from 'pinia'
