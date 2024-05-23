import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import store from './store/index.js'
import 'bulma/css/bulma.css'

createApp(App).use(store).use(router).mount('#app')
