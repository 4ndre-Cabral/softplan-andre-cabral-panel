<template>
  <q-form @submit="userInsertOrUpdate">
    <q-list bordered padding>
      <q-item-label header>Dados do usuário</q-item-label>
      <q-item>
        <q-item-section>
          <q-input
            class="col-12 q-pr-sm"
            filled dense
            v-model="user.username"
            label="Nome de usuário"
            lazy-rules
            :rules="[val => noEmptyAndLengthRule(val, 20)]"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <div class="row">
            <q-input
              class="col-6 q-pr-sm"
              filled dense
              v-model="email" :suffix="suffix"
              label="e-mail/login"
              lazy-rules
              :rules="[ val => !!val && emailValidation(val) || 'Preencha o e-mail corretamente com até 50 caracteres']"
            />
            <q-input v-if="$route.params.id"
              class="col-6 q-pr-sm"
              filled dense
              label="Senha"
              v-model="user.password" :type="isPwd ? 'password' : 'text'" hint="Preencha caso deseje alterar"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input v-else
              class="col-6 q-pr-sm"
              filled dense
              label="Senha"
              :rules="[ val => !!val && val.length >= 6 && val.length <= 120 || 'Preencha o senha corretamente']"
              v-model="user.password" :type="isPwd ? 'password' : 'text'" hint="A senha deve ter no mínimo 6 dígitos e máximo 120"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-select
            filled dense use-chips multiple
            v-model="user.role"
            :options="userRoleOptions"
            label="Tipo de usuário"
            emit-value
            map-options
            :rules="[ val => val && val.length > 0 || 'Preencha o tipo de usuário']"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section class="col-2">
          <q-btn label="Salvar" type="submit" color="primary"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
<script>
import userService from '@/services/userService'
import helper from '@/utils/util'
import loading from '@/boot/loading'
import notify from '@/boot/notify'

export default {
  name: 'userData',
  data () {
    return {
      user: {},
      email: '',
      suffix: '@softplan.com',
      userRoleOptions: [
        { label: 'Administrador', value: 'ROLE_ADMIN' },
        { label: 'Triador', value: 'ROLE_TRIADOR' },
        { label: 'Finalizador', value: 'ROLE_FINALIZADOR' }
      ],
      isPwd: true
    }
  },
  async mounted () {
    if (this.$route.params.id) {
      loading.show()
      userService.getById(this.$route.params.id).then(response => {
        if (response) {
          this.user = response.data
          this.user.password = null
          this.email = this.user.email.split('@')[0]
          this.user.role = this.user.roles.map(role => {
            return role.name
          })
        }
        loading.hide()
      })
    }
  },
  methods: {
    userInsertOrUpdate () {
      if (!this.user.password) delete this.user.password
      // this.user.role = []
      // this.user.role.push(this.user.roles)
      this.user.email = this.email + this.suffix
      // delete this.user.roles
      delete this.user.opinions
      loading.show('Salvando...')
      userService.save(this.user).then(response => {
        notify.create({
          message: `Usuario salvo com sucesso`,
          color: 'positive'
        })
        loading.hide()
        this.$router.push('/users')
      }).catch(error => {
        loading.hide()
        notify.create(
          { message: error.response.data.message }
        )
      })
    },
    emailValidation (val) {
      return helper.isEmail(val + this.suffix) && val.length < 50
    },
    noEmptyAndLengthRule (val, length) {
      return (val != null && val.length > 0 && val.length <= length) || `Use entre 1 e ${length} caracteres.`
    }
  }
}
</script>
