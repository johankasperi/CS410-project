var express = require('express');
var router = express.Router();
var elasticsearch = require('../models/elasticsearch');
var getResource = require('../models/resource');

router.all("/", function(req, res, next) {
  res.sendfile("index.html", { root: "web" });
});

router.get('/query', function(req, res) {
  var userQuery = req.query.search_query;
  if(!userQuery || userQuery.length < 1) {
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

router.get('/resource/:id', function(req, res) {
  var id = req.params.id;
  if(!id) {
    res.status(400);
    res.send("Please include id");
    return;
  }
  getResource(id, function(error, response) {
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
})

module.exports = router;
