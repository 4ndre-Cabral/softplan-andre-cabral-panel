<template>
  <q-layout class="q-pa-md" style="padding-bottom: 5%;">
    <q-table
      :data="users"
      title="Lista de usuários"
      :columns="tableHeader"
      row-key="id"
      :loading="loadUsers"
      :filter="filter"
      :filter-method="filterFunction"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template selectable v-slot:body="props">
        <q-tr class="cursor-pointer" :props="props" @click="$router.push(`user/${props.row.id}`)">
          <q-td key="acao" auto-width align='center'>
            <q-btn
              :disable="canDelete(props.row)"
              round size="sm" icon="delete" color="primary" @click.stop="deleteUser(props.row.id)"/>
            <q-tooltip>Deletar usuário</q-tooltip>
          </q-td>
          <q-td key="username" :props="props">{{ props.row.username }}</q-td>
          <q-td key="email" :props="props" >{{ props.row.email }}</q-td>
          <q-td key="group" :props="props" >{{ getUserRole(props.row.roles) }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <div class="text-caption">*Usuários que já assinaram um parecer ou possuem vinculo com um processo não podem ser deletados</div>
    <!-- Botão Adicionar Usuário -->
    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <div class="q-gutter-md">
        <q-btn fab icon="add" color="primary" @click="add" />
        <q-tooltip>Adicionar usuário</q-tooltip>
      </div>
    </q-page-sticky>

  </q-layout>
</template>
<script>
import userService from '@/services/userService'
import loading from '@/boot/loading'
import notify from '@/boot/notify'

export default {
  name: 'userList',
  data () {
    return {
      users: [],
      loadUsers: false,
      filter: '',
      tableHeader: [
        { name: 'acoes', label: 'Ações', field: 'acoes', sortable: false, align: 'left' },
        { name: 'username', label: 'Nome de usuário', field: 'username', format: val => `${val}`, sortable: true, align: 'left' },
        { name: 'email', label: 'Email', field: 'email', sortable: true, align: 'left' },
        { name: 'group', label: 'Tipo de usuário', field: 'group', sortable: true, align: 'right' }
      ]
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.loadUsers = true
      userService.getAll().then(response => {
        this.users = response.data
        this.loadUsers = false
      })
    },
    add () {
      this.$router.push('/user')
    },
    deleteUser (id) {
      loading.show('Deletando...')
      userService.deleteUser(id).then(response => {
        const status = response.data.message === 'Usuário excluido com sucesso!'
        notify.create({
          message: response.data.message,
          color: status ? 'positive' : 'negative'
        })
        this.getAll()
        loading.hide()
      })
    },
    getUserRole (roles) {
      let stringRoles = []
      roles.forEach(role => {
        stringRoles.push(role.name === 'ROLE_ADMIN' ? this.$c.ROLE_ADMIN : role.name === 'ROLE_TRIADOR' ? this.$c.ROLE_TRIADOR : this.$c.ROLE_FINALIZADOR)
      })
      return stringRoles.join(',')
    },
    filterFunction (rows, terms, cols, getCellValue) {
      return rows.filter(r => {
        for (const prop in r) {
          if (typeof r[prop] === 'string' && r[prop].toLowerCase().includes(terms.toLowerCase())) {
            return true
          }
        }
        return false
      })
    },
    canDelete (item) {
      return item.opinions.length > 0 || item.procedures.length > 0 || item.proceduresByUser.length > 0
    }
  }
}
</script>
