import { request } from '@radical/request'

export function getTableData() {
  return request.post({ url: '/demo/table' })
}
