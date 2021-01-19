import { defineAbility } from '@casl/ability';

//First Way

export default (user: Record<string, unknown>) => defineAbility((can, cannot) => {
  cannot('Generate File', 'ecdservice');
  can('List', 'documentservice');
  cannot('Create', 'documentservice');
  if (user.name) {
      can('Generate File', 'ecdservice', { author: user.name })
  }
});

// Second Way

export const defineAbilities = (user: Record<string, unknown>, header: Record<string, unknown>) => {
    return defineAbility((can, cannot) => {
        cannot('Generate', 'fiscal.ecdservice.file');
        cannot('ReadAll', 'dfe.documentservice.NFe');
        can('Create', 'dfe.documentservice.NFe');

        if (user.type == 'admin') {
            can('Generate', 'fiscal.ecdservice.file');
            can('Generate', 'fiscal.*');
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
    }); 
};

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