import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index.js'

import AppLogin from "../views/AppLogin.vue";
import HelloWord from "../components/HelloWorld.vue";
import AppHome from "../views/AppHome.vue";

const routes = [
  {
      path: '/appLogin',
      name: 'login',
      component: AppLogin,
  },
  {
      path: '/hello',
      name: 'helloworld',
      component: HelloWord,
  },
  {
      path: '/AppHome',
      name: 'home',
      component: AppHome,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
    try {
        await store.dispatch('check')

        let page = store.getters.pages.find((page) => page.name === to.name)
        if(page.name == to.name){
            next()
        }
    }
    catch (error) {
        store.dispatch('destroySession')
        if (to.name == 'login') {
            next()
        }
        else {
            next({ name: 'login' })
        }
    }
})

export default router;
