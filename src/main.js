import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
import store from './store/index.js'
import 'bulma/css/bulma.css'
import axios from 'axios'
import 'animate.css';

const api_token = localStorage.getItem('api_token')

axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.withCredentials = true

if (api_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${api_token}`
}

createApp(App).use(store).use(router).mount('#app')
