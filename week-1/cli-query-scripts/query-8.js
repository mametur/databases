'use strict';

/*
  user input: column name, table name
  logged data: the first 20 unique values for the given column, in the given table
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
	columnName: process.argv[2],
	tableName: process.argv[3],
};

const queryString = `
SELECT distinct ${userInput.columnName} from ${userInput.tableName} limit 20 ;
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
