// 用于返回统一格式的接口数据格式
export interface requestParams {
  url: Recordable<any>
  body: Recordable<any>
  headers?: { authorization?: string }
  query: Recordable<any>
}
export const resultSuccess = <T = Recordable<any>>(
  data: T,
  { msg = 'ok' } = {},
) => ({
  code: 0,
  data,
  msg,
  type: 'success',
})

export const resultPageSuccess = <T = any>(
  page: number,
  pageSize: number,
  list: T[],
  { message = 'ok' } = {},
) => {
  const pageData = pagination(page, pageSize, list)

  return {
    ...resultSuccess({
      list: pageData,
      totalcount: list.length,
    }),
    message,
  }
}

export const resultError = (
  msg = 'Request failed.',
  { code = -1, data = null } = {},
) => ({
  code,
  data,
  msg,
  type: 'error',
})

export const pagination = <T = any>(
  pageNo: number,
  pageSize: number,
  array: T[],
): T[] => {
  const offset = (pageNo - 1) * Number(pageSize)
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize))
  return ret
}

// 此功能用于从请求数据中获取token，请根据项目实际情况进行修改
export const getRequestToken = ({
  headers,
}: requestParams): string | undefined => headers?.authorization
