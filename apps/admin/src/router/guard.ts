import { useUserStoreWithout } from '@/store/user'
import { useAuthStoreWithout } from '@/store/auth'
import {
  initStoreForGuard,
  createBasicGuard,
  createAuthGuard,
  createTabsGuard,
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
  initStoreForGuard(stores)
  createBasicGuard()
  createAuthGuard(PAGE_NOT_FOUND_ROUTE)
  createTabsGuard(setRouteChange)
}

export { setupRouteGuard }
