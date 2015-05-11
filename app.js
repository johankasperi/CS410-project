var express = require('express');
var routing = require('./routes/routing');

var app = express();

app.use("/scripts", express.static(__dirname + "/web/scripts"));
app.use("/styles", express.static(__dirname + "/web/styles"));
app.use("/views", express.static(__dirname + "/web/views"));
app.use("/bower_components", express.static(__dirname + "/web/bower_components"));
app.use('/', routing);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server = app.listen( port, ipaddress, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
