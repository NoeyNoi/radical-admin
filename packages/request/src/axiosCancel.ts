import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import { isFunction } from '@radical/utils'

// 用于存储每个请求的 identification 和 cancellation
let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&')

export class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果当前没有挂起的请求，则添加
          pendingMap.set(url, cancel)
        }
      })
  }

  /**
   * @description: 清空所有 pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel()
    })
    pendingMap.clear()
  }

  /**
   * 删除请求
   * @param {Object} config
   */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
      // 如果存在 pending 的 identifier，需要取消并删除当前请求
      const cancel = pendingMap.get(url)
      cancel && cancel(url)
      pendingMap.delete(url)
    }
  }

  /**
   * @description: reset
   */
  reset(): void {
    pendingMap = new Map<string, Canceler>()
  }
}
