import { ProjectConfig } from '@radical/types'
import { ThemeEnum } from '@radical/constants'

export interface ContextOptions {
  projectSetting: ProjectConfig
  darkMode: ThemeEnum
  useRedo: Function
  useGo: Function
}

export let context: ContextOptions
export const initStores = async (func: AnyFunction<ContextOptions>) => {
  context = func()
}
