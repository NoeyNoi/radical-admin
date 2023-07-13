import { unref } from 'vue'

import { initRequest } from '@radical/request'
import { deepMerge, getGlobalConfig } from '@radical/utils'
import { initLayout } from '@radical/layouts'
import { initStores } from '@radical/stores'
import { useRedo, useGo } from '@radical/hooks'
import { useUserStore } from '@/store/user'
import { useConfigStoreWithOut } from '@radical/stores'
import { projectSetting, darkMode } from './setting'

import logoImg from '@/assets/images/logo.png'

/**
 * 解耦 `packages/*` 是为了更好的代码管理，但是滥用可能会导致循环依赖
 * 建议：
 * 包之间不要相互依赖，最多单边依赖
 * 如果模块相互依赖严重，则需要对外提供解耦bridge，由调用方去进行参数传递，但该方式会导致ts类型丢失，无法追溯，所以保持克制
 */
async function initPackages() {
  // 初始化 xhr
  const _initRequest = async () => {
    const { apiUrl } = getGlobalConfig(import.meta.env)
    await initRequest(() => {
      return { apiUrl }
    })
  }
  // 初始化store，并传递应用的个性化配置
  const _initStores = async () => {
    await initStores(() => ({
      projectSetting,
      darkMode,
      useRedo,
      useGo,
    }))
  }
  // 初始化layout
  const _initLayout = async () => {
    await initLayout(() => ({
      useUserStore,
      logo: logoImg,
    }))
  }
  await Promise.all([_initRequest(), _initStores(), _initLayout()])
}

function initAppConfigStore() {
  const configStore = useConfigStoreWithOut()
  const projectConfig = unref(configStore.getProjectConfig)
  // ! 初始化时，localStorage中的缓存优先级更高，所以当有配置更新时需要先清空缓存
  const projCfg = deepMerge(projectSetting, projectConfig || {})
  configStore.setProjectConfig(projCfg)
}
// 初始化应用
export async function initApplication() {
  // ! 需要注意调用时机
  await initPackages()
  // 初始化项目配置
  initAppConfigStore()
}
