import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { abilitiesPlugin, Can } from '@casl/vue'
import { AbilityBuilder, Ability } from '@casl/ability'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueClipboard from 'vue-clipboard2'
import { LocalStorage } from 'quasar'

Vue.use(VueRouter)

const { rules } = new AbilityBuilder()
Vue.use(abilitiesPlugin, new Ability(rules))
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_KEY,
    libraries: ['places', 'visualization']
  }
})
Vue.use(VueClipboard)
Vue.component('Can', Can)

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  Vue.router = Router
  Vue.router.beforeEach((to, from, next) => {
    const user = LocalStorage.getItem('user')
    if (to.name && user && user.roles && user.roles.length > 0) {
      switch (to.name) {
        case 'Usuários':
        case 'Dados do usuário':
          if (user.roles.filter(r => r === 'ROLE_ADMIN').length > 0) {
            next()
          } else {
            next('/procedures')
          }
          break
        case 'Processos':
          if (user.roles.filter(r => r === 'ROLE_TRIADOR').length > 0) {
            next()
          } else {
            next('/opinions')
          }
          break
        case 'Pareceres':
          if (user.roles.filter(r => r === 'ROLE_FINALIZADOR').length > 0) {
            next()
          } else {
            next('/users')
          }
          break
        default :
          next()
      }
    } else {
      next()
    }
  })

  return Router
}
