import { Ability, defineAbility } from '@casl/ability';

// First Way

/* export default (user: Record<string, unknown>, header: Record<string, unknown>) => defineAbility((can, cannot) => {
    cannot('Generate', 'fiscal.ecdservice.file');
    cannot('ReadAll', 'dfe.documentservice.NFe');
    cannot('Create', 'dfe.documentservice.NFe');

    if (user.type == 'admin') {
        can('Generate', 'fiscal.ecdservice.file');
    }

    switch (header.module) {
      case 'Fiscal':
          can('ReadAll', 'dfe.documentservice.NFe');
          break;
      case 'Retail':
          can('Read', 'retail.taxservice.NFe');
          break;
      case 'DFe':
          can('ReadAll', 'commmon.generalservice.groups');
          break;
    }

}); */

// Second Way

export default new Ability ([
    {
        action: 'Generate',
        subject: 'fiscal.ecdservice.file',
        inverted: true,
    },
    {
        action: 'ReadAll',
        subject: 'dfe.documentservice.NFe',
    },
])

// Actions

/* 
    Create
    Update
    Delete
    Execute
    Read
    ReadAll
    *
*/