---
title: 项目配置
icon: uil:setting
category:
  - 使用指南
---

用于修改项目的配色、布局、缓存、多语言、组件默认配置

## 环境变量配置
环境变量配置位于各项目（`apps/*`）根目录下的 `.env`、`.env.development`、`.env.production`文件中

具体可以参考 [Vite](https://cn.vitejs.dev/guide/) 文档

```shell
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

::: tip 提示
- 只有以 VITE_ 开头的变量会被嵌入到客户端侧的包中，你可以项目代码中这样访问它们：
```ts
console.log(import.meta.env.VITE_PROT)
```

- 以 VITE_GLOB_* 开头的的变量，在打包的时候，会被加入 `_app.config.js`（打包后可见） 配置文件当中.
:::

### 配置项说明
### .env
所有环境适用
```shell
# 应用启动端口号，修改后需要重新启动
VITE_PORT = 3000
# 网站标题
VITE_GLOB_APP_TITLE = Radical Admin
# 简称，用于配置文件名字 不要出现空格、数字开头等特殊字符
VITE_GLOB_APP_SHORT_NAME = radical_admin
```

### .env.development

开发环境适用

```bash
# 是否开启mock数据，关闭时需要自行对接后台接口，线上建议关闭
VITE_USE_MOCK=true

# 资源公共路径,需要以 /开头和结尾
VITE_PUBLIC_PATH=/

# # 打包时是否删除 console 和 debug
VITE_DROP_CONSOLE=false

# 本地开发代理，可以解决跨域及多地址代理
# 如果接口地址匹配到，则会转发到http://localhost:3000，防止本地出现跨域问题
# 可以有多个，注意多个不能换行，否则代理将会失效
VITE_PROXY=[["/api","http://localhost:3000"],["api1","http://localhost:3001"],["/upload","http://localhost:3001/upload"]]

# 接口地址
# 如果没有跨域问题，直接在这里配置即可
VITE_GLOB_API_URL=/api
```

::: warning 注意

这里配置的 `VITE_PROXY` 以及 `VITE_GLOB_API_URL`, /api 需要是唯一的，不要和接口有的名字冲突

如果你的接口是 `http://localhost:3000/api` 之类的，请考虑将 `VITE_GLOB_API_URL=/xxxx` 换成别的名字
:::

### .env.production

生产环境适用

```bash
# 是否开启mock数据，线上建议关闭
VITE_USE_MOCK=true

# 资源公共路径,需要以 /开头和结尾
VITE_PUBLIC_PATH=/

# # 打包时是否删除 console 和 debug
VITE_DROP_CONSOLE=false

# 接口地址 可以由nginx做转发或者直接写实际地址
VITE_GLOB_API_URL=/api

# 打包是否输出gz｜br文件
# 可选: gzip | brotli | none
# 也可以有多个, 例如 ‘gzip’|'brotli',这样会同时生成 .gz和.br文件
VITE_BUILD_COMPRESS = 'gzip'

# 打包是否压缩图片
VITE_USE_IMAGEMIN = false

# 是否兼容旧版浏览器。开启后打包时间会慢一倍左右。会多打出旧浏览器兼容包,且会根据浏览器兼容性自动使用相应的版本
VITE_LEGACY = false
```


## 生产环境动态配置
### 说明

当执行`pnpm build`构建项目之后，会自动生成 `_app.config.js` 文件并插入 `index.html`。

**注意: 开发环境不会生成**

```ts
// _app.config.js
/**
 * _app.config.js
 * 变量名命名规则  __PRODUCTION__xxx_CONF__   xxx：为.env配置的VITE_GLOB_APP_SHORT_NAME
 * 如：在 apps/admin 中可通过window.__PRODUCTION__RADICAL_ADMIN__CONF__访问到
 */
window.__PRODUCTION__RADICAL_ADMIN__CONF__ = {
  VITE_GLOB_API_URL: "/api",
  VITE_GLOB_APP_SHORT_NAME: "radical_admin",
  VITE_GLOB_APP_TITLE: "RadicalAdmin"
}
```

### 作用
`_app.config.js` 用于项目在打包后，需要动态修改配置的需求，如接口地址。不用重新进行打包，可在打包后修改 `/dist/_app.config.js` 内的变量，刷新即可更新代码内的局部变量。

### 如何获取全局变量
想要获取 `_app.config.js` 内的变量，可以使用 [packages/utils/src/config.ts](xxxxxxx:github) 提供的 `getGlobalConfig` 函数来进行获取
```js
import { getGlobalConfig } from '@radical/utils'

const { title } = getGlobalConfig(import.meta.env)
```

### 如何新增(新增一个可动态修改的配置项)
1. 首先在 `.env` 或者对应的开发环境配置文件内，新增需要可动态配置的变量，需要以 `VITE_GLOB_`开头
2. `VITE_GLOB_` 开头的变量会自动加入环境变量，通过在 `packages/types/shims/src/config.ts` 内修改 `GlobEnvConfig` 和 `GlobConfig` 两个环境变量的值来定义新添加的类型
3. [packages/utils/src/config.ts](xxxxxxx:github) `getGlobalConfig` 函数中添加刚新增的返回值即可

```ts
export function getGlobalConfig(
  env: Record<string, any>,
): Readonly<GlobConfig> {
  const { ..., VITE_GLOB_TEST_GLOBAL } = getAppConfig(env)

  const glob: Readonly<GlobConfig> = {
    ...,
    testGlobal: VITE_GLOB_TEST_GLOBAL
  }
  return glob as Readonly<GlobConfig>
}
```

## 项目配置

::: warning
项目（即apps/*下的业务应用）配置文件用于配置项目内展示的主题、内容、布局等效果，存于`localStorage`中。如果更改了项目配置，需要手动**清空** `localStorage` 缓存，刷新重新登录后方可生效。
:::

### 配置文件路径
[apps/xxx/src/setting/project.ts](xxx)

### 说明

```ts
// ! 改动后需要清空浏览器缓存
export const projectSetting: ProjectConfig = {
  // 是否显示设置按钮
  showSettingButton: true,
  // 是否显示主题切换按钮
  showDarkModeToggle: true,
  /**
   * 设置按钮位置 可选项
   * AUTO: 自动选择
   * HEADER: 位于头部
   * FIXED: 固定在右侧
   */
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // 权限模式:通过用户角色来过滤菜单(前端方式控制)，菜单由路由配置自动生成
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 权限缓存存放位置。sessionStorage 或者 localStorage
  permissionCacheType: CacheTypeEnum.LOCAL,
  /**
   * 会话超时处理方案
   * ROUTE_JUMP: 路由跳转到登录页
   * PAGE_COVERAGE: 生成登录弹窗，覆盖当前页面
   */
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // ! 网站灰色模式，用于可能悼念的日期开启
  grayMode: false,
  // 色弱模式
  colorWeak: false,
  // 仅显示内容：将会隐藏菜单、顶部、多标签页显示, 用于嵌入第三方应用
  fullContent: false,
  // 头部配置
  headerSetting: {
    // 是否显示顶部
    show: true,
    // 是否显示全屏按钮
    showFullScreen: true,
    // 是否显示语言选择
    showLocalePicker: true,
  },
  // 菜单配置
  menuSetting: {
    // 菜单折叠
    collapsed: false,
    collapsedWidth: 48,
    // 是否显示
    show: true,
    // 是否显示dom
    hidden: false,
    // 菜单宽度
    menuWidth: 210,
    // 菜单模式
    mode: MenuModeEnum.INLINE,
    // 菜单类型
    type: MenuTypeEnum.SIDEBAR,
    // 顶部菜单布局
    topMenuAlign: 'center',
    // 手风琴模式，每次只展示一个菜单
    accordion: false,
  },
  // 多标签
  multiTabsSetting: {
    // 开启
    show: true,
    // 是否可以拖放排序选项卡
    canDrag: true,
    // 开启快速操作
    showQuick: true,
    // 是否显示刷新按钮
    showRedo: true,
    // 是否显示折叠按钮
    showFold: true,
  },
  // 是否开启KeepAlive缓存,开发时候最好关闭,不然每次都需要清除缓存
  openKeepAlive: true,
  // 是否显示面包屑
  showBreadCrumb: true,
  // 是否可以嵌入iframe页面
  canEmbedIFramePage: true,
  // 切换界面的时候是否删除未关闭的message及notify
  closeMessageOnSwitch: true,
  // 切换界面的时候是否取消已经发送但是未响应的http请求。
  // 如果开启,想对单独接口覆盖。可以在单独接口设置
  removeAllHttpPending: false,
}
```

## 多语言配置

用于配置多语言信息，如果你的项目不需要国际化，请删除相关逻辑，这也有助于提升性能

在 [packages/locale/src/config.ts](xxxx) 内配置

```ts
export const LOCALE: { [key: string]: LocaleType } = {
  zh: 'zh_CN',
  en: 'en',
}
// 语言列表
export const localeList: any[] = [
  {
    text: '简体中文',
    event: LOCALE.zh,
  },
  {
    text: 'English',
    event: LOCALE.en,
  },
]
// 国际化设置
export const localeSetting: LocaleConfig = {
  // 语言环境
  locale: LOCALE.zh,
  // 预设的语言环境。用于I18n回退
  fallback: LOCALE.zh,
  // 以词法顺序排列的 messages 中的可用语言环境列表
  availableLocales: [LOCALE.zh, LOCALE.en],
}
```

::: tip 提示
开发时，只需在 `packages/locale/src/lang/xx` 配置对应的语言映射即可

业务逻辑按照如下方式使用
```ts
import { useI18n } from '@radical/locale'
const { t } = useI18n()

t('sys.login.signInFormTitle') // 会自动根据语言环境映射对应的文本
```
:::


