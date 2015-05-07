var express = require('express');
var router = express.Router();
var elasticsearch = require('../models/elasticsearch');

router.get('/query', function(req, res) {
  var userQuery = req.param("search_query");
  if(!userQuery) {
  	res.send("Please include query");
  }
  elasticsearch(req, function(error, response) {
  	if(error) {
  		res.send(error);
  	}
  	else {
  		res.send(response);
  	}
  })
});

module.exports = router;
