import { MockMethod } from 'vite-plugin-mock'
import { resultSuccess } from '@radical/utils/mock-util'
import { reactive } from 'vue'
const data = reactive({
  list: [
    {
      id: 10001,
      name: 'Test1',
      nickname: 'T1',
      role: 'Develop',
      sex: '1',
      age: 28,
      address: 'Shenzhen',
    },
    {
      id: 10002,
      name: 'Test2',
      nickname: 'T2',
      role: 'Test',
      sex: '0',
      age: 22,
      address: 'Guangzhou',
    },
    {
      id: 10003,
      name: 'Test3',
      nickname: 'T3',
      role: 'PM',
      sex: '1',
      age: 32,
      address: 'Shanghai',
    },
    {
      id: 10004,
      name: 'Test4',
      nickname: 'T4',
      role: 'Designer',
      sex: '0',
      age: 23,
      address: 'Shenzhen',
    },
    {
      id: 10005,
      name: 'Test5',
      nickname: 'T5',
      role: 'Develop',
      sex: '0',
      age: 30,
      address: 'Shanghai',
    },
    {
      id: 10006,
      name: 'Test6',
      nickname: 'T6',
      role: 'Develop',
      sex: '0',
      age: 27,
      address: 'Shanghai',
    },
    {
      id: 10007,
      name: 'Test7',
      nickname: 'T7',
      role: 'Develop',
      sex: '1',
      age: 29,
      address: 'Shenzhen',
    },
    {
      id: 10008,
      name: 'Test8',
      nickname: 'T8',
      role: 'Develop',
      sex: '0',
      age: 32,
      address: 'Shanghai',
    },
    {
      id: 10009,
      name: 'Test9',
      nickname: 'T9',
      role: 'Develop',
      sex: '1',
      age: 30,
      address: 'Shenzhen',
    },
    {
      id: 10010,
      name: 'Test10',
      nickname: 'T10',
      role: 'Develop',
      sex: '0',
      age: 34,
      address: 'Shanghai',
    },
  ],
})
export function createFakeTableData(params, type?: string) {
  let filterList: any[] = []
  if (type === 'add') {
    data.list.unshift({
      ...params,
      id: +new Date(),
      role: 'xx',
      address: 'xx',
    })
    filterList = data.list
  }
  if (type === 'edit') {
    const idx = data.list.indexOf(params.id)
    data.list.splice(idx, 1)
    data.list.unshift(params)
    filterList = data.list
  }
  if (params?.name && params?.sex) {
    filterList = data.list.filter((item) => item.name.includes(params?.name))
    filterList = filterList.filter((item) => item.sex.includes(params?.sex))
  } else if (params?.name) {
    filterList = data.list.filter((item) => item.name.includes(params?.name))
  } else if (params?.sex) {
    filterList = data.list.filter((item) => item.sex.includes(params?.sex))
  } else {
    filterList = data.list
  }
  return resultSuccess({
    items: filterList,
    total: filterList.length,
  })
}

export default [
  {
    url: '/api/table/business',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return createFakeTableData(body)
    },
  },
  {
    url: '/api/table/add',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return createFakeTableData(body, 'add')
    },
  },
  {
    url: '/api/table/edit',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      return createFakeTableData(body, 'edit')
    },
  },
  {
    url: '/api/table/proxy',
    timeout: 200,
    method: 'get',
    response: () => {
      return resultSuccess({
        items: [
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
        ],
        total: 13,
      })
    },
  },
] as MockMethod[]
