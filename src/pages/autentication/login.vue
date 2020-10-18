<template>
  <q-form class="q-pa-md" @submit.prevent="login">
    <q-list padding style="max-width:500px; margin: auto;">
      <q-item class="justify-center">
      </q-item>
      <q-item-label header class="row justify-center text-h5">Login</q-item-label>
      <q-item>
        <q-item-section>
          <q-input
            dense outlined
            v-model="credentials.username"
            label="Nome de usuário *"
            stack-label
            :rules="[val => !!val || 'Nome de usuário ausente']" />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-input
            id="idpassword_"
            dense outlined
            v-model="credentials.password"
            label="Senha *"
            stack-label
            :type="isPwd ? 'password' : 'text'"
            :rules="[val => !!val || '* Campo Obrigatório']">
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPwd = !isPwd" />
            </template>
          </q-input>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-btn type="submit" no-caps :loading="submitting" label="Login" color="primary">
            <template v-slot:loading>
              <q-spinner-facebook />
            </template>
          </q-btn>
        </q-item-section>
      </q-item>

    </q-list>
    <div class="row q-gutter-sm justify-end">
    </div>
  </q-form>
</template>

<script>
import { LocalStorage } from 'quasar'
import userService from '@/services/userService'
import loading from '@/boot/loading'
import notify from '@/boot/notify'

export default {
  name: 'Login',
  data () {
    return {
      isPwd: true,
      status: '',
      desconectado: false,
      credentials: {
        username: '',
        password: ''
      },
      submitting: false
    }
  },
  methods: {
    login () {
      const self = this
      loading.show()
      userService.login(this.credentials, this.$auth).then(async response => {
        if (response) {
          // Authentication - Grava token no local storage da aplicação
          const userData = response
          LocalStorage.set(self.$c.USER, userData)
          self.$auth.token(null, response.token)
          await self.$auth.refresh({
            success () {
              self.$auth.watch.data = response.user
              self.$router.push('/')
              console.log('success ')
            },
            error () {
              console.log('error')
            }
          })
          loading.hide()
        }
      }).catch((error) => {
        console.log(error)
        notify.create({
          message: error.response.data.message
        })
        loading.hide()
      })
    },
    isValiduserName (val) {
      const userNamePattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return userNamePattern.test(val) || 'userName inválido'
    }
  }
}

</script>

<style>
</style>
