import defineAbility from './defineAbility';

const user = { name: 'Mateus' }
const ability = defineAbility(user)

console.log(ability.can('Generate File', 'ecdservice')) // true
console.log(ability.can('List', 'documentservice')) // true
console.log(ability.can('Create', 'documentservice')) // false
