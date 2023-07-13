<h1>radical admin</h1>

## 简介

后台模板工程

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Turborepo](https://turbo.build/repo/docs) Turborepo 使用
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.vuejs.org/) - 熟悉 Vue 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Vue-Router-Next](https://next.router.vuejs.org/) - 熟悉 vue-router 基本使用
- [Ant-Design-Vue](https://2x.antdv.com/docs/vue/introduce-cn/) - ui 基本使用
- [Formily](https://formilyjs.org/zh-CN/guide/learn-formily) - 表单解决方案 基本使用
- [Formily Antdv-x3](https://antdv-x3.formilyjs.org/guide/#%E4%BB%8B%E7%BB%8D) - 表单组件库 基本使用
- [vxe-table](https://vxetable.cn/#/grid/api) - 列表解决方案 基本使用
- [Pinia](https://pinia.vuejs.org/zh/introduction.html) - 状态管理库 基本使用
- [UnoCSS](https://unocss.dev/guide/) - CSS 框架 基本使用
- [Iconify](https://icon-sets.iconify.design/) - 图标解决方案
- [vue-i18n](https://vue-i18n.intlify.dev/guide/) - 国际化解决方案
- [Mock.js](https://github.com/nuysoft/Mock) - mockjs 基本语法

## 快速检索
- [unocss](https://unocss.dev/interactive/)
- [iconify](https://icon-sets.iconify.design/)
- [formily schema](https://vue.formilyjs.org/api/shared/schema.html#%E5%B1%9E%E6%80%A7)
- [formily form](https://core.formilyjs.org/zh-CN/api/models/form#form)

## vscode插件推荐

- [UnoCSS VS Code Extension](https://unocss.dev/integrations/vscode)
- [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify)
- [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Svg Preview](https://marketplace.visualstudio.com/items?itemName=SimonSiefke.svg-preview)
- [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/NoeyNoi/radical-admin.git
```

- 安装依赖

```bash
cd radical-admin

pnpm i
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## Git 提交规范

### 命令
```bash
pnpm commit
```
- 参考  [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))
- `feat` 增加新功能
- `fix` 修复问题/BUG
- `style` 代码风格相关无影响运行结果的
- `perf` 优化/性能提升
- `refactor` 重构
- `revert` 撤销修改
- `test` 测试相关
- `docs` 文档/注释
- `chore` 依赖更新/脚手架配置修改等
- `workflow` 工作流改进
- `ci` 持续集成
- `types` 类型定义文件更改
- `wip` 开发中

## 相关仓库
- [vben3](https://github.com/vbenjs/vben3) 本项目已修改，与原项目略有不同，仅作参考
- [Vben Admin](https://doc.vvbin.cn/) - 模板主题文档，本项目略有不同，仅作参考
- [Monibuca-console](https://github.com/Monibuca/console) - m7s 实例管理平台

## QA
- 国际化插件（i18n Ally）不生效或者报错：尝试卸载重新安装

## 主题切换
antdvue 切换参考[https://antdv.com/docs/vue/customize-theme-variable-cn#%E7%BC%96%E8%AF%91-less](https://antdv.com/docs/vue/customize-theme-variable-cn#%E7%BC%96%E8%AF%91-less) 编译对应的css文件并引入，prefixCls的两种主题的前缀为
- dark：暗黑模式
- light：正常模式
如页面内有修改组件样式，注意适配主题，如：
```css
.dark-tabs-tab,
.light-tabs-tab
{
  border: none;
  transition: none;
}
```
vxe-table 切换参考[https://vxetable.cn/#/table/start/theme](https://vxetable.cn/#/table/start/theme)第二种方式，css 变量
