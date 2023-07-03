import { reactive, provide, watchEffect } from 'vue'

const useTable = () => {
  const table = reactive({
    uid: Symbol(),
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
