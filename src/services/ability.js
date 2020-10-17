import { AbilityBuilder, Ability } from '@casl/ability'
import authenticationService from './authenticationService'

const { can, rules } = new AbilityBuilder()
if (authenticationService.getUser() && authenticationService.getUser().userRole) {
  const userRole = this.user.userRole[0]
  can('read', userRole.read)
  can('create', userRole.create)
  can('update', userRole.update)
  can('delete', userRole.delete)
} else {
  can('read', ['own_results'])
}

export default new Ability(rules)
