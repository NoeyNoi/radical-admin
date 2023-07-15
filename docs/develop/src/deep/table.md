---
title: 列表
icon: ri:table-fill
order: 3
category:
  - 深入
---

项目中的列表有多种方式

## vxe-table
基于配置的表格解决方案，参考
- [基础 介绍](https://vxetable.cn/#/table/grid/basic)
- [数据代理+分页](https://vxetable.cn/#/table/grid/pageProxy)
- [vxe-grid API](https://vxetable.cn/#/grid/api)

### props
项目内基于formily做了封装，即[packages/formily](https://github.com/NoeyNoi/radical-admin/blob/main/packages/formily/src/formily.tsx)

- [schema](https://vue.formilyjs.org/api/shared/schema.html#schema)
- [formProps](https://core.formilyjs.org/zh-CN/api/entry/create-form#iformprops)


### 使用方式
建议使用`数据代理+分页（vxe-grid）`的方式，以提高开发效率

::: warning 注意
目前项目中只引入了示例所需的组件，如需更多组件，请于[table/src/setup.ts](https://github.com/NoeyNoi/radical-admin/blob/main/packages/table/src/setup.ts)中配置
:::

```ts
<template>
  <GridTable :uid="table.uid" :gridOptions="gridOptions" />
</template>
<script lang="ts" setup>
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
  }>((resolve) => {
    setTimeout(() => {
      const list = [
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
        {
          id: 10003,
          name: 'Test3',
          nickname: 'T3',
          role: 'PM',
          sex: 'Man',
          age: 32,
          address: 'Shanghai',
        },
        {
          id: 10004,
          name: 'Test4',
          nickname: 'T4',
          role: 'Designer',
          sex: 'Women',
          age: 23,
          address: 'Shenzhen',
        },
        {
          id: 10005,
          name: 'Test5',
          nickname: 'T5',
          role: 'Develop',
          sex: 'Women',
          age: 30,
          address: 'Shanghai',
        },
        {
          id: 10006,
          name: 'Test6',
          nickname: 'T6',
          role: 'Designer',
          sex: 'Women',
          age: 21,
          address: 'Shenzhen',
        },
        {
          id: 10007,
          name: 'Test7',
          nickname: 'T7',
          role: 'Test',
          sex: 'Man',
          age: 29,
          address: 'test abc',
        },
        {
          id: 10008,
          name: 'Test8',
          nickname: 'T8',
          role: 'Develop',
          sex: 'Man',
          age: 35,
          address: 'Shenzhen',
        },
        {
          id: 10009,
          name: 'Test9',
          nickname: 'T9',
          role: 'Develop',
          sex: 'Man',
          age: 35,
          address: 'Shenzhen',
        },
        {
          id: 100010,
          name: 'Test10',
          nickname: 'T10',
          role: 'Develop',
          sex: 'Man',
          age: 35,
          address: 'Guangzhou',
        },
        {
          id: 100011,
          name: 'Test11',
          nickname: 'T11',
          role: 'Test',
          sex: 'Women',
          age: 26,
          address: 'test abc',
        },
        {
          id: 100012,
          name: 'Test12',
          nickname: 'T12',
          role: 'Develop',
          sex: 'Man',
          age: 34,
          address: 'Guangzhou',
        },
        {
          id: 100013,
          name: 'Test13',
          nickname: 'T13',
          role: 'Test',
          sex: 'Women',
          age: 22,
          address: 'Shenzhen',
        },
      ]
      resolve({
        page: {
          total: list.length,
        },
        result: list.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize,
        ),
      })
    }, 100)
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
```

## antdvue 列表
参考[https://3x.antdv.com/components/table-cn](https://3x.antdv.com/components/table-cn)，不推荐


