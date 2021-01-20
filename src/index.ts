import { defineAbilities } from './defineAbility';
import rules, { hasAbility } from './getAbility';

// First Way

console.log('\n First Way');

const request = {
    url: 'fiscal/dfe/notas',
    method: 'POST',
};

const request2 = {
    url: 'fiscal/dfe/notas',
    method: 'GET',
};

const request3 = {
    url: 'fiscal/dfe/notas',
    method: 'PUT',
};

const request4 = {
    url: 'fiscal/dfe/notas',
    method: 'DELETE',
};

const request5 = {
    url: 'retail/sangria',
    method: 'POST',
};

const request6 = {
    url: 'retail/sangria',
    method: 'GET',
};

const request7 = {
    url: 'retail/sangria/send',
    method: 'GET',
};

console.log(hasAbility(request, rules));
console.log(hasAbility(request2, rules));
console.log(hasAbility(request3, rules));
console.log(hasAbility(request4, rules));
console.log(hasAbility(request5, rules));
console.log(hasAbility(request6, rules));
console.log(hasAbility(request7, rules));

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
