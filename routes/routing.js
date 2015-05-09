var express = require('express');
var router = express.Router();
var elasticsearch = require('../models/elasticsearch');

router.all("/", function(req, res, next) {
  res.sendfile("index.html", { root: "web" });
});

router.get('/query', function(req, res) {
  console.log(req.query);
  var userQuery = req.query.search_query;
  if(!userQuery || userQuery.length < 1) {
    console.log("hej");
    res.status(400);
  	res.send("Please include query");
    return;
  }
  elasticsearch(req, function(error, response) {
  	if(error) {
      console.log("error")
      res.status(400);
      res.send(error);
  	}
  	else {
      res.status(200);
      res.send(response);
  	}
  })
});

module.exports = router;
