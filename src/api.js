import axios from 'axios'
import auth from '@/auth'

let api = axios.create({
  baseURL: process.env.VUE_APP_API
})

api.interceptors.request.use(async (config) => {
  if (auth.isAuth()) {
    config.headers.Authorization = 'Bearer ' + auth.getToken()
    return config
  }

  if (!auth.getRefreshToken()) {
    auth.clearAuth()
    return config
  }

  await auth.refresh().then(response => {
    auth.setAuth(response.data)
    config.headers.Authorization = 'Bearer ' + auth.getToken()
  }).catch(() => {
    auth.clearAuth()
  })
  return config
})

/*
api.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
*/

export const HTTP = api // TODO: remove me
export default api
