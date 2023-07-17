import { MockMethod } from 'vite-plugin-mock'
import {
  resultError,
  resultSuccess,
  // requestParams,
} from '@radical/utils/mock-util'

export function createFakeUserList() {
  return [
    {
      level: '0',
      mail: '3133192631@qq.com',
      nickname: 'noey',
      password: '123',
    },
    {
      level: '1',
      mail: '1',
      nickname: 'noey',
      password: '1',
    },
  ]
}

export default [
  // mock user login
  {
    url: '/api/user/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { mail: _ma, password } = body
      const checkUser = createFakeUserList().find(
        (item) => item.mail === _ma && password === item.password,
      )
      if (!checkUser) {
        return resultError('账号或密码错误！')
      }
      const { level, mail, nickname } = checkUser
      return resultSuccess({
        level,
        mail,
        nickname,
      })
    },
  },
  {
    url: '/api/user/userInfo',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      console.log('body', body)
      const { level, mail, nickname } = createFakeUserList()[0]
      return resultSuccess({
        level,
        mail,
        nickname,
      })
    },
  },
  {
    url: '/api/user/register',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(undefined, { msg: '注册成功' })
    },
  },
  {
    url: '/api/user/sendresetpwdmail',
    timeout: 200,
    method: 'post',
    response: () => {
      return resultSuccess(undefined, { msg: '重置成功' })
    },
  },
  {
    url: '/api/user/logout',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess(undefined, { msg: '退出成功' })
    },
  },
  {
    url: '/api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError('Error!')
    },
  },
] as MockMethod[]
