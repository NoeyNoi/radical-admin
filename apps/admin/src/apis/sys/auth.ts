import { request } from '@radical/request'

export interface LoginParams {
  mail: string
  password: string
}

/**
 * @description: 注册
 */
export interface RegisterParams {
  mail: string
  password: string
  verifycode: string
}

/**
 * @description: 验证码
 */
export interface VerifycodeParams {
  mail: string
}
export interface UserInfoModel {
  level: string | number
  mail: string
  nickname: string
}

/**
 * @description: 登录
 */
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
/**
 * @description: 登录
 */
export function getUserInfo() {
  return request.post<UserInfoModel>(
    {
      url: '/user/userInfo',
    },
    {
      errorMessageMode: 'none',
    },
  )
}
/**
 * @description: 登出
 */
export function logout() {
  return request.post({
    url: '/user/logout',
  })
}
/**
 * @description: 注册
 */
export function register(params: RegisterParams) {
  return request.post(
    {
      url: '/user/register',
      params,
    },
    {
      errorMessageMode: 'modal',
    },
  )
}
/**
 * @description: 发送验证码
 */
export function senVerifycode(params: VerifycodeParams) {
  return request.post(
    {
      url: '/user/getverifycode',
      params,
    },
    {
      errorMessageMode: 'modal',
    },
  )
}

/**
 * @description: 重置密码
 */
export function sendResetpwdmail(params: VerifycodeParams) {
  return request.post(
    {
      url: '/user/sendresetpwdmail',
      params,
    },
    {
      errorMessageMode: 'modal',
    },
  )
}
