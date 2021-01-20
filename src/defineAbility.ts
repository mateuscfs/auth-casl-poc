import { defineAbility } from '@casl/ability';

// Second Way

export const defineAbilities = (user: Record<string, unknown>, header: Record<string, unknown>) => {
    return defineAbility((can, cannot) => {
        cannot('Fiscal', '/ecdservice/file/generate');
        cannot('DFe', '/documentservice/NFe/getAll');
        can('DFe', '/documentservice/NFe/emit');

        if (user.type == 'admin') {
            can('Fiscal', '/ecdservice/file/generate');
            can('Fiscal', '/*');
        }

        switch (header.module) {
          case 'Fiscal':
              can('DFe', '/documentservice/NFe/getAll');
              break;
          case 'Common':
              can('Retail', '/taxservice/NFe/get');
              break;
          case 'DFe':
              can('Common', '/generalservice/branch/get');
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