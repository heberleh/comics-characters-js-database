# Comics SQL Database from WikiData

A Comics Characters Database created with Wikidata in **Javascript** using Alasql / SQL.

The current code filters the Comics Characters for the ones that are in the **Marvel Universe**.

Other universes are registered as well, such as **DC Universe** and **Marvel Cinematic Universe**.
You can change the SQL commands to filter by other Universe.

Article: https://towardsdatascience.com/create-a-marvel-database-with-sql-and-javascript-the-easy-way-573ccdf44673

## Install

The Database uses the Alasql library; the code uses Babel for ES6 and mocha for testing.

```bash
npm install
npm test 
```

Check out the [Alasql official github](https://github.com/agershun/alasql) if you are using "plain" javascript (not using Node).

## Usages

- Each attribute is described by a single table
- In each table, there is the Character ID named `char`
- You can join tables using `table1.char = table2.char`
- `char` is also a URL to the Wikidata entry
- Attributes such as `ability` is also a URL to the Wikidata entry
- For `ability` the English value is defined in the `abilityLabel`, the same for other columns/tables
- `var` and `varLabel` is just a standard way to query from the Wikidata

```javascript
let query = marvelDB.exec('SELECT DISTINCT genderLabel FROM gender');
console.table(query);
```

```javascript
let query = marvelDB.exec(
    'SELECT gender.genderLabel as gender, COUNT(DISTINCT abilities.abilityLabel) as abilities\
     FROM gender LEFT JOIN abilities ON abilities.char = gender.char\
     GROUP BY gender.genderLabel'
);
console.table(query);
```


## Contributions

Feel free to contact me and improve this data set.
