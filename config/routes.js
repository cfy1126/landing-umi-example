export default [
  {
    path: "/",
    component: "@/layouts",
    routes: [
      {
        path: "/product",
        component: "@/pages/product",
      },
      {
        path: "/productDetail",
        component: "@/pages/product-detail",
      },
      {
        path: "/",
        component: "@/pages/home",
      },
      {
        component: "@/pages/404",
      },
    ],
  },
];
