import { Ability, createAliasResolver } from '@casl/ability';

// First Way

function replaceUrlToObjectNotation(url: string): string {
    const searchRegExp = /\//g;
    const replaceWith = '.';
    return url.replace(searchRegExp, replaceWith);
}

const methodToAction = new Map<string, string>([
    ['emit', 'create'],
    ['register', 'create'],
    ['send', 'create'],
    ['delete', 'delete'],
    ['remove', 'delete'],
    ['update', 'update'],
    ['get', 'read'],
    ['getAll', 'readAll'],
    ['list', 'readAll'],
    ['generate', 'execute'],
]);

const resolveAction = createAliasResolver({
    all: ['create', 'execute', 'update', 'delete', 'read', 'readAll' ],
});

export function hasAbility(
    request: Record<string, string>,
    rules: Ability,
): boolean {
    const urlAction = request.url.slice(request.url.lastIndexOf('/')+1);
    const action = methodToAction.get(urlAction);
    const fields = replaceUrlToObjectNotation(request.url);
    console.log(`action: ${action} -- permission : ${fields}`);
    return rules.can(action!, '', fields);
}

export default new Ability(
    [
        {
            action: 'create',
            subject: '',
            fields: 'fiscal.dfe.emit',
        },
        {
            action: 'create',
            subject: '',
            fields: 'fiscal.dfe.register',
        },
        {
            action: 'delete',
            subject: '',
            fields: 'fiscal.dfe.remove',
        },
        {
            action: 'execute',
            subject: '',
            fields: 'fiscal.dfe.generate',
        },
        {
            action: 'read',
            subject: '',
            fields: 'dfe.doc.get',
            inverted: true,
        },
        {
            action: 'readAll',
            subject: '',
            fields: 'dfe.doc.getAll',
        },
        {
            action: 'all',
            subject: '',
            fields: 'retail.**',
        },
        {
            action: 'all',
            subject: '',
            fields: 'dfe.doc.NFe.*'
        }
    ],
    { resolveAction },
);
