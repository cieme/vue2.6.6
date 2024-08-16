import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/table",
    name: "table",
    component: () =>
      import(/* webpackChunkName: "DivTable" */ "../views/DivTable.vue"),
  },
  {
    path: "/zhongyan",
    name: "zhongyan",
    component: () =>
      import(/* webpackChunkName: "ZhongYan" */ "../views/ZhongYan.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: () =>
      import(/* webpackChunkName: "Layout" */ "../components/layout/index.vue"),
    children: [
      {
        path: "/span-table",
        name: "span-table ",
        component: () =>
          import(
            /* webpackChunkName: "SpanTable" */ "../views/test/span-table.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
