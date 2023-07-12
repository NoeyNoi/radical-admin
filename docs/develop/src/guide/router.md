---
title: 路由
icon: fontisto:nav-icon-list-a
order: 4
category:
  - 使用指南
---

项目路由配置存放于 [apps/*/src/router/routes](https://github.com/NoeyNoi/radical-admin/tree/main/apps/admin/src/router/routes) 下面。 [apps/*/src/router/routes/modules](https://github.com/NoeyNoi/radical-admin/tree/main/apps/admin/src/router/routes/modules)用于存放路由模块，在该目录下的文件会自动注册。

## 配置

### 模块说明
在 [apps/*/src/router/routes/modules](https://github.com/NoeyNoi/radical-admin/tree/main/apps/admin/src/router/routes/modules) 内的 `.ts` 文件会被视为一个路由模块。

一个路由模块包含以下结构
```ts
import { LAYOUT } from '../basic'

const dashboard: RouteRecordItem = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 1,
    icon: 'mdi:monitor-dashboard',
    title: 'routes.dashboard.dashboard',
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/pages/dashboard/analysis/index.vue'),
      meta: {
        title: 'routes.dashboard.analysis',
        affix: true,
      },
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('@/pages/dashboard/workbench/index.vue'),
      meta: {
        title: 'routes.dashboard.workbench',
      },
    },
  ],
}

export default dashboard
```

### Meta 配置说明
```ts
export interface RouteMeta {
  // 路由title  一般必填
  title: string
  // 动态路由可打开Tab页数
  dynamicLevel?: number
  // 动态路由的实际Path, 即去除路由的动态部分;
  realPath?: string
  // 是否忽略权限
  ignoreAuth?: boolean
  // 可以访问的角色，只在权限模式为Role的时候有效
  roles?: string[]
  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean
  // 是否固定在tabs上
  affix?: boolean
  // icon图标，也是菜单图标
  icon?: string
  // 内嵌iframe的地址
  frameSrc?: string
  // 隐藏该路由在面包屑上面的显示
  hideBreadcrumb?: boolean
  // 如果该路由会携带参数，且需要在tab页上面显示。则需要设置为true
  carryParam?: boolean
  // 当前路由不在菜单显示
  hideMenu?: boolean
  // 隐藏所有子菜单
  hideChildrenInMenu?: boolean
  // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径，结合动态路由使用
  currentActiveMenu?: string
  // 当前路由不在标签页显示
  hideTab?: boolean
  // 菜单排序，只对第一级有效
  orderNo?: number
  // 忽略路由。用于在ROUTE_MAPPING权限模式下，生成对应的菜单时忽略该路由
  ignoreRoute?: boolean
  // 是否在子级菜单的完整path中忽略本级path
  hidePathForChildren?: boolean
}
```

### 多级路由

::: warning 注意事项
- 整个项目所有路由 `name` 不能重复
- 所有的多级路由最终都会转成二级路由，所以不能内嵌子路由（即子页面中包含router-view也不会分发）
- 除了 layout 对应的 path 前面需要加 `/`，其余子路由都不要以`/`开头
:::

**示例**

```ts
import { LAYOUT } from '../../basic'
/**
 * 由于多级路由最终会转为二级路由，所以你也可以完全不写实际不存在的component
 * 4.1版本之前即时不会被渲染也要求提供component，4.1版本提供了解决方案，参考：https://github.com/vuejs/router/releases/tag/v4.1.0
 */
const MultiLevel: RouteRecordItem = {
  path: '/multiLevel',
  name: 'MultiLevel',
  component: LAYOUT,
  redirect: '/multiLevel/level1',
  meta: {
    orderNo: 4,
    title: '多级路由',
    icon: 'tabler:menu-deep',
  },
  children: [
    {
      path: 'level1',
      name: 'Level1',
      // 可不写
      component: () => import('@/pages/demo/page/index.vue'),
      meta: {
        title: 'Level1',
      },
      children: [
        {
          path: 'level1-1',
          name: 'Level1-1',
          // 可不写
          component: () => import('@/pages/demo/page/index.vue'),
          meta: {
            title: 'Level1-1',
          },
          children: [
            {
              path: 'level1-1-1',
              name: 'Level1-1-1',
              component: () => import('@/pages/demo/page/index.vue'),
              meta: {
                title: 'Level1-1-1',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default MultiLevel
```

### 外部页面嵌套

只需要将 `frameSrc` 设置为需要跳转的地址即可

```ts
const IFrame = () => import('@/pages/sys/iframe/FrameBlank.vue')
{
  path: 'antv',
  name: 'Antv',
  component: IFrame,
  meta: {
    frameSrc: 'https://antdv.com/components/overview-cn/',
    title: 'antVue文档(内嵌)',
  },
},
```

### 外链

只需要将 `path` 设置为需要跳转的 **HTTP/HTTPS 地址** 即可，内部会根据是否为链接来自动处理

```ts
const IFrame = () => import('@/pages/sys/iframe/FrameBlank.vue')
{
  path: 'https://antdv.com/components/overview-cn/',
  name: 'DocExternal',
  component: IFrame,
  meta: {
    title: '项目文档(外链)',
  },
},
```

### 动态路由及Tab自动关闭功能
一般用于详情页的处理

若需要开启该功能，需要在动态路由的`meta`中设置如下两个参数：
- `dynamicLevel` 最大能打开的Tab标签页数（超过该值时新打开的tab会替换掉最旧的tab）
- `realPath` 动态路由实际路径(考虑到动态路由有时候可能存在N层的情况, 例：`/:id/:subId/:...`), 为了减少计算开销, 使用配置方式事先规定好路由的实际路径(注意: <b style="color: red">该参数若不设置，将无法使用该功能</b>)

```ts
import { LAYOUT } from '../../basic'

const Dynamic: RouteRecordItem = {
  path: '/tabs',
  name: 'Tabs',
  component: LAYOUT,
  redirect: '/tabs/tab',
  meta: {
    icon: 'material-symbols:dynamic-form-rounded',
    title: '动态路由',
    orderNo: 3,
  },
  children: [
    {
      path: 'tab',
      name: 'Tab',
      component: () => import('@/pages/tabs/Tab.vue'),
      meta: {
        title: 'Tab'
      },
    },
    {
      path: 'detail/:time',
      name: 'TabDetail',
      component: () => import('@/pages/tabs/TabDetail.vue'),
      meta: {
        currentActiveMenu: '/tab',
        title: '动态路由详情',
        hideMenu: true,
        dynamicLevel: 3,
        realPath: '/tabs/detail',
      },
    }
  ]
}

export default Dynamic
```

### 图标
这里的 `icon` 配置，会同步到 **菜单**（icon 的使用方式可以查看[此处](../deep/icon.md)）

## 新增路由

### 如何新增一个路由模块
在 [apps/*/src/router/routes/modules](https://github.com/NoeyNoi/radical-admin/tree/main/apps/admin/src/router/routes/modules) 内新增一个模块文件。

示例，新增 test.ts 文件

```ts
import { LAYOUT } from '../../basic'

const test: RouteRecordItem = {
  path: '/test',
  name: 'Test',
  component: LAYOUT,
  redirect: '/test/test',
  meta: {
    orderNo: 7,
    icon: 'ph:code-bold',
    title: '测试',
  },
  children: [
    {
      path: 'test',
      name: 'ttest',
      component: () => import('@/pages/test/test.vue'),
      meta: {
        icon: 'mdi:monitor-dashboard',
        title: 'Test',
      },
    },
  ],
}

export default test
```

此时路由已添加完成，不需要手动引入，放在 [apps/*/src/router/routes/modules](https://github.com/NoeyNoi/radical-admin/tree/main/apps/admin/src/router/routes/modules) 内的文件会自动被加载。

### 验证

访问 **ip:端口/test/test** 出现对应组件内容即代表成功

## 路由刷新

项目中采用的是**重定向**方式

### 使用方式

```ts
import { useGo, useRedo } from '@radical/hooks'
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    const redo = useRedo()
    // 执行刷新
    redo()

    return {}
  },
})
```

## 页面跳转
页面跳转建议采用项目提供的 `useGo`

### 使用方式

```ts
<script lang="ts" setup>
import { Button } from 'ant-design-vue'
import { useGo } from '@radical/hooks'

const go = useGo()
const  handleDetail = () => {
  const time = +new Date()
  go(`/tabs/detail/${time}`)
}
</script>
<template>
  <Button @click="handleDetail">打开详情页</Button>
</template>
```

## 多标签页
标签页使用的是 `keep-alive` 和 `router-view` 实现，实现切换 tab 后还能保存切换之前的状态

### 如何开启页面缓存

开启缓存有 3 个条件

1. 在 [apps/xxx/src/setting/index.ts](https://github.com/NoeyNoi/radical-admin/blob/main/apps/admin/src/setting/index.ts) 内将`openKeepAlive` 设置为 `true`
2. 路由设置 `name`，且 **不能重复**
3. 路由对应的组件加上 `name`，与路由设置的 `name` 保持一致

```ts
 {
   ...,
    // name
    name: 'Login',
    // 对应组件组件的name
    component: () => import('@/pages/sys/login/login.vue'),
    ...
  },

  // @/pages/sys/login/login.vue
  export default defineComponent({
    // 需要和路由的name一致
    name:"Login"
  })
  // 或
  <script lang="ts" setup name="Login">
  </script>
```

:::warning 注意
keep-alive 生效的前提是：需要将路由的 `name` 属性及对应的页面的 `name` 设置成一样。因为：

**include - 字符串或正则表达式，只有名称匹配的组件会被缓存**
:::

### 如何让某个页面不缓存

**可在 router.meta 下配置**

可以将 `ignoreKeepAlive` 配置成 `true` 即可关闭缓存。

```ts
export interface RouteMeta {
  // 是否忽略KeepAlive缓存
  ignoreKeepAlive?: boolean;
}
```

## 如何更改首页路由

首页路由指的是应用程序中的默认路由，当不输入其他任何路由时，会自动重定向到该路由下，并且该路由在Tab上是固定的，即使设置`affix: false`也不允许关闭

例：首页路由配置的是`/dashboard/analysis`，那么当直接访问 `http://localhost:3000/` 会自动跳转到`http://localhost:3000/#/dashboard/analysis` 上(用户已登录的情况下)

可以将[`PageEnum`](https://github.com/NoeyNoi/radical-admin/blob/main/packages/constants/src/router.ts)中的`BASE_HOME`更改为需要你想设置的首页即可
```ts
export enum PageEnum {
  // 更改此处即可
  BASE_HOME = '/dashboard',
}
```
