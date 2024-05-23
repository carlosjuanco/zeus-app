import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import 'bulma/css/bulma.css';

createApp(App).use(router).mount('#app')
