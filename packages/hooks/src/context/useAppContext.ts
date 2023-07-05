import { createContext, useContext } from './useContext'
import { InjectionKey, Ref } from 'vue'

// 可根据业务需要，自行修改、添加key，用于管理相关状态
export interface AppProviderContextProps {
  test: Ref<string>
}

const key: InjectionKey<AppProviderContextProps> = Symbol()

export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key)
}

export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key)
}
