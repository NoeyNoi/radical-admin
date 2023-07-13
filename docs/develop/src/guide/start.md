---
title: 开始
icon: vaadin:start-cog
order: 2
category:
  - 使用指南
---

本文会帮助你从头启动项目

## 环境准备

本地环境需要安装 [pnpm](https://pnpm.io/)、[Node.js](http://nodejs.org/)

::: warning 注意
- 推荐使用[pnpm](https://pnpm.io/)，否则依赖可能安装不上。
- [Node.js](http://nodejs.org/) 版本要求`16.x`以上。

如果有多版本管理诉求：
- node 版本管理，推荐使用[nvm](https://github.com/nvm-sh/nvm)
- npm 源管理，推荐使用[nrm](https://github.com/Pana/nrm)
:::


## 开发工具
推荐使用[VSCode](https://code.visualstudio.com/)

### vscode插件推荐
- [UnoCSS VS Code Extension](https://unocss.dev/integrations/vscode)
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Svg Preview](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## 安装

### 安装 Node.js

如果您电脑未安装[Node.js](https://nodejs.org/en/)，请安装它。

**验证**

```bash
# 出现相应npm版本即可
npm -v
# 出现相应node版本即可
node -v
```

如果你需要同时存在多个 node 版本，可以使用 [Nvm](https://github.com/nvm-sh/nvm) 进行 Node.js 进行版本管理。

### 安装依赖

#### pnpm 安装

必须使用 [pnpm](https://pnpm.io/)进行依赖安装（若其他包管理器安装不了需要自行处理）。

如果未安装`pnpm`，可以用下面命令来进行全局安装

```bash
# 全局安装yarn
npm install -g pnpm
# 验证
pnpm -v # 出现对应版本号即代表安装成功
```

#### 依赖安装命令

在项目根目录下，打开命令窗口执行，耐心等待安装完成即可

```bash
# 安装依赖
pnpm i
```

## npm script

```bash
"scripts": {
  # 安装依赖
  "bootstrap": "pnpm install",
  # 构建项目
  "build": "pnpm --filter scripts build",
  # 构建分析，在 `Mac OS` 电脑上执行完成后会自动打开界面，在 `Window` 电脑上执行完成后需要打开 `./build/.cache/stats.html` 查看
  "report": "pnpm --filter scripts report",
  # 删除 node_modules
  "clean": "pnpm turbo run clean && rimraf node_modules",
  # 运行项目
  "dev": "pnpm --filter scripts dev",
  # 执行eslint、校验，及stylelint、prettier格式化
  "format": "pnpm run lint:eslint & pnpm run lint:stylelint & pnpm run lint:prettier",
  # 执行 eslint 校验，并修复部分问题
  "lint:eslint": "eslint . --cache --max-warnings 0 --fix",
   # 执行 stylelint 格式化
  "lint:stylelint": "stylelint --fix ",
  # 执行 prettier 格式化（该命令会对项目所有代码进行 prettier 格式化，请谨慎执行）
  "lint:prettier": "prettier --write  \"{packages,apps,configs,scripts}/**/*.{js,json,ts,tsx,css,less,scss,vue,html,md}\"",
  # 重新安装依赖
  "reinstall": "pnpm turbo run clean && rimraf pnpm-lock.yaml && rimraf node_modules && npm run bootstrap",
  # 预构建vite配置
  "postinstall": "pnpm run stub",
  "stub": "pnpm --filter @config/** prepack",
  # 打包，依赖turbo.json配置
  "turbo:build": "turbo run build --parallel",
  # 打包分析，依赖turbo.json配置
  "turbo:report": "turbo run report --parallel",
  # 启动，依赖turbo.json配置
  "turbo:dev": "turbo run dev --parallel",
  # 预览，依赖turbo.json配置
  "turbo:preview": "turbo run preview --parallel",
  # 限制开发的时候，必须使用pnpm
  "preinstall": "npx only-allow pnpm"
}
```

::: tip
特别的，作为 [monorepo](https://juejin.cn/post/7215886869199896637) 方式管理的项目，我们对开发、打包命令做了优化，这使得你在根目录启动各种命令也会尤为方便

如果您的机器无法启动`dev`命名，请尝试添加`sudo`，如：
```shell
sudo pnpm dev
```
:::

### 重新安装依赖
该命令会先删除 `node_modules`、`yarn.lock`、`package.lock.json` 后再进行依赖重新安装（安装速度会明显变慢）。


## 目录说明
接下来你可以修改代码进行业务开发了。我们内建了模拟数据、HMR 实时预览、状态管理、国际化、全局路由等各种实用的功能辅助开发，请阅读其他章节了解更多。

```shell
├─scripts #脚本相关
├─packages #公共依赖包
|    ├─utils #工具方法相关
|    ├─types #ts类型
|    ├─table #列表组件库
|    ├─styles #样式处理
|    ├─stores #状态管理
|    ├─router #路由
|    ├─request #请求库
|    ├─locale #国际化
|    ├─layouts #主题相关
|    ├─hooks #一些hooks
|    ├─formily #表单库
|    ├─directives #指令
|    ├─constants #常量、枚举
|    ├─components #公共组件
├─docs
|  ├─develop #开发文档
|  ├─business #用户文档，待实现
├─configs
|    ├─vite #vite相关配置
|    ├─tsconfig #ts相关配置
|    ├─lint #lint相关处理
|    ├─css-preprocess #css预处理
├─apps
|  ├─admin #后台模板，业务开发时复制该文件夹重命名相关title即可
├─.vscode #编辑器相关配置
|    ├─extensions.json
|    └settings.json
├─.github #github工作流相关
```

## 业务开发
[apps/admin](https://github.com/NoeyNoi/radical-admin/tree/main/apps/admin) 仅作为示例项目，项目内会包含各种示例、功能，也会随时更新

真实的业务开发，可以复制 `admin` 项目并重命名相关配置即可，如 `package.json`中的 `name`字段
