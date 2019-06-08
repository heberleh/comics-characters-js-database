import alasql from 'alasql'

const abilities = require('../dataset/abilities.json');
const birthDate = require('../dataset/birthDate.json');
const character = require('../dataset/character.json');
const child = require('../dataset/child.json');
const citizenship = require('../dataset/citizenship.json');
const fictionalUniverse = require('../dataset/fictionalUniverse.json');
const gender = require('../dataset/gender.json');
const memberOf = require('../dataset/memberOf.json');
const occupation = require('../dataset/occupation.json');
const partner = require('../dataset/partner.json');
const presentInWork = require('../dataset/presentInWork.json');

function ComicsDB(){

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

    let db = new alasql.Database()

    tables.forEach(table => {        
        db.exec(`CREATE TABLE ${table.name}`);
        db.exec(`INSERT INTO ${table.name} SELECT * FROM ?`, [table.data]);        
    })

    return db
}
const comicsDB = ComicsDB()
export default comicsDB