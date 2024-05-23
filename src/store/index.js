import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        api_token: localStorage.getItem('api_token') || '',
        user: {},
        pages: [],
        show_navbar: false
    },
    mutations: {
        SET_API_TOKEN (state, api_token) {
            state.api_token = api_token
        },
        SET_USER (state, user) {
            state.user = user
        },
        SET_PAGES (state, pages) {
            state.pages = pages
        },
        SET_SHOW_NAVBAR (state, show) {
            state.show_navbar = show
        }
    },
    actions: {
        async login ({ commit }, data) {
            const response = await axios.post('/login', data)
            const api_token = response.data.api_token

            localStorage.setItem('api_token', api_token)

            axios.defaults.headers.common['Authorization'] = `Bearer ${api_token}`

            commit('SET_API_TOKEN', api_token)
            commit('SET_USER', response.data.user)
        },
        async check ({ commit }) {
            const response = await axios.get('/check')

            commit('SET_USER', response.data.user)
            commit('SET_PAGES', response.data.pages)
        },
        async logout ({ dispatch }) {
            await axios.post('/logout')

            dispatch('destroySession')
        },
        destroySession ({ commit }) {
            localStorage.removeItem('api_token')

            delete axios.defaults.headers.common['Authorization']
            
            commit('SET_API_TOKEN', '')
            commit('SET_PAGES', [])
            commit('SET_USER', {})
        },
        toggleNavbar ({ commit }, value) {
            commit('SET_SHOW_NAVBAR', value)
        }
    },
    modules: {},
    getters: {
        api_token: state => state.api_token,
        pages: state => state.pages,
        user: state => state.user,
        showNavbar: state => state.show_navbar
    }
})