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
      { text: "框架", link: "/doc/front-end-rule/start" },
      { text: "组件", link: "/doc/components/start" },
      { text: "运维", link: "/doc/maintain/start" },
    ],

    sidebar: [
      {
        text: "框架",
        items: [
          { text: "总览", link: "/doc/front-end-rule/start" },
          { text: "vue3", link: "/doc/front-end-rule/vue3" },
          { text: "vue-router", link: "/doc/front-end-rule/vue-router" },
          { text: "pinia", link: "/doc/front-end-rule/pinia" },
        ],
      },
      {
        text: "uniapp组件",
        items: [
          { text: "概述", link: "/doc/components/start" },
          { text: "Popup", link: "/doc/components/popup" },
          { text: "TagSelector", link: "/doc/components/tag-selector" },
          { text: "TabSwitcher", link: "/doc/components/tab-switcher" },
          { text: "QrCode", link: "/doc/components/qr-code" },
        ],
      },
      {
        text: "运维",
        items: [{ text: "证书", link: "/doc/maintain/certbot" }],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/ruinb0w/docs" }],
  },
});
