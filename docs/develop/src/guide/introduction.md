---
title: 介绍
icon: ph:info-bold
order: 1
category:
  - 使用指南
---

## 简介
`Radical Admin`：意为极端的管理后台框架，极端是因为框架内有诸多约定，并且可能是唯一选项，例如只能使用`pnpm`管理依赖，如果你觉得不妥，可以放弃使用，市面上有诸多优秀的后台框架可供选择

[Radical Admin](https://github.com/NoeyNoi) 是一个基于 [Vue3.0](https://github.com/vuejs/core)、[Vite](https://github.com/vitejs/vite)、 [Ant-Design-Vue](https://www.antdv.com/docs/vue/introduce-cn/)、[TypeScript](https://www.typescriptlang.org/) 的后台解决方案，目标是为开发中大型项目提供开箱即用的解决方案。包括二次封装组件、utils、hooks、动态菜单、权限校验等功能。项目会使用前端较新的技术栈，你可以将该项目作为启动模版，以帮助你快速搭建企业级中后台产品原型。也可以作为一个示例，用于学习 `vue3`、`vite`、`ts` 等主流技术。该项目会持续跟进最新技术，并将其应用在项目中。

## 文档
- 文档使用 Vuepress 开发
- 文档主题采用 [VuePress Theme Hope](https://theme-hope.vuejs.press/zh/)，一个具有强大功能的 vuepress 主题

### 本地运行文档
::: tabs

@tab 使用pnpm

安装依赖
```bash
pnpm i
```

本地开发
```bash
pnpm docs:dev
```
:::

## 需要掌握的基础知识

本项目需要一定前端基础知识，请确保掌握 Vue 的基础知识，以便能处理一些常见的问题。
建议在开发前先学一下以下内容，提前了解和学习这些知识，会对项目理解非常有帮助:

- [Turborepo](https://turbo.build/repo/docs)
- [Vitejs](https://cn.vitejs.dev/)
- [Vue3 文档](https://cn.vuejs.org/guide/introduction.html)
- [Vue-Router-Next](https://router.vuejs.org/zh/)
- [Pinia](https://pinia.vuejs.org/zh/introduction.html)
- [TypeScript](https://www.typescriptlang.org/)
- [Es6](https://es6.ruanyifeng.com/)
- [Ant-Design-Vue](https://www.antdv.com/docs/vue/introduce-cn/)
- [Formily](https://formilyjs.org/zh-CN/guide/learn-formily)
- [Formily Antdv-x3](https://antdv-x3.formilyjs.org/)
- [vxe-table](https://vxetable.cn/#/grid/api)
- [UnoCSS](https://unocss.dev/guide/)
- [Iconify](https://icon-sets.iconify.design/)
- [vue-i18n](https://vue-i18n.intlify.dev/guide/)
- [Mock.js](https://github.com/nuysoft/Mock)


## 浏览器支持

**本地开发**推荐使用`Chrome 最新版`浏览器，**不支持**`Chrome 80`以下版本。

**生产环境**支持现代浏览器，不支持 IE。

| [![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png)](http://godban.github.io/browsers-support-badges/)IE | [![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/)Edge | [![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/)Firefox | [![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/)Chrome | [![](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/)Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |