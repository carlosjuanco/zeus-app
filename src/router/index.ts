import { createRouter, createWebHistory } from "vue-router";
import store from '../store/index.js'

import AppLogin from "../views/AppLogin.vue";
import HelloWord from "../components/HelloWorld.vue";

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
    try {
        await store.dispatch('check')

        if (to.name == 'login') {
            next()
        }
        else {
            // store.dispatch('toggleNavbar', true)
            next()
        }
    }
    catch (error) {
        store.dispatch('destroySession')

        if (to.name == 'login') {
            // store.dispatch('toggleNavbar', false)
            next()
        }
        else {
            next({ name: 'login' })
        }
    }
})

export default router;
