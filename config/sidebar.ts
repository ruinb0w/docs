import { nestjs } from "./sidebar/nestjs";
import { docker } from "./sidebar/docker";
import { mongodb } from "./sidebar/mongodb";
import { front } from "./sidebar/front";
import { libs } from "./sidebar/lib";
import { components } from "./sidebar/components";

export const sidebar = [
  front,
  components,
  {
    text: "后端",
    collapsed: true,
    items: [
      { text: "概述", link: "/src/maintain/start" },
      { text: "防火墙", link: "/src/maintain/firewall" },
      { text: "express", link: "/src/maintain/express" },
      // { text: "mongodb", link: "/src/maintain/mongodb" },
      { text: "SSL", link: "/src/maintain/certbot" },
      docker,
      nestjs,
      mongodb,
      libs,
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
