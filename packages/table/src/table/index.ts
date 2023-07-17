import { reactive, provide, watchEffect } from 'vue'
import { VxeGridInstance } from 'vxe-table'

interface RowVO {
  [key: string]: any
}
interface table {
  uid: Symbol
  tableRef: VxeGridInstance<RowVO>
}
const useTable = (): table => {
  const table = reactive({
    uid: Symbol(),
    tableRef: {} as VxeGridInstance,
  })

  const setTable = (obj: object) => Object.assign(table, obj)

  watchEffect(() => {
    Object.assign(table, {
      setTable,
    })
  })
  provide(table.uid, table)
  return table
}

export { useTable }
