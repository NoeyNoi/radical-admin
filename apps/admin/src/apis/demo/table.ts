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
export interface BusinessItem {
  name: string
  nickName: string
  sex: string
  age: number
}
export function addBusinessData(params: BusinessItem) {
  return request.post(
    {
      url: '/table/add',
      params,
    },
    {
      errorMessageMode: 'message',
    },
  )
}
export interface EditItem extends BusinessItem {
  id: number
}
export function editBusinessData(params: EditItem) {
  return request.post(
    {
      url: '/table/edit',
      params,
    },
    {
      errorMessageMode: 'message',
    },
  )
}
