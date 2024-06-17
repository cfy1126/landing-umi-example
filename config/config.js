import { defineConfig } from "umi";
import routes from "./routes";

export default defineConfig({
  nodeModulesTransform: {
    type: "none",
  },
  fastRefresh: {},
  dynamicImport: {
    loading: '@/components/loading',
  },
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
  mountElementId: "app",
  routes,
  proxy: {
    '/api': {
      target: 'https://info-support.livoltek.com',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
