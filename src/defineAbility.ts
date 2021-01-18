import { defineAbility } from '@casl/ability';

export default (user: Record<string, unknown>) => defineAbility((can, cannot) => {
  cannot('Generate File', 'ecdservice');
  can('List', 'documentservice');
  cannot('Create', 'documentservice');
  if (user.name) {
      can('Generate File', 'ecdservice', { author: user.name })
  }
});
