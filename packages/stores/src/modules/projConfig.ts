import {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectConfig,
} from '@radical/types'
import { defineStore } from 'pinia'
import { deepMerge } from '@radical/utils'
import { APP_DARK_MODE_KEY_, ThemeEnum } from '@radical/constants'
import { context } from '../../bridge'

// 应用的配置
export interface ConfigStoreState {
  darkMode?: ThemeEnum
  // 项目配置
  projectConfig: ProjectConfig | null
}
// 项目配置相关
export const useConfigStore = defineStore({
  id: 'PROJECT_CONFIG',
  persist: {
    paths: ['darkMode', 'projectConfig'],
  },
  state: (): ConfigStoreState => ({
    darkMode: undefined,
    projectConfig: {} as any,
  }),
  getters: {
    getDarkMode(): ThemeEnum {
      const { darkMode } = context
      return (
        this.darkMode ||
        (localStorage.getItem(APP_DARK_MODE_KEY_) as ThemeEnum) ||
        darkMode
      )
    },
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting
    },
  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
    },
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode
      localStorage.setItem(APP_DARK_MODE_KEY_, mode)
    },
    resetProjectConfig() {
      const { projectSetting } = context
      this.setProjectConfig(projectSetting)
    },
  },
})

export function useConfigStoreWithOut() {
  return useConfigStore()
}
