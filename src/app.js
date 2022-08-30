'use strict'

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(cors());
app.use(morgan('[:date[web]] (:remote-addr) :method :url :status :response-time :res[content-length]ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'html');

const Routers = require('./routers/index');
app.use('/', Routers);

module.exports = app;