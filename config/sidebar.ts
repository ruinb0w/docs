import { nestjs } from "./sidebar/nestjs";
import { docker } from "./sidebar/docker";
import { mongodb } from "./sidebar/mongodb";
import { libs } from "./sidebar/lib";
import { components } from "./sidebar/components";
import { electron } from "./sidebar/electron";

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
      { text: "chrome-extensions", link: "/src/front-end-rule/chrome-extensions.md" },
      { text: "wujie", link: "/src/front-end-rule/wujie.md" },
      { text: "typescript", link: "/src/front-end-rule/typescript.md" },
      { text: "vite", link: "/src/front-end-rule/vite.md" },
      { text: "puppeteer", link: "/src/front-end-rule/puppeteer.md" },
      electron,
    ],
  },
  components,
  {
    text: "后端",
    collapsed: true,
    items: [
      { text: "概述", link: "/src/maintain/start" },
      { text: "防火墙", link: "/src/maintain/firewall" },
      { text: "express", link: "/src/maintain/express" },
      { text: "SSL", link: "/src/maintain/certbot" },
      docker,
      nestjs,
      mongodb,
      libs,
      { text: "mongoose", link: "/src/maintain/mongoose/start" },
    ],
  },
  {
    text: "web3",
    collapsed: true,
    items: [{ text: "概念", link: "/src/web3/start" }],
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
