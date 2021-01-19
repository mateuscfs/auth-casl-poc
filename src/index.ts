import { defineAbilities } from './defineAbility';
import rules from './getAbility';

// First Way

const request = {
    url: '/fiscal/create',
    module: 'fiscal',
};

const request2 = {
    url: '/fiscal/delete',
    module: 'fiscal',
};


const request3 = {
    url: '/fiscal/execute',
    module: 'fiscal/dfe',
};

const request4 = {
    url: '/fiscal/create',
    module: 'fiscal/dfe',
};

console.log(rules.can(request.url, request.module)); // true
console.log(rules.can(request2.url, request2.module)); // true
console.log(rules.can(request3.url, request3.module)); // true
console.log(rules.can(request4.url, request4.module)); // false

// Second Way

const user = { name: 'Mateus', type: 'admin' };
const header = { module: 'Fiscal'}

const testAbility = defineAbilities({ type: 'common' }, { module: 'Retail' })

console.log(testAbility.can('Generate', 'fiscal.ecdservice.file')); // false
console.log(testAbility.can('ReadAll', 'dfe.documentservice.NFe')); // false
console.log(testAbility.can('Create', 'dfe.documentservice.NFe')); // true

const testAbility2 = defineAbilities(user, header)

console.log(testAbility2.can('Generate', 'fiscal.ecdservice.file')) // true
console.log(testAbility2.can('ReadAll', 'dfe.documentservice.NFe')) // true
console.log(testAbility2.can('Create', 'dfe.documentservice.NFe')) // true
console.log(testAbility2.can('Read', 'retail.taxservice.NFe')) // false
console.log(testAbility2.can('Generate', 'fiscal.*')) // true
console.log(testAbility2.can('Generate', 'fiscal.ecdservice.*')) // false
