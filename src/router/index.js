import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { abilitiesPlugin, Can } from '@casl/vue'
import { AbilityBuilder, Ability } from '@casl/ability'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueClipboard from 'vue-clipboard2'

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

  return Router
}
