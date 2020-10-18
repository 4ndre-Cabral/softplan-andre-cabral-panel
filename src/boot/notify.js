import { Notify } from 'quasar'

export default {
  create: function (type, position) {
    Notify.create({
      color: type.color !== undefined ? type.color : 'negative',
      message: type.message !== undefined ? type.message : 'Falha...',
      position: position !== undefined ? position : 'bottom',
      timeout: 3000
    })
  },
  updateAlert: function (callback) {
    Notify.create({
      icon: 'update',
      color: 'secondary',
      textColor: 'black',
      message: 'Existem informações novas no servidor',
      actions: [ { label: 'Atualizar', handler: callback } ],
      timeout: 9000
    })
  }
}
