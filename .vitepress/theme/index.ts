// .vitepress/theme/index.js
import DefaultTheme from "vitepress/theme";
// import MyLayout from "./MyLayout.vue";
import "../../style/button.scss";
import "../../style/color.scss";
import "../../style/default.scss";

export default {
  ...DefaultTheme,
  // Layout: MyLayout,
};
