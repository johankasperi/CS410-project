var express = require('express');
var router = express.Router();
var elasticsearch = require('../models/elasticsearch');

router.get('/', function(req, res) {
  var pageNum = req.param('page', 1);
  var userQuery = req.param('search_query');
  if(!userQuery) {
  	res.send("Please include query");
  }
  elasticsearch(pageNum, userQuery, function(error, response) {
  	if(error) {
  		res.send(error);
  	}
  	else {
  		res.send(response);
  	}
  })
});

module.exports = router;
