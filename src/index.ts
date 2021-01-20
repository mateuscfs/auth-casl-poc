import { defineAbility } from '@casl/ability';
import { defineAbilities, defineAbilitiesThirdWay } from './defineAbility';
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

const userAbility = defineAbilities({ type: 'common' }, { module: 'Retail' })

console.log(userAbility.can('Fiscal', '/ecdservice/file/generate')); // false
console.log(userAbility.can('DFe', '/documentservice/NFe/getAll')); // false
console.log(userAbility.can('DFe', '/documentservice/NFe/emit')); // true

const userAbility2 = defineAbilities(user, header)

console.log(userAbility2.can('Fiscal', '/ecdservice/file/generate')) // true
console.log(userAbility2.can('DFe', '/documentservice/NFe/getAll')) // true
console.log(userAbility2.can('DFe', '/documentservice/NFe/emit')) // true
console.log(userAbility2.can('Retail', '/taxservice/NFe/get')) // false
console.log(userAbility2.can('Fiscal', '/*')) // true
console.log(userAbility2.can('Fiscal', '/ecdservice')) // false

// Third Way

const userAbility3 = defineAbilitiesThirdWay({ type: 'common' }, { module: 'Retail' })

console.log(userAbility3.can('Fiscal', '/ecdservice', '/file/generate')); // false
console.log(userAbility3.can('Fiscal', '/ecdservice', '/file/teste')); // false
console.log(userAbility3.can('DFe', '/documentservice', '/NFe/getAll')); // false
console.log(userAbility3.can('DFe', '/documentservice', '/NFe/emit')); // true
console.log(userAbility3.can('DFe', '/documentservice', '/CTe/emit')); // true
console.log(userAbility3.can('DFe', '/documentservice', '/CTe')); // false

const userAbility4 = defineAbilitiesThirdWay(user, { module: 'DFe' })

console.log(userAbility4.can('Fiscal', '/ecdservice', '/file/generate')) // true
console.log(userAbility4.can('Fiscal', '/ecdservice', '/file/teste')) // true
console.log(userAbility4.can('Fiscal', '/ecdservice', '/file')) // false
console.log(userAbility4.can('DFe', '/documentservice', '/CTe/getAll')); // true
console.log(userAbility4.can('DFe', '/documentservice', '/CTe/teste')); // true
console.log(userAbility4.can('DFe', '/documentservice', '/NFe/getAll')); // true
console.log(userAbility4.can('DFe', '/documentservice', '/NFe/emit')); // true
console.log(userAbility4.can('DFe', '/documentservice', '/MDFe/emit')); // true
console.log(userAbility4.can('Common', '/generalservice', '/branch/get')); // true
console.log(userAbility4.can('Common', '/generalservice', '/branch/teste')); // false
console.log(userAbility4.can('Common', '/generalservice', '/branch/teste/get')); // true
console.log(userAbility4.can('Common', '/generalservice', '/group/get')); // true
console.log(userAbility4.can('Common', '/generalservice', '/group/teste/get')); // true
console.log(userAbility4.can('Retail', '/taxservice', '/NFe/get')) // false
console.log(userAbility4.can('Fiscal', '/*')) // false
console.log(userAbility4.can('Fiscal', '/ecdservice', '/*')) // false
