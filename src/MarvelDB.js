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

function MarvelDB(){

    let tables = [
        {name: 'abilities', data: abilities},
        {name: 'birthDate', data: birthDate},
        {name: 'character', data: character},
        {name: 'child', data: child},
        {name: 'citizenship', data: citizenship},
        //{name: 'fictionalUniverse', data: fictionalUniverse} -->  added separatedly to use as filter
        {name: 'gender', data: gender},
        {name: 'memberOf', data: memberOf},
        {name: 'occupation', data: occupation},
        {name: 'partner', data: partner},            
        {name: 'presentInWork', data: presentInWork}
    ]

    let db = new alasql.Database()

    // Only characters registered in the Marvel Universe
    db.exec('CREATE TABLE fictionalUniverse')
    db.exec('INSERT INTO fictionalUniverse SELECT char FROM ? WHERE fictionalUniverseLabel LIKE "Marvel Universe"', [fictionalUniverse])
    
    // Create the remaining tables and add character if it is in fictionalUniverse table
    tables.forEach(table => {  
        // Due to ALASQL bugs, where are creating a temporary table for filtering and exporting to a temporary variable filtered_data 
        //ALASQL bug description: I could not join the SELECT WHERE IN statement with the INSET INTO     
        db.exec(`CREATE TABLE aux_${table.name}`);
        db.exec(`INSERT INTO aux_${table.name} SELECT * FROM ?`, [table.data]);        
        let filtered_data = db.exec(`SELECT * FROM aux_${table.name} WHERE aux_${table.name}.char IN (SELECT char FROM fictionalUniverse)`);

        // Then, when can proceed regularly
        db.exec(`CREATE TABLE ${table.name}`);
        db.exec(`INSERT INTO ${table.name} SELECT * FROM ?`, [filtered_data]);

        // and delete the temporary table
        db.exec(`DROP TABLE  aux_${table.name}`);       
    })

    // Drop fictionalUniverse table -> character table contains the same elements
    db.exec('DROP TABLE fictionalUniverse')

    return db
}
const marvelDB = MarvelDB()
export default marvelDB