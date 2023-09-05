import { nestjs } from "./sidebar/nestjs";

export const sidebar = [
  {
    text: "前端",
    collapsed: true,
    items: [
      { text: "总览", link: "/src/front-end-rule/start" },
      { text: "vue3", link: "/src/front-end-rule/vue3" },
      { text: "vue-router", link: "/src/front-end-rule/vue-router" },
      { text: "pinia", link: "/src/front-end-rule/pinia" },
      { text: "nuxt", link: "/src/front-end-rule/nuxt" },
      { text: "uniapp", link: "/src/front-end-rule/uniapp" },
      { text: "react", link: "/src/front-end-rule/react" },
      { text: "taro", link: "/src/front-end-rule/taro" },
      { text: "electron", link: "/src/front-end-rule/electron" },
      { text: "chrome-extensions", link: "/src/front-end-rule/chrome-extensions.md" },
      { text: "wujie", link: "/src/front-end-rule/wujie.md" },
      { text: "typescript", link: "/src/front-end-rule/typescript.md" },
    ],
  },
  {
    text: "前端组件",
    collapsed: true,
    items: [
      { text: "概述", link: "/src/components/start" },
      { text: "Popup", link: "/src/components/popup" },
      { text: "TagSelector", link: "/src/components/tag-selector" },
      { text: "TabSwitcher", link: "/src/components/tab-switcher" },
      { text: "QrCode", link: "/src/components/qr-code" },
    ],
  },
  {
    text: "后端",
    collapsed: true,
    items: [
      { text: "概述", link: "/src/maintain/start" },
      { text: "防火墙", link: "/src/maintain/firewall" },
      { text: "express", link: "/src/maintain/express" },
      { text: "mongodb", link: "/src/maintain/mongodb" },
      { text: "docker", link: "/src/maintain/docker" },
      { text: "SSL", link: "/src/maintain/certbot" },
      nestjs,
    ],
  },
  {
    text: "范式",
    collapsed: true,
    items: [
      { text: "概述", link: "/src/concept/start" },
      { text: "IOC", link: "/src/concept/ioc" },
    ],
  },
];
