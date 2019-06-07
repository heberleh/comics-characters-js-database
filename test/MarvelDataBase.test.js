const MarvelDB = require('../src/MarvelDB')

describe('Products Service', function() {
    describe('Add new product', function() {
      //2. scenario and 3. expectation
        it('show first 5 gender items', () => {

            let db = MarvelDB()
        
            console.log(db.exec('SELECT genderLabel FROM gender LIMIT 5'))
        
        });
        
        it('count number of different registered abilities among genders', () => {
        
            let db = MarvelDB()
        
            console.log(db.exec('SELECT gender.genderLabel as gender, COUNT(DISTINCT abilities.abilityLabel) as abilities\
                                FROM abilities JOIN gender ON abilities.characterId = gender.characterId\
                                GROUP BY gender.genderLabel'))
            
        });
        
        it('get details about transgender female with ability registered', () => {
        
            let db = MarvelDB()
        
            console.log(db.exec('SELECT character.characterIdLabel, gender.genderLabel, abilities.abilityLabel\
                                    FROM character JOIN gender on character.characterId = gender.characterId\
                                    JOIN abilities ON character.characterId = abilities.characterId\
                                    WHERE gender.genderLabel LIKE "transgender female"'))
            
        });
    });
});






