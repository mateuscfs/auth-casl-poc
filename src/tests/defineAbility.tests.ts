import test from 'ava'
import { defineAbilities } from '../defineAbility'

test('Define Abilities - Common User + Direct Request', async t => {
    const res = defineAbilities({ type: 'common' }, { module: '' })

    t.false(res.can('Fiscal', '/ecdservice/file/generate'));
    t.false(res.can('DFe', '/documentservice/NFe/getAll'));
    t.true(res.can('DFe', '/documentservice/NFe/emit'));
    t.false(res.can('Retail', '/taxservice/NFe/get'));
    t.false(res.can('Fiscal', '/*'));
    t.false(res.can('Fiscal', '/ecdservice/*'));
    t.false(res.can('Common', '/generalservice/branch/get'));
})

test('Define Abilities - Common User + Request From DFe', async t => {
    const res = defineAbilities({ type: 'common' }, { module: 'DFe' })

    t.false(res.can('Fiscal', '/ecdservice/file/generate'));
    t.false(res.can('DFe', '/documentservice/NFe/getAll'));
    t.true(res.can('DFe', '/documentservice/NFe/emit'));
    t.false(res.can('Retail', '/taxservice/NFe/get'));
    t.false(res.can('Fiscal', '/*'));
    t.false(res.can('Fiscal', '/ecdservice/*'));
    t.true(res.can('Common', '/generalservice/branch/get'));
})

test('Define Abilities - Common User + Request From Common', async t => {
    const res = defineAbilities({ type: 'common' }, { module: 'Common' })

    t.false(res.can('Fiscal', '/ecdservice/file/generate'));
    t.false(res.can('DFe', '/documentservice/NFe/getAll'));
    t.true(res.can('DFe', '/documentservice/NFe/emit'));
    t.true(res.can('Retail', '/taxservice/NFe/get'));
    t.false(res.can('Fiscal', '/*'));
    t.false(res.can('Fiscal', '/ecdservice/*'));
    t.false(res.can('Common', '/generalservice/branch/get'));
})

test('Define Abilities - Admin User + Direct Request', async t => {
    const res = defineAbilities({ type: 'admin' }, { module: '' })

    t.true(res.can('Fiscal', '/ecdservice/file/generate'));
    t.false(res.can('DFe', '/documentservice/NFe/getAll'));
    t.true(res.can('DFe', '/documentservice/NFe/emit'));
    t.false(res.can('Retail', '/taxservice/NFe/get'));
    t.true(res.can('Fiscal', '/*'));
    t.false(res.can('Fiscal', '/ecdservice/*'));
    t.false(res.can('Common', '/generalservice/branch/get'));
})

test('Define Abilities - Admin User + Request From Fiscal', async t => {
    const res = defineAbilities({ type: 'admin' }, { module: 'Fiscal' })

    t.true(res.can('Fiscal', '/ecdservice/file/generate'));
    t.true(res.can('DFe', '/documentservice/NFe/getAll'));
    t.true(res.can('DFe', '/documentservice/NFe/emit'));
    t.false(res.can('Retail', '/taxservice/NFe/get'));
    t.true(res.can('Fiscal', '/*'));
    t.false(res.can('Fiscal', '/ecdservice/*'));
    t.false(res.can('Common', '/generalservice/branch/get'));
})
