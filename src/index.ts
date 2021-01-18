import { defineAbility } from '@casl/ability';

const ability = defineAbility((can) => {
  can('read', 'Article');
});

const rule = ability.relevantRuleFor('read', 'Article'); // instance of internal `Rule` class
