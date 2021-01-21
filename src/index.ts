import { defineAbilities, defineAbilitiesThirdWay } from './defineAbility';
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
    url: 'retail/sangria/get',
};

const request7 = {
    url: 'retail/sangria/get',
    origin: 'fiscal/dfe/generate',
};

const request8 = {
    url: 'retail/sangria/send',
};

const request9 = {
    url: 'dfe/doc/NFe/getAll',
};

const request10 = {
    url: 'dfe/doc/NFe/emit',
};

console.log(hasAbility(request, rules)); // true
console.log(hasAbility(request2, rules)); // true
console.log(hasAbility(request3, rules)); // true
console.log(hasAbility(request4, rules)); // true
console.log(hasAbility(request5, rules)); // false
console.log(hasAbility(request6, rules)); // false
console.log(hasAbility(request7, rules)); // true
console.log(hasAbility(request8, rules)); // false
console.log(hasAbility(request9, rules)); // true
console.log(hasAbility(request10, rules)); // true

console.log('\nSecond Way');

// // Second Way

const user = { name: 'Mateus', type: 'admin' };
const header = { module: 'Fiscal' };

const testAbility = defineAbilities({ type: 'common' }, { module: 'Retail' });

console.log('\nAbility 1');

console.log('/ecdservice/file/generate\n', testAbility.can('Fiscal', '/ecdservice/file/generate')); // false
console.log('/documentservice/NFe/getAll\n', testAbility.can('DFe', '/documentservice/NFe/getAll')); // false
console.log('/documentservice/NFe/emit\n', testAbility.can('DFe', '/documentservice/NFe/emit')); // true

console.log('\nAbility 2');

const testAbility2 = defineAbilities(user, header);

console.log('/ecdservice/file/generate\n', testAbility2.can('Fiscal', '/ecdservice/file/generate')); // true
console.log('/documentservice/NFe/getAll\n', testAbility2.can('DFe', '/documentservice/NFe/getAll')); // true
console.log('/documentservice/NFe/emit\n', testAbility2.can('DFe', '/documentservice/NFe/emit')); // true
console.log('/taxservice/NFe/get\n', testAbility2.can('Retail', '/taxservice/NFe/get')); // false
console.log('/*\n', testAbility2.can('Fiscal', '/*')); // true
console.log('/ecdservice/*\n', testAbility2.can('Fiscal', '/ecdservice/*')); // false

console.log('\nThird Way');

// Third Way

const userAbility3 = defineAbilitiesThirdWay({ type: 'common' }, { module: 'Retail' })

console.log('\nAbility 3');

console.log('/ecdservice//file/generate\n', userAbility3.can('Fiscal', '/ecdservice', '/file/generate')); // false
console.log('/ecdservice//file/teste\n', userAbility3.can('Fiscal', '/ecdservice', '/file/teste')); // false
console.log('/documentservice/NFe/getAll\n', userAbility3.can('DFe', '/documentservice', '/NFe/getAll')); // false
console.log('/documentservice/NFe/emit\n', userAbility3.can('DFe', '/documentservice', '/NFe/emit')); // true
console.log('/documentservice/CTe/emit\n', userAbility3.can('DFe', '/documentservice', '/CTe/emit')); // true
console.log('/documentservice/MDFe/getAll\n', userAbility3.can('DFe', '/documentservice', '/MDFe/getAll')); // false

const userAbility4 = defineAbilitiesThirdWay(user, { module: 'DFe' })

console.log('\nAbility 4');

console.log('/ecdservice/file/generate\n', userAbility4.can('Fiscal', '/ecdservice', '/file/generate')) // true
console.log('/ecdservice/file/teste\n', userAbility4.can('Fiscal', '/ecdservice', '/file/teste')) // true
console.log('/ecdservice/file\n', userAbility4.can('Fiscal', '/ecdservice', '/file')) // false
console.log('/documentservice/CTe/getAll\n', userAbility4.can('DFe', '/documentservice', '/CTe/getAll')); // true
console.log('/documentservice/CTe/teste\n', userAbility4.can('DFe', '/documentservice', '/CTe/teste')); // true
console.log('/documentservice/NFe/getAll\n', userAbility4.can('DFe', '/documentservice', '/NFe/getAll')); // true
console.log('/documentservice/NFe/emit\n', userAbility4.can('DFe', '/documentservice', '/NFe/emit')); // true
console.log('/documentservice/MDFe/emit\n', userAbility4.can('DFe', '/documentservice', '/MDFe/emit')); // true
console.log('/generalservice/branch/get\n', userAbility4.can('Common', '/generalservice', '/branch/get')); // true
console.log('/generalservice/branch/teste\n', userAbility4.can('Common', '/generalservice', '/branch/teste')); // false
console.log('/generalservice/branch/teste/get\n', userAbility4.can('Common', '/generalservice', '/branch/teste/get')); // true
console.log('/generalservice/group/get\n', userAbility4.can('Common', '/generalservice', '/group/get')); // true
console.log('/generalservice/group/teste/get\n', userAbility4.can('Common', '/generalservice', '/group/teste/get')); // true
console.log('/taxservice/NFe/get\n', userAbility4.can('Retail', '/taxservice', '/NFe/get')) // false
console.log('/*\n', userAbility4.can('Fiscal', '/*')) // false
console.log('/ecdservice/*\n', userAbility4.can('Fiscal', '/ecdservice', '/*')) // false
