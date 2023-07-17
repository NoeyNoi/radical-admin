import { defineStore } from '@radical/stores'
import { BASIC_HOME_PATH } from '@radical/constants'
import { router } from '@radical/router'
import { doLogin, LoginParams } from '@/apis/sys/auth'
import { IUserInfo } from '@radical/types'

interface UserState {
  userInfo: Nullable<IUserInfo>
  roles: string[]
}

export const useUserStore = defineStore('app-user-store', {
  state: (): UserState => ({
    userInfo: null,
    /**
     * 该字段主要用于结合路由meta字段上的role做判断
     * => 用户是否拥有对应路由权限
     */
    roles: [],
  }),
  getters: {
    getUserInfo(): IUserInfo | null {
      return this.userInfo
    },
    getRoles(): string[] {
      return this.roles.length > 0 ? this.roles : []
    },
  },
  actions: {
    setUserInfo(info: IUserInfo | null) {
      this.userInfo = info
    },
    setRoles(roles: string[]) {
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
