const fs = require('fs');

function db(req, res) {
	const db = JSON.parse(fs.readFileSync('data/db.json'));
	res.json(db);
}

module.exports = db;