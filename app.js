var express = require('express');
var routing = require('./routes/routing');

var app = express();

app.use("/scripts", express.static(__dirname + "/web/scripts"));
app.use("/styles", express.static(__dirname + "/web/styles"));
app.use("/views", express.static(__dirname + "/web/views"));
app.use("/bower_components", express.static(__dirname + "/web/bower_components"));
app.use('/', routing);

var server = app.listen(3000, function () {
  console.log('App up and running');
});