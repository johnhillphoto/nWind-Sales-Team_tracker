var express = require('express');
var Promise = require('bluebird');
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./model/db.js');

var app = express();

app.use('/browser', express.static(path.join(__dirname, '../browser')));
app.use('/vendor', express.static(path.join(__dirname, '../node_modules')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname, '../browser/views', 'index.html'));
});

app.use('/employees', require('../routes/employees.js'));

//central error handling
app.use(function(err, req, res, next){
  console.log("An error has occured :",err);
  res.status(err.status || 500);
});
