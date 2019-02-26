import axios from 'axios'
import store from '@/store'

let refreshRequest = null

export default {
  getToken () {
    return store.state.auth.accessToken
  },
  getRefreshToken () {
    return store.state.auth.refreshToken
  },
  isAuth () {
    let accessToken = window.localStorage.getItem('accessToken')
    let expiresIn = window.localStorage.getItem('expiresIn')

    return accessToken && new Date(expiresIn) > new Date()
  },
  clearAuth () {
    store.commit('CLEAR_TOKEN')
    store.commit('SET_IS_AUTHENTICATED', false)
    if (window.localStorage) {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('refreshToken')
      window.localStorage.removeItem('expiresIn')
    }
  },
  setAuth (data) {
    let expiresIn = new Date()
    expiresIn.setSeconds(expiresIn.getSeconds() + data.expires_in)

    store.commit('SET_TOKEN', {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresIn: expiresIn
    })

    if (window.localStorage) {
      window.localStorage.setItem('accessToken', data.access_token)
      window.localStorage.setItem('refreshToken', data.refresh_token)
      window.localStorage.setItem('expiresIn', expiresIn)
    }

    store.commit('SET_IS_AUTHENTICATED', true)
  },
  refresh () {
    refreshRequest = axios.post(process.env.VUE_APP_API + '/login/refresh', {
      'refresh_token': this.getRefreshToken()
    })
    return refreshRequest
  }
}
