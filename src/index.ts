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

console.log(testAbility.can('Fiscal', '/ecdservice/file/generate')); // false
console.log(testAbility.can('DFe', '/documentservice/NFe/getAll')); // false
console.log(testAbility.can('DFe', '/documentservice/NFe/emit')); // true

const testAbility2 = defineAbilities(user, header)

console.log(testAbility2.can('Fiscal', '/ecdservice/file/generate')) // true
console.log(testAbility2.can('DFe', '/documentservice/NFe/getAll')) // true
console.log(testAbility2.can('DFe', '/documentservice/NFe/emit')) // true
console.log(testAbility2.can('Retail', '/taxservice/NFe/get')) // false
console.log(testAbility2.can('Fiscal', '/*')) // true
console.log(testAbility2.can('Fiscal', '/ecdservice/*')) // false
