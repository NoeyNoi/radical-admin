import type { LoginParams } from '@/apis/auth'
import { defineStore } from '@radical/stores'
import { BASIC_HOME_PATH } from '@radical/constants'
import { router } from '@radical/router'
import { doLogin } from '@/apis/auth'
import { IUserInfo, IRoleInfo } from '@radical/types'

interface UserState {
  userInfo: Nullable<IUserInfo>
  roles: IRoleInfo[]
}

export const useUserStore = defineStore('app-user-store', {
  state: (): UserState => ({
    userInfo: null,
    // TODO: 按照不同的角色处理页面权限或功能权限
    roles: [],
  }),
  getters: {
    getUserInfo(): IUserInfo | null {
      return this.userInfo
    },
    getRoles(): IRoleInfo[] {
      return this.roles.length > 0 ? this.roles : []
    },
  },
  actions: {
    setUserInfo(info: IUserInfo | null) {
      this.userInfo = info
    },
    setRoles(roles: IRoleInfo[]) {
      this.roles = roles
    },
    async login(
      params: LoginParams & {
        goHome?: boolean
      },
    ): Promise<IUserInfo | null> {
      try {
        const { goHome = true, ...loginParams } = params
        const userInfo = await doLogin(loginParams)
        this.setUserInfo(userInfo)
        if (goHome) {
          await router.replace(BASIC_HOME_PATH)
        }
        return userInfo
      } catch (error) {
        return Promise.reject(error)
      }
    },
    logout() {
      // TODO：待实现
      console.log('退出登录')
    },
    /**
     * @description: 登出确认
     */
    confirmLoginOut() {
      // TODO：待实现
      // const { createConfirm } = useMessage()
      // const { t } = useI18n()
      // createConfirm({
      //   iconType: 'warning',
      //   title: () => h('span', t('sys.app.Tip')),
      //   content: () => h('span', t('sys.app.logoutMessage')),
      //   onOk: async () => {
      //     await logout()
      //   },
      // })
    },
    persist: {
      paths: ['userInfo'],
    },
  },
})

// 需要在 setup 外使用时
export function useUserStoreWithout() {
  return useUserStore()
}
