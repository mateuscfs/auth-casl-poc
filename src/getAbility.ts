import { Ability, createAliasResolver } from '@casl/ability';

// First Way

function replaceUrlToOjectNotation(url: string): string {
    const searchRegExp = /\//g;
    const replaceWith = '.';
    return url.replace(searchRegExp, replaceWith);
}

const methodToAction = new Map<string, string>([
    ['POST', 'create'],
    ['DELETE', 'delete'],
    ['PUT', 'update'],
    ['GET', 'read'],
]);

const resolveAction = createAliasResolver({
    all: ['create', 'update', 'delete', 'read'],
});

export function hasAbility(
    request: Record<string, string>,
    rules: Ability,
): boolean {
    const action = methodToAction.get(request.method);
    const fields = replaceUrlToOjectNotation(request.url);
    console.log(`action: ${action} -- permission : ${fields}`);
    return rules.can(action!, '', fields);
}

export default new Ability(
    [
        {
            action: 'create',
            subject: '',
            fields: 'fiscal.dfe.notas',
        },
        {
            action: 'read',
            subject: '',
            fields: 'fiscal.dfe.notas',
        },
        {
            action: 'update',
            subject: '',
            fields: 'fiscal.dfe.notas',
        },
        {
            action: 'all',
            subject: '',
            fields: 'retail.**',
        },
    ],
    { resolveAction },
);
