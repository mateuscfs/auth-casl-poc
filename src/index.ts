import { defineAbilities } from './defineAbility';
import rules, { hasAbility } from './getAbility';

// First Way

console.log('\n First Way');

const request = {
    url: 'fiscal/dfe/emit',
};

const request2 = {
    url: 'fiscal/dfe/register',
};

const request3 = {
    url: 'fiscal/dfe/remove',
};

const request4 = {
    url: 'fiscal/dfe/generate',
};

const request5 = {
    url: 'retail/sangria',
};

const request6 = {
    url: 'dfe/doc/get',
};

const request7 = {
    url: 'retail/sangria/send',
};

const request8 = {
    url: 'dfe/doc/NFe/getAll',
};

const request9 = {
    url: 'dfe/doc/NFe/emit',
};

console.log(hasAbility(request, rules)); // true
console.log(hasAbility(request2, rules)); // true
console.log(hasAbility(request3, rules)); // true
console.log(hasAbility(request4, rules)); // true
console.log(hasAbility(request5, rules)); // false
console.log(hasAbility(request6, rules)); // false
console.log(hasAbility(request7, rules)); // true
console.log(hasAbility(request8, rules)); // true
console.log(hasAbility(request9, rules)); // true

console.log('\nSecond Way');

// // Second Way

const user = { name: 'Mateus', type: 'admin' };
const header = { module: 'Fiscal' };

const testAbility = defineAbilities({ type: 'common' }, { module: 'Retail' });

console.log(testAbility.can('Fiscal', '/ecdservice/file/generate')); // false
console.log(testAbility.can('DFe', '/documentservice/NFe/getAll')); // false
console.log(testAbility.can('DFe', '/documentservice/NFe/emit')); // true

const testAbility2 = defineAbilities(user, header);

console.log(testAbility2.can('Fiscal', '/ecdservice/file/generate')); // true
console.log(testAbility2.can('DFe', '/documentservice/NFe/getAll')); // true
console.log(testAbility2.can('DFe', '/documentservice/NFe/emit')); // true
console.log(testAbility2.can('Retail', '/taxservice/NFe/get')); // false
console.log(testAbility2.can('Fiscal', '/*')); // true
console.log(testAbility2.can('Fiscal', '/ecdservice/*')); // false
