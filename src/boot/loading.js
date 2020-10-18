import { Loading, QSpinnerGears } from 'quasar'

export default {
  show: function (message) {
    Loading.show({
      message: message !== undefined ? message : 'Carregando...',
      messageColor: 'white',
      spinnerColor: 'white',
      spinner: QSpinnerGears
    })
  },
  hide: function () {
    Loading.hide()
  }
}
