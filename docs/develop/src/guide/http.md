---
title: 联调 & Mock
icon: material-symbols:deployed-code-update-outline-sharp
order: 9
category:
  - 使用指南
---

## 开发环境

如果前端应用和后端接口服务器没有运行在同一个主机上，你需要在开发环境下将接口请求代理到接口服务器。

如果是同一个主机，可以直接请求具体的接口地址。

### 配置

开发环境时候，接口地址在业务项目根目录下

[.env.development](https://github.com/NoeyNoi/radical-admin/blob/main/apps/admin/.env.development) 文件配置

```bash
# vite 本地跨域代理
VITE_PROXY=[["/api","http://localhost:3000"]]
# 接口地址
VITE_GLOB_API_URL=/api
```

::: tip
- .env 文件中的字段如果是字符串，则无需加引号，默认全部为字符串
- VITE_PROXY 不能换行
:::

### 没有跨域时的配置

如果没有跨域问题，可以直接忽略 **VITE_PROXY** 配置，直接将接口地址设置在 **VITE_GLOB_API_URL**

```bash
# 例如接口地址为 http://localhost:3000 则
VITE_GLOB_API_URL=http://localhost:3000
```

如果有跨域问题，将 **VITE_GLOB_API_URL** 设置为跟 **VITE_PROXY** 内其中一个数组的第一个项一致的值即可。

下方的接口地址设置为 `/api`，当请求发出的时候会经过 Vite 的 proxy 代理，匹配到了我们设置的 **VITE_PROXY** 规则，将 `/api` 转化为 `http://localhost:3000` 进行请求

```bash
# 例如接口地址为 http://localhost:3000 则
VITE_PROXY=[["/api","http://localhost:3000"]]
# 接口地址
VITE_GLOB_API_URL=/api
```

### 跨域原理解析
在 [`vite`](https://github.com/NoeyNoi/radical-admin/blob/main/configs/vite/src/index.ts) 配置文件中，提供了 server 的 proxy 功能，用于代理 API 请求。

```ts
server: {
  https: VITE_USE_HTTPS,
  port: VITE_PORT || 3000,
  host: true,
  proxy: !VITE_USE_HTTPS ? resolveProxy(VITE_PROXY) : undefined,
}

/**
 * 根据代理列表进行配置
 * @param proxyList
 */
export function resolveProxy(proxyList: [string, string][] = []) {
  const proxy: Record<string, ProxyOptions> = {}
  for (const [prefix, target] of proxyList) {
    const isHttps = /^https:\/\//.test(target)
    // https://github.com/http-party/node-http-proxy#options
    proxy[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {}),
    }
  }
  return proxy
}
```

::: tip 注意
从浏览器控制台的 Network 看，请求是 `http://localhost:3000/api/xxx`，这是因为 proxy 配置不会改变本地请求的 url。
:::


## 生产环境

生产环境接口地址在业务项目根目录下 [.env.production](https://github.com/NoeyNoi/radical-admin/blob/main/apps/admin/.env.production) 文件配置。

生产环境接口地址值需要修改 **VITE_GLOB_API_URL**，如果出现跨域问题，可以使用 nginx 或者后台开启 cors 进行处理

::: tip 打包后如何进行地址修改?
**`VITE_GLOB_`** 开头的变量会在打包的时候注入 **`_app.config.js`** 文件内。

在 **`dist/_app.config.js`** 修改相应的接口地址后刷新页面即可，不需要在根据不同环境打包多次，一次打包可以用于多个不同接口环境的部署。
:::

## 接口请求

在开发中:

1. 页面交互操作；
2. 调用统一管理的 api 请求函数；
3. 使用封装的 axios.ts 发送请求；
4. 获取服务端返回数据
5. 更新 data；

接口推荐统一存放于业务项目下 [apps/admin/src/apis/](https://github.com/NoeyNoi/radical-admin/tree/main/apps/admin/src/apis) 下面管理

以登录接口为例:

在 **src/apis/** 内新建模块文件，其中参数与返回值最好定义一下类型，方便校验。虽然麻烦，但是后续维护字段很方便。

::: tip
类型定义文件可以抽取出去统一管理，也可以按照对应模块管理
:::

```ts
import { request } from '@radical/request'

export interface LoginParams {
  mail: string
  password: string
}
export interface UserInfoModel {
  level: string | number
  mail: string
  nickname: string
}
export function doLogin(params: LoginParams) {
  return request.post<UserInfoModel>(
    {
      url: '/user/login',
      params,
    },
    {
      errorMessageMode: 'modal',
    },
  )
}
```

## axios 配置

**axios** 请求封装存放于 [packages/request/src](https://github.com/NoeyNoi/radical-admin/blob/main/packages/request/src/) 文件夹内部

除 `index.ts` 文件内容需要根据项目自行修改外，其余文件无需修改

```js
├── Axios.ts // axios实例
├── axiosCancel.ts // axiosCancel实例，取消重复请求
├── axiosTransform.ts // 数据转换类
├── checkStatus.ts // 返回状态值校验
├── constants.ts // 相关常量
├── helper.ts // 相关工具函数
├── index.ts // 接口返回统一处理
```

### index.ts 配置说明
默认参数如下，可以通过createAxios传递个性化配置

```ts
export const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  return new VAxios(
    deepMerge(
      {
        // 参考 https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        authenticationScheme: '',
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: () => context.apiUrl,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {},
    ),
  )
}

export const request = createAxios()
```

### transform 数据处理说明
类型定义，见 **axiosTransform.ts** 文件

数据处理，可根据项目需求配置，尤其关注一下RequestResult是否满足业务需要

```ts
export interface RequestResult<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  msg: string
  data: T
}
```

```ts
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import type { RequestOptions, RequestResult } from '@radical/types'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}
// 处理支持的基本类型
export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions,
  ) => AxiosRequestConfig

  /**
   * @description: Request successfully processed
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
```

项目默认 transform 处理逻辑，可以根据各自项目进行处理。一般需要更改的部分为下方代码，见代码注释说明

```ts
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (
    res: AxiosResponse<RequestResult>,
    options: RequestOptions,
  ) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    const { t } = useI18n()
    // 不进行任何处理，直接返回：用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    // 错误的时候返回
    const { data } = res
    if (!data) {
      throw new Error(t('sys.api.apiRequestFailed'))
    }
    //  这里 code，data，msg为 后台统一的字段，需要在 types.ts内修改 RequestResult 为项目自己的接口返回格式
    const { code, data: result, msg } = data
    // 这里逻辑可以根据项目进行修改
    const hasSuccess =
      data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS

    if (hasSuccess) return result

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = ''
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = t('sys.api.timeoutMessage')
        break
      default:
        if (msg) {
          timeoutMsg = msg
        }
    }
    /**
     * modal：会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
     * none： 一般是调用时明确表示不希望自动弹出错误提示
     */
    if (timeoutMsg && options.errorMessageMode) {
      handleErrorFunction(timeoutMsg, options.errorMessageMode)
    }
    throw new Error(timeoutMsg || t('sys.api.apiRequestFailed'))
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options

    if (apiUrl) {
      const _apuUrl = isString(apiUrl)
        ? apiUrl
        : isFunction(apiUrl)
        ? apiUrl?.()
        : ''
      config.url = `${_apuUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false),
        )
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = appendUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data),
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 这里原先根据token处理，这里也可以不处理，交由接口管理登录状态，在 responseInterceptors 处统一重定向
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { t } = useI18n()
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage')
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg')
      }
      // 其他错误处理
      if (errMessage && errorMessageMode) {
        handleErrorFunction(errMessage, errorMessageMode)
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    checkStatus(error?.response?.status, msg, errorMessageMode)
    return Promise.reject(error)
  },
}
```

### 更改参数格式

项目接口默认为 Json 参数格式，即 `headers: { 'Content-Type': ContentTypeEnum.JSON }`,

如果需要更改为 `form-data` 格式，更改 headers 的 `'Content-Type` 为 `ContentTypeEnum.FORM_URLENCODED` 即可

### 多个接口地址

当项目中需要用到多个接口地址时, 可以在 [packages/request/src/index.ts](https://github.com/NoeyNoi/radical-admin/blob/main/packages/request/src/index.ts) 导出多个 axios 实例

```ts
// 目前只导出一个默认实例，接口地址对应的是环境变量中的 VITE_GLOB_API_URL 接口地址
export const request = createAxios()

// 需要有其他接口地址的可以在后面添加

export const otherRequest = createAxios({
  requestOptions: {
    apiUrl: 'xxx',
  },
})
```

### 添加请求 URL 携带的时间戳参数

如果需要 url 上面默认携带的时间戳参数 `?_t=xxx`(get请求, 避免从缓存中拿数据)

```ts
const request = createAxios({
  requestOptions: {
    // 是否加入时间戳
    joinTime: true,
  },
});
```

## Mock 服务
Mock 数据是前端开发过程中必不可少的一环，是分离前后端开发的关键链路。通过预先跟服务器端约定好的接口，模拟请求数据甚至逻辑，能够让前端开发独立自主，不会被服务端的开发进程所阻塞。

本项目使用 [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock) 来进行 mock 数据处理。**项目内 mock 服务分本地和线上**。

### 本地 Mock
本地 mock 采用 Node.js 中间件进行参数拦截（不采用 mock.js 的原因是本地开发看不到请求参数和响应结果）。

### 如何新增 mock 接口
如果你想添加 mock 数据，只要在业务项目根目录下找到 mock 文件，添加对应的接口，对其进行拦截和模拟数据。

在 mock 文件夹内新建文件

::: tip
文件新增后会自动更新，不需要手动重启，可以在代码控制台查看日志信息 mock 文件夹内会自动注册，排除以\_开头的文件夹及文件
:::

例:

```ts
import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '@radical/utils/mock-util'

export default [
  {
    url: '/api/table/proxy',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess({
        items: [
          {
            id: 10001,
            name: 'Test1',
            nickname: 'T1',
            role: 'Develop',
            sex: 'Man',
            age: 28,
            address: 'Shenzhen',
          },
          {
            id: 10002,
            name: 'Test2',
            nickname: 'T2',
            role: 'Test',
            sex: 'Women',
            age: 22,
            address: 'Guangzhou',
          },
        ],
        total: 2,
      })
    },
  },
] as MockMethod[]
```

::: tip
mock 的值可以直接使用 [mockjs](https://github.com/nuysoft/Mock/wiki) 的语法。
:::

### 接口格式

```ts
{
  url: string; // mock 接口地址
  method?: MethodType; // 请求方式
  timeout?: number; // 延时时间
  statusCode: number; // 响应状态码
  response: ((opt: { // 响应结果
      body: any;
      query: any;
  }) => any) | object;
}
```

### 参数获取

**GET 接口：**` ({ query }) => { }`
**POST 接口：**` ({ body }) => { }`

### util 说明

可在 [mock-util.ts](https://github.com/NoeyNoi/radical-admin/blob/main/packages/utils/mock-util.ts) 中查看

::: tip
util 只作为服务处理结果数据使用。可以不用，如需使用可自行封装，需要将对应的字段改为接口的返回结构
:::

### 匹配
在业务项目 [apps/admin/src/apis/](https://github.com/NoeyNoi/radical-admin/tree/main/apps/admin/src/apis) 下面，如果接口匹配到 mock，则会优先使用 mock 进行响应

### 接口有了，如何去掉 mock
当后台接口已经开发完成，只需要将相应的 mock 函数去掉即可（删除/注释）。

### 线上 mock
由于该项目是一个展示类项目，线上也是用 mock 数据，所以在打包后同时也集成了 mock。通常项目线上一般为正式接口。

项目线上 mock 采用的是 [mockjs](https://github.com/nuysoft/Mock/wiki) 进行 mock 数据模拟。

::: warning 注意
线上开启 mock 只适用于一些简单的示例网站及预览网站。**一定不要在正式的生产环境开启！！！**
:::
