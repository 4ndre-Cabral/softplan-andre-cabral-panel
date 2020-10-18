import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { LocalStorage, Dialog, Loading } from 'quasar'

Vue.use(VueAxios, axios)
Vue.axios.defaults.baseURL = process.env.API

// Interceptors
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// TODO: add em outro lugar
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.config.url === `${process.env.API}/auth/refresh`) {
    Vue.prototype.$auth.watch.authenticated = true
    Vue.prototype.$auth.watch.loaded = true
  }
  return response
}, function (error) {
  // Do something with response error
  console.log(error.response.data)
  if (error.response.data.message.indexOf('JWT signature does not match') !== -1 && error.response.status === 500) {
    LocalStorage.remove('default_auth_token')
    if (Vue.router.currentRoute.path !== '/login') {
      Vue.router.push('/login')
      Loading.hide()
      Dialog.create({
        title: 'Sessão expirada',
        message: 'A sua sessão expirou, faça login novamente para continuar navegando.',
        cancel: false,
        persistent: true,
        ok: {
          color: 'primary'
        }
      })
    }
  }
  return Promise.reject(error)
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
}
