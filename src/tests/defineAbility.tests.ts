import test from 'ava'
import { defineAbilities, defineAbilitiesThirdWay } from '../defineAbility'

//Second Way

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

// Third Way

test('Define Abilities - Third Way - Common User + Retail Request', async t => {
    const res = defineAbilitiesThirdWay({ type: 'common' }, { module: 'Retail' })

    t.false(res.can('Fiscal', '/ecdservice', '/file/generate'));
    t.false(res.can('Fiscal', '/ecdservice', '/file/teste'));
    t.false(res.can('DFe', '/documentservice', '/NFe/getAll'));
    t.true(res.can('DFe', '/documentservice', '/NFe/emit'));
    t.true(res.can('DFe', '/documentservice', '/CTe/emit'));
    t.false(res.can('DFe', '/documentservice', '/MDFe/getAll'));
})

test('Define Abilities - Third Way - Admin User + DFe Request', async t => {
    const res = defineAbilitiesThirdWay({ type: 'admin' }, { module: 'DFe' })

    t.true(res.can('Fiscal', '/ecdservice', '/file/generate'));
    t.true(res.can('Fiscal', '/ecdservice', '/file/teste'));
    t.false(res.can('Fiscal', '/ecdservice', '/file'));
    t.true(res.can('DFe', '/documentservice', '/CTe/getAll'));
    t.true(res.can('DFe', '/documentservice', '/CTe/teste'));
    t.true(res.can('DFe', '/documentservice', '/NFe/getAll'));
    t.true(res.can('DFe', '/documentservice', '/NFe/emit'));
    t.true(res.can('DFe', '/documentservice', '/MDFe/emit'));
    t.true(res.can('DFe', '/documentservice', '/NFe/emit'));
    t.true(res.can('Common', '/generalservice', '/branch/get'));
    t.false(res.can('Common', '/generalservice', '/branch/teste'));
    t.true(res.can('Common', '/generalservice', '/branch/teste/get'));
    t.true(res.can('Common', '/generalservice', '/group/get'));
    t.true(res.can('Common', '/generalservice', '/group/teste/get'));
    t.false(res.can('Fiscal', '/*'));
    t.false(res.can('Fiscal', '/ecdservice', '/*'));
    t.false(res.can('Retail', '/taxservice', '/NFe/get'));
})
