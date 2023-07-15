---
title: 常见问题
icon: pajamas:question-o
category:
  - 使用指南
---

## 前言

遇到问题,可以先从以下几个方面查找

1. 对应模块的 GitHub 仓库 [issue](https://github.com/NoeyNoi/radical-admin/issues) 搜索
2. 从[google](https://www.google.com)搜索问题
3. 从[百度](https://www.百度.com)搜索问题
4. 在下面列表找不到问题可以到 issue 提问 [issues](https://github.com/NoeyNoi/radical-admin/issues)

## 关于缓存更新问题
radical-admin 的项目配置默认是缓存在 `localStorage` 内，所以版本更新后可能有些配置没改变。

解决方式是每次更新代码的时候修改 `package.json` 内的 `version` 版本号. 因为 localStorage 的 key 是根据版本号来的。所以更新后版本不同前面的配置会失效。重新登录即可

`RADICAL_ADMIN_DEVELOPMENT_1.0.0___PROJECT_CONFIG` key 的组成是 [项目名]+[开发环境]+[版本号]+[key]

## 关于修改配置文件的问题
当修改 `.env` 等环境文件及 `vite.config.ts` 文件时，vite 会自动重启服务。
自动重启有几率出现问题，请重新运行项目即可解决.

## 添加菜单后没显示
菜单必须和路由匹配才会显示在界面上，所以得确保菜单和对应的路由存在即可显示.

## imagemin 依赖安装失败
由于 imagemin 在国内安装困难，提供以下解决方案：

package.json 内配置（推荐，项目内已集成）
```json
"resolutions": {
  "bin-wrapper": "npm:bin-wrapper-china"
}
```

::: tip 提示
如果上述方法还是不能安装依赖，可以将图片压缩功能移除，移除方法如下：
- 删除 `vite-plugin-imagemin` 相关逻辑和依赖。这会导致图片没有压缩，但是可以手动到在线网站进行压缩。这里推荐[tinypng](https://tinypng.com/)
:::

## 本地运行报错
由于 vite 在本地没有转换代码，且代码中用到了可选链等比较新的语法。所以本地开发需要使用版本较高的浏览器(`Chrome 85+`)进行开发

## tab 页切换后页面反应较慢
开发环境下，切换tab需要异步加载对应页面组件，弱网情况下加载较慢，(不是bug，后续会想办法解决)
