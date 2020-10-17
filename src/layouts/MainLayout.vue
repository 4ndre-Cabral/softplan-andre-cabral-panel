<template>
  <!-- <q-layout view="hhh LpR fff"> -->
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar>
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>

        <q-space />

        <q-btn-dropdown stretch flat :label="user.username">
          <q-list>
            <!-- <div class="q-pa-md row justify-center" style="background-color: primary">
              <div>
                <q-avatar @click="chageImage" size="100px">
                  <q-avatar @click="chageImage" size="100px" font-size="100px" color="primary" text-color="white" icon="account_circle" />
                  <q-badge floating color="teal">Add imagem</q-badge>
                </q-avatar>
              </div>
            </div> -->
            <q-item clickable @click.native="logout" v-close-popup>
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <!-- Menu -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="500"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item v-for="item in menu" v-bind:key="item.id" clickable :to="item.ref" @click="setTitle(item)">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{item.label}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="logout()">
          <q-item-section avatar>
            <q-icon name="exit_to_app" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sair</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="q-pa-md">
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage } from 'quasar'
import { AbilityBuilder } from '@casl/ability'

export default {
  name: 'MainLayout',
  components: {
    // BreadCrumb
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      title: '',
      menuItens: [
        { disable: !this.$ability.can('read', 'ROLE_ADMIN'), id: 1, canRead: 'ROLE_ADMIN', ref: '/users', label: 'Usuários', icon: 'supervised_user_circle' },
        { disable: !this.$ability.can('read', 'ROLE_TRIADOR'), id: 2, canRead: 'ROLE_TRIADOR', ref: `/procedures`, label: 'Processos', icon: 'assessment' },
        { disable: !this.$ability.can('read', 'ROLE_FINALIZADOR'), id: 3, canRead: 'ROLE_FINALIZADOR', ref: '/opinions', label: 'Pareceres', icon: 'speaker_notes' }
      ]
    }
  },
  computed: {
    menu: function () {
      return this.menuItens.filter(el => el.disable !== true)
    },
    user () {
      return LocalStorage.getItem(this.$c.USER) ? LocalStorage.getItem(this.$c.USER) : {}
    }
  },
  methods: {
    setTitle (item) {
      this.title = item.label
    },
    logout () {
      LocalStorage.set(this.$c.USER, null)
      this.$auth.logout({ makeRequest: false })
    },
    login () {
      this.$router.push({ path: '/login' })
    },
    updateAbility () {
      const { can, rules } = new AbilityBuilder()
      if (this.user.roles && this.user.roles.length > 0) {
        this.$ability.update([])
        can('read', this.user.roles)
        can('create', this.user.roles)
        can('update', this.user.roles)
        can('delete', this.user.roles)
        this.$ability.update(rules)
        this.menuItens.forEach(item => {
          if (item.canRead) item.disable = !this.$ability.can('read', item.canRead)
        })
      }
    }
  },
  async mounted () {
    await this.updateAbility()
    this.title = this.$route.name
  }
}
</script>

<style>
.q-header {
  background-image: linear-gradient(-45deg, #22a6b3, #22a6b3);
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, .2), 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12);
}
</style>
