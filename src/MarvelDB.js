const Database = require('./Database') 

const abilities = require('../dataset/comics_characters/abilities.json');
const birthDate = require('../dataset/comics_characters/birthDate.json');
const character = require('../dataset/comics_characters/character.json');
const child = require('../dataset/comics_characters/child.json');
const citizenship = require('../dataset/comics_characters/citizenship.json');
const fictionalUniverse = require('../dataset/comics_characters/fictionalUniverse.json');
const gender = require('../dataset/comics_characters/gender.json');
const memberOf = require('../dataset/comics_characters/memberOf.json');
const occupation = require('../dataset/comics_characters/occupation.json');
const partner = require('../dataset/comics_characters/partner.json');
const presentInWork = require('../dataset/comics_characters/presentInWork.json');

function MarvelDB(){

    let tables = [
        {name: 'abilities', data: abilities},
        {name: 'birthDate', data: birthDate},
        {name: 'character', data: character},
        {name: 'child', data: child},
        {name: 'citizenship', data: citizenship},
        {name: 'fictionalUniverse', data: fictionalUniverse},
        {name: 'gender', data: gender},
        {name: 'memberOf', data: memberOf},
        {name: 'occupation', data: occupation},
        {name: 'partner', data: partner},            
        {name: 'presentInWork', data: presentInWork}
    ]

    let db = Database(tables)

    return db
}

export default MarvelDB