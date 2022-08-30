const fs = require('fs');
const { getMonth } = require('../util');


function sale(req, res) {
	console.log(req.body)
	const { name, price, description } = req.query;
	if (!(name && price && description)) return res.status(400).json({ status: false, message: 'Parametros invalidos' });

	let db = JSON.parse(fs.readFileSync('data/db.json'));
	const date = new Date();
	const month = date.getMonth()+1;
	const day = date.getDate();

	if (!db.sales) db.sales = {};
	if (!db.sales[name]) db.sales[name] = {};
	if (!db.sales[name].days) db.sales[name].days = {};
	if (!db.sales[name].name) db.sales[name].name = name;
	if (!db.sales[name].price) db.sales[name].price = price;
	if (!db.sales[name].description) db.sales[name].description = description;
	
	if (!db.sales[name].days[month + '/' + day]) db.sales[name].days[month + '/' + day] = {};
	if (!db.sales[name].days[month + '/' + day].amount) db.sales[name].days[month + '/' + day].amount = 0;
	db.sales[name].days[month + '/' + day].amount++;
	db.sales[name].days[month + '/' + day].day = month + '/' + day;
	
	fs.writeFileSync('data/db.json', JSON.stringify(db, null, '\t'));

	res.json({ status: true, message: 'Produto registrado com sucesso!' });
}

module.exports = sale;