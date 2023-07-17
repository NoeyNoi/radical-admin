import { request } from '@radical/request'
/**
 * @description: ProxyTable 演示
 */
export function getProxyData() {
  return request.get(
    {
      url: '/table/proxy',
    },
    {
      errorMessageMode: 'modal',
    },
  )
}
export interface BusinessTable {
  name: string
  sex: string
  currentPage: number
  pageSize: number
}
/**
 * @description: ProxyTable 演示
 */
export function getBusinessData(params: BusinessTable) {
  return request.post(
    {
      url: '/table/business',
      params,
    },
    {
      errorMessageMode: 'modal',
    },
  )
}
