// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
// import MyLayout from "./MyLayout.vue";
import "../../style/button.scss";
import "../../style/color.scss";

export default {
  ...DefaultTheme,
  // Layout: MyLayout,
};
