---
title: 菜单及权限
icon: ic:baseline-menu-open
order: 5
category:
  - 使用指南
---

项目菜单会因为权限模式的不同而采用不同的处理方式，admin示例采用了 `ROUTE_MAPPING` 模式，该模式会根据路由自动生成菜单，也是开发中选择最多的权限管理模式

## 权限

项目中集成了2种权限处理方式：

1. `PermissionModeEnum.ROLE`：通过用户角色来过滤菜单(前端方式控制)，菜单和路由分开配置，此种模式需要定义菜单，如需要请自行实现
2. `PermissionModeEnum.ROUTE_MAPPING`：通过用户角色来过滤菜单(前端方式控制)，菜单由路由配置自动生成

::: info
开发中还有一种模式，即：通过后台来动态生成路由表(不同于前端实现的方式，该权限由后台方式控制)，如有需要可自行实现
:::

## 前端角色权限
**实现原理:** 在前端固定写死路由的权限，指定路由有哪些权限可以查看。只初始化通用的路由，需要权限才能访问的路由没有被加入路由表内。在登陆后或者其他方式获取用户角色后，通过角色去遍历路由表，获取该角色可以访问的路由表，生成路由表，再通过 `router.addRoutes` 添加到路由实例，实现权限的过滤。

**缺点:** 权限相对不自由，如果后台改动角色，前台也需要跟着改动。适合角色较固定的系统

### 使用
1. 在 [apps/xxx/src/setting/index.ts](https://github.com/NoeyNoi/radical-admin/blob/main/apps/admin/src/setting/index.ts) 将系统内权限模式设为 `ROUTE_MAPPING` 模式

```ts
// ! 改动后需要清空浏览器缓存
export const projectSetting: ProjectConfig = {
  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
};
```
2. 在路由表配置路由所需的权限，如果不配置，默认可见(见注释)

```ts
import type { AppRouteModule } from '/@/router/types';

import { getParentLayout, LAYOUT } from '/@/router/constant';
import { RoleEnum } from '/@/enums/roleEnum';
import { t } from '/@/hooks/web/useI18n';

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/front/page',
  meta: {
    icon: 'ion:key-outline',
    title: 'xxx'
  },
  children: [
    {
      path: 'front',
      name: 'PermissionFrontDemo',
      component: () => import('xxx'),
      meta: {
        title: t('routes.demo.permission.front'),
      },
      children: [
        {
          path: 'auth-pageA',
          name: 'FrontAuthPageA',
          component: () => import('yyy'),
          meta: {
            title: 'yyy',
            roles: ['super'],
          },
        },
        {
          path: 'auth-pageB',
          name: 'FrontAuthPageB',
          component: () => import('zzz'),
          meta: {
            title: 'zzz',
            roles: ['admin'],
          },
        },
      ],
    },
  ],
}

export default permission
```
