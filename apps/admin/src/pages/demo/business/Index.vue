<template>
  <div class="mt-12px">
    <FormilyForm />
  </div>
  <GridTable :uid="table.uid" :gridOptions="gridOptions">
    <template #toolbar_buttons>
      <Button type="primary" @click="() => useAdd(handleSubmit)">新增</Button>
    </template>
    <template #operate="{ row }">
      <Space>
        <Button
          size="small"
          type="primary"
          @click="() => useEdit(handleSubmit, row)"
          >编辑</Button
        >
        <Button size="small">删除</Button>
      </Space>
    </template>
  </GridTable>
</template>
<script lang="ts" setup name="Business">
import { Button, Space } from 'ant-design-vue'
import { useFormilyForm } from '@radical/formily'
import { useTable, GridTable } from '@radical/table'
import { getBusinessData } from '@/apis/demo/table'
import { queryFormSchema } from './useFormSchema'
import { useAdd } from './useAddForm'
import { useEdit } from './useEditForm'

const handleSubmit = async () => {
  table.tableRef.commitProxy('query')
}
const handleReset = () => {
  queryForm.reset()
  table.tableRef.commitProxy('query')
}
const { FormilyForm, form: queryForm } = useFormilyForm({
  schema: queryFormSchema({
    handleSubmit,
    handleReset: () => handleReset(),
  }),
})

interface RowVO {
  id: number
  name: string
  nickname: string
  role: string
  sex: string
  age: number
  address: string
}
const table = useTable()
// 模拟分页接口
const findPageList = async (currentPage: number, pageSize: number) => {
  const { name, sex } = await queryForm.submit()
  return new Promise<{
    page: {
      total: number
    }
    result: RowVO[]
  }>(async (resolve) => {
    const { items, total } = await getBusinessData({
      name,
      sex,
      currentPage,
      pageSize,
    })
    resolve({
      page: {
        total,
      },
      result: items.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    })
  })
}
const sexList = [
  { label: '女', value: '0' },
  { label: '男', value: '1' },
]
const formatterSex = ({ cellValue }) => {
  const item = sexList.find((item) => item.value === cellValue)
  return item ? item.label : cellValue
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
  toolbarConfig: {
    size: 'small',
    custom: true,
    slots: {
      buttons: 'toolbar_buttons',
    },
  },
  pagerConfig: {
    pageSize: 10,
  },
  columns: [
    { type: 'seq', width: 50 },
    { field: 'name', title: 'Name' },
    { field: 'nickname', title: 'Nickname' },
    { field: 'age', title: 'Age' },
    { field: 'sex', title: 'Sex', formatter: formatterSex },
    {
      field: 'operate',
      title: '操作',
      slots: { default: 'operate' },
    },
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
