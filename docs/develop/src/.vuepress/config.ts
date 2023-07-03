import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "Radical Admin",
  description: "框架开发文档",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
