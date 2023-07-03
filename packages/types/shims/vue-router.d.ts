declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, any> {
    // 适配动态key
    [key: string]: any
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
    // 当前激活的菜单。用于配置详情页时左侧激活的菜单路径
    currentActiveMenu?: string
    // 当前路由不再标签页显示
    hideTab?: boolean
    // 菜单排序，只对第一级有效
    orderNo?: number
    // 忽略路由。用于在ROUTE_MAPPING权限模式下，生成对应的菜单而忽略路由
    ignoreRoute?: boolean
    // 是否在子级菜单的完整path中忽略本级path
    hidePathForChildren?: boolean
  }
}

export {}
