import { defineConfig } from "umi";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  fastRefresh: {},
  dynamicImport: {},
  targets: {
    ie: 11,
  },
  locale: {
    default: "en-US",
    antd: true,
    baseNavigator: false,
  },
  title: "LIVOLTEK",
  favicon: "/favicon.png",
  mountElementId: 'app',
});
