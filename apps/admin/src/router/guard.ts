import { useUserStoreWithout } from '@/store/user'
import { useAuthStoreWithout } from '@/store/auth'
import {
  initGuard,
  createAuthGuard,
  createTabsGuard,
  createParamMenuGuard,
} from '@radical/router'
import { setRouteChange } from '@radical/router'
import { PAGE_NOT_FOUND_ROUTE } from './routes/basic'

async function setupRouteGuard() {
  const userStore = useUserStoreWithout()
  const authStore = useAuthStoreWithout()
  const stores = {
    userStore,
    authStore,
  }
  initGuard(stores)
  createAuthGuard(PAGE_NOT_FOUND_ROUTE)
  createTabsGuard(setRouteChange)
  // 必须在createPermissionGuard之后 (菜单已创建)
  createParamMenuGuard()
}

export { setupRouteGuard }
