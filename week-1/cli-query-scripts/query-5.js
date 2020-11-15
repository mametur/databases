'use strict';

/*
  user input: name of table, name of column, search string
  logged data: all entries in the table who's column matches the search
*/

const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const DB_PATH = path.join(__dirname, '..', '..', 'chinook-database', 'chinook.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected to the chinook SQlite database.');
});

const userInput = {
	tableName: process.argv[2],
	columnName: process.argv[3],
	searchString: process.argv[4],
};

//The percent sign % wildcard matches any sequence of zero or more characters.
//The underscore _ wildcard matches any single character
//https://www.sqlitetutorial.net/sqlite-like/

// hint:  `... LIKE '%${userInput.searchString}%'`
const queryString = `
SELECT * FROM ${userInput.tableName} WHERE ${userInput.columnName} LIKE '%${userInput.searchString}%';
`;

db.all(queryString, (err, rows) => {
	if (err) {
		console.error(err);
	} else {
		console.log(rows);
	}

	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Close the database connection.');
	});
});
