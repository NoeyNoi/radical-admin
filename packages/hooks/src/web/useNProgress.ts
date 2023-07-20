import nProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 记录页面是否被加载过
const LOADED_PAGE_POOL = new Map<string, boolean>()
let loading = false
export function useNProgress(path: string, action?: 'start' | 'done') {
  const loaded = !!LOADED_PAGE_POOL.get(path)
  if (!loaded && !loading && action === 'start') {
    loading = true
    return nProgress.start()
  }
  if (loading && action === 'done') {
    nProgress.done()
    loading = false
  }
  if (!loaded) {
    LOADED_PAGE_POOL.set(path, true)
  }
}
