import { defineConfig } from "umi";

export default defineConfig({
  targets: {
    ie: 11,
  },
  layout: {
    locale: true,
  },
  locale: {
    default: "zh-CN",
    antd: true,
    baseNavigator: true,
  }
});
