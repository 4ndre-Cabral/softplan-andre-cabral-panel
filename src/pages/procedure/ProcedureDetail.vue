<template>
  <q-form @submit="procedureInsertOrUpdate">
    <q-list bordered padding>
      <q-item-label header>Dados do processo</q-item-label>
      <q-item>
        <q-item-section>
          <q-input
            class="col-12"
            filled dense :readonly="isReadOnly"
            v-model="procedure.description"
            label="Descrição do processo"
            lazy-rules type="textarea"
            :rules="[val => noEmptyAndLengthRule(val, 255)]"
          />
        </q-item-section>
      </q-item>

      <q-item>
        <q-item-section>
          <q-select
            filled dense use-chips multiple
            :readonly="isReadOnly" :disable="isReadOnly"
            v-model="procedure.users"
            :options="userOptions"
            label="Lista de usuários"
            emit-value
            map-options
            hint="Você pode selecionar mais de um usuário"
            :rules="[ val => val && val.length > 0 || 'Necessário selecionar pelo menos um usuário']"
          />
        </q-item-section>
      </q-item>

      <q-item v-if="!isReadOnly">
        <q-item-section class="col-2">
          <q-btn label="Salvar" type="submit" color="primary"/>
        </q-item-section>
      </q-item>
    </q-list>
  </q-form>
</template>
<script>
import procedureService from '@/services/procedureService'
import userService from '@/services/userService'
import loading from '@/boot/loading'
import { LocalStorage } from 'quasar'
import notify from '@/boot/notify'

export default {
  name: 'procedureData',
  data () {
    return {
      procedure: {},
      userOptions: [],
      isReadOnly: false
    }
  },
  async mounted () {
    loading.show()
    await userService.getAll().then(response => {
      this.userOptions = response.data.map(u => {
        return {
          label: u.username,
          value: u.id
        }
      })
      loading.hide()
    })
    if (this.$route.params.id) {
      this.isReadOnly = true
      loading.show()
      procedureService.getById(this.$route.params.id).then(response => {
        if (response) {
          this.procedure = response.data
          let users = []
          this.procedure.users.forEach(user => {
            users.push({
              label: user.username,
              value: user.id
            })
          })
          this.procedure.users = users
        }
        loading.hide()
      })
    }
  },
  methods: {
    procedureInsertOrUpdate () {
      this.procedure.users = this.procedure.users.map(user => {
        return {
          id: user
        }
      })
      this.procedure.user = { id: LocalStorage.getItem(this.$c.USER).id }
      loading.show('Salvando...')
      procedureService.save(this.procedure).then(response => {
        notify.create({
          message: `Processo salvo com sucesso`,
          color: 'positive'
        })
        loading.hide()
        this.$router.push('/procedures')
      }).catch(error => {
        loading.hide()
        notify.create(
          { message: error.response.data.message }
        )
      })
    },
    noEmptyAndLengthRule (val, length) {
      return (val != null && val.length > 0 && val.length <= length) || `Use entre 1 e ${length} caracteres.`
    }
  }
}
</script>
