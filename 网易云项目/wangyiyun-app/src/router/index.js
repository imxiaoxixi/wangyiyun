import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index.js";
const routes = [
  {
    path: "/",
    name: "home",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Home.vue"),
  },
  {
    path: "/itemMusic",
    name: "ItemMusic",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ItemMusic.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Search.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/infoUser",
    name: "InfoUser",
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next();
      } else { 
        next("/login");
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/infoUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from) => {
  if (to.path == "/login") {
    store.state.isFooterShow = false;
  } else {
    store.state.isFooterShow = true;
  }
});

export default router;
