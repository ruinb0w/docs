import { defineConfig } from "vitepress";
import { sidebar } from "../config/sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: { server: { host: "0.0.0.0" } },
  title: "Ruinb0w's Doc",
  description: "Some Documents",
  ignoreDeadLinks: true,
  outDir: "./docs",
  base: "/docs/",
  themeConfig: {
    outline: { level: [1, 4] },
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "前端", link: "/src/front-end-rule/start" },
      { text: "前端组件", link: "/src/components/start" },
      { text: "后端", link: "/src/maintain/start" },
      { text: "范式", link: "/src/concept/start" },
    ],
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/ruinb0w/docs" }],
  },
});
