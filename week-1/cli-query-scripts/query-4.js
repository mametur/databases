'use strict';

/*
  user input: table name, column to order by, ASC or DSC
  logged data: all columns from the given table, sorted as instructed by the user input
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
	OrderColumn: process.argv[3],
	UpDown: process.argv[4],
};

const queryString = `
SELECT * FROM ${userInput.tableName} ORDER BY '${userInput.OrderColumn}' ${userInput.UpDown};
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
