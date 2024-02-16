import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/login",
  },

  {
    name: "login",
    path: "/login",
    component: () => import("@/views/login/Login.vue"),
  },
  {
    name: "menu",
    path: "/menu",
    component: () => import("@/views/menu/Menu.vue"),
    children: [
      {
        name: "home",
        path: "/home",
        component: () => import("@/views/home/Home.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
