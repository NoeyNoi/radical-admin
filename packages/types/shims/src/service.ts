export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
  // 将请求参数拼接到url
  joinParamsToUrl?: boolean
  // 格式化请求参数时间
  formatDate?: boolean
  // 是否处理请求结果
  isTransformResponse?: boolean
  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  isReturnNativeResponse?: boolean
  // 接口地址
  apiUrl?: string | (() => string)
  // 错误提示类型
  errorMessageMode?: ErrorMessageMode
  // 是否加入时间戳
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // 请求头是否携带cookie
  withToken?: boolean
}

export interface RequestResult<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  msg: string
  data: T
}
