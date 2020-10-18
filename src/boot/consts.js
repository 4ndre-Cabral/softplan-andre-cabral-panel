export default ({ Vue }) => {
  const Consts = {
    USER: 'user',
    ROLE_ADMIN: 'Administrador',
    ROLE_TRIADOR: 'Triador',
    ROLE_FINALIZADOR: 'Finalizador'
  }
  Vue.prototype.$c = Consts
}
