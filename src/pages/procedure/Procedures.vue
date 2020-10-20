<template>
  <q-layout class="q-pa-md" style="padding-bottom: 5%;">
    <q-table
      :data="procedures"
      title="Lista de usuários"
      :columns="tableHeader"
      row-key="id"
      :loading="loaderProcedures"
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
        <q-tr class="cursor-pointer" :props="props" @click="$router.push(`procedure/${props.row.id}`)">
          <q-td style="width: 5%;">
            <q-btn
              flat round
              @click.stop="props.expand = !props.expand"
              :icon="props.expand ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              style="z-index: 1000"
            />
            <q-tooltip>Expandir linha</q-tooltip>
          </q-td>
          <q-td
            key="description"
            :props="props"
            :class="!props.expand ? 'ellipsis' : ''"
            :style="!props.expand ? 'max-width: 300px; padding-left: 50px; padding-right: 50px;' : 'max-width: 300px; white-space: break-spaces; padding-left: 50px; padding-right: 50px;'"
          >
            {{ props.row.description }}
          </q-td>
          <q-td key="dateRegister" :props="props">{{ formatedDate(props.row.dateRegiter) }}</q-td>
          <q-td key="opinions" :props="props" >{{ props.row.opinions.length }}</q-td>
          <q-td key="users" :props="props" >{{ props.row.users.length }}</q-td>
        </q-tr>
      </template>
    </q-table>
    <!-- Botão Adicionar Usuário -->
    <q-page-sticky position="bottom-right" :offset="[30, 30]">
      <div class="q-gutter-md">
        <q-btn fab icon="add" color="primary" @click="add" />
        <q-tooltip>Adicionar processo</q-tooltip>
      </div>
    </q-page-sticky>

  </q-layout>
</template>
<script>
import procedureService from '@/services/procedureService'
import { parseISO, format } from 'date-fns'

export default {
  name: 'userList',
  data () {
    return {
      procedures: [],
      loaderProcedures: false,
      filter: '',
      tableHeader: [
        { name: 'acoes', label: 'Ações', field: 'acoes', sortable: false, align: 'left' },
        { name: 'description', label: 'Descrição', field: 'description', sortable: true, align: 'left' },
        { name: 'dateRegister', label: 'Data cadastro', field: 'dateRegister', sortable: true, align: 'left' },
        { name: 'opinions', label: 'Total pareceres finalizados', field: 'opinions', sortable: false, align: 'center' },
        { name: 'users', label: 'Total pareceres', field: 'users', sortable: false, align: 'center' }
      ]
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    getAll () {
      this.loaderProcedures = true
      procedureService.getAll().then(response => {
        this.procedures = response.data
        this.loaderProcedures = false
      })
    },
    add () {
      this.$router.push('/procedure')
    },
    formatedDate (date) {
      return format(parseISO(date), 'dd/MM/yyyy HH:mm')
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
    }
  }
}
</script>
