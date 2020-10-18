<template>
  <div class="q-pa-md">
    <q-list bordered separator class="rounded-borders" >
      <q-item-label header>Lista de processos pendentes de parecer</q-item-label>
      <q-item-label class="q-pl-md" caption>*Clique no botão para adicionar um parecer</q-item-label>
      <q-item
        v-for="(procedure, index) in procedures" :key="procedure.id"
        class=" column q-my-sm q-mx-sm">
        <div class="row">

          <q-item-section>
            <q-item-label lines="1">
              <span class="text-weight-medium text-h6">{{index + 1}}</span>
              <span class="text-grey-8 text-subtitle1"> - {{procedure.description}}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <!-- <q-btn
              outline class="q-my-md q-mx-md" color="primary"
              flat dense round icon="mdi-draw" @click="showOptonCard(procedure)">
              <q-tooltip>Deletar usuário</q-tooltip>
            </q-btn> -->
            <q-btn
              outline class="q-my-md q-mx-md" color="primary"
              flat dense round icon="mdi-draw" @click="showOptonCard(procedure)">
              <q-tooltip anchor="top left" self="top middle">
                Adicionar parecer para este processo
              </q-tooltip>
            </q-btn>
          </q-item-section>
        </div>
      </q-item>
    </q-list>
    <!-- Option Card -->
    <q-dialog v-model="optionCard" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Adicionar parecer</div>
          <div class="text-body2">{{selectedProcedure.description}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="description" autofocus
            class="col-12 q-pr-sm"
            filled dense
            label="Descrição do parecer"
            lazy-rules
            :rules="[ val => !!val || 'Preencha a descrição']"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn v-if="description" outline color="primary" label="Salvar" v-close-popup @click="addOption"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import procedureService from '@/services/procedureService'
import opinionService from '@/services/opinionService'
import loading from '@/boot/loading'
import notify from '@/boot/notify'
import { LocalStorage } from 'quasar'

export default {
  name: 'procedures',
  data () {
    return {
      procedures: [],
      optionCard: false,
      option: {},
      description: null,
      selectedProcedure: {}
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    getAll () {
      loading.show()
      const userId = LocalStorage.getItem(this.$c.USER).id
      this.option.user = { id: userId }
      procedureService.getAllUnsigned(userId).then(response => {
        this.procedures = response.data
        loading.hide()
      })
    },
    addOption () {
      this.option.description = this.description
      loading.show('Salvando...')
      opinionService.save(this.option).then(response => {
        notify.create({
          message: `Parecer adicionado com sucesso`,
          color: 'positive'
        })
        loading.hide()
        this.getAll()
      })
    },
    showOptonCard (procedure) {
      this.selectedProcedure = procedure
      this.option.description = null
      this.option.procedure = { id: procedure.id }
      this.optionCard = true
    }
  }
}
</script>
