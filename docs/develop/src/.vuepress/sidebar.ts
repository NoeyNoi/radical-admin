import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "指南",
      icon: "icon-park-outline:guide-board",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "深入",
      icon: "icon-park-outline:deeplink",
      prefix: "deep/",
      children: "structure",
    },
    {
      text: "其他",
      icon: "material-symbols:other-admission-outline",
      prefix: "other/",
      children: "structure",
    }
  ],
});
