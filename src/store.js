import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import auth from '@/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : [],
    auth: {
      accessToken: window.localStorage.getItem('accessToken') || null,
      refreshToken: window.localStorage.getItem('refreshToken') || null,
      expiresIn: window.localStorage.getItem('expiresIn') || null
    },
    isAuthenticated: auth.isAuth()
  },
  mutations: {
    SET_IS_AUTHENTICATED (state, authenticated) {
      state.isAuthenticated = authenticated
    },
    SET_TOKEN (state, payload) {
      state.auth.accessToken = payload.accessToken
      state.auth.refreshToken = payload.refreshToken
      state.auth.expiresIn = payload.expiresIn
    },
    CLEAR_TOKEN (state) {
      state.auth.accessToken = null
      state.auth.refreshToken = null
      state.auth.expiresIn = null
      state.isAuthenticated = false
    },
    SET_USER (state, user) {
      state.user = user
    },
    CLEAR_USER (state) {
      state.user = null
    }
  },
  actions: {
    login (context, payload) {
      return api.post('/login', payload.data)
        .then((response) => {
          auth.setAuth(response.data)
        })
    },
    logout (context) {
      return api.post('/logout')
        .then((response) => {
          auth.clearAuth()
        })
    }
  }
})
