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

// Third Way

export const defineAbilitiesThirdWay = (user: Record<string, unknown>, header: Record<string, unknown>) => {
    return defineAbility((can, cannot) => {
        cannot('Fiscal', '/ecdservice', ['/file/generate']);
        can('DFe', '/documentservice', ['/NFe/emit']);
        can('DFe', '/documentservice', ['/CTe/*']);

        if (user.type == 'admin') {
            can('Fiscal', '/ecdservice', ['/file/*']);
            can('DFe', '/documentservice', ['/**']);
        }

        switch (header.module) {
          case 'Fiscal':
              can('DFe', '/documentservice', ['/NFe/getAll']);
              break;
          case 'Common':
              can('Retail', '/taxservice', ['/NFe/get']);
              break;
          case 'DFe':
              can('Common', '/generalservice', ['/branch/get']);
              can('Common', '/generalservice', ['/branch/*/get']);
              can('Common', '/generalservice', ['/group/*']);
              break;
        }
    })
}
