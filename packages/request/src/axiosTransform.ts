/**
 * 数据处理，可根据项目需求配置
 * 尤其关注一下RequestResult是否满足业务需要
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, RequestResult } from '@radical/types'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description: 请求前的流程配置
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions,
  ) => AxiosRequestConfig

  /**
   * @description: 请求已成功处理
   */
  transformRequestHook?: (
    res: AxiosResponse<RequestResult>,
    options: RequestOptions,
  ) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => AxiosRequestConfig

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void
}
