import { createRouter, createWebHistory } from "vue-router";

import AppLogin from "../views/AppLogin.vue";

const routes = [
  {
      path: '/appLogin',
      name: 'appLogin',
      component: AppLogin,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

export default router;
