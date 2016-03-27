var express = require('express');
var Promise = require('bluebird');
var path = require('path');

var db = require('./model/db.js');

var app = express();

app.use('/browser', express.static(path.join(__dirname, '../browser')));

module.exports = app;

app.get('/', function(req, res, next){
  res.send('Hello World');
});

app.use('/employees', require('../routes/employees.js'));

//central error handling
app.use(function(err, req, res, next){
  console.log("An error has occured :",err);
  res.status(err.status || 500);
});
