import { Ability } from '@casl/ability';

// First Way

export default new Ability([
    {
        action: '/fiscal/create',
        subject: 'fiscal',
    },
    {
        action: '/fiscal/delete',
        subject: 'fiscal',
    },
    {
        action: '/fiscal/execute',
        subject: 'fiscal/dfe',
    },
]);
