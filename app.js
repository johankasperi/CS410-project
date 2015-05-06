var express = require('express');
var routing = require('./routes/routing');

var app = express();

app.use('/', routing);

var server = app.listen(3000, function () {
  console.log('App up and running');
});