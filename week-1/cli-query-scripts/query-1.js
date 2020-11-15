'use strict';

/*
  user input: employee first name
  logged data: that employee's last name
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
	firstName: process.argv[2],
};

const queryString = `
SELECT LastName FROM Employee Where FirstName= '${userInput.firstName}' ;
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
