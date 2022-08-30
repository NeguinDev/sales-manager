const express = require('express')
const router = express.Router();

const sale = require('./sale');
const db = require('./db');

router.post('/sale', sale);
router.get('/db', db);

module.exports = router;