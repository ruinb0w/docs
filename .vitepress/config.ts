import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ruinb0w's Doc",
  description: "Some Documents",
  ignoreDeadLinks: true,
  outDir: "./docs",
  base: "/docs/",
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
      { text: "前端", link: "/src/front-end-rule/start" },
      { text: "前端组件", link: "/src/components/start" },
      { text: "后端", link: "/src/maintain/start" },
    ],
    sidebar: [
      {
        text: "前端",
        collapsed: true,
        items: [
          { text: "总览", link: "/src/front-end-rule/start" },
          { text: "vue3", link: "/src/front-end-rule/vue3" },
          { text: "vue-router", link: "/src/front-end-rule/vue-router" },
          { text: "pinia", link: "/src/front-end-rule/pinia" },
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
          { text: "mongodb", link: "/src/maintain/mongodb" },
          { text: "docker", link: "/src/maintain/docker" },
          { text: "证书", link: "/src/maintain/certbot" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/ruinb0w/docs" }],
  },
});
