import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "指南",
    icon: "icon-park-outline:guide-board",
    link: '/guide/introduction'
  },
  {
    text: "深入",
    icon: "icon-park-outline:deeplink",
    link: '/deep/icon'
  },
  {
    text: "其他",
    icon: "material-symbols:other-admission-outline",
    link: '/other/faq'
  }
]);
