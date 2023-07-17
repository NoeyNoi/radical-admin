<template>
  <GridTable :uid="table.uid" :gridOptions="gridOptions" />
</template>
<script lang="ts" setup name="ProxyTable">
import { getProxyData } from '@/apis/demo/table'
import { useTable, GridTable } from '@radical/table'

const table = useTable()

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  age: number
  address: string
}

// 模拟分页接口
const findPageList = (currentPage: number, pageSize: number) => {
  return new Promise<{
    page: {
      total: number
    }
    result: RowVO[]
  }>(async (resolve) => {
    const { items, total } = await getProxyData()
    resolve({
      page: {
        total,
      },
      result: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    })
  })
}

const gridOptions = {
  border: true,
  height: 530,
  rowConfig: {
    keyField: 'id',
  },
  columnConfig: {
    resizable: true,
  },
  checkboxConfig: {
    reserve: true,
  },
  pagerConfig: {
    pageSize: 10,
  },
  columns: [
    { type: 'checkbox', width: 50 },
    { type: 'seq', width: 60 },
    { field: 'name', title: 'Name' },
    { field: 'nickname', title: 'Nickname' },
    { field: 'role', title: 'Role' },
    { field: 'address', title: 'Address', showOverflow: true },
  ],
  proxyConfig: {
    seq: true, // 启用动态序号代理（分页之后索引自动计算为当前页的起始序号）
    props: {
      result: 'result',
      total: 'page.total',
    },
    ajax: {
      // 接收 Promise
      query: ({ page }) => {
        return findPageList(page.currentPage, page.pageSize)
      },
    },
  },
}
</script>
