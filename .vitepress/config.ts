import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Ruinb0w's Doc",
  description: "Some Documents",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
      { text: "框架", link: "/docs/front-end-rule/start" },
      { text: "组件", link: "/docs/components/start" },
    ],

    sidebar: [
      {
        text: "框架",
        items: [
          { text: "总览", link: "/docs/front-end-rule/start" },
          { text: "vue3 示例", link: "/docs/front-end-rule/vue3" },
          { text: "pinia 示例", link: "/docs/front-end-rule/pinia" },
        ],
      },
      {
        text: "组件",
        items: [
          { text: "概述", link: "/docs/components/start" },
          { text: "popup", link: "/docs/components/popup" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
});
