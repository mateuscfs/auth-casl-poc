import Ability from './defineAbility';
import defineAbility from './defineAbility';

const user = { type: 'admin' }
const header = { module: 'Fiscal' }

// First Way

/* const testAbility = defineAbility({ type: 'common' }, { module: 'Retail' })

console.log(testAbility.can('Generate', 'fiscal.ecdservice.file')) // false
console.log(testAbility.can('ReadAll', 'dfe.documentservice.NFe')) // false
console.log(testAbility.can('Create', 'dfe.documentservice.NFe')) // false
console.log(testAbility.can('Read', 'retail.taxservice.NFe')) // true

const ability = defineAbility(user, header)

console.log(ability.can('Generate', 'fiscal.ecdservice.file')) // true
console.log(ability.can('ReadAll', 'dfe.documentservice.NFe')) // true
console.log(ability.can('Create', 'dfe.documentservice.NFe')) // false
console.log(ability.can('Read', 'retail.taxservice.NFe')) // false
 */

// Second Way

console.log(Ability.can('Generate', 'fiscal.ecdservice.file')) // false
console.log(Ability.can('ReadAll', 'dfe.documentservice.NFe')) // true
console.log(Ability.can('Create', 'dfe.documentservice.NFe')) // true
