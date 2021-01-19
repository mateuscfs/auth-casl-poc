import defineAbility from './defineAbility';
import rules from './getAbility';

const user = { name: 'Mateus' };
const ability = defineAbility(user);

console.log(ability.can('Generate File', 'ecdservice')); // true
console.log(ability.can('List', 'documentservice')); // true
console.log(ability.can('Create', 'documentservice')); // false

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
