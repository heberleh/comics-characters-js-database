import marvelDB from '../src/MarvelDB'
import { expect }  from 'chai'
const cTable = require('console.table');

describe('Marvel Database', function() {
    describe('Database Integrity', function() {

        beforeEach(() => this.db = marvelDB)
           
        it('Total number of Marvel Characters', () => {
            let query = 'SELECT COUNT(char) as total\
                         FROM character'
            let result = this.db.exec(query)      
            expect(result[0].total).to.equal(1421);        
        });
               
    });
    describe('Select Queries', function() {

        beforeEach(() => this.db = marvelDB)
           
        it('Gender list', () => {        
            let result = this.db.exec('SELECT DISTINCT genderLabel FROM gender');
            //console.table(result);
            expect(result.length).to.equal(7);
        });
        
        it('Abilities by gender', () => {        
            let result = this.db.exec('SELECT gender.genderLabel as gender, COUNT(DISTINCT abilities.abilityLabel) as abilities\
            FROM gender LEFT JOIN abilities ON abilities.char = gender.char\
            GROUP BY gender.genderLabel');
            let total = 0;
            result.forEach(element => total += element.abilities)
            //console.table(result);            
            expect(total).to.equal(79);
        });
        
        it('Names of the only agender with registered abilities', () => {        
            let result = this.db.exec('SELECT DISTINCT character.charLabel AS name\
            FROM character JOIN gender on character.char = gender.char\
            JOIN abilities ON character.char = abilities.char\
            WHERE gender.genderLabel LIKE "agender"');
            //console.table(result);   
            expect(result[0].name).to.equal("Phoenix Force")
        });
    });
});






