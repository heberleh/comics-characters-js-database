const alasql = require('alasql');


function Database(tables){
    
    let db = new alasql.Database()

    tables.forEach(table => {        
        db.exec(`CREATE table ${table.name}`)
        db.exec(`INSERT INTO ${table.name} SELECT * FROM ?`,[table.data])
    })

    return db
}

export default Database